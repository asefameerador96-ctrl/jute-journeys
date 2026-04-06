import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ScrollTextReveal from '@/components/ScrollTextReveal';
import { useState, useEffect, useCallback, useRef } from 'react';
import T6 from '@/assets/T6.png';
import T7 from '@/assets/T7.png';
import T8 from '@/assets/T8.png';
import S5 from '@/assets/S5.png';
import H3 from '@/assets/H3.png';
import C5 from '@/assets/C5.png';
import M3 from '@/assets/M3.png';
import Pack2 from '@/assets/Pack2.png';

const images = [
  { src: T6, alt: 'Jute fields at golden hour' },
  { src: H3, alt: 'Harvesting jute stalks' },
  { src: S5, alt: 'Seeding process' },
  { src: T7, alt: 'Raw jute bales' },
  { src: C5, alt: 'Curing and retting' },
  { src: M3, alt: 'Manufacturing facility' },
  { src: T8, alt: 'Jute fiber close-up' },
  { src: Pack2, alt: 'Export packing' },
];

const Gallery = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ threshold: 0.1 });
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slidesPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, images.length - slidesPerView);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setIsAutoPlaying(true);
  };

  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <section className="py-28 md:py-40 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24 overflow-hidden">
          <ScrollTextReveal
            text="Visual Stories"
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium"
            staggerDelay={25}
          />
          <div className="overflow-hidden mt-4">
            <ScrollTextReveal
              text="Gallery"
              className="font-['Monument_Valley'] text-4xl md:text-6xl font-bold text-primary"
              staggerDelay={60}
              threshold={0.2}
            />
          </div>
          <div
            className="mt-6 mx-auto h-px bg-accent/40 transition-all duration-1000 ease-out"
            style={{ width: headingVisible ? '80px' : '0px', transitionDelay: '0.4s' }}
          />
        </div>

        {/* Carousel */}
        <div
          ref={galleryRef}
          className="relative"
          style={{
            opacity: galleryVisible ? 1 : 0,
            transform: galleryVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${current * (100 / slidesPerView)}%)`,
              }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="relative overflow-hidden rounded-sm group cursor-pointer">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-primary-foreground text-sm tracking-wider">{img.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 flex items-center justify-center hover:bg-accent transition-all duration-300 rounded-full"
            style={{ backgroundColor: 'hsla(80, 20%, 29%, 0.8)', color: '#F3EDE7' }}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 flex items-center justify-center hover:bg-accent transition-all duration-300 rounded-full"
            style={{ backgroundColor: 'hsla(80, 20%, 29%, 0.8)', color: '#F3EDE7' }}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === i ? 'bg-accent w-8' : 'bg-primary/20 w-1.5'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
