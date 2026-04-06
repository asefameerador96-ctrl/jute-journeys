import DetailPage from '@/components/DetailPage';
import SB5 from '@/assets/SB5.png';
import SB1 from '@/assets/SB1.png';

const SackingBag = () => (
  <DetailPage
    category="products"
    step="Sacking Bags"
    headline="Heavy-Duty Jute Fabric Designed for Strength, Reliability & Versatility"
    description="Jute sacking bags and cloth are strong, durable products made from natural jute fibers. It is a heavy-duty woven fabric primarily used for packaging agricultural commodities such as rice, wheat, coffee, cocoa, and potatoes. From this cloth, jute sacking bags are manufactured for reliable bulk packaging, offering breathability, biodegradability, and dependable load-bearing performance."
    images={[SB5, SB1]}
  />
);

export default SackingBag;
