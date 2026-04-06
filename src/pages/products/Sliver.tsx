import DetailPage from '@/components/DetailPage';
import SLV3 from '@/assets/SLV3.png';
import SLV6 from '@/assets/SLV6.png';

const Sliver = () => (
  <DetailPage
    category="products"
    step="Jute Sliver"
    headline="Precisely Processed Jute Sliver for Superior Spinning Performance"
    description="Jute sliver goods are semi-processed materials made from natural jute fibers that are carded and drawn into long, continuous strands called slivers. These slivers are used as the main raw material for spinning jute yarn and producing various jute products. Valued for their uniformity, cleanliness, and process-ready quality, they are essential for high-performance downstream manufacturing."
    images={[SLV3, SLV6]}
  />
);

export default Sliver;
