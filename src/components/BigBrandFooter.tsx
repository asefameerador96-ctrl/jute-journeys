import wordmarkDark from '@/assets/shah-agro-wordmark-dark.png';
import wordmarkLight from '@/assets/shah-agro-wordmark-light.png';

const BigBrandFooter = () => (
  <div className="py-6 md:py-10 bg-background overflow-hidden">
    <div className="flex justify-center items-center px-4">
      {/* Light mode: dark olive wordmark on cream bg */}
      <img
        src={wordmarkDark}
        alt="Shah Agro"
        className="block dark:hidden select-none w-[88vw] md:w-[70vw] lg:w-[60vw] max-w-[1000px] h-auto"
        draggable={false}
      />
      {/* Dark mode: cream wordmark on dark bg */}
      <img
        src={wordmarkLight}
        alt="Shah Agro"
        className="hidden dark:block select-none w-[88vw] md:w-[70vw] lg:w-[60vw] max-w-[1000px] h-auto"
        draggable={false}
      />
    </div>
  </div>
);

export default BigBrandFooter;
