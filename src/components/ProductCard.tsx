import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [selectedSize, setSelectedSize] = useState<'small' | 'large'>('small');
  const [isFav, setIsFav] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const price = selectedSize === 'small' ? product.price : (product.priceLarge || product.price * 2);
  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price,
      size: selectedSize,
      image: product.image,
      category: product.category,
    });
    addToast(
      lang === 'fr'
        ? `${product.name} ajouté au panier !`
        : `${product.nameEn} added to cart!`,
      'success'
    );
  };

  return (
    <div className="group bg-white dark:bg-[#1B4332] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-350 hover:-translate-y-1.5 border border-gray-100 dark:border-gray-800">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={lang === 'fr' ? product.name : product.nameEn}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}

        {/* Category tag */}
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#2E8B57] text-white text-[10px] sm:text-xs font-medium rounded-full">
          {lang === 'fr'
            ? product.category === 'jus' ? 'Jus Naturel'
            : product.category === 'the' ? 'Thé Naturel'
            : product.category === 'superfood' ? 'Superfood'
            : 'Bien-être'
            : product.category === 'jus' ? 'Natural Juice'
            : product.category === 'the' ? 'Natural Tea'
            : product.category === 'superfood' ? 'Superfood'
            : 'Wellness'}
        </span>

        {/* Favorite button */}
        <button
          onClick={() => setIsFav(!isFav)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 sm:w-9 h-8 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* New / Bestseller badges */}
        {product.isNew && (
          <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#FF8C00] text-white text-[10px] sm:text-xs font-bold rounded-full">
            NEW
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#F4B400] text-[#1A1A1A] text-[10px] sm:text-xs font-bold rounded-full">
            BEST
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] text-sm sm:text-base mb-1">
          {lang === 'fr' ? product.name : product.nameEn}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-[11px] sm:text-xs mb-2 line-clamp-2">
          {lang === 'fr' ? product.description : product.descriptionEn}
        </p>

        <StarRating rating={product.rating} size={14} />

        {/* Size selector for juices */}
        {product.priceLarge && (
          <div className="flex gap-2 mt-2 sm:mt-3 mb-2">
            {(['small', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-full border transition-colors ${
                  selectedSize === size
                    ? 'border-[#2E8B57] bg-[#2E8B57]/10 text-[#2E8B57]'
                    : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-[#2E8B57]'
                }`}
              >
                {size === 'small' ? t('common.small') : t('common.large')}
              </button>
            ))}
          </div>
        )}

        {/* Price and Add to cart */}
        <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
          <div>
            <span className="text-base sm:text-lg font-bold text-[#2E8B57]">{price.toLocaleString()}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1">{t('common.fcf')}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-[#2E8B57] text-white text-xs sm:text-sm font-medium rounded-full hover:bg-[#1B5E3A] hover:scale-[1.02] transition-all shadow-sm"
          >
            <ShoppingCart className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span className="hidden sm:inline">{t('shop.addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
