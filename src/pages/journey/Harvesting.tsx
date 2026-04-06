import DetailPage from '@/components/DetailPage';
import H4 from '@/assets/H4.png';
import H2 from '@/assets/H2.png';

const Harvesting = () => (
  <DetailPage
    category="journey"
    step="Harvesting"
    headline="Expert Harvesting to Preserve Strength and Purity"
    description="Jute is harvested at the ideal maturity stage to preserve fiber strength, length, and color. Skilled farmers ensure clean cutting and proper bundling, preventing damage and maintaining the natural integrity of the fibers."
    images={[H4, H2]}
  />
);

export default Harvesting;
