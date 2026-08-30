import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';

import HeroCarousel from '@/components/HeroCarousel';
import FactsFigures from '@/components/FactsFigures';
import ProcessSection from '@/components/ProcessSection';
import ProductShowcase from '@/components/ProductShowcase';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import BigBrandFooter from '@/components/BigBrandFooter';


// react-simple-maps pulls in d3 and topojson — about 100 KB of JavaScript for one
// decorative section that only renders after mount anyway. Loading it separately
// keeps it off the critical path for the rest of the page.
const GlobalReach = lazy(() => import('@/components/GlobalReach'));
const Index = () => (
  <div className="min-h-screen bg-background">
    <ScrollProgress />
    
    <Navbar />
    <HeroCarousel />
    <ProductShowcase />
    <FactsFigures />
    <ProcessSection />
    
    <Suspense fallback={<div style={{ height: 'clamp(350px, 45vw, 550px)' }} />}>
      <GlobalReach />
    </Suspense>
    <Gallery />
    <Footer />
    <BigBrandFooter />
  </div>
);

export default Index;
