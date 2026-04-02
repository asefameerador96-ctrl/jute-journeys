import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsList } from '../data';

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsList.find(p => p.id === id);
  if (!product) return <div style={{padding:'10rem 2rem',textAlign:'center',color:'#6B6B60'}}>Product not found. <Link to="/" style={{color:'#C9A84C'}}>Go home</Link></div>;

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      <div style={{
        minHeight: '65vh', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(/assets/${product.previewImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position:'absolute',inset:0, background:'linear-gradient(to top,rgba(13,20,9,0.92) 0%,rgba(13,20,9,0.4) 60%,rgba(13,20,9,0.15) 100%)' }} />
        <div className="container" style={{ position:'relative',zIndex:2, padding:'5rem 4vw' }}>
          <p style={{ fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.16em',textTransform:'uppercase',color:'#C9A84C',marginBottom:'0.8rem' }}>
            <Link to="/#products" style={{color:'rgba(255,255,255,0.5)'}}>Products</Link> / {product.landingPageTitle}
          </p>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:900, lineHeight:1.05, color:'#fff', maxWidth:'20ch', marginBottom:'1.2rem' }}>
            {product.detail.headline}
          </h1>
          <p style={{ fontSize:'1rem',color:'rgba(255,255,255,0.65)',maxWidth:'50ch',lineHeight:1.7 }}>{product.taglineLong}</p>
          <Link to="/" className="btn-ghost" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',marginTop:'1.5rem'}}>
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="container" style={{ padding:'6rem 4vw', display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'5rem', alignItems:'start' }}>
        <div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.9rem', fontWeight:700, color:'#1C3A16', marginBottom:'1.2rem' }}>
            Product Overview
          </h2>
          {product.detail.description.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontSize:'1rem',lineHeight:1.8,color:'#6B6B60', marginBottom:'1rem' }}>{para}</p>
          ))}
          {product.detail.grades && (
            <div style={{ marginTop:'1.5rem' }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.15rem', color:'#1C3A16', marginBottom:'0.8rem' }}>Available Grades</h3>
              <div style={{ display:'flex',flexWrap:'wrap',gap:'0.6rem' }}>
                {product.detail.grades.map(g => (
                  <span key={g} style={{ padding:'0.4rem 1rem', background:'#1C3A16', color:'#C9A84C', borderRadius:'100px', fontSize:'0.8rem', fontWeight:600 }}>{g}</span>
                ))}
              </div>
            </div>
          )}
          {product.detail.specs && (
            <div style={{ marginTop:'2rem' }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.15rem', color:'#1C3A16', marginBottom:'0.8rem' }}>Specifications</h3>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.88rem' }}>
                <thead><tr>{['Grade','Count','Ply'].map(h => <th key={h} style={{ padding:'0.7rem 1rem', textAlign:'left', background:'rgba(45,80,22,0.06)', color:'#1C3A16', fontWeight:600, borderBottom:'1px solid rgba(0,0,0,0.07)', fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>)}</tr></thead>
                <tbody>{product.detail.specs.map((s,i) => (
                  <tr key={i}>{[s.grade,s.count,s.ply].map((v,j) => <td key={j} style={{ padding:'0.7rem 1rem', color:'#6B6B60', borderBottom:'1px solid rgba(0,0,0,0.06)' }}>{v}</td>)}</tr>
                ))}</tbody>
              </table>
            </div>
          )}
          <Link to="/" className="btn-primary" style={{marginTop:'2rem'}}>← Back to Home</Link>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
          {product.detail.images.map(img => (
            <div key={img} style={{ borderRadius:'16px', overflow:'hidden', boxShadow:'0 20px 48px rgba(0,0,0,0.1)' }}>
              <img src={`/assets/${img}`} alt={img} style={{ width:'100%', height:'270px', objectFit:'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
