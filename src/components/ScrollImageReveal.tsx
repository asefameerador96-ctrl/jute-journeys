import { useEffect, useRef, useState } from 'react';
import T6 from '@/assets/T6.png';
import T8 from '@/assets/T8.png';

const ScrollImageReveal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealPercent, setRevealPercent] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            // Progress: 0 when section top hits bottom of viewport, 1 when section top hits top
            const progress = 1 - rect.top / windowH;
            setRevealPercent(Math.max(0, Math.min(1, progress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Base image (visible first) with subtle parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${revealPercent * -30}px) scale(1.1)`,
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}
      >
        <img
          src={T6}
          alt="Jute fields"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay image sliding up from bottom */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          height: `${revealPercent * 100}%`,
          transition: 'height 0.05s linear',
          willChange: 'height',
        }}
      >
        <img
          src={T8}
          alt="Jute products"
          className="absolute inset-0 w-full h-screen object-cover"
          style={{
            transform: `translateY(${(1 - revealPercent) * 20}px) scale(1.05)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Subtle divider line at the reveal edge */}
      <div
        className="absolute inset-x-0 z-10 h-px bg-accent/60"
        style={{
          bottom: `${(1 - revealPercent) * 100}%`,
          opacity: revealPercent > 0.02 && revealPercent < 0.98 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </section>
  );
};

export default ScrollImageReveal;
