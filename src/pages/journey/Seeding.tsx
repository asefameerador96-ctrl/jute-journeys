import DetailPage from '@/components/DetailPage';
import S4 from '@/assets/S4.png';
import S3 from '@/assets/S3.png';

const Seeding = () => (
  <DetailPage
    category="journey"
    step="Seeding"
    headline="Precision Seeding for Stronger, Finer Jute Fibers"
    description="We begin with carefully selected high-grade jute seeds and optimal soil preparation to ensure healthy crop growth. Controlled farming practices, proper spacing, and timely sowing help produce long, uniform fibers — the foundation of premium-quality jute."
    images={[S4, S3]}
  />
);

export default Seeding;
