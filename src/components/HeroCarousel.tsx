import { useEffect, useState } from 'react';
import S5 from '@/assets/S5.png';
import H3 from '@/assets/H3.png';
import Pack2 from '@/assets/Pack2.png';

const slides = [
  { src: S5, alt: 'Jute field in Bangladesh', position: 'center center' },
  { src: H3, alt: 'Harvested jute fibers', position: 'center top' },
  { src: Pack2, alt: 'Packed jute ready for export', position: 'center center' },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {slides.map((slide, i) => (
        <div
          key={slide.alt}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: current === i ? 1 : 0, zIndex: current === i ? 2 : 1 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: slide.position }}
          />
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            onClick={() => setCurrent(i)}
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
