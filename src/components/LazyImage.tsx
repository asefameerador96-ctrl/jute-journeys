import { useEffect, useRef, useState } from 'react';

/** The shape vite-imagetools returns for a "?...&as=picture" import. */
export interface ResponsiveImage {
  img: { src: string; w: number; h: number };
  sources: { avif?: string; webp?: string };
}

interface LazyImageProps {
  image: ResponsiveImage;
  alt: string;
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  /** Set on the hero and anything else above the fold; skips deferral entirely. */
  priority?: boolean;
  /** How far outside the viewport to start fetching. */
  rootMargin?: string;
}

/**
 * A responsive image that genuinely waits until it is near the viewport.
 *
 * native loading="lazy" does nothing useful for this site's layouts: the gallery is
 * a horizontal carousel, so every slide sits at the same vertical offset, and the
 * process panels are stacked in a sticky scroll container. The browser counts them
 * all as near the viewport and fetches all of them, which is why the homepage
 * pulled its entire 3.5 MB of images before the visitor scrolled at all.
 *
 * Gating on IntersectionObserver instead means only what is actually being
 * approached gets fetched — which is what makes it affordable to serve these at
 * high quality rather than compressing them to hide the problem.
 *
 * AVIF is offered first and WebP second, so browsers that support AVIF get a
 * noticeably better image, and the rest get exactly what they got before.
 */
export default function LazyImage({
  image,
  alt,
  sizes,
  className,
  style,
  priority = false,
  rootMargin = '600px',
}: LazyImageProps) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(priority);

  useEffect(() => {
    if (priority || visible) return;
    const el = ref.current;
    if (!el) return;

    // Without IntersectionObserver (very old browsers), load immediately rather
    // than leaving a permanently blank image.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, visible, rootMargin]);

  return (
    <picture>
      {visible && image.sources.avif && <source type="image/avif" srcSet={image.sources.avif} sizes={sizes} />}
      {visible && image.sources.webp && <source type="image/webp" srcSet={image.sources.webp} sizes={sizes} />}
      <img
        ref={ref}
        // width and height are always set so the box is reserved before the file
        // arrives and nothing shifts when it does.
        width={image.img.w}
        height={image.img.h}
        src={visible ? image.img.src : undefined}
        alt={alt}
        className={className}
        style={style}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
      />
    </picture>
  );
}
