import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { useCallback } from 'react';

interface ProcessStageProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStage = ({ image, title, description, index }: ProcessStageProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: parallaxRef, offset } = useParallax(0.15);
  const isEven = index % 2 === 0;

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref, parallaxRef]
  );

  return (
    <div ref={setRefs} className="py-16 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Image — full aspect ratio, parallax movement */}
          <div
            className={`relative overflow-hidden rounded-sm ${isEven ? 'md:order-1' : 'md:order-2'}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translateX(0) scale(1)'
                : `translateX(${isEven ? '-60px' : '60px'}) scale(0.96)`,
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-contain"
                style={{
                  transform: `translateY(${offset * 0.25}px) scale(${isVisible ? 1.02 : 1.08})`,
                  transition: isVisible
                    ? 'transform 0.1s linear'
                    : 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
            <div className="overflow-hidden mb-6">
              <h3
                className="font-['Monument_Valley'] text-3xl md:text-5xl font-bold text-primary"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
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
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
              }}
            >
              {description}
            </p>

            <div
              className="mt-8 h-px bg-accent/40 transition-all duration-1000 ease-out"
              style={{
                width: isVisible ? '64px' : '0px',
                transitionDelay: '0.5s',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStage;
