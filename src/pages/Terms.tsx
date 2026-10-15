import { useLanguage } from '@/contexts/LanguageContext';
import HeroBanner from '@/components/HeroBanner';

export default function Terms() {
  const { t } = useLanguage();

  const sections = [
    { title: t('terms.acceptance.title'), text: t('terms.acceptance.text') },
    { title: t('terms.orders.title'), text: t('terms.orders.text') },
    { title: t('terms.delivery.title'), text: t('terms.delivery.text') },
    { title: t('terms.returns.title'), text: t('terms.returns.text') },
    { title: t('terms.ip.title'), text: t('terms.ip.text') },
  ];

  return (
    <div>
      <HeroBanner
        title={t('nav.terms')}
        bgColor="bg-[#1A1A1A]"
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: t('nav.terms'), path: '/conditions-utilisation' },
        ]}
      />

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h3 className="font-playfair font-bold text-xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
