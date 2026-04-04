/// <reference types="google.maps" />
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google?: typeof google;
  }
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyCASgr43b8xNNMjC7JCY4EFkv5-RATGEIk';

const countries = [
  { name: 'Belgium', lat: 50.85, lng: 4.35 },
  { name: 'Germany', lat: 51.16, lng: 10.45 },
  { name: 'Iran', lat: 32.43, lng: 53.69 },
  { name: 'Turkey', lat: 38.96, lng: 35.24 },
  { name: 'Uzbekistan', lat: 41.38, lng: 64.59 },
  { name: 'Indonesia', lat: -0.79, lng: 113.92 },
  { name: 'Egypt', lat: 26.82, lng: 30.80 },
  { name: 'Jordan', lat: 30.59, lng: 36.24 },
  { name: 'Saudi Arabia', lat: 23.89, lng: 45.08 },
  { name: 'Ivory Coast', lat: 7.54, lng: -5.55 },
  { name: 'Sudan', lat: 12.86, lng: 30.22 },
  { name: 'Morocco', lat: 31.79, lng: -7.09 },
  { name: 'China', lat: 35.86, lng: 104.20 },
  { name: 'Pakistan', lat: 30.38, lng: 69.35 },
  { name: 'India', lat: 20.59, lng: 78.96 },
  { name: 'Nepal', lat: 28.39, lng: 84.12 },
];

// Bangladesh origin
const ORIGIN = { lat: 23.68, lng: 90.36 };

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#1a2e1a' }] },
  { elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f1f0f' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#1a2e1a' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#3a5a3a' }, { weight: 0.5 }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#5a7a5a' }, { visibility: 'on' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
];

let mapsLoadPromise: Promise<void> | null = null;

function loadGoogleMaps(): Promise<void> {
  if (mapsLoadPromise) return mapsLoadPromise;
  if (window.google?.maps?.Map) return Promise.resolve();

  mapsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });

  return mapsLoadPromise;
}

const GlobalReach = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.1 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map());
  const linesRef = useRef<google.maps.Polyline[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Initialize map when visible
  useEffect(() => {
    if (!mapVisible || mapInstanceRef.current || !mapContainerRef.current) return;

    let cancelled = false;

    loadGoogleMaps().then(() => {
      if (cancelled || !mapContainerRef.current) return;

      const map = new google.maps.Map(mapContainerRef.current, {
        center: { lat: 25, lng: 50 },
        zoom: 2.5,
        minZoom: 2,
        maxZoom: 6,
        mapId: 'DEMO_MAP_ID',
        gestureHandling: 'cooperative',
        disableDefaultUI: true,
        zoomControl: true,
        styles: mapStyles,
        backgroundColor: '#0f1f0f',
      });

      mapInstanceRef.current = map;
      const infoWindow = new google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;

      // Draw connection lines from Bangladesh
      countries.forEach((country) => {
        const line = new google.maps.Polyline({
          path: [ORIGIN, { lat: country.lat, lng: country.lng }],
          geodesic: true,
          strokeColor: '#C9A96E',
          strokeOpacity: 0.25,
          strokeWeight: 1.5,
          map,
        });
        linesRef.current.push(line);

        // Custom marker
        const markerEl = document.createElement('div');
        markerEl.style.cssText = `
          width: 14px; height: 14px; background: #C9A96E; border-radius: 50%;
          border: 2px solid #fff; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 8px rgba(201,169,110,0.5);
        `;

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: country.lat, lng: country.lng },
          title: country.name,
          content: markerEl,
        });

        markersRef.current.set(country.name, marker);

        const showInfo = () => {
          infoWindow.setContent(`
            <div style="font-family:'Playfair Display',serif;padding:4px 8px;">
              <strong style="font-size:14px;color:#2F3E2C;">${country.name.toUpperCase()}</strong>
              <p style="margin:4px 0 0;font-size:12px;color:#666;">Jute Export Destination</p>
            </div>
          `);
          infoWindow.open({ anchor: marker, map });
          markerEl.style.transform = 'scale(1.5)';
          markerEl.style.boxShadow = '0 0 16px rgba(201,169,110,0.9)';
        };

        const hideInfo = () => {
          infoWindow.close();
          markerEl.style.transform = 'scale(1)';
          markerEl.style.boxShadow = '0 0 8px rgba(201,169,110,0.5)';
        };

        markerEl.addEventListener('mouseenter', showInfo);
        markerEl.addEventListener('mouseleave', hideInfo);
        marker.addListener('gmp-click', showInfo);
      });

      // Origin marker (Bangladesh)
      const originEl = document.createElement('div');
      originEl.style.cssText = `
        width: 20px; height: 20px; background: #C9A96E; border-radius: 50%;
        border: 3px solid #fff; box-shadow: 0 0 20px rgba(201,169,110,0.8);
        animation: pulse-origin 2s infinite;
      `;

      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: ORIGIN,
        title: 'Bangladesh (Origin)',
        content: originEl,
      });

      setMapLoaded(true);
    });

    return () => { cancelled = true; };
  }, [mapVisible]);

  // Sync hover state from country tags to map markers
  useEffect(() => {
    if (!mapInstanceRef.current || !infoWindowRef.current) return;

    // Reset all
    linesRef.current.forEach((line) => {
      line.setOptions({ strokeOpacity: 0.25, strokeWeight: 1.5 });
    });
    markersRef.current.forEach((marker) => {
      const el = marker.content as HTMLElement;
      if (el) {
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 0 8px rgba(201,169,110,0.5)';
      }
    });

    if (hoveredCountry) {
      const idx = countries.findIndex(c => c.name === hoveredCountry);
      if (idx >= 0 && linesRef.current[idx]) {
        linesRef.current[idx].setOptions({ strokeOpacity: 0.9, strokeWeight: 3 });
      }
      const marker = markersRef.current.get(hoveredCountry);
      if (marker) {
        const el = marker.content as HTMLElement;
        if (el) {
          el.style.transform = 'scale(1.5)';
          el.style.boxShadow = '0 0 16px rgba(201,169,110,0.9)';
        }
        infoWindowRef.current.setContent(`
          <div style="font-family:'Playfair Display',serif;padding:4px 8px;">
            <strong style="font-size:14px;color:#2F3E2C;">${hoveredCountry.toUpperCase()}</strong>
            <p style="margin:4px 0 0;font-size:12px;color:#666;">Jute Export Destination</p>
          </div>
        `);
        infoWindowRef.current.open({ anchor: marker, map: mapInstanceRef.current });
      }
    } else {
      infoWindowRef.current.close();
    }
  }, [hoveredCountry]);

  return (
    <section className="py-28 md:py-40 bg-primary relative overflow-hidden">
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

        {/* Google Map */}
        <div
          ref={mapRef}
          className="relative max-w-6xl mx-auto"
          style={{
            opacity: mapVisible ? 1 : 0,
            transform: mapVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <div className="relative w-full rounded-lg overflow-hidden shadow-2xl border border-accent/10" style={{ height: '500px' }}>
            <div ref={mapContainerRef} className="w-full h-full" />
            {!mapLoaded && mapVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary">
                <div className="text-accent/60 text-sm tracking-widest uppercase animate-pulse">Loading Map...</div>
              </div>
            )}
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

      <style>{`
        @keyframes pulse-origin {
          0%, 100% { box-shadow: 0 0 20px rgba(201,169,110,0.8); }
          50% { box-shadow: 0 0 40px rgba(201,169,110,0.4), 0 0 60px rgba(201,169,110,0.2); }
        }
        .gm-style .gm-style-iw-c { border-radius: 4px !important; }
        .gm-style .gm-style-iw-d { overflow: hidden !important; }
      `}</style>
    </section>
  );
};

export default GlobalReach;
