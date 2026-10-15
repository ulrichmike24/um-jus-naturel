import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu, X, Leaf, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { key: 'nav.home', path: '/', label: 'Accueil' },
  { key: 'nav.shop', path: '/boutique', label: 'Boutique' },
  { key: 'nav.about', path: '/a-propos', label: '\u00c0 Propos' },
  { key: 'nav.vision', path: '/vision', label: 'Vision' },
  { key: 'nav.contact', path: '/contact', label: 'Contact' },
];

export default function Header() {
  const { scrollY } = useScrollPosition();
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { itemCount } = useCart();
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { user, logout } = useAuth();

  const isScrolled = scrollY > 80;
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-[#F8F6F0]/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md shadow-md'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Leaf className={`w-6 h-6 transition-colors ${isTransparent ? 'text-[#F4B400]' : 'text-[#2E8B57]'}`} />
              <span className={`font-playfair font-bold text-xl transition-colors ${isTransparent ? 'text-white' : 'text-[#1A1A1A] dark:text-[#F8F6F0]'}`}>
                UM Jus Naturels
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  {link.path === '/boutique' ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setShopOpen(true)}
                      onMouseLeave={() => setShopOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          location.pathname.startsWith('/boutique') || location.pathname.startsWith('/produits')
                            ? 'text-[#2E8B57] bg-[#2E8B57]/10'
                            : isTransparent
                            ? 'text-white/90 hover:text-white hover:bg-white/10'
                            : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:text-[#2E8B57] hover:bg-[#2E8B57]/10'
                        }`}
                      >
                        {t(link.key)}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      {shopOpen && (
                        <div className="absolute top-full left-0 pt-2 w-56">
                          <div className="bg-white dark:bg-[#1B4332] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <Link
                              to="/boutique"
                              className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] transition-colors"
                            >
                              {t('nav.shop')}
                            </Link>
                            <Link
                              to="/produits-naturels"
                              className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] transition-colors"
                            >
                              {t('nav.products')}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        location.pathname === link.path
                          ? 'text-[#2E8B57] bg-[#2E8B57]/10'
                          : isTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:text-[#2E8B57] hover:bg-[#2E8B57]/10'
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* SaaS Links */}
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 flex gap-1">
                <Link
                  to="/saas/pricing"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === '/saas/pricing'
                      ? 'text-[#2E8B57] bg-[#2E8B57]/10'
                      : isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:text-[#2E8B57] hover:bg-[#2E8B57]/10'
                  }`}
                >
                  💼 SaaS
                </Link>
              </div>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className={`hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white border border-white/40 hover:bg-white/10'
                    : 'text-[#1A1A1A] dark:text-[#F8F6F0] border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {lang === 'fr' ? 'FR' : 'EN'}
              </button>

              {/* Dark mode */}
              <button
                onClick={toggle}
                className={`p-2 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Cart */}
              <Link
                to="/panier"
                className={`relative p-2 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F4B400] text-[#1A1A1A] text-xs font-bold rounded-full flex items-center justify-center animate-bounceIn">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Auth (desktop) */}
              {user ? (
                <>
                  <span className={`hidden lg:inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isTransparent ? 'text-white/90' : 'text-[#1A1A1A] dark:text-[#F8F6F0]'}`}>
                    Bonjour, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className={`hidden lg:inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-red-600 text-white hover:bg-red-700`}
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`hidden lg:inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:text-[#2E8B57] hover:bg-[#2E8B57]/10'
                    }`}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/signup"
                    className={`hidden lg:inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:text-[#2E8B57] hover:bg-[#2E8B57]/10'
                    }`}
                  >
                    Inscription
                  </Link>
                </>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#F8F6F0] dark:bg-[#1A1A1A] shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <Leaf className="w-6 h-6 text-[#2E8B57]" />
                  <span className="font-playfair font-bold text-lg text-[#1A1A1A] dark:text-[#F8F6F0]">
                    UM Jus Naturels
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-[#1A1A1A] dark:text-[#F8F6F0]" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#2E8B57] bg-[#2E8B57]/10'
                        : 'text-[#1A1A1A] dark:text-[#F8F6F0] hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <Link
                  to="/boutique"
                  className="px-4 py-3 rounded-lg text-base font-medium text-[#1A1A1A] dark:text-[#F8F6F0] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.products')}
                </Link>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <Link
                  to="/saas/pricing"
                  className="px-4 py-3 rounded-lg text-base font-medium text-[#2E8B57] bg-[#2E8B57]/10 hover:bg-[#2E8B57]/20 transition-colors font-bold"
                  onClick={() => setMobileOpen(false)}
                >
                  💼 Plans SaaS
                </Link>
                <Link
                  to="/seller-dashboard"
                  className="px-4 py-3 rounded-lg text-base font-medium text-[#F4B400] bg-[#F4B400]/10 hover:bg-[#F4B400]/20 transition-colors font-bold"
                  onClick={() => setMobileOpen(false)}
                >
                  📊 Dashboard Vendeur
                </Link>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <button
                  onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                  className="px-4 py-2 text-sm font-semibold rounded-full border border-gray-300 dark:border-gray-600 text-[#1A1A1A] dark:text-[#F8F6F0]"
                >
                  {lang === 'fr' ? 'FR \u2192 EN' : 'EN \u2192 FR'}
                </button>
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#1A1A1A] dark:text-[#F8F6F0]"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDark ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
