import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const ref = useIntersectionObserver();
  const featured = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section id="featured" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto" ref={ref}>
        <div className="text-center mb-12 section-hidden">
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-3">
            {t('featured.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {featured.map((product) => (
            <div key={product.id} className="stagger-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 section-hidden">
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#2E8B57] text-[#2E8B57] font-semibold rounded-full hover:bg-[#2E8B57] hover:text-white transition-all text-sm"
          >
            {t('featured.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
