import { useLanguage } from '@/contexts/LanguageContext';
import HeroBanner from '@/components/HeroBanner';

export default function Privacy() {
  const { t } = useLanguage();

  const sections = [
    { title: t('privacy.intro.title'), text: t('privacy.intro.text') },
    { title: t('privacy.data.title'), text: t('privacy.data.text') },
    { title: t('privacy.use.title'), text: t('privacy.use.text') },
    { title: t('privacy.security.title'), text: t('privacy.security.text') },
    { title: t('privacy.rights.title'), text: t('privacy.rights.text') },
  ];

  return (
    <div>
      <HeroBanner
        title={t('privacy.title')}
        bgColor="bg-[#1A1A1A]"
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: t('nav.privacy'), path: '/politique-confidentialite' },
        ]}
      />

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[800px] mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
            {t('privacy.updated')}
          </p>

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
