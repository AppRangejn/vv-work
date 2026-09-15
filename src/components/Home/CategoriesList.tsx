import { Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import { categories } from '../../data/categories';

function CategoriesList() {
  const { lang, t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl py-10">
      <h2 className="mb-6 text-xl font-bold">{t.categoriesTitle}</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/partners/all?category=${cat.id}`}
            className="border p-4 hover:bg-zinc-50"
          >
            {cat[lang]}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesList;