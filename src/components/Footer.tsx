import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-[#2E8B57]" />
              <span className="font-playfair font-bold text-xl">UM Jus Naturels</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">{t('footer.tagline')}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#2E8B57] hover:text-[#2E8B57] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/237659172101"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#E4405F] hover:text-[#E4405F] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t('footer.nav.title')}
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'nav.home' },
                { to: '/boutique', label: 'nav.shop' },
                { to: '/a-propos', label: 'nav.about' },
                { to: '/vision', label: 'nav.vision' },
                { to: '/contact', label: 'nav.contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t('footer.products.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/boutique" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Jus Naturels
                </Link>
              </li>
              <li>
                <Link to="/boutique" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Thés Naturels
                </Link>
              </li>
              <li>
                <Link to="/produits-naturels" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Poudre de Cacao
                </Link>
              </li>
              <li>
                <Link to="/produits-naturels" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Beurre de Karité
                </Link>
              </li>
              <li>
                <Link to="/produits-naturels" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Miel Naturel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t('footer.contact.title')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#2E8B57]" />
                +237 659 172 101
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#2E8B57]" />
                ngassaulrich17@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#2E8B57]" />
                {t('contact.address')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/politique-confidentialite" className="text-gray-500 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <span className="text-gray-700">|</span>
              <Link to="/conditions-utilisation" className="text-gray-500 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
