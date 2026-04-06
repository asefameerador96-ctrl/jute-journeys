import { useState, useCallback, useMemo } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO 3166-1 numeric codes mapped to export countries
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
  border: '#D5D0C8',
  land: '#E8E2DA',
  cardBg: '#809055',
  cardText: '#F3EDE7',
  water: '#F3EDE7',
};

const DEFAULT_INFO = { name: 'Bangladesh', item: 'Origin Country' };

const InfoCard = ({ name, item, isDefault }: { name: string; item: string; isDefault: boolean }) => (
  <div
    className="absolute top-8 left-8 z-20 transition-all duration-500 ease-out"
    style={{
      opacity: 1,
      transform: 'translateY(0)',
    }}
  >
    <div
      className="px-8 py-7 min-w-[220px]"
      style={{
        backgroundColor: COLORS.cardBg,
        transition: 'background-color 0.4s ease',
      }}
    >
      <p
        className="text-[11px] tracking-[0.3em] uppercase mb-1 font-medium"
        style={{ color: `${COLORS.cardText}99` }}
      >
        {isDefault ? 'Origin' : 'Export Destination'}
      </p>
      <h3
        className="font-['Playfair_Display'] text-2xl md:text-3xl uppercase tracking-wide font-semibold leading-tight"
        style={{ color: COLORS.cardText }}
      >
        {name}
      </h3>
      <div className="w-10 h-px my-3" style={{ backgroundColor: `${COLORS.cardText}40` }} />
      <p
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: `${COLORS.cardText}BB` }}
      >
        {item}
      </p>
    </div>
  </div>
);

const GlobalReach = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeCountry, setActiveCountry] = useState<{ name: string; item: string } | null>(null);

  const info = activeCountry || DEFAULT_INFO;
  const isDefault = !activeCountry;

  const handleMouseEnter = useCallback((geoId: string) => {
    const country = EXPORT_COUNTRIES[geoId];
    if (country) setActiveCountry(country);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveCountry(null);
  }, []);

  const exportIds = useMemo(() => new Set(Object.keys(EXPORT_COUNTRIES)), []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-40 pb-6">
        {/* Heading */}
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
        className="relative w-full"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}
      >
        <InfoCard name={info.name} item={info.item} isDefault={isDefault} />

        <div className="w-full" style={{ aspectRatio: '2 / 1', minHeight: '400px', maxHeight: '700px' }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [30, 20],
            }}
            width={900}
            height={450}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId = geo.id;
                  const isExport = exportIds.has(geoId);
                  const isActive = activeCountry?.name === EXPORT_COUNTRIES[geoId]?.name;

                  let fillColor = COLORS.land;
                  if (isActive) fillColor = COLORS.activeOlive;
                  else if (isExport) fillColor = COLORS.mutedOlive;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => handleMouseEnter(geoId)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => {
                        // Mobile tap support
                        const country = EXPORT_COUNTRIES[geoId];
                        if (country) {
                          setActiveCountry(
                            activeCountry?.name === country.name ? null : country
                          );
                        }
                      }}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: COLORS.border,
                          strokeWidth: 0.4,
                          outline: 'none',
                          transition: 'fill 0.3s ease',
                          cursor: isExport ? 'pointer' : 'default',
                        },
                        hover: {
                          fill: isExport ? COLORS.activeOlive : COLORS.land,
                          stroke: COLORS.border,
                          strokeWidth: isExport ? 0.6 : 0.4,
                          outline: 'none',
                          cursor: isExport ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: isExport ? COLORS.activeOlive : COLORS.land,
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

      {/* Country list */}
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
