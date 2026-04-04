import { useEffect, useState } from 'react';
import T6 from '@/assets/T6.png';
import T7 from '@/assets/T7.png';
import T8 from '@/assets/T8.png';

const slides = [T6, T7, T8];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrent((prev) => {
        setPrevious(prev);
        return (prev + 1) % slides.length;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Images with split/reveal effect */}
      {slides.map((src, i) => {
        const isActive = current === i;
        const isPrev = previous === i;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              clipPath: isActive
                ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                : isPrev
                ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
              transition: isActive
                ? 'clip-path 1.4s cubic-bezier(0.77, 0, 0.175, 1)'
                : isPrev
                ? 'clip-path 1.4s cubic-bezier(0.77, 0, 0.175, 1)'
                : 'none',
            }}
          >
            <img
              src={src}
              alt={`Jute field ${i + 1}`}
              className="w-full h-full object-cover"
              style={{
                transform: isActive ? 'scale(1.05)' : 'scale(1.12)',
                filter: isActive ? 'brightness(1)' : 'brightness(0.8)',
                transition: 'transform 6s ease-out, filter 1.5s ease-out',
              }}
            />
          </div>
        );
      })}


      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPrevious(current);
              setCurrent(i);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              current === i ? 'bg-accent w-8' : 'bg-primary-foreground/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
