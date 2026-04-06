import DetailPage from '@/components/DetailPage';
// Images C4 and C2 will be uploaded later
const placeholder = '/placeholder.svg';

const CuringRetting = () => (
  <DetailPage
    category="journey"
    step="Curing & Retting"
    headline="Controlled Retting for Superior Fiber Finish"
    description="The harvested jute is submerged in clean water under carefully monitored conditions. This controlled retting process ensures uniform fiber separation, preserving softness, strength, and natural golden color — critical for high-grade output."
    images={[placeholder, placeholder]}
  />
);

export default CuringRetting;
