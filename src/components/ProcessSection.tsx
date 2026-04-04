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

const VH_PER_STAGE = 70;

const ProcessSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScroll = container.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const index = Math.min(stages.length - 1, Math.floor(progress * stages.length));
      setActiveIndex(index);
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
          <div className="h-full max-w-7xl mx-auto px-6 relative">
            {stages.map((stage, i) => {
              const isEven = i % 2 === 0;
              const isActive = activeIndex === i;
              const isPast = activeIndex > i;

              // Zipper: even = image left / text right, odd = text left / image right
              const slideDir = isEven ? -1 : 1;

              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center transition-all duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full`}>
                    {/* Image */}
                    <div
                      className={`relative h-[40vh] md:h-[65vh] overflow-hidden rounded-sm ${
                        isEven ? 'md:order-1' : 'md:order-2'
                      }`}
                      style={{
                        transform: isActive
                          ? 'translateX(0) scale(1)'
                          : `translateX(${slideDir * -60}px) scale(0.96)`,
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-contain"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </div>

                    {/* Text */}
                    <div
                      className={`${isEven ? 'md:order-2' : 'md:order-1'}`}
                      style={{
                        transform: isActive
                          ? 'translateX(0)'
                          : `translateX(${slideDir * 60}px)`,
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                      }}
                    >
                      <span className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
                        {String(i + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
                      </span>

                      <h3 className="font-['Monument_Valley'] text-3xl md:text-5xl font-bold text-primary mb-6">
                        {stage.title}
                      </h3>

                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                        {stage.description}
                      </p>

                      <div className="mt-8 h-px bg-accent/40 w-16" />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Progress dots — fixed right side */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
              {stages.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: '3px',
                    height: activeIndex === i ? '24px' : '8px',
                    backgroundColor: activeIndex === i
                      ? 'hsl(var(--accent))'
                      : 'hsl(var(--accent) / 0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
