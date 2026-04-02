import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [loc]);

  const scrollTo = (id) => {
    if (loc.pathname !== '/') { window.location.href = '/#' + id; return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>SA</span>
          Shah Agro
        </Link>

        <ul className={styles.links}>
          <li><button onClick={() => scrollTo('hero')} className={styles.link}>Home</button></li>
          <li><button onClick={() => scrollTo('process')} className={styles.link}>Process</button></li>
          <li><button onClick={() => scrollTo('products')} className={styles.link}>Products</button></li>
          <li><button onClick={() => scrollTo('about')} className={styles.link}>About</button></li>
          <li><button onClick={() => scrollTo('footer')} className={`${styles.link} ${styles.cta}`}>Contact</button></li>
        </ul>

        <button
          className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}>
        <button className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Close">✕</button>
        <button onClick={() => scrollTo('hero')} className={styles.mobileLink}>Home</button>
        <button onClick={() => scrollTo('process')} className={styles.mobileLink}>Process</button>
        <button onClick={() => scrollTo('products')} className={styles.mobileLink}>Products</button>
        <button onClick={() => scrollTo('about')} className={styles.mobileLink}>About</button>
        <button onClick={() => scrollTo('footer')} className={styles.mobileLink}>Contact</button>
      </div>
    </>
  );
}
