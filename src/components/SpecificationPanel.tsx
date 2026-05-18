import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SpecificationPanelProps {
  title?: string;
  specifications: {
    quality?: { items: string[] };
    specialty?: string[];
    yarnCountPly?: Record<string, string>;
  };
}

const SpecificationPanel = ({ title = 'Specifications', specifications }: SpecificationPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 text-primary hover:text-accent transition-colors duration-300 mb-6"
      >
        <h3 className="font-['Monument_Valley'] text-xl md:text-2xl font-bold">
          {isExpanded ? 'Hide' : 'See'} {title}
        </h3>
        <ChevronDown
          className="w-5 h-5 transition-transform duration-300"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {isExpanded && (
        <div className="space-y-8 bg-background/50 rounded-lg p-6 md:p-8 border border-accent/20">
          {/* Quality Section */}
          {specifications.quality && (
            <div>
              <h4 className="font-['Monument_Valley'] text-lg md:text-xl font-bold text-primary mb-4">
                Quality
              </h4>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                {specifications.quality.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 leading-relaxed">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specialty Section */}
          {specifications.specialty && (
            <div>
              <h4 className="font-['Monument_Valley'] text-lg md:text-xl font-bold text-primary mb-4">
                Specialty
              </h4>
              <div className="flex flex-wrap gap-2">
                {specifications.specialty.map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm md:text-base text-primary font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Yarn Count & PLY Section */}
          {specifications.yarnCountPly && (
            <div>
              <h4 className="font-['Monument_Valley'] text-lg md:text-xl font-bold text-primary mb-4">
                Yarn Count & PLY
              </h4>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground">
                {Object.entries(specifications.yarnCountPly).map(([type, range]) => (
                  <div key={type} className="flex justify-between md:flex-row flex-col gap-2 border-b border-accent/20 pb-3 last:border-b-0">
                    <span className="font-semibold text-primary">{type}</span>
                    <span className="text-muted-foreground">{range}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecificationPanel;
