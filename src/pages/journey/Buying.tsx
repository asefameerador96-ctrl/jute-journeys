import DetailPage from '@/components/DetailPage';
import B1 from '@/assets/B1.png';
import B2 from '@/assets/B2.png';

const Buying = () => (
  <DetailPage
    category="journey"
    step="Buying & Grading"
    headline="Rigorous Sourcing for Consistent Premium Quality"
    description="We source raw jute through a rigorous selection process, evaluating fiber length, strength, color, and cleanliness. Only the finest grades are procured, ensuring consistency and reliability for downstream processing."
    images={[B1, B2]}
  />
);

export default Buying;
