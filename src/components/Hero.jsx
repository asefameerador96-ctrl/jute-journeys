import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides } from '../data';
import styles from './Hero.module.css';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const innerRefs = useRef([]);
  const animFrameRef = useRef(null);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);

  // Auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      };
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      currentXRef.current += (mouseRef.current.x - currentXRef.current) * 0.055;
      currentYRef.current += (mouseRef.current.y - currentYRef.current) * 0.055;
      innerRefs.current.forEach(el => {
        if (el) el.style.transform =
          `translate(${currentXRef.current}px, ${currentYRef.current}px) scale(1.12)`;
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.image}
          className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
        >
          <div
            ref={el => innerRefs.current[i] = el}
            className={styles.slideInner}
            style={{ backgroundImage: `url('/assets/${slide.image}')` }}
          />
        </div>
      ))}

      {/* Overlay gradient */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            className={styles.textWrap}
          >
            <p className={styles.eyebrow}>Shah Agro — Bangladesh</p>
            <h1 className={styles.title}>
              {heroSlides[current].tagline.includes("Golden") ? (
                <>Bangladesh's <em>Golden</em> Fiber</>
              ) : heroSlides[current].tagline}
            </h1>
            <p className={styles.sub}>
              From the fertile delta to the global marketplace — premium jute products
              engineered for strength, sustainability, and superior quality.
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16,1,0.3,1] }}
        >
          <button className="btn-primary" onClick={() => {
            document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Explore the Journey
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn-ghost" onClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Our Products
          </button>
        </motion.div>
      </div>

      {/* Floating badge */}
      <motion.div
        className={styles.badge}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.16,1,0.3,1] }}
      >
        <span className={styles.badgeNum}>7K MT</span>
        <span className={styles.badgeLabel}>Monthly Production</span>
      </motion.div>

      {/* Dots */}
      <div className={styles.dots}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
