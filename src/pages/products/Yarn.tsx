import DetailPage from '@/components/DetailPage';
import Y6 from '@/assets/Y6.png';
import Y2 from '@/assets/Y2.png';

const Yarn = () => (
  <DetailPage
    category="products"
    step="Jute Yarn"
    headline="High-Quality Jute Yarn Engineered for Durability & Consistency"
    description="Jute Yarn is a natural fiber yarn produced by spinning processed jute slivers into strong, coarse threads. It is widely used in the manufacture of jute bags, ropes, carpets, twines, and various eco-friendly textiles. Known for its strength, durability, and biodegradability, it offers an excellent sustainable material solution for diverse industrial and commercial applications."
    images={[Y6, Y2]}
  />
);

export default Yarn;
