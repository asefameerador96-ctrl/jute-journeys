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
import { ChevronLeft, ChevronDown } from 'lucide-react';

export interface DetailPageSpecifications {
  quality?: { items: string[] };
  specialty?: string[];
  yarnCountPly?: Record<string, string>;
  grades?: string[];
}

interface DetailPageProps {
  category: 'journey' | 'products';
  step?: string;
  headline: string;
  description: string;
  images: string[];
  imageAlts?: string[];
  specifications?: DetailPageSpecifications;
}

const DetailPage = ({ category, step, headline, description, images, imageAlts, specifications }: DetailPageProps) => {
  const [specsExpanded, setSpecsExpanded] = useState(false);
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
              {specifications && (
                <>
                  {' '}
                  <button
                    onClick={() => setSpecsExpanded(!specsExpanded)}
                    className="inline-flex items-center gap-1 text-accent font-semibold hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    {specsExpanded ? 'See less' : 'See more'}
                    <ChevronDown
                      className="w-4 h-4 transition-transform duration-300"
                      style={{ transform: specsExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                </>
              )}
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

      {/* Expandable specifications panel */}
      {specifications && specsExpanded && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="space-y-8 bg-background/50 rounded-lg p-6 md:p-8 border border-accent/20">
            {/* Grades Section */}
            {specifications.grades && (
              <div>
                <h4 className="font-['Monument_Valley'] text-lg md:text-xl font-bold text-primary mb-4">
                  Available Grades
                </h4>
                <div className="flex flex-wrap gap-3">
                  {specifications.grades.map((grade, i) => (
                    <span
                      key={i}
                      className="px-5 py-2.5 bg-accent/10 border border-accent/40 rounded-md text-sm md:text-base text-primary font-semibold tracking-wider uppercase"
                    >
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Section */}
            {specifications.quality && (
              <div>
                <h4 className="font-['Monument_Valley'] text-lg md:text-xl font-bold text-primary mb-4">
                  Quality
                </h4>
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                  {specifications.quality.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 leading-relaxed">
                      <span className="text-accent font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specialty Section */}
            {specifications.specialty && (
              <div>
                <h4 className="font-['Monument_Valley'] text-lg md:text-xl font-bold text-primary mb-4">
                  Specialty
                </h4>
                <div className="flex flex-wrap gap-2">
                  {specifications.specialty.map((item, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm md:text-base text-primary font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Yarn Count & PLY Section */}
            {specifications.yarnCountPly && (
              <div>
                <h4 className="font-['Monument_Valley'] text-lg md:text-xl font-bold text-primary mb-4">
                  Yarn Count & PLY
                </h4>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground">
                  {Object.entries(specifications.yarnCountPly).map(([type, range]) => (
                    <div key={type} className="flex md:flex-row flex-col md:items-center gap-2 md:gap-6 border-b border-accent/20 pb-3 last:border-b-0">
                      <span className="font-semibold text-primary md:min-w-[120px]">{type}</span>
                      <span className="text-muted-foreground">{range}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BigBrandFooter />
    </div>
  );
};

export default DetailPage;
