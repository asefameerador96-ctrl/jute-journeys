import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ScrollTextReveal from '@/components/ScrollTextReveal';
import { useRef, useEffect, useState } from 'react';
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

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how far through the sticky section we've scrolled
      // The section is tall (300vh), and the content is sticky
      // Progress goes from 0 to 1 as we scroll through
      const scrollableDistance = sectionHeight - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      // Calculate max translate: total track width minus viewport
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - viewportWidth);

      setTranslateX(progress * maxTranslate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16 px-6 overflow-hidden">
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
            className="flex gap-4 md:gap-6 pl-6 pr-6 will-change-transform"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[80vw] md:w-[30vw]"
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
  );
};

export default Gallery;
