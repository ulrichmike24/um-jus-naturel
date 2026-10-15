import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { t } = useLanguage();
  const { items, removeItem, updateQuantity, subtotal, total, deliveryFee } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="font-playfair font-bold text-2xl text-gray-400 mb-2">{t('cart.empty')}</h2>
          <p className="text-gray-400 mb-8">{t('cart.emptyText')}</p>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] transition-all text-sm"
          >
            {t('cart.continue')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="font-playfair font-bold text-3xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-8">
          {t('cart.title')}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white dark:bg-[#1B4332] rounded-2xl shadow-md overflow-hidden">
              {/* Desktop header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-[#1A1A1A] text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <div className="col-span-5">{t('cart.product')}</div>
                <div className="col-span-2 text-center">{t('cart.price')}</div>
                <div className="col-span-3 text-center">{t('cart.quantity')}</div>
                <div className="col-span-2 text-right">{t('cart.total')}</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center"
                  >
                    {/* Product */}
                    <div className="col-span-5 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-[#1A1A1A] dark:text-[#F8F6F0] text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {item.size === 'small' ? '50cl' : '1L'}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <span className="text-sm text-[#1A1A1A] dark:text-[#F8F6F0]">
                        {item.price.toLocaleString()} {t('common.fcf')}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-full px-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-[#2d2d2d] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-[#2d2d2d] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total + Remove */}
                    <div className="col-span-2 flex items-center justify-end gap-3">
                      <span className="text-sm font-semibold text-[#2E8B57]">
                        {(item.price * item.quantity).toLocaleString()} {t('common.fcf')}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/boutique"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[#2E8B57] hover:underline"
            >
              ← {t('cart.continue')}
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-[#1B4332] rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-4">
                {t('cart.title')}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{t('cart.subtotal')}</span>
                  <span className="text-[#1A1A1A] dark:text-[#F8F6F0]">
                    {subtotal.toLocaleString()} {t('common.fcf')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{t('cart.delivery')}</span>
                  <span className="text-[#1A1A1A] dark:text-[#F8F6F0]">
                    {deliveryFee.toLocaleString()} {t('common.fcf')}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#1A1A1A] dark:text-[#F8F6F0]">Total</span>
                    <span className="text-[#2E8B57]">{total.toLocaleString()} {t('common.fcf')}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] hover:scale-[1.01] transition-all text-sm"
              >
                {t('cart.order')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
