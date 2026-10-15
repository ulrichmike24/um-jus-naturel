import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function VisionPreview() {
  const { t } = useLanguage();
  const ref = useIntersectionObserver();

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-premium-gradient" />
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
        <div className="section-hidden">
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-white mb-6">
            {t('visionPreview.title')}
          </h2>
          <p className="text-lg text-white/90 mb-4 leading-relaxed">
            {t('visionPreview.text')}
          </p>
          <p className="text-base text-white/80 mb-8 leading-relaxed">
            {t('visionPreview.mission')}
          </p>
          <Link
            to="/vision"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#2E8B57] transition-all text-sm"
          >
            {t('visionPreview.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
