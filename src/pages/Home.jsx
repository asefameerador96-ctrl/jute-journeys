import React from 'react';
import Hero from '../components/Hero';
import FactsSection from '../components/FactsSection';
import ProcessScrollytelling from '../components/ProcessScrollytelling';
import ProductShowcase from '../components/ProductShowcase';
import AboutSection from '../components/AboutSection';

// Wave SVG dividers
const WaveDown = ({ from, to }) => (
  <div style={{ background: from, lineHeight: 0, marginBottom: '-1px' }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{display:'block',width:'100%'}}>
      <path fill={to} d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"/>
    </svg>
  </div>
);

const WaveUp = ({ from, to }) => (
  <div style={{ background: from, lineHeight: 0, marginTop: '-1px' }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{display:'block',width:'100%'}}>
      <path fill={to} d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z"/>
    </svg>
  </div>
);

export default function Home() {
  return (
    <>
      <Hero />
      <FactsSection />
      <WaveDown from="#0D1409" to="#FAF7F2" />
      <ProcessScrollytelling />
      <WaveUp from="#FAF7F2" to="#1C3A16" />
      <ProductShowcase />
      <WaveDown from="#1C3A16" to="#FAF7F2" />
      <AboutSection />
    </>
  );
}
