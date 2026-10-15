import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroBanner from '@/components/HeroBanner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const allTestimonials = [
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
  {
    name: 'Pierre M.',
    location: 'Limbe',
    text: 'Enfin des produits naturels camerounais de cette qualité ! Le beurre de karité est fantastique.',
    textEn: 'Finally, Cameroonian natural products of this quality! The shea butter is fantastic.',
    avatar: '/images/avatars/pierre.jpg',
    rating: 5,
  },
  {
    name: 'Sarah T.',
    location: 'Garoua',
    text: 'Je commande régulièrement depuis 6 mois. Jamais déçue ! Le miel naturel est divin.',
    textEn: 'I order regularly for 6 months. Never disappointed! The natural honey is divine.',
    avatar: '/images/avatars/sarah.jpg',
    rating: 5,
  },
  {
    name: 'Paul F.',
    location: 'Maroua',
    text: 'Excellent rapport qualité-prix. Les jus sont frais et délicieux. Je recommande vivement.',
    textEn: 'Excellent value for money. The juices are fresh and delicious. I highly recommend.',
    avatar: '/images/avatars/paul.jpg',
    rating: 4,
  },
];

export default function TestimonialsPage() {
  const { lang, t } = useLanguage();
  const ref1 = useIntersectionObserver();
  const ref2 = useIntersectionObserver();

  return (
    <div>
      <HeroBanner
        title={t('testimonials.hero')}
        subtitle={t('testimonials.subtitle')}
        bgColor="bg-[#2E8B57]"
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: t('nav.testimonials'), path: '/temoignages' },
        ]}
      />

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]" ref={ref1}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {allTestimonials.map((item, i) => (
              <div
                key={i}
                className="stagger-item bg-[#E8E4DC]/30 dark:bg-[#1B4332] rounded-2xl p-8"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= item.rating
                          ? 'text-[#F4B400] fill-[#F4B400]'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-playfair italic text-base text-[#1A1A1A] dark:text-[#F8F6F0] mb-6 leading-relaxed">
                  &ldquo;{lang === 'fr' ? item.text : item.textEn}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#1A1A1A] dark:text-[#F8F6F0] text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" ref={ref2}>
        <div className="max-w-[600px] mx-auto text-center section-hidden bg-premium-gradient rounded-2xl p-10">
          <h3 className="font-playfair font-bold text-2xl text-white mb-3">
            {t('testimonials.share')}
          </h3>
          <p className="text-white/80 mb-6">{t('testimonials.shareText')}</p>
          <a
            href="https://wa.me/237659172101?text=Bonjour,%20je%20souhaite%20laisser%20un%20avis%20sur%20vos%20produits."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#2E8B57] font-semibold rounded-full hover:bg-gray-100 hover:scale-[1.02] transition-all text-sm"
          >
            {t('testimonials.leaveReview')}
          </a>
        </div>
      </section>
    </div>
  );
}
