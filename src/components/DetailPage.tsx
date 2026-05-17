import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BigBrandFooter from '@/components/BigBrandFooter';
import ScrollProgress from '@/components/ScrollProgress';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

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

      {/* Carousel (left) + headline & description (right) */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Carousel */}
          <div
            className="relative"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Carousel
              setApi={setApi}
              opts={{ loop: true, align: 'start' }}
              plugins={[autoplayRef.current]}
              className="w-full"
            >
              <CarouselContent>
                {images.map((src, i) => (
                  <CarouselItem key={i}>
                    <div className="overflow-hidden rounded-sm aspect-[4/3] md:aspect-[5/4]">
                      <img
                        src={src}
                        alt={imageAlts?.[i] || `${headline} ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur border-accent/40 hover:bg-background" />
                  <CarouselNext className="right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur border-accent/40 hover:bg-background" />
                </>
              )}
            </Carousel>

            {/* Dots */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === selectedIndex ? '24px' : '8px',
                      backgroundColor:
                        i === selectedIndex ? 'hsl(var(--accent))' : 'hsla(var(--accent) / 0.3)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Text panel */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            {step && (
              <span className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
                {step}
              </span>
            )}
            <h1 className="font-['Monument_Valley'] text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              {headline}
            </h1>
            <div className="h-px w-16 bg-accent/60 mb-6" />
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
