import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import GrainOverlay from '@/components/GrainOverlay';
import HeroCarousel from '@/components/HeroCarousel';
import FactsFigures from '@/components/FactsFigures';
import ProcessSection from '@/components/ProcessSection';
import ProductShowcase from '@/components/ProductShowcase';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="min-h-screen bg-background">
    <ScrollProgress />
    <GrainOverlay />
    <Navbar />
    <HeroCarousel />
    <FactsFigures />
    <ProcessSection />
    <ProductShowcase />
    <Footer />
  </div>
);

export default Index;
