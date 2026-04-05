import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary/70 backdrop-blur-xl shadow-lg border-b border-primary-foreground/10'
          : 'bg-primary/20 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <img src={logo} alt="Shah Agro Limited" className="h-10 w-auto" />
          <span className="font-['Monument_Valley'] text-xl font-bold text-primary-foreground tracking-wide hidden sm:inline">
            Shah Agro
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            ['process', 'Our Process'],
            ['products', 'Products'],
            ['contact', 'Contact'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-primary-foreground hover:text-accent transition-colors duration-300 text-base font-bold tracking-widest uppercase"
            >
              {label}
            </button>
          ))}
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
        className={`md:hidden bg-primary/70 backdrop-blur-xl overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-64 pb-6' : 'max-h-0'
        }`}
      >
        {[
          ['process', 'Our Process'],
          ['products', 'Products'],
          ['contact', 'Contact'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="block w-full text-left px-6 py-3 text-primary-foreground hover:text-accent transition-colors text-base font-bold tracking-widest uppercase"
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
