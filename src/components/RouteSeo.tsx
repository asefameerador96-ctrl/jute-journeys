import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import Seo from "./Seo";
import { ORGANIZATION_JSONLD, ROUTE_META, SITE } from "@/seo/routeMeta";

const PRODUCT_NAMES: Record<string, string> = {
  "/products/yarn": "Jute Yarn",
  "/products/sliver": "Jute Sliver",
  "/products/sacking-bag": "Jute Sacking Bags & Hessian Cloth",
};

/** Trailing slashes and casing must not produce a second canonical URL. */
function normalise(pathname: string) {
  const p = pathname.replace(/\/+$/, "").toLowerCase();
  return p === "" ? "/" : p;
}

function breadcrumbFor(path: string, title: string) {
  const segments = path.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }];
  if (segments.length) {
    items.push({ "@type": "ListItem", position: 2, name: title, item: `${SITE}${path}` });
  }
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

/**
 * Applies per-route metadata for the whole app from a single place, so adding a
 * route means adding one entry to ROUTE_META rather than editing a page file.
 * Unknown paths (the 404 route) are marked noindex so soft-404s never get indexed.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();
  const path = normalise(pathname);
  const meta = ROUTE_META[path];

  const jsonLd = useMemo(() => {
    if (!meta) return undefined;
    const blocks: Record<string, unknown>[] = [ORGANIZATION_JSONLD, breadcrumbFor(path, meta.title)];
    const productName = PRODUCT_NAMES[path];
    if (productName) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        description: meta.description,
        url: `${SITE}${path}`,
        brand: { "@type": "Brand", name: "Shah Agro Limited" },
        manufacturer: { "@type": "Organization", name: "Shah Agro Limited" },
        countryOfOrigin: "BD",
      });
    }
    return blocks;
  }, [meta, path]);

  if (!meta) {
    return (
      <Seo
        title="Page not found"
        description="The page you are looking for is not available on shahagro.com."
        path={path}
        noindex
      />
    );
  }

  return <Seo {...meta} path={path} jsonLd={jsonLd} />;
}
