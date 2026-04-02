import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { facts } from '../data';
import styles from './FactsSection.module.css';

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!inView) return;
    const dur = 2000;
    const start = performance.now();
    const animate = (ts) => {
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(animate);
      else setCount(value);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function FactsSection() {
  const stripRef = useRef(null);

  return (
    <section id="facts" className={styles.facts}>
      <div className={styles.topLine} />

      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
        >
          <p className="section-eyebrow center">By the Numbers</p>
          <h2 className={`section-title ${styles.title}`}>
            Driven by Scale,<br />Built on <span className="gold">Quality</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              className={styles.item}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16,1,0.3,1] }}
            >
              <div className={styles.num}>
                <Counter value={f.value} suffix={f.suffix} />
              </div>
              <div className={styles.label}>{f.label}</div>
              <div className={styles.desc}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className={styles.strip}>
        <div className={styles.stripInner}>
          {[1,2].map(n => (
            <React.Fragment key={n}>
              <span>Jute Yarn <strong>·</strong></span>
              <span>Jute Sliver <strong>·</strong></span>
              <span>Sacking Bags <strong>·</strong></span>
              <span>Premium Quality <strong>·</strong></span>
              <span>Global Export <strong>·</strong></span>
              <span>Bangladesh Origin <strong>·</strong></span>
              <span>Eco-Friendly <strong>·</strong></span>
              <span>7K MT Monthly <strong>·</strong></span>
              <span>40+ Countries <strong>·</strong></span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={styles.bottomLine} />
    </section>
  );
}
