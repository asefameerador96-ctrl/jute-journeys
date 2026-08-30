import DetailPage from '@/components/DetailPage';
import SB5 from '@/assets/SB5.webp';
import SB1 from '@/assets/SB1.webp';

const SackingBag = () => (
  <DetailPage
    category="products"
    step="Sacking Bags"
    headline="Heavy-Duty Jute Fabric Designed for Strength, Reliability & Versatility"
    description="Jute sacking bags and cloth are strong, durable products made from natural jute fibers. It is a heavy-duty woven fabric primarily used for packaging agricultural commodities such as rice, wheat, coffee, cocoa, and potatoes. From this cloth, jute sacking bags are manufactured to provide reliable and breathable packaging for bulk goods. Known for their high strength, biodegradability, and eco-friendly nature, jute sacking products are widely used in global trade as a sustainable alternative to synthetic packaging materials."
    images={[SB5, SB1]}
    specifications={{
      productionRange: {
        title: 'Production Capabilities',
        items: [
          {
            label: 'Sacking Bags',
            range: '600 GM to 1250 GM',
            note: "Fully customized to customer's needs",
          },
          {
            label: 'Jute Cloth',
            range: '8 count to 10 count',
          },
        ],
      },
    }}
  />
);

export default SackingBag;
