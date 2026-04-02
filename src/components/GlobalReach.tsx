import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

const countries = [
  { name: 'Belgium', x: 49.5, y: 28 },
  { name: 'Germany', x: 51, y: 27 },
  { name: 'Iran', x: 60, y: 33 },
  { name: 'Turkey', x: 56, y: 31 },
  { name: 'Uzbekistan', x: 62, y: 28 },
  { name: 'Indonesia', x: 76, y: 52 },
  { name: 'Egypt', x: 53, y: 36 },
  { name: 'Jordan', x: 56, y: 34 },
  { name: 'Saudi Arabia', x: 58, y: 38 },
  { name: 'Ivory Coast', x: 44, y: 47 },
  { name: 'Sudan', x: 54, y: 42 },
  { name: 'Morocco', x: 44, y: 33 },
  { name: 'China', x: 74, y: 32 },
  { name: 'Pakistan', x: 64, y: 35 },
  { name: 'India', x: 67, y: 39 },
  { name: 'Nepal', x: 68, y: 35 },
];

const GlobalReach = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.1 });
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className="py-28 md:py-40 bg-primary relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24 overflow-hidden">
          <span
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium inline-block"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Exporting Worldwide
          </span>
          <div className="overflow-hidden mt-4">
            <h2
              className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-primary-foreground"
              style={{
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              Global Reach
            </h2>
          </div>
          <div
            className="mt-6 mx-auto h-px bg-accent/40 transition-all duration-1000 ease-out"
            style={{ width: headingVisible ? '80px' : '0px', transitionDelay: '0.4s' }}
          />
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="relative max-w-5xl mx-auto"
          style={{
            opacity: mapVisible ? 1 : 0,
            transform: mapVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {/* World map SVG outline */}
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <svg
              viewBox="0 0 100 50"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world map continents */}
              {/* North America */}
              <path d="M10,12 Q15,8 22,10 L25,14 Q26,18 24,22 L20,26 Q16,28 14,24 L12,20 Q8,16 10,12Z" fill="hsl(var(--primary-foreground))" opacity="0.08" />
              {/* South America */}
              <path d="M22,32 Q25,30 27,34 L28,40 Q27,46 24,48 L22,46 Q20,42 20,38 Q19,35 22,32Z" fill="hsl(var(--primary-foreground))" opacity="0.08" />
              {/* Europe */}
              <path d="M46,10 Q50,8 54,10 L55,14 Q54,18 52,20 L48,22 Q45,20 44,16 Q44,12 46,10Z" fill="hsl(var(--primary-foreground))" opacity="0.08" />
              {/* Africa */}
              <path d="M46,24 Q50,22 54,24 L56,30 Q58,36 56,42 L52,48 Q48,50 46,46 L44,38 Q43,30 46,24Z" fill="hsl(var(--primary-foreground))" opacity="0.08" />
              {/* Asia */}
              <path d="M56,8 Q65,6 76,10 L82,16 Q84,22 80,28 L74,34 Q68,38 62,36 L58,30 Q54,24 54,18 Q54,12 56,8Z" fill="hsl(var(--primary-foreground))" opacity="0.08" />
              {/* Australia */}
              <path d="M78,42 Q82,40 86,42 L88,46 Q86,50 82,50 L78,48 Q76,46 78,42Z" fill="hsl(var(--primary-foreground))" opacity="0.08" />

              {/* Connection lines from Bangladesh (approx 68, 37) */}
              {countries.map((country) => (
                <line
                  key={`line-${country.name}`}
                  x1="68"
                  y1="37"
                  x2={country.x}
                  y2={country.y}
                  stroke="hsl(var(--accent))"
                  strokeWidth="0.15"
                  opacity={hoveredCountry === country.name ? 0.8 : 0.15}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              ))}

              {/* Bangladesh origin dot */}
              <circle cx="68" cy="37" r="1" fill="hsl(var(--accent))" opacity="0.9" />
              <circle cx="68" cy="37" r="1.8" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.2" opacity="0.4">
                <animate attributeName="r" values="1.8;3;1.8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Country dots */}
              {countries.map((country) => (
                <g key={country.name}>
                  <circle
                    cx={country.x}
                    cy={country.y}
                    r={hoveredCountry === country.name ? 1.2 : 0.6}
                    fill="hsl(var(--accent))"
                    opacity={hoveredCountry === country.name ? 1 : 0.6}
                    style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredCountry(country.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                  {/* Hover circle */}
                  <circle
                    cx={country.x}
                    cy={country.y}
                    r="2.5"
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredCountry(country.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                </g>
              ))}
            </svg>

            {/* Hover tooltip */}
            {hoveredCountry && (() => {
              const c = countries.find(c => c.name === hoveredCountry);
              if (!c) return null;
              return (
                <div
                  className="absolute pointer-events-none z-20 bg-accent text-primary px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-sm shadow-lg"
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y * 2}%`,
                    transform: 'translate(-50%, -140%)',
                  }}
                >
                  {c.name}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Country tags */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto"
          style={{
            opacity: mapVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}
        >
          {countries.map((country, i) => (
            <button
              key={country.name}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-medium border transition-all duration-300 ${
                hoveredCountry === country.name
                  ? 'bg-accent text-primary border-accent scale-110'
                  : 'bg-transparent text-primary-foreground/60 border-primary-foreground/20 hover:border-accent hover:text-accent'
              }`}
              onMouseEnter={() => setHoveredCountry(country.name)}
              onMouseLeave={() => setHoveredCountry(null)}
              style={{
                opacity: mapVisible ? 1 : 0,
                transform: mapVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.04}s`,
              }}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
