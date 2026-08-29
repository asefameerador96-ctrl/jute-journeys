import DetailPage from '@/components/DetailPage';
import C4 from '@/assets/C4.webp';
import C2 from '@/assets/C2.webp';

const CuringRetting = () => (
  <DetailPage
    category="journey"
    step="Curing & Retting"
    headline="Controlled Retting for Superior Fiber Finish"
    description="The harvested jute is submerged in clean water under carefully monitored conditions. This controlled retting process ensures uniform fiber separation, preserving softness, strength, and natural golden color — critical for high-grade output."
    images={[C4, C2]}
  />
);

export default CuringRetting;
