import { useRef, useEffect, useState, useMemo } from 'react';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  staggerDelay?: number; // ms per character
  threshold?: number;
}

const ScrollTextReveal = ({
  text,
  className = '',
  as: Tag = 'span',
  staggerDelay = 30,
  threshold = 0.3,
}: ScrollTextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const letters = useMemo(() => {
    const chars: { char: string; index: number }[] = [];
    let idx = 0;
    for (const char of text) {
      chars.push({ char, index: idx });
      if (char !== ' ') idx++;
    }
    return chars;
  }, [text]);

  return (
    <div ref={ref} className="inline-block">
      {/* @ts-ignore */}
      <Tag className={className} style={{ display: 'inline' }}>
        {letters.map((l, i) =>
          l.char === ' ' ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${l.index * staggerDelay}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${l.index * staggerDelay}ms`,
              }}
            >
              {l.char}
            </span>
          )
        )}
      </Tag>
    </div>
  );
};

export default ScrollTextReveal;
