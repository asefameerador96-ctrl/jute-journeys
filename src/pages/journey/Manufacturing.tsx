import DetailPage from '@/components/DetailPage';
import M2 from '@/assets/M2.png';
import M6 from '@/assets/M6.png';

const Manufacturing = () => (
  <DetailPage
    category="journey"
    step="Manufacturing"
    headline="Advanced Processing for High-Performance Jute Products"
    description="Our modern manufacturing facilities transform raw jute into yarn, sliver, and fabric using precision machinery. Each stage is monitored with strict quality checks to ensure uniformity, durability, and superior finish across all products."
    images={[M2, M6]}
  />
);

export default Manufacturing;
