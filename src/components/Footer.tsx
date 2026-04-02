import logo from '@/assets/logo.png';

const Footer = () => (
  <footer id="contact" className="bg-primary text-primary-foreground py-16 md:py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Logo & tagline */}
        <div>
          <img src={logo} alt="Shah Agro Limited" className="h-12 w-auto mb-4" />
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
            Premium jute products from the heart of Bangladesh, exported worldwide with trust and tradition.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-primary-foreground/60 text-sm">
            <p>Shah Agro Limited</p>
            <p>Dhaka, Bangladesh</p>
            <a href="mailto:info@shahagro.com" className="hover:text-accent transition-colors block">
              info@shahagro.com
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-4">Navigate</h4>
          <div className="space-y-2">
            {[
              ['process', 'Our Process'],
              ['products', 'Products'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-primary-foreground/60 hover:text-accent transition-colors text-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-primary-foreground/40 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Shah Agro Limited. All rights reserved.
        </p>
        <p className="text-primary-foreground/40 text-xs tracking-widest uppercase">
          🇧🇩 Bangladesh
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
