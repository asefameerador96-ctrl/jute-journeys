import ProcessStage from './ProcessStage';
import S5 from '@/assets/S5.png';
import H3 from '@/assets/H3.png';
import C5 from '@/assets/C5.png';
import B3 from '@/assets/B3.png';
import M3 from '@/assets/M3.png';
import Pack2 from '@/assets/Pack2.png';
import FloatingSeed from '@/assets/Floating_3d_Jute_seed.png';

const stages = [
  {
    image: S5,
    step: 'Step 01',
    title: 'Seeding',
    description:
      'Carefully selected jute seeds are sown across the fertile Ganges Delta, where the tropical climate and rich alluvial soil create ideal growing conditions for the world\'s finest golden fiber.',
  },
  {
    image: H3,
    step: 'Step 02',
    title: 'Harvesting',
    description:
      'At peak maturity, jute stalks are hand-harvested by skilled farmers, ensuring each fiber retains its natural luster, strength, and exceptional length — the hallmark of Bangladeshi jute.',
  },
  {
    image: C5,
    step: 'Step 03',
    title: 'Curing & Retting',
    description:
      'The harvested stalks undergo a traditional retting process in slow-moving waterways. This natural curing separates the precious fibers from the woody core, producing soft, workable strands.',
  },
  {
    image: B3,
    step: 'Step 04',
    title: 'Buying & Grading',
    description:
      'Our expert graders meticulously inspect and classify raw jute fibers according to international standards — evaluating strength, color, fineness, and fiber length at every stage.',
  },
  {
    image: M3,
    step: 'Step 05',
    title: 'Manufacturing',
    description:
      'State-of-the-art machinery combined with generations of craftsmanship transforms raw jute fiber into premium yarn, sliver, and finished products — meeting global export specifications.',
  },
  {
    image: Pack2,
    step: 'Step 06',
    title: 'Packing & Export',
    description:
      'Finished products are precision-packed in export-grade bales and containerized for worldwide shipment. Every bale carries the Shah Agro seal of quality and traceability.',
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative bg-background">
      {/* Section heading */}
      <div className="text-center pt-24 pb-8 px-6">
        <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">From Seed to Ship</span>
        <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-primary mt-4">
          Our Process
        </h2>
      </div>

      {/* Floating seed - desktop only */}
      <div className="hidden lg:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none opacity-[0.07]">
        <img
          src={FloatingSeed}
          alt=""
          className="w-64 h-64 object-contain"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        />
      </div>

      {/* Stages */}
      {stages.map((stage, i) => (
        <ProcessStage key={i} {...stage} index={i} />
      ))}

      {/* Particles - decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${15 + i * 15}%`,
              bottom: '-5%',
              animation: `particleFloat ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
