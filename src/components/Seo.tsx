import { useEffect } from "react";

const SITE = "https://www.shahagro.com";
const SITE_NAME = "Shah Agro Limited";
const DEFAULT_IMAGE = `${SITE}/og-image.png?v=2`;

export interface SeoProps {
  /** Page title WITHOUT the brand suffix. */
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/products/yarn". */
  path: string;
  image?: string;
  /** JSON-LD object(s) injected for this page only. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

/** Upsert a <meta> tag, tracking it so we can clean up on unmount. */
function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-route metadata. Runs in an effect so it never blocks paint, and adds no
 * runtime dependency. Crawlers that execute JS (Googlebot, Bingbot) pick these
 * up; the build-time prerender step bakes them into the static HTML for the rest.
 */
export default function Seo({ title, description, path, image, jsonLd, noindex }: SeoProps) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
    const img = image ?? DEFAULT_IMAGE;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setLink("canonical", url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

    // Remove any JSON-LD from a previous route before adding this route's, so a
    // client-side navigation can never leave two conflicting graphs in the head.
    document.head.querySelectorAll('script[data-seo="route"]').forEach((s) => s.remove());

    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "route";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [title, description, path, image, jsonLd, noindex]);

  return null;
}
