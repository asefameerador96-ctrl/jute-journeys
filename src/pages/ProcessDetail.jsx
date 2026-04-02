import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { processStages } from '../data';

export default function ProcessDetail() {
  const { id } = useParams();
  const stage = processStages.find(s => s.id === id);
  if (!stage) return <div style={{padding:'10rem 2rem',textAlign:'center',color:'#6B6B60'}}>Stage not found. <Link to="/" style={{color:'#C9A84C'}}>Go home</Link></div>;

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        minHeight: '65vh', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(/assets/${stage.previewImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position:'absolute',inset:0, background:'linear-gradient(to top,rgba(13,20,9,0.92) 0%,rgba(13,20,9,0.4) 60%,rgba(13,20,9,0.15) 100%)' }} />
        <div className="container" style={{ position:'relative',zIndex:2, padding:'5rem 4vw' }}>
          <p style={{ fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.16em',textTransform:'uppercase',color:'#C9A84C',marginBottom:'0.8rem' }}>
            <Link to="/#process" style={{color:'rgba(255,255,255,0.5)'}}>Process</Link> / {stage.landingPageTitle}
          </p>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:900, lineHeight:1.05, color:'#fff', maxWidth:'18ch', marginBottom:'1.2rem' }}>
            {stage.detail.headline}
          </h1>
          <Link to="/" className="btn-ghost" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',marginTop:'1rem'}}>
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ padding:'6rem 4vw', display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'5rem', alignItems:'start' }}>
        <div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.9rem', fontWeight:700, color:'#1C3A16', marginBottom:'1.2rem' }}>
            About this Stage
          </h2>
          <p style={{ fontSize:'1rem',lineHeight:1.8,color:'#6B6B60', marginBottom:'1.5rem' }}>
            {stage.detail.description}
          </p>
          <Link to="/" className="btn-primary" style={{marginTop:'1rem'}}>← Back to Home</Link>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
          {stage.detail.images.map(img => (
            <div key={img} style={{ borderRadius:'16px', overflow:'hidden', boxShadow:'0 20px 48px rgba(0,0,0,0.1)' }}>
              <img src={`/assets/${img}`} alt={img} style={{ width:'100%', height:'270px', objectFit:'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
