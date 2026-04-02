import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.topLine} />
      <div className="container">
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark}>SA</span>
              Shah Agro
            </Link>
            <p className={styles.brandDesc}>
              Bangladesh's leading jute export company, delivering premium natural fiber
              products to global markets with integrity and precision.
            </p>
            <div className={styles.socials}>
              {['in', 'f', '𝕏', '⭕'].map((icon, i) => (
                <a key={i} href="#" className={styles.social} aria-label={['LinkedIn','Facebook','X','Instagram'][i]}>{icon}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul>
              <li><button className={styles.colLink} onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>About Us</button></li>
              <li><button className={styles.colLink} onClick={() => document.getElementById('process')?.scrollIntoView({behavior:'smooth'})}>Our Process</button></li>
              <li><button className={styles.colLink} onClick={() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>Products</button></li>
              <li><button className={styles.colLink} onClick={() => document.getElementById('footer')?.scrollIntoView({behavior:'smooth'})}>Contact</button></li>
            </ul>
          </div>

          {/* Products */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Products</h4>
            <ul>
              <li><Link to="/product/yarn" className={styles.colLink}>Jute Yarn</Link></li>
              <li><Link to="/product/sliver" className={styles.colLink}>Jute Sliver</Link></li>
              <li><Link to="/product/sacking-bag" className={styles.colLink}>Sacking Bags</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactItems}>
              <p>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"/></svg>
                Narayanganj, Dhaka, Bangladesh
              </p>
              <p>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.27a16 16 0 006.29 6.29l1.27-1.35a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2z"/></svg>
                <a href="tel:+8801700000000">+880 17 0000 0000</a>
              </p>
              <p>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:info@shahagro.com">info@shahagro.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2025 Shah Agro. All rights reserved.</p>
          <p>Bangladesh's Golden Fiber — Natural. Sustainable. Premium.</p>
        </div>
      </div>
    </footer>
  );
}
