import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const testimonials = [
  {
    name: 'Marie D.',
    location: 'Yaoundé',
    text: 'Les meilleurs jus naturels que j\'ai goûtés au Cameroun ! Le goût est incroyablement frais et authentique.',
    textEn: 'The best natural juices I\'ve tasted in Cameroon! The taste is incredibly fresh and authentic.',
    avatar: '/images/avatars/marie.jpg',
    rating: 5,
  },
  {
    name: 'Jean K.',
    location: 'Douala',
    text: 'Ma famille adore le jus Ananas Gingembre. Qualité exceptionnelle et livraison toujours à temps.',
    textEn: 'My family loves the Pineapple Ginger juice. Exceptional quality and always on time delivery.',
    avatar: '/images/avatars/jean.jpg',
    rating: 5,
  },
  {
    name: 'Amina N.',
    location: 'Bafoussam',
    text: 'Produits authentiques, livraison rapide. Le thé détox est devenu indispensable dans ma routine.',
    textEn: 'Authentic products, fast delivery. The detox tea has become essential in my routine.',
    avatar: '/images/avatars/amina.jpg',
    rating: 4,
  },
];

export default function TestimonialsPreview() {
  const { lang, t } = useLanguage();
  const ref = useIntersectionObserver();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#E8E4DC]/30 dark:bg-[#1A1A1A]">
      <div className="max-w-[1280px] mx-auto" ref={ref}>
        <div className="text-center mb-12 section-hidden">
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-3">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="section-hidden max-w-3xl mx-auto">
          {/* Testimonial slider */}
          <div className="relative bg-white dark:bg-[#1B4332] rounded-2xl p-8 sm:p-10 shadow-lg">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((item, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 text-center"
                    style={{ flex: '0 0 100%' }}
                  >
                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= item.rating
                              ? 'text-[#F4B400] fill-[#F4B400]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="font-playfair italic text-lg text-[#1A1A1A] dark:text-[#F8F6F0] mb-6 leading-relaxed">
                      &ldquo;{lang === 'fr' ? item.text : item.textEn}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0]">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F8F6F0] dark:bg-[#1A1A1A] shadow-md flex items-center justify-center hover:bg-[#2E8B57] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F8F6F0] dark:bg-[#1A1A1A] shadow-md flex items-center justify-center hover:bg-[#2E8B57] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? 'bg-[#2E8B57]' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Link
              to="/temoignages"
              className="text-[#2E8B57] hover:text-[#1B5E3A] font-medium text-sm hover:underline transition-colors"
            >
              {t('testimonials.cta')} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
