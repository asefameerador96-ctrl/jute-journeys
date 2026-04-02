import { useEffect, useState } from 'react';
import T6 from '@/assets/T6.png';
import T7 from '@/assets/T7.png';
import T8 from '@/assets/T8.png';

const slides = [T6, T7, T8];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Images */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: current === i ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Jute field ${i + 1}`}
            className="w-full h-full object-cover"
            style={{
              animation: current === i ? 'kenburns 8s ease-out forwards' : 'none',
            }}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <h1
          className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-4 tracking-tight"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
          }}
        >
          Shah Agro Limited
        </h1>
        <p
          className="text-primary-foreground/80 text-lg sm:text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s',
          }}
        >
          Finest Jutes of Bangladesh
        </p>
        <button
          onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
          className="border border-accent text-accent hover:bg-accent hover:text-primary px-8 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-500"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s ease-out 0.9s, background-color 0.3s, color 0.3s',
          }}
        >
          Explore Our Process
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
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
