import { useEffect } from "react";

export const SITE_URL = "https://mimal.music";

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/blog/by-any-means". Combined with SITE_URL. */
  path: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "music.song" | "music.album";
  jsonLd?: unknown;
}

const upsertMeta = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

/**
 * Per-route document head. Without this every route serves the <title> and
 * description baked into index.html, so search engines see the whole site as
 * one page. Tags already in index.html are updated in place rather than
 * duplicated; the route-specific JSON-LD block is removed on unmount so it
 * never leaks into the next route.
 */
const Seo = ({ title, description, path, keywords, image, type = "website", jsonLd }: SeoProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const absoluteImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : `${SITE_URL}/og-default.jpg`;

    document.title = title;
    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertCanonical(url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", absoluteImage);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteImage);
  }, [title, description, path, keywords, image, type]);

  useEffect(() => {
    if (!jsonLd) return;
    // The build prerenders this same block into the static HTML; drop it so the
    // page carries one copy rather than two.
    document.head.querySelectorAll('script[data-seo="prerender"]').forEach((el) => el.remove());
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "route";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [jsonLd]);

  return null;
};

export default Seo;
