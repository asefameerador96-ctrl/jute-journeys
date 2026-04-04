import { useState } from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  tagline: string;
}

const ProductCard = ({ image, title, tagline }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 25px 60px -15px hsl(var(--accent) / 0.2), 0 0 0 1px hsl(var(--accent) / 0.15)'
          : '0 4px 20px -5px hsl(var(--primary) / 0.08)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          loading="lazy"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="font-['Monument_Valley'] text-xl md:text-2xl font-semibold text-primary mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{tagline}</p>
        <div
          className="mt-4 transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}
        >
          <span className="text-accent text-xs tracking-[0.25em] uppercase font-medium">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
