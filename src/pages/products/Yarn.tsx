import DetailPage from '@/components/DetailPage';
import Y6 from '@/assets/Y6.png';
import Y2 from '@/assets/Y2.png';

const Yarn = () => (
  <DetailPage
    category="products"
    step="Jute Yarn"
    headline="High-Quality Jute Yarn Engineered for Durability & Consistency"
    description="Jute Yarn is a natural fiber yarn produced by spinning processed jute slivers into strong, coarse threads. It is widely used in the manufacture of jute bags, ropes, carpets, twines, and various eco-friendly textiles. Known for its strength, durability, and biodegradability, it is a sustainable material widely used in packaging and industrial applications."
    images={[Y6, Y2]}
    specifications={{
      quality: {
        items: [
          'CRP / CRX / CRT / CRM / CB',
          'CRP Hessian / Sacking',
          'Wilton / Axminister',
          'Mining Fuse Yarn',
          'Tatami Yarn',
          'Cable Yarn',
          'Espadrille Yarn',
          'Rope Making Yarn',
          'Various Horticulture Yarn',
        ],
      },
      specialty: [
        'Mini Spool',
        'Coreless',
        'Hangs',
        'Scanned',
        'Spliced Joints',
        'Staggered',
      ],
      yarnCountPly: {
        'CRP / CRX': '6Lbs to 100Lbs / Single Ply and multi-Ply',
        'CRT': '6Lbs to 100Lbs / Single Ply and multi-Ply',
        'CRM': '8Lbs to 100Lbs / Single Ply and multi-Ply',
        'CB': '8Lbs to 100Lbs / Single Ply and multi-Ply',
        'Hessian': '10Lbs to 100Lbs / Single Ply and multi-Ply',
        'Sacking': '13Lbs to 100Lbs / Single Ply and multi-Ply',
      },
    }}
  />
);

export default Yarn;
