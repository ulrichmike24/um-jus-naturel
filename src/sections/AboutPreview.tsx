import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function AboutPreview() {
  const { t } = useLanguage();
  const ref = useIntersectionObserver();

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1B4332]">
      <div className="max-w-[1280px] mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="section-hidden relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/about/founder.jpg"
                alt="Ulrich Mike - Fondateur"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F4B400]/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#2E8B57]/20 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="section-hidden">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2E8B57] mb-3 block">
              {t('aboutPreview.label')}
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-6">
              {t('aboutPreview.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {t('aboutPreview.text')}
            </p>
            <blockquote className="border-l-4 border-[#F4B400] pl-6 mb-8">
              <p className="font-playfair italic text-lg text-[#F4B400]">
                &ldquo;{t('aboutPreview.quote')}&rdquo;
              </p>
            </blockquote>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] hover:scale-[1.02] transition-all text-sm shadow-md"
            >
              {t('aboutPreview.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
