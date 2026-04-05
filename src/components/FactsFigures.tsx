import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { target: 7, suffix: 'K MT', label: 'Monthly Production Capacity' },
  { target: 50, suffix: '', label: 'Countries Worldwide' },
  { target: 200, suffix: '', label: 'Satisfied Clients' },
];

const StatItem = ({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const count = useCountUp(target, 2000, isVisible);

  return (
    <div
      ref={ref}
      className="text-center"
    >
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
          transitionDelay: `${delay}ms`,
        }}
      >
        <span
          className="font-['Monument_Valley'] font-bold text-primary leading-none"
          style={{ fontSize: 'clamp(3.2rem, 9.6vw, 8rem)' }}
        >
          {count}{suffix}
          <span className="text-accent"> +</span>
        </span>
        <p className="mt-6 text-muted-foreground text-lg md:text-xl tracking-[0.15em] uppercase font-light">
          {label}
        </p>
      </div>
    </div>
  );
};

const FactsFigures = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative w-full py-24 md:py-36 bg-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} {...stat} delay={i * 200} />
        ))}
      </div>

      {/* Decorative line */}
      <div
        className="mt-12 mx-auto h-px bg-accent/30 transition-all duration-1000 delay-300"
        style={{ width: isVisible ? '120px' : '0px' }}
      />
    </section>
  );
};

export default FactsFigures;
