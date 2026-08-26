/**
 * Post-build SEO pass.
 *
 * The site is a client-rendered SPA, so every route would otherwise ship the
 * single <head> baked into index.html — same title, same description, same
 * canonical for all 11 pages. This script writes one static HTML file per
 * route with that route's real metadata and JSON-LD in the head, and emits a
 * sitemap. Vercel serves a matching file from the filesystem before falling
 * back to the SPA rewrite, so crawlers get real per-page tags while users
 * still boot into the same React app.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { transform } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(root, "dist");
const SITE_URL = "https://mimal.music";

/** Load release-seo.ts so the prerendered head and the runtime head agree. */
const loadSeoHelpers = async () => {
  const source = await readFile(resolve(root, "src/lib/release-seo.ts"), "utf8");
  const { code } = await transform(source, { loader: "ts", format: "esm" });
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
};

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Replace a tag's content if it exists, otherwise append it to the head. */
const setTag = (html, matcher, replacement) =>
  matcher.test(html) ? html.replace(matcher, replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);

const buildHead = (html, { title, description, keywords, url, image, type, jsonLd }) => {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  const meta = [
    ["name", "description", description],
    ["name", "keywords", keywords],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", url],
    ["property", "og:type", type],
    ["property", "og:image", image],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image", image],
  ];
  for (const [attr, key, value] of meta) {
    if (!value) continue;
    out = setTag(
      out,
      new RegExp(`<meta ${attr}="${key}" content="[\\s\\S]*?" ?/?>`),
      `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`
    );
  }
  out = setTag(out, /<link rel="canonical" href="[\s\S]*?" ?\/?>/, `<link rel="canonical" href="${url}" />`);
  if (jsonLd) {
    out = out.replace(
      "</head>",
      `    <script type="application/ld+json" data-seo="prerender">${JSON.stringify(jsonLd)}</script>\n  </head>`
    );
  }
  return out;
};

const main = async () => {
  const { buildReleaseJsonLd, releaseSeoDescription, releaseSeoTitle } = await loadSeoHelpers();
  const content = JSON.parse(await readFile(resolve(root, "src/data/content.json"), "utf8"));
  const shell = await readFile(resolve(DIST, "index.html"), "utf8");

  // Cover art is content-hashed at build time, and only the JS bundle references
  // it, so resolve source filename -> emitted URL from the assets directory.
  const emitted = await readdir(resolve(DIST, "assets"));
  const coverUrl = (image) => {
    const stem = image.replace(/\.[^.]+$/, "");
    const hit = emitted.find((file) => new RegExp(`^${stem}-[\\w-]+\\.(?:jpe?g|png)$`).test(file));
    return hit ? `${SITE_URL}/assets/${hit}` : `${SITE_URL}/og-default.jpg`;
  };

  const urls = [{ loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" }];

  for (const release of content.releases) {
    const path = `/blog/${release.slug}`;
    const url = `${SITE_URL}${path}`;
    const html = buildHead(shell, {
      title: releaseSeoTitle(release),
      description: releaseSeoDescription(release),
      keywords: release.seo?.keywords,
      url,
      image: coverUrl(release.image),
      type: release.trackList ? "music.album" : "music.song",
      jsonLd: buildReleaseJsonLd(release, url),
    });
    const dir = resolve(DIST, `blog/${release.slug}`);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.html"), html);
    urls.push({ loc: url, lastmod: release.releaseDate, changefreq: "monthly", priority: "0.8" });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod, changefreq, priority }) =>
    [
      "  <url>",
      `    <loc>${loc}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n")
  )
  .join("\n")}
</urlset>
`;
  await writeFile(resolve(DIST, "sitemap.xml"), sitemap);
  console.log(`SEO: prerendered ${content.releases.length} release pages, sitemap has ${urls.length} URLs`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
