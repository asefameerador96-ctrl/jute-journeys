import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { useRef, useEffect, useCallback } from 'react';

interface ProcessStageProps {
  image: string;
  step: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStage = ({ image, step, title, description, index }: ProcessStageProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: parallaxRef, offset } = useParallax(0.12);
  const isEven = index % 2 === 0;

  const containerRef = useRef<HTMLDivElement>(null);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref, parallaxRef]
  );

  return (
    <div ref={setRefs} className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle parallax ghost bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          transform: `translateY(${offset * 0.4}px) scale(1.1)`,
          willChange: 'transform',
        }}
      >
        <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center`}>
          {/* Image */}
          <div
            className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? `translateY(${offset * 0.2}px)`
                : `translateX(${isEven ? '-50px' : '50px'}) scale(0.95)`,
              transition: isVisible
                ? 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s linear'
                : 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out"
                style={{ transform: isVisible ? 'scale(1.05)' : 'scale(1.15)' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>

          {/* Text */}
          <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
            <span
              className="text-accent font-['Playfair_Display'] text-sm tracking-[0.3em] uppercase inline-block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              {step}
            </span>

            <div className="overflow-hidden mt-3 mb-6">
              <h3
                className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-primary"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
                }}
              >
                {title}
              </h3>
            </div>

            <p
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              {description}
            </p>

            <div
              className="mt-8 h-px bg-accent/40 transition-all duration-1000 ease-out"
              style={{
                width: isVisible ? '64px' : '0px',
                transitionDelay: '0.55s',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStage;
