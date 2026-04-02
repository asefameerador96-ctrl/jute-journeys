import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productsList } from '../data';
import styles from './ProductShowcase.module.css';

export default function ProductShowcase() {
  return (
    <section id="products" className={styles.section}>
      <div className={styles.topWave} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
        >
          <p className="section-eyebrow center">What We Produce</p>
          <h2 className={`section-title ${styles.headerTitle}`}>
            World-Class Jute <span className="gold">Products</span>
          </h2>
          <p className={styles.headerSub}>
            Three flagship product lines, each engineered to the highest standards of quality,
            sustainability, and performance.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {productsList.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.85, delay: i * 0.14, ease: [0.16,1,0.3,1] }}
            >
              <Link to={`/product/${product.id}`} className={styles.card}>
                <div className={styles.cardImg}>
                  <img src={`/assets/${product.previewImage}`} alt={product.landingPageTitle} loading="lazy" />
                  <div className={styles.cardImgOverlay} />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardCat}>{product.category}</p>
                  <h3 className={styles.cardName}>{product.landingPageTitle}</h3>
                  <p className={styles.cardTagline}>{product.taglineLong}</p>
                  <span className={styles.cardBtn}>
                    Learn More
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
