import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

const FactsFigures = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const count = useCountUp(7, 2000, isVisible);

  return (
    <section
      ref={ref}
      className="relative w-full py-32 md:py-44 bg-background overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
          }}
        >
          <span className="font-['Monument_Valley'] font-bold text-primary leading-none"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
          >
            {count}K MT
            <span className="text-accent"> +</span>
          </span>
          <p className="mt-6 text-muted-foreground text-lg md:text-xl tracking-[0.15em] uppercase font-light">
            Monthly Production Capacity
          </p>
        </div>

        {/* Decorative line */}
        <div
          className="mt-12 mx-auto h-px bg-accent/30 transition-all duration-1000 delay-300"
          style={{ width: isVisible ? '120px' : '0px' }}
        />
      </div>
    </section>
  );
};

export default FactsFigures;
