import { Check, Award, Heart, Lightbulb, Sprout, Smile } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroBanner from '@/components/HeroBanner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const missionPoints = [
  'vision.point1',
  'vision.point2',
  'vision.point3',
  'vision.point4',
];

const coreValues = [
  { icon: Award, title: 'vision.quality', desc: 'vision.qualityDesc' },
  { icon: Heart, title: 'vision.integrity', desc: 'vision.integrityDesc' },
  { icon: Lightbulb, title: 'vision.innovation', desc: 'vision.innovationDesc' },
  { icon: Sprout, title: 'vision.nature', desc: 'vision.natureDesc' },
  { icon: Smile, title: 'vision.satisfaction', desc: 'vision.satisfactionDesc' },
];

export default function Vision() {
  const { t } = useLanguage();
  const ref1 = useIntersectionObserver();
  const ref2 = useIntersectionObserver();
  const ref3 = useIntersectionObserver();

  return (
    <div>
      <HeroBanner
        title={t('vision.hero')}
        bgColor="bg-[#2E8B57]"
        breadcrumbs={[{ label: t('nav.home'), path: '/' }, { label: t('nav.vision'), path: '/vision' }]}
      />

      {/* Vision Statement */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]" ref={ref1}>
        <div className="max-w-[800px] mx-auto text-center section-hidden">
          <div className="w-12 h-12 bg-[#F4B400]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#F4B400] text-3xl font-playfair">&ldquo;</span>
          </div>
          <p className="font-playfair font-semibold text-2xl sm:text-3xl text-[#1A1A1A] dark:text-[#F8F6F0] leading-relaxed">
            {t('vision.statement')}
          </p>
          <div className="w-16 h-1 bg-[#2E8B57] mx-auto mt-6 rounded-full" />
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#E8E4DC]/30 dark:bg-[#1A1A1A]" ref={ref2}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="section-hidden">
              <img
                src="/images/lifestyle/product-lineup.jpg"
                alt="Products"
                className="rounded-2xl shadow-xl w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>
            <div className="section-hidden">
              <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-4">
                {t('vision.missionTitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {t('vision.missionText')}
              </p>
              <ul className="space-y-4">
                {missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2E8B57]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#2E8B57]" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{t(point)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]" ref={ref3}>
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 section-hidden">
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0]">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 stagger-children">
            {coreValues.map((v) => (
              <div
                key={v.title}
                className="stagger-item bg-[#E8E4DC]/50 dark:bg-[#1B4332] rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-6 h-6 text-[#2E8B57]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] text-sm mb-1">
                  {t(v.title)}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t(v.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
