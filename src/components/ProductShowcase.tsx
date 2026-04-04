import ProductCard from './ProductCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Y5 from '@/assets/Y5.png';
import SLV5 from '@/assets/SLV5.png';
import SB2 from '@/assets/SB2.png';

const products = [
  { image: Y5, title: 'Jute Yarn', tagline: 'Premium-grade yarn spun from the finest raw jute — consistent twist, strength, and luster.' },
  { image: SLV5, title: 'Jute Sliver', tagline: 'Carefully carded and drawn sliver fibers, ready for spinning into high-quality jute products.' },
  { image: SB2, title: 'Sacking Bags', tagline: 'Durable, biodegradable sacking bags built for heavy-duty packaging and international export.' },
];

const ProductShowcase = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.5 });

  return (
    <section id="products" className="py-28 md:py-40 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16 md:mb-24 overflow-hidden">
          <span
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium inline-block"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >What We Export</span>
          <div className="overflow-hidden mt-4">
            <h2
              className="font-['Monument_Valley'] text-4xl md:text-6xl font-bold text-primary"
              style={{
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              Our Products
            </h2>
          </div>
          <div
            className="mt-6 mx-auto h-px bg-accent/40 transition-all duration-1000 ease-out"
            style={{ width: headingVisible ? '80px' : '0px', transitionDelay: '0.4s' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, i) => (
            <div
              key={product.title}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
