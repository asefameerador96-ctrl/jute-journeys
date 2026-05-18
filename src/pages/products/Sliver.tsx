import DetailPage from '@/components/DetailPage';
import SLV3 from '@/assets/SLV3.png';
import SLV6 from '@/assets/SLV6.png';

const Sliver = () => (
  <DetailPage
    category="products"
    step="Jute Sliver"
    headline="Precisely Processed Jute Sliver for Superior Spinning Performance"
    description="Jute sliver goods are semi-processed materials made from natural jute fibers that are carded and drawn into long, continuous strands called sliver. These slivers are used as the main raw material for spinning jute yarn and producing various jute products. Valued for their strength, uniformity, and eco-friendly nature, jute slivers support the production of sustainable products such as ropes, carpets, and other industrial applications, with growing demand in global markets."
    images={[SLV3, SLV6]}
    specifications={{
      grades: ['BTD 1', 'BTD 2', 'MESTA', 'BTD 3', 'SMR', 'BTCA'],
    }}
  />
);

export default Sliver;
