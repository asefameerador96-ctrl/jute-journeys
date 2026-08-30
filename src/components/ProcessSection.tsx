import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ScrollTextReveal from '@/components/ScrollTextReveal';
import LazyImage from '@/components/LazyImage';
import S5 from '@/assets/S5.webp?w=640;960;1280&format=avif;webp&quality=72&as=picture';
import H3 from '@/assets/H3.webp?w=640;960;1280&format=avif;webp&quality=72&as=picture';
import C5 from '@/assets/C5.webp?w=640;960;1280&format=avif;webp&quality=72&as=picture';
import B4 from '@/assets/B4.webp?w=640;960;1280&format=avif;webp&quality=72&as=picture';
import M3 from '@/assets/M3.webp?w=640;960;1280&format=avif;webp&quality=72&as=picture';
import Pack2 from '@/assets/Pack2.webp?w=640;960;1280&format=avif;webp&quality=72&as=picture';

const stages = [
  {
    image: S5,
    title: 'Seeding',
    subtitle: 'Where Quality Takes Root',
    slug: '/journey/seeding',
    description:
      'Carefully cultivated from the finest seeds to ensure superior jute fiber from the very start.',
  },
  {
    image: H3,
    title: 'Harvesting',
    subtitle: 'Timed to Perfection',
    slug: '/journey/harvesting',
    description:
      'Harvested at peak maturity to preserve strength, consistency, and natural quality.',
  },
  {
    image: C5,
    title: 'Curing & Retting',
    subtitle: 'Refined by Nature',
    slug: '/journey/curing-retting',
    description:
      'Expertly retted to enhance softness, durability, and the signature golden finish.',
  },
  {
    image: B4,
    title: 'Buying & Grading',
    subtitle: 'Only the Finest Selected',
    slug: '/journey/buying',
    description:
      'Rigorously graded to ensure only the highest quality jute moves forward.',
  },
  {
    image: M3,
    title: 'Manufacturing',
    subtitle: 'Engineered for Excellence',
    slug: '/journey/manufacturing',
    description:
      'Precision manufacturing transforms raw fiber into world-class jute products.',
  },
  {
    image: Pack2,
    title: 'Packing & Export',
    subtitle: 'Delivered Without Compromise',
    slug: '/journey/packing-exporting',
    description:
      'Securely packed and efficiently exported to maintain quality across global markets.',
  },
];

const VH_PER_STAGE = 1.6;

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

            // Image slide animation — incoming layer is held below the viewport
            // until the current stage's text has had time to be read, then slides
            // up over the last 30% of progress.
            const HANDOFF_START = 0.7;
            let translateY = 100;
            let scale = 1.04;
            let layerOpacity = 1;

            if (i < activeIndex) {
              translateY = 0;
              scale = 1 + 0.02 * Math.max(0, 1 - (activeIndex - i) * 0.5);
            } else if (i === activeIndex) {
              translateY = 0;
              scale = 1.04 - 0.02 * Math.min(stageProgress, 1);
            } else if (i === activeIndex + 1) {
              const incomingProgress = Math.max(0, (stageProgress - HANDOFF_START) / (1 - HANDOFF_START));
              translateY = 100 - incomingProgress * 100;
              scale = 1.05;
            } else {
              translateY = 100;
              layerOpacity = 0;
            }

            // Text animation — appears quickly once the image is in place,
            // stays fully readable for a long plateau, then fades out just as
            // the next image begins sliding up.
            let textOpacity = 0;
            let textY = 30;

            if (i === activeIndex) {
              if (i === 0 && stageProgress < 0.05) {
                textOpacity = 1;
                textY = 0;
              } else {
                const isLastStage = i === stages.length - 1;
                const FADE_IN_END = 0.12;
                const FADE_OUT_START = HANDOFF_START + 0.02;
                const FADE_OUT_END = FADE_OUT_START + 0.13;
                const fadeIn = stageProgress < FADE_IN_END ? stageProgress / FADE_IN_END : 1;
                const fadeOut = !isLastStage && stageProgress > FADE_OUT_START
                  ? Math.min(1, (stageProgress - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START))
                  : 0;
                textOpacity = fadeIn * (1 - fadeOut);
                textY = 30 * (1 - fadeIn);
              }
            }

            // Text slides in from the opposite side — gentler distance keeps
            // motion calm while you're reading.
            const textSlideX = isEven
              ? (1 - textOpacity) * 24
              : -(1 - textOpacity) * 24;

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
                {/* Split layout: stacked on mobile, side-by-side on desktop */}
                <div className={`flex h-full w-full flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Image half */}
                  <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
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
                      <LazyImage
                        image={stage.image}
                        alt={stage.title}
                        sizes="100vw"
                        priority={i < 1}
                        className="w-full h-full object-cover"
                        style={{
                          transform: `scale(${scale})`,
                          transition: 'transform 0.1s linear',
                        }}
                      />
                    )}
                  </div>

                  {/* Text half */}
                  <div
                    className="w-full md:w-1/2 h-1/2 md:h-full flex items-center bg-background"
                    style={{
                      opacity: textOpacity,
                      pointerEvents: textOpacity > 0.3 ? 'auto' : 'none',
                    }}
                  >
                    <div
                      className={`px-6 md:px-16 lg:px-20 max-w-lg w-full ${isEven ? 'md:text-left' : 'md:text-right md:ml-auto'}`}
                      style={{
                        transform: `translateY(${textY}px) translateX(${textSlideX}px)`,
                        transition: 'transform 0.1s linear',
                      }}
                    >
                      <span className="text-accent text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium">
                        {String(i + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
                      </span>
                      <h3 className="font-['Monument_Valley'] text-2xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-3 mb-2 md:mb-3 text-primary">
                        {stage.title}
                      </h3>
                      <p className="font-['Monument_Valley'] text-base md:text-2xl lg:text-3xl font-normal text-accent/80 mb-2 md:mb-4">
                        {stage.subtitle}
                      </p>
                      <p className="text-xs md:text-base lg:text-lg leading-relaxed text-muted-foreground line-clamp-3 md:line-clamp-none">
                        {stage.description}
                      </p>
                      <div
                        className={`mt-3 md:mt-6 h-px bg-accent/60 ${isEven ? '' : 'md:ml-auto'}`}
                        style={{ width: textOpacity > 0.5 ? '64px' : '0px', transition: 'width 0.6s ease-out' }}
                      />
                      <Link
                        to={stage.slug}
                        className={`inline-flex items-center gap-1 mt-3 md:mt-5 text-accent text-xs tracking-[0.2em] uppercase font-medium hover:text-primary transition-colors duration-300 ${isEven ? '' : 'md:ml-auto'}`}
                        style={{ display: 'block' }}
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
