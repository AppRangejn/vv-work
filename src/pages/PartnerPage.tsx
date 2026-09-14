import { useParams } from 'react-router-dom';

function PartnerPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="mx-auto max-w-6xl py-10">
        Вакансії: <span>{slug}</span>
      <p>
        Вакансії з пошуком і фільтрами
      </p>
    </div>
  );
}

export default PartnerPage;