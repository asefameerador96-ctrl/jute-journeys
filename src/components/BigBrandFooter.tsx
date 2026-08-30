import wordmarkDark from '@/assets/shah-agro-wordmark-dark.webp';
import wordmarkLight from '@/assets/shah-agro-wordmark-light.webp';

const BigBrandFooter = () => (
  <div className="py-6 md:py-10 bg-background overflow-hidden">
    <div className="flex justify-center items-center px-4">
      {/* Wrapper clips the PNG's vertical whitespace so the card height
          matches the original text-based wordmark. Source PNGs are 1000x1000
          with the actual 'SHAH AGRO' glyphs occupying the central ~15%
          vertical band — aspect-ratio 6:1 trims the empty space cleanly. */}
      <div
        className="w-[88vw] md:w-[70vw] lg:w-[60vw] max-w-[1000px] overflow-hidden"
        style={{ aspectRatio: '6 / 1' }}
      >
        {/* Light mode: dark olive wordmark on cream bg */}
        <img
          src={wordmarkDark}
          alt="Shah Agro"
          className="block dark:hidden w-full h-full object-cover object-center select-none"
          draggable={false}
        />
        {/* Dark mode: cream wordmark on dark bg */}
        <img
          src={wordmarkLight}
          alt="Shah Agro"
          className="hidden dark:block w-full h-full object-cover object-center select-none"
          draggable={false}
        />
      </div>
    </div>
  </div>
);

export default BigBrandFooter;
