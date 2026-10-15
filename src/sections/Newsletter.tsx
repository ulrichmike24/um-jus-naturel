import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';

export default function Newsletter() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast(t('newsletter.success') || 'Inscription réussie !', 'success');
      setEmail('');
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1B5E3A]">
      <div className="max-w-[600px] mx-auto text-center">
        <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-white mb-3">
          {t('newsletter.title')}
        </h3>
        <p className="text-white/80 mb-6">
          {t('newsletter.text')}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.placeholder')}
            className="flex-1 px-6 py-3.5 rounded-full bg-white text-[#1A1A1A] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
            required
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#F4B400] text-[#1A1A1A] font-semibold rounded-full hover:bg-[#d99e00] hover:scale-[1.02] transition-all text-sm whitespace-nowrap"
          >
            {t('newsletter.button')}
          </button>
        </form>
      </div>
    </section>
  );
}
