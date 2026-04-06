import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from 'react-simple-maps';
import bangladeshFlagMap from '@/assets/bangladesh-flag-map.png';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const EXPORT_LIST = [
  { name: 'Belgium', item: 'Raw Jute' },
  { name: 'Germany', item: 'Jute Yarn' },
  { name: 'Iran', item: 'Raw Jute' },
  { name: 'Turkey', item: 'Jute Products' },
  { name: 'Uzbekistan', item: 'Raw Jute' },
  { name: 'Indonesia', item: 'Jute Fiber' },
  { name: 'Egypt', item: 'Jute Goods' },
  { name: 'Jordan', item: 'Jute Products' },
  { name: 'Saudi Arabia', item: 'Jute Bags' },
  { name: 'Ivory Coast', item: 'Raw Jute', aliases: ["Côte d'Ivoire"] },
  { name: 'Sudan', item: 'Jute Products' },
  { name: 'Morocco', item: 'Jute Yarn' },
  { name: 'China', item: 'Raw Jute' },
  { name: 'Pakistan', item: 'Jute Fiber' },
  { name: 'India', item: 'Raw Jute' },
  { name: 'Nepal', item: 'Jute Products' },
] as const;

type ExportCountry = { name: string; item: string };

const EXPORT_BY_NAME: Record<string, ExportCountry> = {};
EXPORT_LIST.forEach((c) => {
  EXPORT_BY_NAME[c.name] = c;
  if ('aliases' in c && (c as any).aliases) {
    (c as any).aliases.forEach((a: string) => { EXPORT_BY_NAME[a] = c; });
  }
});

const COLORS = {
  bg: '#F3EDE7',
  activeOlive: '#809055',
  mutedOlive: '#B7B8A2',
  oliveBorder: '#B7B8A2',
  cardBg: '#809055',
  cardText: '#F3EDE7',
};

function getGeoFill(geoName: string, activeCountry: ExportCountry | null): string {
  const exportData = EXPORT_BY_NAME[geoName];
  if (!exportData) return COLORS.bg;
  if (activeCountry?.name === exportData.name) return COLORS.activeOlive;
  return COLORS.mutedOlive;
}

function getGeoHoverFill(geoName: string): string {
  const exportData = EXPORT_BY_NAME[geoName];
  if (!exportData) return COLORS.bg;
  return COLORS.activeOlive;
}

const GlobalReach = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [activeCountry, setActiveCountry] = useState<ExportCountry | null>(null);
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mapWrapperRef.current) return;
    const rect = mapWrapperRef.current.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

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
            From Bangladesh to World
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

      {/* Map */}
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
                  const geoName: string = geo.properties?.name ?? '';
                  const isExport = geoName in EXPORT_BY_NAME;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getGeoFill(geoName, activeCountry)}
                      stroke={COLORS.oliveBorder}
                      strokeWidth={0.4}
                      onMouseEnter={() => {
                        const ed = EXPORT_BY_NAME[geoName];
                        if (ed) setActiveCountry(ed);
                      }}
                      onMouseLeave={() => setActiveCountry(null)}
                      onClick={() => {
                        const ed = EXPORT_BY_NAME[geoName];
                        if (ed) setActiveCountry(activeCountry?.name === ed.name ? null : ed);
                      }}
                      style={{
                        default: {
                          outline: 'none',
                          cursor: isExport ? 'pointer' : 'default',
                        },
                        hover: {
                          fill: getGeoHoverFill(geoName),
                          outline: 'none',
                          cursor: isExport ? 'pointer' : 'default',
                        },
                        pressed: {
                          outline: 'none',
                        },
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
          {EXPORT_LIST.map((country, i) => {
            const isActive = activeCountry?.name === country.name;
            return (
              <button
                key={country.name}
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
                onMouseEnter={() => setActiveCountry(country as ExportCountry)}
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
