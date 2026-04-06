import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const EXPORT_COUNTRIES: Record<string, { name: string; item: string }> = {
  '056': { name: 'Belgium', item: 'Raw Jute' },
  '276': { name: 'Germany', item: 'Jute Yarn' },
  '364': { name: 'Iran', item: 'Raw Jute' },
  '792': { name: 'Turkey', item: 'Jute Products' },
  '860': { name: 'Uzbekistan', item: 'Raw Jute' },
  '360': { name: 'Indonesia', item: 'Jute Fiber' },
  '818': { name: 'Egypt', item: 'Jute Goods' },
  '400': { name: 'Jordan', item: 'Jute Products' },
  '682': { name: 'Saudi Arabia', item: 'Jute Bags' },
  '384': { name: 'Ivory Coast', item: 'Raw Jute' },
  '729': { name: 'Sudan', item: 'Jute Products' },
  '504': { name: 'Morocco', item: 'Jute Yarn' },
  '156': { name: 'China', item: 'Raw Jute' },
  '586': { name: 'Pakistan', item: 'Jute Fiber' },
  '356': { name: 'India', item: 'Raw Jute' },
  '524': { name: 'Nepal', item: 'Jute Products' },
};

const COLORS = {
  bg: '#F3EDE7',
  activeOlive: '#809055',
  mutedOlive: '#B7B8A2',
  oliveBorder: '#B7B8A2',
  land: '#F3EDE7',
  cardBg: '#809055',
  cardText: '#F3EDE7',
};

const GlobalReach = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [activeCountry, setActiveCountry] = useState<{ name: string; item: string } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = useCallback((geoId: string) => {
    const country = EXPORT_COUNTRIES[geoId];
    if (country) setActiveCountry(country);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveCountry(null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mapWrapperRef.current) return;
    const rect = mapWrapperRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const exportIds = useMemo(() => new Set(Object.keys(EXPORT_COUNTRIES)), []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-40 pb-6">
        <div className="text-center mb-12 md:mb-20">
          <span
            className="text-xs tracking-[0.3em] uppercase font-medium inline-block"
            style={{
              color: COLORS.activeOlive,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Exporting Worldwide
          </span>
          <div className="overflow-hidden mt-4">
            <h2
              className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold"
              style={{
                color: '#2F3E2C',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              Global Reach
            </h2>
          </div>
          <div
            className="mt-6 mx-auto h-px transition-all duration-1000 ease-out"
            style={{
              backgroundColor: `${COLORS.activeOlive}60`,
              width: isVisible ? '80px' : '0px',
              transitionDelay: '0.4s',
            }}
          />
        </div>
      </div>

      {/* Map area */}
      <div
        ref={mapWrapperRef}
        className="relative w-full"
        onMouseMove={handleMouseMove}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}
      >
        {/* Floating tooltip near cursor */}
        {activeCountry && (
          <div
            className="absolute z-30 pointer-events-none"
            style={{
              left: tooltipPos.x + 16,
              top: tooltipPos.y - 60,
              transition: 'left 0.08s ease-out, top 0.08s ease-out',
            }}
          >
            <div className="px-6 py-4 shadow-lg" style={{ backgroundColor: COLORS.cardBg }}>
              <h3
                className="font-['Playfair_Display'] text-lg uppercase tracking-wide font-semibold"
                style={{ color: COLORS.cardText }}
              >
                {activeCountry.name}
              </h3>
              <p
                className="text-[10px] tracking-[0.2em] uppercase mt-1"
                style={{ color: `${COLORS.cardText}BB` }}
              >
                {activeCountry.item}
              </p>
            </div>
          </div>
        )}

        <div className="w-full" style={{ height: 'clamp(400px, 50vw, 700px)' }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140, center: [30, 20] }}
            width={900}
            height={450}
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId = String(geo.id);
                  const isExport = exportIds.has(geoId);
                  const isActive = activeCountry?.name === EXPORT_COUNTRIES[geoId]?.name;

                  const fillColor = isActive
                    ? COLORS.activeOlive
                    : isExport
                      ? COLORS.mutedOlive
                      : COLORS.bg;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke={COLORS.oliveBorder}
                      strokeWidth={0.4}
                      onMouseEnter={() => handleMouseEnter(geoId)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => {
                        const country = EXPORT_COUNTRIES[geoId];
                        if (country) {
                          setActiveCountry(
                            activeCountry?.name === country.name ? null : country
                          );
                        }
                      }}
                      style={{
                        default: { outline: 'none', cursor: isExport ? 'pointer' : 'default' },
                        hover: {
                          fill: isExport ? COLORS.activeOlive : COLORS.bg,
                          outline: 'none',
                          cursor: isExport ? 'pointer' : 'default',
                        },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>

      {/* Country tags */}
      <div className="max-w-7xl mx-auto px-6 pb-28 md:pb-40">
        <div
          className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          {Object.entries(EXPORT_COUNTRIES).map(([id, country], i) => {
            const isActive = activeCountry?.name === country.name;
            return (
              <button
                key={id}
                className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all duration-300"
                style={{
                  backgroundColor: isActive ? COLORS.activeOlive : 'transparent',
                  color: isActive ? COLORS.cardText : COLORS.mutedOlive,
                  borderColor: isActive ? COLORS.activeOlive : COLORS.mutedOlive,
                  transform: isVisible
                    ? isActive ? 'translateY(0) scale(1.05)' : 'translateY(0) scale(1)'
                    : 'translateY(15px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.03}s`,
                }}
                onMouseEnter={() => setActiveCountry(country)}
                onMouseLeave={() => setActiveCountry(null)}
              >
                {country.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
