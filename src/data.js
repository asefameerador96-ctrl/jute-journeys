export const processStages = [
  {
    id: "seeding",
    index: 0,
    landingPageTitle: "Seeding",
    stepLabel: "Stage 01",
    taglineShort: "Where Quality Takes Root",
    taglineLong: "Carefully cultivated from the finest seeds to ensure superior jute fiber from the very start.",
    previewImage: "S5.png",
    detail: {
      headline: "Precision Seeding for Stronger, Finer Jute Fibers",
      description: "We begin with carefully selected high-grade jute seeds and optimal soil preparation to ensure healthy crop growth. Controlled farming practices, proper spacing, and timely sowing help produce long, uniform fibers — the foundation of premium-quality jute products.",
      images: ["S4.png", "S3.png"]
    }
  },
  {
    id: "harvesting",
    index: 1,
    landingPageTitle: "Harvesting",
    stepLabel: "Stage 02",
    taglineShort: "Timed to Perfection",
    taglineLong: "Harvested at peak maturity to preserve strength, consistency, and natural quality.",
    previewImage: "H3.png",
    detail: {
      headline: "Expert Harvesting to Preserve Strength and Purity",
      description: "Jute is harvested at the ideal maturity stage to preserve fiber strength, length, and color. Skilled farmers ensure clean cutting and proper bundling, preventing damage and maintaining the natural integrity of the fibers.",
      images: ["H4.png", "H2.png"]
    }
  },
  {
    id: "curing",
    index: 2,
    landingPageTitle: "Curing (Retting)",
    stepLabel: "Stage 03",
    taglineShort: "Refined by Nature",
    taglineLong: "Expertly retted to enhance softness, durability, and the signature golden finish.",
    previewImage: "C5.png",
    detail: {
      headline: "Controlled Retting for Superior Fiber Finish",
      description: "The harvested jute is submerged in clean water under carefully monitored conditions. This controlled retting process ensures uniform fiber separation, preserving softness, strength, and natural golden color — critical for high-grade output.",
      images: ["C4.png", "C2.png"]
    }
  },
  {
    id: "buying",
    index: 3,
    landingPageTitle: "Buying",
    stepLabel: "Stage 04",
    taglineShort: "Only the Finest Selected",
    taglineLong: "Rigorously graded to ensure only the highest quality jute moves forward.",
    previewImage: "B3.png",
    detail: {
      headline: "Rigorous Sourcing for Consistent Premium Quality",
      description: "We source raw jute through a rigorous selection process, evaluating fiber length, strength, color, and cleanliness. Only the finest grades are procured, ensuring consistency and reliability for downstream processing.",
      images: ["B1.png", "B2.png"]
    }
  },
  {
    id: "manufacturing",
    index: 4,
    landingPageTitle: "Manufacturing",
    stepLabel: "Stage 05",
    taglineShort: "Engineered for Excellence",
    taglineLong: "Precision manufacturing transforms raw fiber into world-class jute products.",
    previewImage: "M3.png",
    detail: {
      headline: "Advanced Processing for High-Performance Jute Products",
      description: "Our modern manufacturing facilities transform raw jute into yarn, sliver, and fabric using precision machinery. Each stage is monitored with strict quality checks to ensure uniformity, durability, and superior finish across all products.",
      images: ["M2.png", "M6.png"]
    }
  },
  {
    id: "packing-exporting",
    index: 5,
    landingPageTitle: "Packing & Exporting",
    stepLabel: "Stage 06",
    taglineShort: "Delivered Without Compromise",
    taglineLong: "Securely packed and efficiently exported to maintain quality across global markets.",
    previewImage: "Pack2.png",
    detail: {
      headline: "Secure Packaging & Reliable Global Export Solutions",
      description: "Finished jute products are carefully packed using industry-standard methods to protect quality during transit. Efficient logistics and export handling ensure timely delivery, maintaining product integrity from our facility to global destinations.",
      images: ["EX1.png", "Pack3.png"]
    }
  }
];

export const productsList = [
  {
    id: "yarn",
    landingPageTitle: "Jute Yarn",
    category: "Natural Fiber Product",
    taglineShort: "Strength in Every Twist",
    taglineLong: "Expertly spun jute yarn delivering consistent strength, durability, and performance.",
    previewImage: "Y5.png",
    detail: {
      headline: "High-Quality Jute Yarn Engineered for Durability & Consistency",
      description: "Jute Yarn is a natural fiber yarn produced by spinning processed jute slivers into strong, coarse threads. It is widely used in the manufacture of jute bags, ropes, carpets, twines, and various eco-friendly textiles. Known for its strength, durability, and biodegradability, it is a sustainable material widely used in packaging and industrial applications.",
      qualities: ["CRP/CRX/CRT/CRM/CB/CRP Hessian", "Sacking Wilton/Axminister", "Mining Fuse Yarn", "Tatami Yarn", "Cable Yarn", "Espadrille Yarn", "Rope Making Yarn", "Various Horticulture Yarn"],
      specialty: "Mini Spool/Coreless/Hangs, Scanned, Spliced Joints/Staggered",
      specs: [
        { grade: "CRP/CRX", count: "6Lbs to 100Lbs", ply: "Single & Multi-Ply" },
        { grade: "CRT", count: "6Lbs to 100Lbs", ply: "Single & Multi-Ply" },
        { grade: "CRM", count: "8Lbs to 100Lbs", ply: "Single & Multi-Ply" },
        { grade: "CB", count: "8Lbs to 100Lbs", ply: "Single & Multi-Ply" },
        { grade: "Hessian", count: "10Lbs to 100Lbs", ply: "Single & Multi-Ply" },
        { grade: "Sacking", count: "13Lbs to 100Lbs", ply: "Single & Multi-Ply" },
      ],
      images: ["Y6.png", "Y2.png"]
    }
  },
  {
    id: "sliver",
    landingPageTitle: "Jute Sliver",
    category: "Natural Fiber Product",
    taglineShort: "Purity in Preparation",
    taglineLong: "Precisely processed jute sliver ensuring clean fiber alignment and superior spinning quality.",
    previewImage: "SLV5.png",
    detail: {
      headline: "Precisely Processed Jute Sliver for Superior Spinning Performance",
      description: "Jute sliver goods are semi-processed materials made from natural jute fibers that are carded and drawn into long, continuous strands called slivers. These slivers are used as the main raw material for spinning jute yarn and producing various jute products. Valued for their strength, uniformity, and eco-friendly nature, jute slivers support the production of sustainable products such as ropes, carpets, and other industrial applications, with growing demand in global markets.",
      grades: ["BTD 1", "BTD 2", "MESTA", "BTD 3", "SMR", "BTCA"],
      images: ["SLV3.png", "SLV6.png"]
    }
  },
  {
    id: "sacking-bag",
    landingPageTitle: "Sacking Bags",
    category: "Packaging Product",
    taglineShort: "Built to Endure",
    taglineLong: "Robust jute sacking fabric engineered for durability, reliability, and heavy-duty applications.",
    previewImage: "SB2.png",
    detail: {
      headline: "Heavy-Duty Jute Fabric Designed for Strength, Reliability & Versatility",
      description: "Jute sacking bags and cloth are strong, durable products made from natural jute fibers. It is a heavy-duty woven fabric primarily used for packaging agricultural commodities such as rice, wheat, coffee, cocoa, and potatoes. From this cloth, jute sacking bags are manufactured to provide reliable and breathable packaging for bulk goods. Known for their high strength, biodegradability, and eco-friendly nature, jute sacking products are widely used in global trade as a sustainable alternative to synthetic packaging materials.",
      bagRange: "600 GM to 1250 GM, fully customized to customer's needs",
      clothCount: "8 count to 10 count of cloth",
      images: ["SB5.png", "SB1.png"]
    }
  }
];

export const heroSlides = [
  { image: "T6.png", tagline: "Bangladesh's Golden Fiber" },
  { image: "T7.png", tagline: "Sustainable by Nature" },
  { image: "T8.png", tagline: "Precision. Quality. Export." }
];

export const facts = [
  { value: 7, suffix: "K MT", label: "Monthly Capacity", desc: "Premium jute products produced every month" },
  { value: 40, suffix: "+", label: "Export Countries", desc: "Serving buyers across continents" },
  { value: 25, suffix: "+", label: "Years of Excellence", desc: "Deep expertise and trusted partnerships" },
  { value: 100, suffix: "%", label: "Natural Fiber", desc: "Fully biodegradable — earth-first always" }
];
