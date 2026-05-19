import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ScrollTextReveal from '@/components/ScrollTextReveal';
import { useRef, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import g1 from '@/assets/gallery/g1.png';
import g2 from '@/assets/gallery/g2.png';
import g3 from '@/assets/gallery/g3.png';
import g4 from '@/assets/gallery/g4.png';
import g5 from '@/assets/gallery/g5.png';
import g6 from '@/assets/gallery/g6.png';
import g7 from '@/assets/gallery/g7.png';
import g8 from '@/assets/gallery/g8.png';
import g9 from '@/assets/gallery/g9.png';
import g10 from '@/assets/gallery/g10.png';
import g11 from '@/assets/gallery/g11.png';
import g12 from '@/assets/gallery/g12.png';
import g13 from '@/assets/gallery/g13.png';
import g14 from '@/assets/gallery/g14.png';
import g15 from '@/assets/gallery/g15.png';

const images = [
  { src: g1, alt: 'Shah Agro Limited — Image 1' },
  { src: g2, alt: 'Shah Agro Limited — Image 2' },
  { src: g3, alt: 'Shah Agro Limited — Image 3' },
  { src: g4, alt: 'Shah Agro Limited — Image 4' },
  { src: g5, alt: 'Shah Agro Limited — Image 5' },
  { src: g6, alt: 'Shah Agro Limited — Image 6' },
  { src: g7, alt: 'Shah Agro Limited — Image 7' },
  { src: g8, alt: 'Shah Agro Limited — Image 8' },
  { src: g9, alt: 'Shah Agro Limited — Image 9' },
  { src: g10, alt: 'Shah Agro Limited — Image 10' },
  { src: g11, alt: 'Shah Agro Limited — Image 11' },
  { src: g12, alt: 'Shah Agro Limited — Image 12' },
  { src: g13, alt: 'Shah Agro Limited — Image 13' },
  { src: g14, alt: 'Shah Agro Limited — Image 14' },
  { src: g15, alt: 'Shah Agro Limited — Image 15' },
];

const Gallery = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollableDistance = sectionHeight - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - viewportWidth);

      setTranslateX(progress * maxTranslate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', handleKey);
    // Lock body scroll while lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-background"
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-8 md:mb-12 px-6 overflow-hidden">
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

          {/* Scroll-driven track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-4 md:gap-6 pl-6 pr-6 will-change-transform items-center"
              style={{
                transform: `translateX(-${translateX}px)`,
              }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[75vw] md:w-[28vw] lg:w-[24vw]"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="relative overflow-hidden rounded-sm group cursor-pointer w-full block bg-primary/5"
                    aria-label={`View ${img.alt} full size`}
                  >
                    <div className="w-full h-[45vh] md:h-[60vh] flex items-center justify-center">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none">
                      <p className="text-primary-foreground text-sm tracking-wider">Click to view</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll progress indicator */}
          <div className="flex justify-center mt-8 px-6">
            <div className="w-48 h-px bg-primary/10 relative">
              <div
                className="absolute top-0 left-0 h-full bg-accent transition-none"
                style={{ width: `${(translateX / (trackRef.current?.scrollWidth ? trackRef.current.scrollWidth - window.innerWidth : 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image — 92vw on mobile, 75vw on desktop */}
          <div
            className="relative flex items-center justify-center w-[92vw] md:w-[75vw] h-[70vh] md:h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-sm shadow-2xl"
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % images.length);
            }}
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-widest">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
