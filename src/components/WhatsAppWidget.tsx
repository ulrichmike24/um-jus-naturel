import { MessageCircle } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export default function WhatsAppWidget() {
  const { scrollY, isScrollingUp } = useScrollPosition();
  const isVisible = scrollY < 200 || isScrollingUp;

  const message = encodeURIComponent('Bonjour, je souhaite commander vos produits naturels.');
  const whatsappUrl = `https://wa.me/237659172101?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ animation: 'pulse 3s ease-in-out infinite' }}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </a>
  );
}
