import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroBanner from '@/components/HeroBanner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const faqData = [
  {
    q: 'Quels sont les délais de livraison ?',
    qEn: 'What are the delivery times?',
    a: 'Nous livrons sous 24 à 48 heures à Yaoundé et Douala. Pour les autres villes du Cameroun, comptez 2 à 5 jours ouvrés.',
    aEn: 'We deliver within 24 to 48 hours in Yaoundé and Douala. For other cities in Cameroon, expect 2 to 5 business days.',
  },
  {
    q: 'Comment passer commande ?',
    qEn: 'How to place an order?',
    a: 'Choisissez vos produits, ajoutez-les au panier, puis suivez les étapes de paiement. Vous pouvez aussi commander directement via WhatsApp.',
    aEn: 'Choose your products, add them to cart, then follow the payment steps. You can also order directly via WhatsApp.',
  },
  {
    q: 'Quels modes de paiement acceptez-vous ?',
    qEn: 'What payment methods do you accept?',
    a: 'Nous acceptons Orange Money, MTN Mobile Money et le paiement à la livraison.',
    aEn: 'We accept Orange Money, MTN Mobile Money, and cash on delivery.',
  },
  {
    q: 'Vos jus contiennent-ils des conservateurs ?',
    qEn: 'Do your juices contain preservatives?',
    a: 'Non, tous nos produits sont 100% naturels, sans conservateurs, sans colorants et sans additifs artificiels.',
    aEn: 'No, all our products are 100% natural, without preservatives, coloring, or artificial additives.',
  },
  {
    q: 'Quelle est la durée de conservation ?',
    qEn: 'What is the shelf life?',
    a: 'Nos jus frais se conservent 7 jours au réfrigérateur. Les produits secs (thés, poudres) ont une durée de 6 à 12 mois.',
    aEn: 'Our fresh juices keep for 7 days in the refrigerator. Dry products (teas, powders) have a shelf life of 6 to 12 months.',
  },
  {
    q: 'Livrez-vous hors du Cameroun ?',
    qEn: 'Do you deliver outside Cameroon?',
    a: 'Pour le moment, nous livrons uniquement au Cameroun. Nous envisageons d\'expander prochainement.',
    aEn: 'For now, we only deliver within Cameroon. We are considering expanding soon.',
  },
  {
    q: 'Puis-je modifier ma commande ?',
    qEn: 'Can I modify my order?',
    a: 'Oui, contactez-nous rapidement par WhatsApp au +237 659 172 101 avant l\'expédition.',
    aEn: 'Yes, contact us quickly via WhatsApp at +237 659 172 101 before shipping.',
  },
  {
    q: 'Proposez-vous des réductions en gros ?',
    qEn: 'Do you offer bulk discounts?',
    a: 'Oui, nous offrons des tarifs préférentiels pour les commandes de plus de 50 bouteilles. Contactez-nous pour un devis.',
    aEn: 'Yes, we offer preferential rates for orders of more than 50 bottles. Contact us for a quote.',
  },
  {
    q: 'Vos bouteilles sont-elles recyclables ?',
    qEn: 'Are your bottles recyclable?',
    a: 'Oui, nous utilisons des bouteilles en verre recyclables. Ramenez vos bouteilles vides pour une remise de 100 FCFA par bouteille.',
    aEn: 'Yes, we use recyclable glass bottles. Bring back your empty bottles for a discount of 100 FCFA per bottle.',
  },
  {
    q: 'Comment contacter le service client ?',
    qEn: 'How to contact customer service?',
    a: 'Par WhatsApp au +237 659 172 101, par email à ngassaulrich17@gmail.com, ou via le formulaire de contact.',
    aEn: 'Via WhatsApp at +237 659 172 101, by email at ngassaulrich17@gmail.com, or through the contact form.',
  },
];

export default function FAQPage() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref1 = useIntersectionObserver();
  const ref2 = useIntersectionObserver();

  return (
    <div>
      <HeroBanner
        title={t('faq.hero')}
        bgColor="bg-[#2E8B57]"
        breadcrumbs={[{ label: t('nav.home'), path: '/' }, { label: t('nav.faq'), path: '/faq' }]}
      />

      {/* FAQ Accordion */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]" ref={ref1}>
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-0">
            {faqData.map((faq, i) => (
              <div
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 section-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <h4 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] text-base pr-4 group-hover:text-[#2E8B57] transition-colors">
                    {lang === 'fr' ? faq.q : faq.qEn}
                  </h4>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'max-h-48 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {lang === 'fr' ? faq.a : faq.aEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#E8E4DC]/30 dark:bg-[#1A1A1A]" ref={ref2}>
        <div className="max-w-[600px] mx-auto text-center section-hidden">
          <h3 className="font-playfair font-bold text-2xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-3">
            {t('faq.stillQuestions')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{t('faq.helpText')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] hover:scale-[1.02] transition-all text-sm"
          >
            {t('faq.contact')}
          </Link>
        </div>
      </section>
    </div>
  );
}
