import logo from '@/assets/logo.png';

const Footer = () => (
  <footer id="contact" className="py-12 md:py-16" style={{ backgroundColor: 'hsl(80, 20%, 22%)' }}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Logo & tagline */}
        <div>
          <img src={logo} alt="Shah Agro Limited" className="h-12 w-auto mb-4" />
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'hsla(30, 25%, 93%, 0.6)' }}>
            Premium jute products from the heart of Bangladesh, exported worldwide with trust and tradition.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-['Monument_Valley'] text-lg font-semibold mb-4 text-primary-foreground">Contact</h4>
          <div className="space-y-2 text-sm" style={{ color: 'hsla(30, 25%, 93%, 0.6)' }}>
            <p>Level 4 - EMPORI FINANCIAL CENTER</p>
            <p>Plot-6, Road-93, North Avenue, Gulshan-2</p>
            <p>Dhaka 1212, Bangladesh</p>
            <a href="mailto:shahagro.export@abulkhairgroup.com" className="hover:text-accent transition-colors block">
              shahagro.export@abulkhairgroup.com
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-['Monument_Valley'] text-lg font-semibold mb-4 text-primary-foreground">Navigate</h4>
          <div className="space-y-2">
            {[
              ['process', 'Our Journey'],
              ['products', 'Products'],
              ['contact', 'Contact'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                className="block hover:text-accent transition-colors text-sm"
                style={{ color: 'hsla(30, 25%, 93%, 0.6)' }}
              >
                {label}
              </button>
            ))}
            <a
              href="/about"
              className="block hover:text-accent transition-colors text-sm"
              style={{ color: 'hsla(30, 25%, 93%, 0.6)' }}
            >
              About Us
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid hsla(30, 25%, 93%, 0.1)' }}>
        <p className="text-xs tracking-widest uppercase" style={{ color: 'hsla(30, 25%, 93%, 0.4)' }}>
          © {new Date().getFullYear()} Shah Agro Limited. All rights reserved.
        </p>
        <p className="text-xs tracking-widest uppercase" style={{ color: 'hsla(30, 25%, 93%, 0.4)' }}>
          🇧🇩 Bangladesh
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
