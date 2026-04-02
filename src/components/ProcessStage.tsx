import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProcessStageProps {
  image: string;
  step: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStage = ({ image, step, title, description, index }: ProcessStageProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="min-h-screen flex items-center py-20">
      <div className={`max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
        isEven ? '' : 'md:direction-rtl'
      }`}>
        {/* Image */}
        <div
          className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateX(0) scale(1)'
              : `translateX(${isEven ? '-50px' : '50px'}) scale(0.95)`,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        </div>

        {/* Text */}
        <div
          className={`${isEven ? 'md:order-2' : 'md:order-1'}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <span className="text-accent font-['Playfair_Display'] text-sm tracking-[0.3em] uppercase">
            {step}
          </span>
          <h3 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-primary mt-3 mb-6">
            {title}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
            {description}
          </p>
          <div className="mt-8 w-16 h-px bg-accent/40" />
        </div>
      </div>
    </div>
  );
};

export default ProcessStage;
