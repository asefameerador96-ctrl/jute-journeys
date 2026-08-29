import type { SeoProps } from "@/components/Seo";

export const SITE = "https://www.shahagro.com";

/**
 * Canonical per-route metadata. Keep the keys in sync with the routes in App.tsx
 * and with public/sitemap.xml (scripts/generate-sitemap.mjs reads this file).
 *
 * Titles are written to lead with the search term a buyer would actually type
 * ("jute yarn manufacturer", "jute sacking bags supplier") rather than with the
 * brand, since brand queries already resolve to the homepage.
 */
export const ROUTE_META: Record<string, Omit<SeoProps, "path">> = {
  "/": {
    title: "Shah Agro Limited — Premium Jute Exporter & Manufacturer in Bangladesh",
    description:
      "Shah Agro Limited is a Bangladesh jute mill exporting premium jute yarn, jute sliver and sacking bags worldwide, with 7,000+ MT monthly production capacity. Request a quote.",
  },
  "/about-us": {
    title: "About Shah Agro Limited — Bangladesh Jute Mill & Exporter",
    description:
      "Learn about Shah Agro Limited: our jute mill in Bangladesh, 7,000+ MT monthly capacity, quality control process and global export footprint across textile and packaging markets.",
  },

  "/products/yarn": {
    title: "Jute Yarn Manufacturer & Exporter — CRP, CRX, CRT, CB, Hessian & Sacking",
    description:
      "High-quality jute yarn from Bangladesh in CRP, CRX, CRT, CRM, CB, Hessian and Sacking grades, 6–100 Lbs, single and multi-ply. Mining fuse, tatami, cable and rope-making yarn available for export.",
  },
  "/products/sliver": {
    title: "Jute Sliver Supplier — Carded & Drawn Jute Sliver for Spinning",
    description:
      "Precisely carded and drawn jute sliver from Shah Agro Limited, the primary raw material for spinning jute yarn. Uniform, strong and eco-friendly, supplied to spinners worldwide from Bangladesh.",
  },
  "/products/sacking-bag": {
    title: "Jute Sacking Bags & Hessian Cloth Manufacturer in Bangladesh",
    description:
      "Heavy-duty jute sacking bags and woven sacking cloth for packaging rice, wheat, coffee, cocoa and potatoes. Breathable, biodegradable and export-ready from Shah Agro Limited, Bangladesh.",
  },

  "/journey/seeding": {
    title: "Jute Seeding — Precision Sowing for Stronger, Finer Fibres",
    description:
      "How Shah Agro sources high-grade jute seed and prepares soil. Controlled spacing and timely sowing produce the long, uniform fibres that premium jute yarn depends on.",
  },
  "/journey/harvesting": {
    title: "Jute Harvesting — Preserving Fibre Strength and Purity",
    description:
      "Jute harvested at ideal maturity to preserve fibre strength, length and colour. Clean cutting and correct bundling prevent damage and protect the natural integrity of the fibre.",
  },
  "/journey/curing-retting": {
    title: "Jute Curing & Retting — Controlled Water Retting Process",
    description:
      "Controlled retting in clean, monitored water gives uniform fibre separation and preserves the softness, strength and natural golden colour that define high-grade Bangladeshi jute.",
  },
  "/journey/buying": {
    title: "Jute Buying & Grading — Rigorous Sourcing and Quality Selection",
    description:
      "Shah Agro grades raw jute on fibre length, strength, colour and cleanliness, procuring only the finest grades so downstream spinning and weaving stay consistent batch to batch.",
  },
  "/journey/manufacturing": {
    title: "Jute Manufacturing — Spinning and Weaving at Shah Agro Limited",
    description:
      "Modern machinery turns raw jute into yarn, sliver and fabric under strict stage-by-stage quality checks, ensuring uniformity, durability and a superior finish across every product line.",
  },
  "/journey/packing-exporting": {
    title: "Jute Packing & Export — Global Shipping from Bangladesh",
    description:
      "Industry-standard packing protects jute quality in transit, while efficient logistics and export handling deliver on time from our Bangladesh facility to buyers worldwide.",
  },
};

/** Organisation-level JSON-LD, emitted once on every page. */
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shah Agro Limited",
  url: SITE,
  logo: `${SITE}/og-image.png`,
  description:
    "Bangladesh-based jute manufacturer and exporter producing jute yarn, jute sliver and sacking bags with 7,000+ MT monthly capacity.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
  },
};
