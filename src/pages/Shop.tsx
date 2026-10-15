import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Shop() {
  const { lang, t } = useLanguage();
  const ref = useIntersectionObserver();
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.descriptionEn.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Sort
    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [search, selectedCategories, sortBy]);

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((c) => c !== catId)
        : [...prev, catId]
    );
  };

  return (
    <div>
      <HeroBanner
        title={t('shop.title')}
        subtitle={t('shop.subtitle')}
        bgColor="bg-premium-gradient"
        breadcrumbs={[{ label: t('nav.home'), path: '/' }, { label: t('nav.shop'), path: '/boutique' }]}
      />

      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3 text-sm uppercase tracking-wider">
                    {t('shop.search')}
                  </h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t('shop.search')}
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1B4332] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:text-[#F8F6F0]"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3 text-sm uppercase tracking-wider">
                    {t('shop.categories')}
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-[#2E8B57] transition-colors">
                          {lang === 'fr' ? cat.name : cat.nameEn}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3 text-sm uppercase tracking-wider">
                    {t('shop.sort')}
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1B4332] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:text-[#F8F6F0]"
                  >
                    <option value="popularity">{t('shop.sort.popularity')}</option>
                    <option value="priceAsc">{t('shop.sort.priceAsc')}</option>
                    <option value="priceDesc">{t('shop.sort.priceDesc')}</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Mobile filters button */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1B4332] border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-[#1A1A1A] dark:text-[#F8F6F0]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtres
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {filteredProducts.length} produits
              </span>
            </div>

            {/* Mobile filters panel */}
            {mobileFiltersOpen && (
              <div className="lg:hidden bg-white dark:bg-[#1B4332] rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('shop.search')}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:text-[#F8F6F0] dark:bg-[#1A1A1A]"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        selectedCategories.includes(cat.id)
                          ? 'bg-[#2E8B57] text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {lang === 'fr' ? cat.name : cat.nameEn}
                    </button>
                  ))}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-[#F8F6F0] dark:bg-[#1A1A1A]"
                >
                  <option value="popularity">{t('shop.sort.popularity')}</option>
                  <option value="priceAsc">{t('shop.sort.priceAsc')}</option>
                  <option value="priceDesc">{t('shop.sort.priceDesc')}</option>
                </select>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 stagger-children">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="stagger-item">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Aucun produit ne correspond à votre recherche.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
