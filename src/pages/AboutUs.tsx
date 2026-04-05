import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutUs = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div
          ref={ref}
          className="max-w-4xl mx-auto transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h1
            className="font-['Monument_Valley'] font-bold text-primary mb-12 tracking-wide"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            About Us
          </h1>

          <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
            <p>
              We are a dynamic agro-based company committed to developing and supplying high-quality agricultural products across multiple sectors. With a strong foundation in the agro industry, we focus on delivering reliable and sustainable products that meet the evolving needs of global markets.
            </p>
            <p>
              Currently, we are actively expanding our presence in the jute export sector, offering premium-quality jute yarn and jute hessian cloth sourced and manufactured with strict quality standards. As jute continues to gain global recognition as a natural and eco-friendly fiber, we aim to position ourself as a trusted supplier to international buyers.
            </p>
            <p>
              Quality lies at the core of everything we do. Every product undergoes careful selection, processing, and quality control to ensure consistency and excellence. Backed by highly experienced manufacturing facilities and skilled industry professionals, Shah Agro can maintain efficient production while ensuring flawless product standards.
            </p>
            <p>
              With a commitment to quality, reliability, and long-term partnerships, Shah Agro strives to represent the strength of Bangladesh's agricultural heritage while delivering world-class products to the global market.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
