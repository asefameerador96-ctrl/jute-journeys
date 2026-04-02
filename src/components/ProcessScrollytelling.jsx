import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { processStages } from '../data';
import ProcessScene from './ProcessScene';
import styles from './ProcessScrollytelling.module.css';

export default function ProcessScrollytelling() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef([]);
  const sectionRef = useRef(null);
  const [isInSection, setIsInSection] = useState(false);

  useEffect(() => {
    const options = { threshold: 0, rootMargin: '-40% 0px -40% 0px' };
    const observers = stageRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveIndex(i);
        });
      }, options);
      obs.observe(el);
      return obs;
    });

    const sectionObs = new IntersectionObserver(entries => {
      setIsInSection(entries[0].isIntersecting);
    }, { threshold: 0.05 });
    if (sectionRef.current) sectionObs.observe(sectionRef.current);

    return () => {
      observers.forEach(o => o && o.disconnect());
      sectionObs.disconnect();
    };
  }, []);

  return (
    <section id="process" className={styles.section} ref={sectionRef}>
      {/* Section intro */}
      <div className="container">
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
        >
          <p className="section-eyebrow center">From Seed to Shipment</p>
          <h2 className={`section-title ${styles.introTitle}`}>
            Six Stages of <span className="gold">Transformation</span>
          </h2>
          <p className={styles.introSub}>
            Jute's journey from a tiny seed in Bangladesh's rich delta soils to a finished
            product on global shelves — a story of craftsmanship, precision, and nature's alchemy.
          </p>
        </motion.div>
      </div>

      {/* Sticky 3D scene + scrolling stages */}
      <div className={styles.stickWrap}>
        {/* 3D canvas — sticky */}
        <div className={styles.canvasSticky}>
          <ProcessScene activeStage={activeIndex} />
          {/* Stage label overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={styles.stageLabel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.stageLabelStep}>{processStages[activeIndex].stepLabel}</span>
              <span className={styles.stageLabelName}>{processStages[activeIndex].landingPageTitle}</span>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots (side) */}
          <div className={styles.progressDots}>
            {processStages.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => stageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                aria-label={processStages[i].landingPageTitle}
              />
            ))}
          </div>
        </div>

        {/* Scrollable stage panels */}
        <div className={styles.stages}>
          {processStages.map((stage, i) => (
            <div
              key={stage.id}
              ref={el => stageRefs.current[i] = el}
              className={`${styles.stage} ${i % 2 === 1 ? styles.stageReverse : ''}`}
            >
              {/* Text side */}
              <motion.div
                className={styles.stageText}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
              >
                <p className={styles.stageStep}>{stage.stepLabel}</p>
                <h3 className={styles.stageTagline}>{stage.taglineShort}</h3>
                <p className={styles.stageDesc}>{stage.taglineLong}</p>
                <Link to={`/process/${stage.id}`} className={styles.stageLink}>
                  Explore Stage
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
              </motion.div>

              {/* Spacer for 3D canvas */}
              <div className={styles.stageSpacer} />

              {/* Image card side */}
              <motion.div
                className={styles.stageImageWrap}
                initial={{ opacity: 0, x: i % 2 === 0 ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16,1,0.3,1] }}
              >
                <Link to={`/process/${stage.id}`} className={styles.imageCard}>
                  <img src={`/assets/${stage.previewImage}`} alt={stage.landingPageTitle} loading="lazy" />
                  <div className={styles.imageOverlay} />
                  <span className={styles.imageBadge}>{stage.landingPageTitle}</span>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
