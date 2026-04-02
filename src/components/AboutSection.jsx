import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>

          {/* Text */}
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
          >
            <p className="section-eyebrow">Our Story</p>
            <h2 className={`section-title ${styles.title}`}>
              Rooted in Bangladesh,<br />Reaching the <span className={styles.underline}>World</span>
            </h2>
            <p className={styles.body}>
              Shah Agro was born from a deep respect for Bangladesh's most treasured natural
              resource — jute. For over two decades, we have dedicated ourselves to transforming
              raw golden fiber into premium products that meet the exacting demands of global markets.
            </p>
            <p className={styles.body}>
              Our vertically integrated operations span the entire value chain: from sourcing the
              finest seeds, through precision manufacturing, to reliable global export. Every step
              is guided by our commitment to quality, sustainability, and the livelihoods of the
              farming communities we work with.
            </p>
            <div className={styles.stats}>
              {[
                { num: "7K MT", label: "Monthly Output" },
                { num: "40+", label: "Export Countries" },
                { num: "100%", label: "Natural Fiber" },
              ].map(s => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: '2.5rem' }}
              onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}>
              Get In Touch
            </button>
          </motion.div>

          {/* Images collage */}
          <motion.div
            className={styles.images}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16,1,0.3,1] }}
          >
            <div className={styles.imgTall}>
              <img src="/assets/T7.png" alt="Jute fields in Bangladesh" loading="lazy" />
            </div>
            <div className={styles.imgShort}>
              <img src="/assets/S4.png" alt="Jute seeds" loading="lazy" />
            </div>
            <div className={styles.imgQuote}>
              <p className={styles.quoteText}>
                "We don't just export jute — we export a legacy of Bangladesh's craftsmanship to the world."
              </p>
              <p className={styles.quoteAuthor}>— Shah Agro Leadership</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
