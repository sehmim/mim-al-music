import { useEffect, useRef } from "react";

interface CrackCanvasProps {
  /** Same seed, same break: the pattern is stable across loads. */
  seed: number;
  /** Impact point as a fraction of the canvas width and height. */
  x: number;
  y: number;
  rays?: number;
  /** Spread the cracks out from the impact on first draw. */
  animate?: boolean;
  className?: string;
}

type Point = [number, number, number]; // x, y, distance from impact

interface Crack {
  cx: number;
  cy: number;
  reach: number;
  lines: Point[][];
  rings: { d: number; pts: Point[] }[];
}

const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const pointAt = (pts: Point[], d: number) => pts.find((p) => p[2] >= d) ?? null;

const build = (w: number, h: number, seed: number, fx: number, fy: number, n: number): Crack => {
  const r = rng(seed);
  const cx = w * fx;
  const cy = h * fy;
  const reach = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));
  const rays: Point[][] = [];
  const lines: Point[][] = [];
  const rings: Crack["rings"] = [];

  for (let i = 0; i < n; i++) {
    let a = (i / n) * Math.PI * 2 + (r() - 0.5) * 0.4;
    const len = reach * (0.5 + r() * 0.6);
    let d = 0;
    let x = cx;
    let y = cy;
    const pts: Point[] = [[cx, cy, 0]];
    while (d < len) {
      const s = 8 + r() * 22;
      a += (r() - 0.5) * 0.24;
      x += Math.cos(a) * s;
      y += Math.sin(a) * s;
      d += s;
      pts.push([x, y, d]);
      if (pts.length > 3 && r() < 0.07) {
        let ba = a + (r() < 0.5 ? -1 : 1) * (0.35 + r() * 0.55);
        let bx = x;
        let by = y;
        let bd = d;
        const bl = d + 20 + r() * reach * 0.18;
        const branch: Point[] = [[bx, by, bd]];
        while (bd < bl) {
          const bs = 7 + r() * 16;
          ba += (r() - 0.5) * 0.3;
          bx += Math.cos(ba) * bs;
          by += Math.sin(ba) * bs;
          bd += bs;
          branch.push([bx, by, bd]);
        }
        lines.push(branch);
      }
    }
    rays.push(pts);
    lines.push(pts);
  }

  // Concentric fractures between neighbouring rays: the spiderweb.
  for (const f of [0.05, 0.11, 0.2, 0.33]) {
    const rr = reach * f;
    for (let i = 0; i < n; i++) {
      if (r() < 0.3) continue;
      const p1 = pointAt(rays[i], rr);
      const p2 = pointAt(rays[(i + 1) % n], rr * (0.9 + r() * 0.2));
      if (!p1 || !p2) continue;
      const pull = 0.86 + r() * 0.1;
      const mx = (p1[0] + p2[0]) / 2;
      const my = (p1[1] + p2[1]) / 2;
      rings.push({ d: rr, pts: [p1, [cx + (mx - cx) * pull, cy + (my - cy) * pull, rr], p2] });
    }
  }

  return { cx, cy, reach, lines, rings };
};

const draw = (ctx: CanvasRenderingContext2D, g: Crack, progress: number, dpr: number) => {
  const D = progress * g.reach;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const glow = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, 34);
  glow.addColorStop(0, `rgba(255, 236, 210, ${0.4 * Math.min(1, progress * 3)})`);
  glow.addColorStop(1, "rgba(255, 236, 210, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(g.cx, g.cy, 34, 0, Math.PI * 2);
  ctx.fill();

  // A dark hairline under a light one, so the break reads on both the cream
  // walls and the dark parts of the frame.
  const passes: [number, string][] = [
    [1.8, "rgba(23, 15, 10, 0.3)"],
    [0.85, "rgba(255, 244, 226, 0.72)"],
  ];
  for (const [width, color] of passes) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (const pts of g.lines) {
      if (pts[0][2] > D) continue;
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        const q = pts[i];
        const p = pts[i - 1];
        if (q[2] <= D) {
          ctx.lineTo(q[0], q[1]);
          continue;
        }
        const t = (D - p[2]) / (q[2] - p[2]);
        ctx.lineTo(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t);
        break;
      }
    }
    for (const ring of g.rings) {
      if (ring.d > D) continue;
      ctx.moveTo(ring.pts[0][0], ring.pts[0][1]);
      ctx.quadraticCurveTo(ring.pts[1][0], ring.pts[1][1], ring.pts[2][0], ring.pts[2][1]);
    }
    ctx.stroke();
  }
};

/** Shattered-glass overlay for the hero, a nod to the studio's name. */
const CrackCanvas = ({ seed, x, y, rays = 14, animate = false, className }: CrackCanvasProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let first = animate && !reduce;
    let size = "";

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect();
      // ResizeObserver also fires once on observe; only redraw on a real change.
      const next = `${width}x${height}`;
      if (!width || !height || next === size) return;
      size = next;
      cancelAnimationFrame(frame);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const g = build(width, height, seed, x, y, rays);

      if (!first) {
        draw(ctx, g, 1, dpr);
        return;
      }
      first = false;
      const start = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - start) / 1100);
        draw(ctx, g, 1 - Math.pow(1 - k, 3), dpr);
        if (k < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    render();
    const observer = new ResizeObserver(() => render());
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [seed, x, y, rays, animate]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
};

export default CrackCanvas;
