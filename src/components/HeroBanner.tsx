import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
  breadcrumbs?: { label: string; path: string }[];
}

export default function HeroBanner({ title, subtitle, bgColor = 'bg-[#2E8B57]', breadcrumbs }: HeroBannerProps) {
  return (
    <div className={`${bgColor} relative overflow-hidden`} style={{ minHeight: '35vh' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20" />
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/15" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-20">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-4">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.path} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                <Link
                  to={crumb.path}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-base sm:text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
