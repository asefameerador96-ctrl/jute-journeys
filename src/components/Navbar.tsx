import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToAbout = () => {
    setMenuOpen(false);
    navigate('/about-us');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <img src={logo} alt="Shah Agro Limited" className="h-10 w-auto" />
          <span className="font-['Monument_Valley'] text-2xl font-extrabold tracking-wider hidden sm:inline text-primary-foreground drop-shadow-md">
            Shah Agro
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {[
            ['process', 'Our Journey'],
            ['products', 'Products'],
            ['contact', 'Contact'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-['Monument_Valley'] text-lg font-extrabold tracking-widest uppercase px-5 py-2 rounded-lg backdrop-blur-xl border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300"
              style={{ backgroundColor: 'hsla(80, 20%, 22%, 0.3)' }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={goToAbout}
            className="font-['Monument_Valley'] text-lg font-extrabold tracking-widest uppercase px-5 py-2 rounded-lg backdrop-blur-xl border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300"
            style={{ backgroundColor: 'hsla(80, 20%, 22%, 0.3)' }}
          >
            About Us
          </button>
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg backdrop-blur-xl border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300"
            style={{ backgroundColor: 'hsla(80, 20%, 22%, 0.3)' }}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-primary-foreground transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-primary-foreground transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-primary-foreground transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 px-6 ${
          menuOpen ? 'max-h-80 pb-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-2">
          {[
            ['process', 'Our Journey'],
            ['products', 'Products'],
            ['contact', 'Contact'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-['Monument_Valley'] text-base font-extrabold tracking-widest uppercase px-5 py-3 rounded-lg backdrop-blur-xl border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 text-left"
              style={{ backgroundColor: 'hsla(80, 20%, 22%, 0.4)' }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={goToAbout}
            className="font-['Monument_Valley'] text-base font-extrabold tracking-widest uppercase px-5 py-3 rounded-lg backdrop-blur-xl border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 text-left"
            style={{ backgroundColor: 'hsla(80, 20%, 22%, 0.4)' }}
          >
            About Us
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 font-['Monument_Valley'] text-base font-extrabold tracking-widest uppercase px-5 py-3 rounded-lg backdrop-blur-xl border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 text-left"
            style={{ backgroundColor: 'hsla(80, 20%, 22%, 0.4)' }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
