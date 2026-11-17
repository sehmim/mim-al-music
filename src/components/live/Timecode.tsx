import { useEffect, useRef } from "react";

const FPS = 24;
const pad = (v: number) => String(v).padStart(2, "0");

const format = (frames: number) => {
  const s = Math.floor(frames / FPS);
  return `TC ${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % FPS)}`;
};

/** A running SMPTE-style timecode, like the counter on a recorder. Static when motion is reduced. */
const Timecode = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let last = -1;
    let frame = 0;
    const tick = (now: number) => {
      const f = Math.floor((now - start) / (1000 / FPS));
      if (f !== last && ref.current) {
        last = f;
        ref.current.textContent = format(f);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} className={className} aria-hidden="true">
      {format(0)}
    </span>
  );
};

export default Timecode;
