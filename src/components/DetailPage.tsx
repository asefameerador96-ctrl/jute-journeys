import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BigBrandFooter from '@/components/BigBrandFooter';
import ScrollProgress from '@/components/ScrollProgress';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft } from 'lucide-react';

interface DetailPageProps {
  category: 'journey' | 'products';
  step?: string;
  headline: string;
  description: string;
  images: string[];
  imageAlts?: string[];
}

const DetailPage = ({ category, step, headline, description, images, imageAlts }: DetailPageProps) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: img2Ref, isVisible: img2Visible } = useScrollAnimation({ threshold: 0.1 });

  const backLink = category === 'journey' ? '/#process' : '/#products';
  const backLabel = category === 'journey' ? 'Back to Journey' : 'Back to Products';
  const categoryLabel = category === 'journey' ? 'Our Journey' : 'Our Products';

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={backLink} className="hover:text-primary transition-colors">{categoryLabel}</Link>
          {step && (
            <>
              <span>/</span>
              <span className="text-primary font-medium">{step}</span>
            </>
          )}
        </nav>
      </div>

      {/* Hero image + headline */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div
            className="overflow-hidden rounded-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <img
              src={images[0]}
              alt={imageAlts?.[0] || headline}
              className="w-full h-auto object-cover rounded-sm"
              loading="eager"
            />
          </div>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            {step && (
              <span className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
                {categoryLabel}
              </span>
            )}
            <h1 className="font-['Monument_Valley'] text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              {headline}
            </h1>
            <div className="h-px w-16 bg-accent/60 mb-6" />
          </div>
        </div>
      </div>

      {/* Description + second image */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div
            className="md:order-2 overflow-hidden rounded-sm"
            ref={img2Ref}
            style={{
              opacity: img2Visible ? 1 : 0,
              transform: img2Visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {images[1] ? (
              <img
                src={images[1]}
                alt={imageAlts?.[1] || headline}
                className="w-full h-auto object-cover rounded-sm"
                loading="lazy"
              />
            ) : null}
          </div>

          <div
            className="md:order-1"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>

            <Link
              to={backLink}
              className="inline-flex items-center gap-2 mt-8 text-accent text-sm tracking-[0.15em] uppercase font-medium hover:text-primary transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              {backLabel}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <BigBrandFooter />
    </div>
  );
};

export default DetailPage;
