import HeroBanner from '@/components/HeroBanner';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Products() {
  const { t } = useLanguage();
  const ref = useIntersectionObserver();

  const naturalProducts = products.filter(
    (p) => p.category === 'the' || p.category === 'superfood' || p.category === 'bien-etre'
  );

  return (
    <div>
      <HeroBanner
        title={t('nav.products')}
        subtitle={t('shop.subtitle')}
        bgColor="bg-[#2E8B57]"
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: t('nav.products'), path: '/produits-naturels' },
        ]}
      />

      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="max-w-[1280px] mx-auto">
          <div className="stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {naturalProducts.map((product) => (
              <div key={product.id} className="stagger-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
