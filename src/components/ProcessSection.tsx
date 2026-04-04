import { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import S5 from '@/assets/S5.png';
import H3 from '@/assets/H3.png';
import C5 from '@/assets/C5.png';
import B3 from '@/assets/B3.png';
import M3 from '@/assets/M3.png';
import Pack2 from '@/assets/Pack2.png';

const stages = [
  {
    image: S5,
    title: 'Seeding',
    description:
      'Carefully selected jute seeds are sown across the fertile Ganges Delta, where the tropical climate and rich alluvial soil create ideal growing conditions for the world\'s finest golden fiber.',
  },
  {
    image: H3,
    title: 'Harvesting',
    description:
      'At peak maturity, jute stalks are hand-harvested by skilled farmers, ensuring each fiber retains its natural luster, strength, and exceptional length — the hallmark of Bangladeshi jute.',
  },
  {
    image: C5,
    title: 'Curing & Retting',
    description:
      'The harvested stalks undergo a traditional retting process in slow-moving waterways. This natural curing separates the precious fibers from the woody core, producing soft, workable strands.',
  },
  {
    image: B3,
    title: 'Buying & Grading',
    description:
      'Our expert graders meticulously inspect and classify raw jute fibers according to international standards — evaluating strength, color, fineness, and fiber length at every stage.',
  },
  {
    image: M3,
    title: 'Manufacturing',
    description:
      'State-of-the-art machinery combined with generations of craftsmanship transforms raw jute fiber into premium yarn, sliver, and finished products — meeting global export specifications.',
  },
  {
    image: Pack2,
    title: 'Packing & Export',
    description:
      'Finished products are precision-packed in export-grade bales and containerized for worldwide shipment. Every bale carries the Shah Agro seal of quality and traceability.',
  },
];

const VH_PER_STAGE = 70; // scroll distance per stage in vh

const ProcessSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScroll = container.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const rawIndex = progress * stages.length;
      const index = Math.min(stages.length - 1, Math.floor(rawIndex));
      const stageProg = rawIndex - index;
      setActiveIndex(index);
      setStageProgress(stageProg);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process" className="relative bg-background">
      {/* Section heading */}
      <div ref={headingRef} className="text-center pt-24 pb-16 px-6 overflow-hidden">
        <span
          className="text-accent text-sm tracking-[0.3em] uppercase font-medium inline-block"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          From Seed to Ship
        </span>
        <div className="overflow-hidden mt-4">
          <h2
            className="font-['Monument_Valley'] text-4xl md:text-6xl font-bold text-primary"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            Our Process
          </h2>
        </div>
        <div
          className="mt-6 mx-auto h-px bg-accent/40 transition-all duration-1000 ease-out"
          style={{
            width: headingVisible ? '80px' : '0px',
            transitionDelay: '0.4s',
          }}
        />
      </div>

      {/* Split scroll container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${stages.length * VH_PER_STAGE}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
              {/* Image side — alternates position */}
              {stages.map((stage, i) => {
                const isEven = i % 2 === 0;
                const isActive = activeIndex === i;
                const isPast = activeIndex > i;

                return (
                  <div
                    key={`img-${i}`}
                    className={`relative h-[45vh] md:h-[65vh] overflow-hidden rounded-sm ${
                      isEven ? 'md:order-1' : 'md:order-2'
                    }`}
                    style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      inset: i === 0 ? undefined : 0,
                      width: i === 0 ? undefined : '50%',
                      left: i === 0 ? undefined : isEven ? '24px' : undefined,
                      right: i === 0 ? undefined : !isEven ? '24px' : undefined,
                      ...(i !== 0 && !isEven && { left: 'auto', marginLeft: 'auto' }),
                    }}
                  >
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? 'scale(1)'
                          : isPast
                            ? 'scale(0.95) translateY(-20px)'
                            : 'scale(0.95) translateY(20px)',
                      }}
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                );
              })}

              {/* We need a cleaner approach — use layered absolute positioning */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
