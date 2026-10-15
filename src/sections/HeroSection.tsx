import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/lifestyle/fruits-flatlay.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-dark-overlay" />
      </div>

      {/* Floating decorative fruits */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-12 h-12 opacity-20 animate-float">
          <svg viewBox="0 0 100 100" fill="#F4B400">
            <ellipse cx="50" cy="60" rx="25" ry="30" />
            <path d="M50 30 Q55 15 50 5 Q45 15 50 30" fill="#2E8B57" />
          </svg>
        </div>
        <div className="absolute top-[30%] right-[15%] w-10 h-10 opacity-15 animate-float-delay">
          <svg viewBox="0 0 100 100" fill="#FF8C00">
            <circle cx="50" cy="55" r="30" />
            <path d="M50 25 L55 10 L50 15 L45 10 Z" fill="#2E8B57" />
          </svg>
        </div>
        <div className="absolute bottom-[25%] left-[20%] w-8 h-8 opacity-15 animate-float-delay">
          <svg viewBox="0 0 100 100" fill="#FF6B6B">
            <rect x="20" y="30" width="60" height="50" rx="10" />
            <path d="M35 30 Q50 10 65 30" fill="#2E8B57" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight drop-shadow-lg">
          {t('hero.title')}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-8 font-light tracking-wide">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/boutique"
            className="px-8 py-3.5 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] hover:scale-[1.02] transition-all shadow-lg text-sm tracking-wide"
          >
            {t('hero.cta.buy')}
          </Link>
          <Link
            to="/boutique"
            className="px-8 py-3.5 bg-transparent text-white font-semibold rounded-full border-2 border-white/80 hover:bg-white/10 hover:scale-[1.02] transition-all text-sm tracking-wide"
          >
            {t('hero.cta.discover')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
