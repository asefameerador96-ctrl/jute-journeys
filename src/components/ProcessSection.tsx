import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ScrollTextReveal from '@/components/ScrollTextReveal';
import S5 from '@/assets/S5.png';
import SeedingVideo from '@/assets/seeding-video.mp4';
import H3 from '@/assets/H3.png';
import C5 from '@/assets/C5.png';
import CuringVideo from '@/assets/curing-retting-video.mp4';
import B3 from '@/assets/B3.png';
import M3 from '@/assets/M3.png';
import Pack2 from '@/assets/Pack2.png';

const stages = [
  {
    image: S5,
    video: SeedingVideo,
    title: 'Seeding',
    slug: '/journey/seeding',
    description:
      'Carefully selected jute seeds are sown across the fertile Ganges Delta, where the tropical climate and rich alluvial soil create ideal growing conditions for the world\'s finest golden fiber.',
  },
  {
    image: H3,
    title: 'Harvesting',
    slug: '/journey/harvesting',
    description:
      'At peak maturity, jute stalks are hand-harvested by skilled farmers, ensuring each fiber retains its natural luster, strength, and exceptional length — the hallmark of Bangladeshi jute.',
  },
  {
    image: C5,
    video: CuringVideo,
    title: 'Curing & Retting',
    slug: '/journey/curing-retting',
    description:
      'The harvested stalks undergo a traditional retting process in slow-moving waterways. This natural curing separates the precious fibers from the woody core, producing soft, workable strands.',
  },
  {
    image: B3,
    title: 'Buying & Grading',
    slug: '/journey/buying',
    description:
      'Our expert graders meticulously inspect and classify raw jute fibers according to international standards — evaluating strength, color, fineness, and fiber length at every stage.',
  },
  {
    image: M3,
    title: 'Manufacturing',
    slug: '/journey/manufacturing',
    description:
      'State-of-the-art machinery combined with generations of craftsmanship transforms raw jute fiber into premium yarn, sliver, and finished products — meeting global export specifications.',
  },
  {
    image: Pack2,
    title: 'Packing & Export',
    slug: '/journey/packing-exporting',
    description:
      'Finished products are precision-packed in export-grade bales and containerized for worldwide shipment. Every bale carries the Shah Agro seal of quality and traceability.',
  },
];

const VH_PER_STAGE = 1.2;

const ProcessSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ activeIndex: 0, stageProgress: 0 });

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportH = window.innerHeight;
    const scrolled = -rect.top;
    const totalScrollable = sectionHeight - viewportH;
    const overallProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    const totalStages = stages.length;
    const raw = overallProgress * totalStages;
    const activeIndex = Math.min(Math.floor(raw), totalStages - 1);
    const stageProgress = raw - activeIndex;

    setScrollState({ activeIndex, stageProgress });
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const totalHeight = `${stages.length * VH_PER_STAGE * 100}vh`;

  return (
    <section id="process" className="relative bg-background">
      {/* Heading */}
      <div ref={headingRef} className="text-center pt-24 pb-16 px-6 overflow-hidden">
        <ScrollTextReveal
          text="From Seed to Ship"
          className="text-accent text-sm tracking-[0.3em] uppercase font-medium"
          staggerDelay={25}
        />
        <div className="overflow-hidden mt-4">
          <ScrollTextReveal
            text="Our Journey"
            className="font-['Monument_Valley'] text-4xl md:text-6xl font-bold text-primary"
            staggerDelay={50}
            threshold={0.2}
          />
        </div>
        <div
          className="mt-6 mx-auto h-px bg-accent/40 transition-all duration-1000 ease-out"
          style={{ width: headingVisible ? '80px' : '0px', transitionDelay: '0.4s' }}
        />
      </div>

      {/* Scroll-driven area */}
      <div ref={sectionRef} className="relative" style={{ height: totalHeight }}>
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Each stage: half image + half text, alternating sides */}
          {stages.map((stage, i) => {
            const { activeIndex, stageProgress } = scrollState;
            const isEven = i % 2 === 0;

            // Image slide animation (same scroll reveal logic)
            let translateY = 100;
            let scale = 1.05;
            let layerOpacity = 1;

            if (i < activeIndex) {
              translateY = 0;
              scale = 1 + 0.02 * Math.max(0, 1 - (activeIndex - i) * 0.5);
            } else if (i === activeIndex) {
              translateY = 0;
              scale = 1.05 - 0.03 * Math.min(stageProgress, 1);
            } else if (i === activeIndex + 1) {
              translateY = 100 - stageProgress * 100;
              scale = 1.08;
            } else {
              translateY = 100;
              layerOpacity = 0;
            }

            // Text animation
            let textOpacity = 0;
            let textY = 30;

            if (i === activeIndex) {
              const fadeOut = stageProgress > 0.7 ? (stageProgress - 0.7) / 0.3 : 0;
              textOpacity = Math.min(1, stageProgress < 0.15 ? stageProgress / 0.15 : 1) * (1 - fadeOut);
              textY = 30 * (1 - Math.min(1, stageProgress < 0.15 ? stageProgress / 0.15 : 1));
              if (i === 0 && activeIndex === 0) {
                const earlyFade = stageProgress > 0.7 ? (stageProgress - 0.7) / 0.3 : 0;
                textOpacity = 1 - earlyFade;
                textY = 0;
              }
            }

            // Text slides in from the opposite side
            const textSlideX = isEven
              ? (1 - textOpacity) * 40
              : -(1 - textOpacity) * 40;

            return (
              <div
                key={i}
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `translateY(${translateY}%)`,
                  zIndex: i + 1,
                  opacity: layerOpacity,
                }}
              >
                {/* Split layout: image on one side, text on other */}
                <div className={`flex h-full w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Image half */}
                  <div className="w-1/2 h-full relative overflow-hidden">
                    {stage.video ? (
                      <video
                        src={stage.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        style={{
                          transform: `scale(${scale})`,
                          transition: 'transform 0.1s linear',
                        }}
                      />
                    ) : (
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                        loading={i < 2 ? 'eager' : 'lazy'}
                        style={{
                          transform: `scale(${scale})`,
                          transition: 'transform 0.1s linear',
                        }}
                      />
                    )}
                  </div>

                  {/* Text half */}
                  <div
                    className="w-1/2 h-full flex items-center bg-background"
                    style={{
                      opacity: textOpacity,
                      pointerEvents: textOpacity > 0.3 ? 'auto' : 'none',
                    }}
                  >
                    <div
                      className={`px-8 md:px-16 lg:px-20 max-w-lg ${isEven ? 'text-left' : 'text-right ml-auto'}`}
                      style={{
                        transform: `translateY(${textY}px) translateX(${textSlideX}px)`,
                        transition: 'transform 0.1s linear',
                      }}
                    >
                      <span className="text-accent text-xs tracking-[0.3em] uppercase font-medium">
                        {String(i + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
                      </span>
                      <h3 className="font-['Monument_Valley'] text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6 text-primary">
                        {stage.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>
                      <div
                        className={`mt-6 h-px bg-accent/60 ${isEven ? '' : 'ml-auto'}`}
                        style={{ width: textOpacity > 0.5 ? '64px' : '0px', transition: 'width 0.6s ease-out' }}
                      />
                      <Link
                        to={stage.slug}
                        className={`inline-flex items-center gap-1 mt-5 text-accent text-xs tracking-[0.2em] uppercase font-medium hover:text-primary transition-colors duration-300 ${isEven ? '' : 'ml-auto'}`}
                        style={{ display: 'block', textAlign: isEven ? 'left' : 'right' }}
                      >
                        Know More →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Stage indicator dots */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
            {stages.map((_, i) => (
              <div
                key={`dot-${i}`}
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i <= scrollState.activeIndex
                    ? 'hsl(var(--accent))'
                    : 'hsla(var(--accent) / 0.3)',
                  transform: i === scrollState.activeIndex ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
