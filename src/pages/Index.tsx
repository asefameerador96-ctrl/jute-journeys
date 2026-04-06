import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';

import HeroCarousel from '@/components/HeroCarousel';
import FactsFigures from '@/components/FactsFigures';
import ProcessSection from '@/components/ProcessSection';
import ProductShowcase from '@/components/ProductShowcase';
import GlobalReach from '@/components/GlobalReach';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import BigBrandFooter from '@/components/BigBrandFooter';

const Index = () => (
  <div className="min-h-screen bg-background">
    <ScrollProgress />
    
    <Navbar />
    <HeroCarousel />
    <ProductShowcase />
    <FactsFigures />
    <ProcessSection />
    
    <GlobalReach />
    <Gallery />
    <Footer />
    <BigBrandFooter />
  </div>
);

export default Index;
