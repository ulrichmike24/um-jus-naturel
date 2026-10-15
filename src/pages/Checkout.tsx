import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Truck, Leaf, Check, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cities } from '@/data/products';
import { sendOrderToWhatsApp } from '@/services/whatsappService';

export default function Checkout() {
  const { t } = useLanguage();
  const { items, subtotal, deliveryFee, total, clearCart, setDeliveryCity } = useCart();
  const { user, updateUser } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: '',
    email: user?.email ?? '',
    city: 'Yaoundé',
    neighborhood: '',
    address: '',
    payment: 'cod',
  });

  useEffect(() => {
    if (user) {
      setForm((current) => ({
        ...current,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const num = `UM-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(num);

    const orderData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      neighborhood: form.neighborhood,
      address: form.address,
      payment: form.payment,
      orderNumber: num,
      items,
      subtotal,
      deliveryFee,
      total,
    };

    const userOrder = {
      id: num,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
      city: form.city,
      neighborhood: form.neighborhood,
      address: form.address,
      payment: form.payment,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'En attente' as const,
      createdAt: new Date().toISOString(),
    };

    sendOrderToWhatsApp(orderData);
    updateUser({ orders: [...user.orders, userOrder] });
    setIsSuccess(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCityChange = (city: string) => {
    setForm({ ...form, city });
    setDeliveryCity(city);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-playfair font-bold text-3xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-4">
            {t('checkout.success')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {t('checkout.orderNumber')}: <span className="font-semibold text-[#2E8B57]">{orderNumber}</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{t('checkout.thanks')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] transition-all text-sm"
            >
              {t('nav.home')}
            </Link>
            <a
              href={`https://wa.me/237659172101?text=Bonjour,%20je%20confirme%20ma%20commande%20${orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#128C7E] transition-all text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t('checkout.whatsapp')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h2 className="font-playfair font-bold text-2xl text-gray-400 mb-4">{t('cart.empty')}</h2>
          <Link
            to="/boutique"
            className="px-8 py-3 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] transition-all text-sm"
          >
            {t('cart.continue')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="font-playfair font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-6 sm:mb-8">
          {t('checkout.title')}
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Contact */}
              <div className="bg-white dark:bg-[#1B4332] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
                <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3 sm:mb-4 text-sm sm:text-base">
                  {t('checkout.contact')}
                </h3>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:bg-[#1A1A1A] dark:text-[#F8F6F0]"
                />
              </div>

              {/* Delivery */}
              <div className="bg-white dark:bg-[#1B4332] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
                <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3 sm:mb-4 text-sm sm:text-base">
                  {t('checkout.delivery')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder={t('checkout.name')}
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:bg-[#1A1A1A] dark:text-[#F8F6F0]"
                  />
                  <input
                    type="tel"
                    placeholder={t('checkout.phone')}
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:bg-[#1A1A1A] dark:text-[#F8F6F0]"
                  />
                  <select
                    value={form.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:bg-[#1A1A1A] dark:text-[#F8F6F0]"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder={t('checkout.neighborhood')}
                    required
                    value={form.neighborhood}
                    onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:bg-[#1A1A1A] dark:text-[#F8F6F0]"
                  />
                  <input
                    type="text"
                    placeholder={t('checkout.address')}
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="sm:col-span-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:bg-[#1A1A1A] dark:text-[#F8F6F0]"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white dark:bg-[#1B4332] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
                <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3 sm:mb-4 text-sm sm:text-base">
                  {t('checkout.payment')}
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'orangeMoney', label: t('checkout.orangeMoney'), color: 'bg-orange-500' },
                    { id: 'mtnMoney', label: t('checkout.mtnMoney'), color: 'bg-yellow-500' },
                    { id: 'cod', label: t('checkout.cod'), color: 'bg-[#2E8B57]' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        form.payment === method.id
                          ? 'border-[#2E8B57] bg-[#2E8B57]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={form.payment === method.id}
                        onChange={(e) => setForm({ ...form, payment: e.target.value })}
                        className="w-4 h-4 text-[#2E8B57]"
                      />
                      <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">
                          {method.id === 'cod' ? '💰' : method.id === 'orangeMoney' ? 'OM' : 'M'}
                        </span>
                      </div>
                      <span className="text-sm text-[#1A1A1A] dark:text-[#F8F6F0]">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-4 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] hover:scale-[1.01] transition-all text-sm sm:text-base"
              >
                {t('checkout.submit')}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white dark:bg-[#1B4332] rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-24">
              <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3 sm:mb-4 text-sm sm:text-base">
                {t('checkout.summary')}
              </h3>

              {/* Items */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-[#1A1A1A] dark:text-[#F8F6F0] truncate">{item.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                        {item.quantity} × {item.price.toLocaleString()} {t('common.fcf')}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#1A1A1A] dark:text-[#F8F6F0] flex-shrink-0">
                      {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{t('cart.subtotal')}</span>
                  <span className="text-[#1A1A1A] dark:text-[#F8F6F0]">
                    {subtotal.toLocaleString()} {t('common.fcf')}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{t('cart.delivery')}</span>
                  <span className="text-[#1A1A1A] dark:text-[#F8F6F0]">
                    {deliveryFee.toLocaleString()} {t('common.fcf')}
                  </span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 dark:border-gray-700 text-sm sm:text-base">
                  <span className="text-[#1A1A1A] dark:text-[#F8F6F0]">Total</span>
                  <span className="text-[#2E8B57]">{total.toLocaleString()} {t('common.fcf')}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                {[
                  { icon: Shield, label: t('checkout.secure') },
                  { icon: Truck, label: t('checkout.fast') },
                  { icon: Leaf, label: t('checkout.fresh') },
                ].map((badge) => (
                  <div key={badge.label} className="text-center">
                    <badge.icon className="w-5 h-5 text-[#2E8B57] mx-auto mb-1" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
