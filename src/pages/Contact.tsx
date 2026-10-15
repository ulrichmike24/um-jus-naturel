import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import HeroBanner from '@/components/HeroBanner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Contact() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const ref = useIntersectionObserver();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(t('contact.success'), 'success');
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div>
      <HeroBanner
        title={t('contact.hero')}
        subtitle={t('contact.subtitle')}
        bgColor="bg-premium-gradient"
        breadcrumbs={[{ label: t('nav.home'), path: '/' }, { label: t('nav.contact'), path: '/contact' }]}
      />

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1A1A1A]" ref={ref}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="section-hidden">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-[#1B4332] border-b-2 border-gray-200 dark:border-gray-700 focus:border-[#2E8B57] outline-none transition-colors dark:text-[#F8F6F0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
                    {t('contact.phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-[#1B4332] border-b-2 border-gray-200 dark:border-gray-700 focus:border-[#2E8B57] outline-none transition-colors dark:text-[#F8F6F0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-[#1B4332] border-b-2 border-gray-200 dark:border-gray-700 focus:border-[#2E8B57] outline-none transition-colors dark:text-[#F8F6F0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-[#1B4332] border-b-2 border-gray-200 dark:border-gray-700 focus:border-[#2E8B57] outline-none transition-colors resize-none dark:text-[#F8F6F0]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] hover:scale-[1.01] transition-all text-sm"
                >
                  {t('contact.send')}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="section-hidden space-y-8">
              <div className="bg-[#E8E4DC]/30 dark:bg-[#1B4332] rounded-2xl p-8">
                <h3 className="font-playfair font-bold text-xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-6">
                  {t('footer.contact.title')}
                </h3>
                <div className="space-y-5">
                  <a
                    href="tel:+237659172101"
                    className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-[#2E8B57] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#2E8B57]/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#2E8B57]" />
                    </div>
                    +237 659 172 101
                  </a>
                  <a
                    href="mailto:ngassaulrich17@gmail.com"
                    className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-[#2E8B57] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#2E8B57]/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#2E8B57]" />
                    </div>
                    ngassaulrich17@gmail.com
                  </a>
                  <a
                    href="https://wa.me/237659172101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-[#25D366] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    </div>
                    WhatsApp
                  </a>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 bg-[#2E8B57]/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#2E8B57]" />
                    </div>
                    {t('contact.address')}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 bg-[#2E8B57]/10 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#2E8B57]" />
                    </div>
                    {t('contact.hours')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127865.80933917109!2d11.4118528!3d3.848032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7a309a7977%3A0x7f54bad35e693c51!2sYaound%C3%A9%2C%20Cameroon!5e0!3m2!1sen!2s!4v1699900000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        />
      </section>
    </div>
  );
}
