import DetailPage from '@/components/DetailPage';
import EX1 from '@/assets/EX1.png';
import Pack3 from '@/assets/Pack3.png';

const PackingExporting = () => (
  <DetailPage
    category="journey"
    step="Packing & Export"
    headline="Secure Packaging & Reliable Global Export Solutions"
    description="Finished jute products are carefully packed using industry-standard methods to protect quality during transit. Efficient logistics and export handling ensure timely delivery, maintaining product integrity from our facility to global destinations."
    images={[EX1, Pack3]}
  />
);

export default PackingExporting;
