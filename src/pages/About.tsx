import { Award, Leaf, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroBanner from '@/components/HeroBanner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const milestones = [
  { year: '2022', title: 'about.timeline1.title', text: 'about.timeline1.text' },
  { year: '2023', title: 'about.timeline2.title', text: 'about.timeline2.text' },
  { year: '2024', title: 'about.timeline3.title', text: 'about.timeline3.text' },
];

const values = [
  { icon: Award, title: 'about.quality', text: 'about.qualityText' },
  { icon: Leaf, title: 'about.authenticity', text: 'about.authenticityText' },
  { icon: Users, title: 'about.community', text: 'about.communityText' },
];

export default function About() {
  const { t } = useLanguage();
  const ref1 = useIntersectionObserver();
  const ref2 = useIntersectionObserver();
  const ref3 = useIntersectionObserver();

  return (
    <div>
      <HeroBanner
        title={t('about.hero')}
        bgColor="bg-premium-gradient"
        breadcrumbs={[{ label: t('nav.home'), path: '/' }, { label: t('nav.about'), path: '/a-propos' }]}
      />

      {/* Founder Story */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]" ref={ref1}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="section-hidden relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/about/founder.jpg"
                  alt="Ulrich Mike"
                  className="w-full h-[400px] lg:h-[550px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F4B400]/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#2E8B57]/20 rounded-2xl -z-10" />
            </div>

            <div className="section-hidden">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2E8B57] mb-3 block">
                {t('about.founderLabel')}
              </span>
              <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-4">
                {t('about.founderName')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {t('about.bio')}
              </p>

              {/* Timeline */}
              <div className="space-y-6">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-[#2E8B57] rounded-full" />
                      <div className="w-0.5 flex-1 bg-[#2E8B57]/20" />
                    </div>
                    <div className="pb-6">
                      <span className="text-sm font-bold text-[#2E8B57]">{t(m.title)}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t(m.text)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#E8E4DC]/30 dark:bg-[#1A1A1A]" ref={ref2}>
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 section-hidden">
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0]">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {values.map((v) => (
              <div
                key={v.title}
                className="stagger-item bg-white dark:bg-[#1B4332] rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-[#2E8B57]" />
                </div>
                <h3 className="font-playfair font-bold text-xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
                  {t(v.title)}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t(v.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]" ref={ref3}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 stagger-children">
            {[
              '/images/lifestyle/fruits-flatlay.jpg',
              '/images/lifestyle/family.jpg',
              '/images/lifestyle/product-lineup.jpg',
              '/images/products/ananas-gingembre.jpg',
              '/images/products/mangue-passion.jpg',
              '/images/about/founder.jpg',
            ].map((src, i) => (
              <div
                key={i}
                className={`stagger-item rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  style={{ minHeight: i === 0 ? '400px' : '180px' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
