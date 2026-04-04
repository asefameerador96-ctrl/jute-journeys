import { useEffect, useState, useCallback } from 'react';
import T9 from '@/assets/T9.png';
import T10 from '@/assets/T10.png';
import T11 from '@/assets/T11.png';

const slides = [
  { src: T9, alt: 'Rich fields of Bangladesh' },
  { src: T10, alt: 'Home of the finest jute products' },
  { src: T11, alt: 'Grower Maker Exporter' },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((next: number) => {
    if (isTransitioning || next === current) return;
    setIsTransitioning(true);
    setPrevious(current);
    setCurrent(next);
    setTimeout(() => {
      setIsTransitioning(false);
      setPrevious(-1);
    }, 1200);
  }, [current, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, goToSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === previous;
        const isVisible = isActive || isPrev;

        return (
          <div
            key={slide.alt}
            className="absolute inset-0"
            style={{
              zIndex: isActive ? 3 : isPrev ? 2 : 1,
              visibility: isVisible ? 'visible' : 'hidden',
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
              style={{
                transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isActive ? 1 : 0,
                animation: isActive ? 'kenburns 5s ease-in-out forwards' : 'none',
                transform: isActive ? undefined : 'scale(1)',
              }}
            />
          </div>
        );
      })}

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            onClick={() => goToSlide(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              current === i ? 'bg-accent w-8' : 'bg-primary-foreground/40 w-2'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
