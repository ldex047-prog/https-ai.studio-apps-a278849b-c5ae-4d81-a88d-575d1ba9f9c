import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../config/store';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  language: Language;
  phoneRaw?: string;
  phoneDisplay?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  language,
  phoneRaw,
  phoneDisplay,
}) => {
  const isAr = language === 'ar';
  const targetPhone = phoneRaw || STORE_CONFIG.whatsappRaw;
  const displayPhone = phoneDisplay || STORE_CONFIG.whatsappFormatted;

  const defaultMessage = isAr
    ? 'مرحباً كوينز للعطور والتجميل بالأردن، أود الاستفسار عن المنتجات والطلبات 👑'
    : 'Hello Queens Perfume Jordan, I have an inquiry regarding your collections 👑';

  return (
    <a
      href={getWhatsAppLink(targetPhone, defaultMessage)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 start-6 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      aria-label="Contact on WhatsApp"
      title={isAr ? `تواصل معنا عبر واتساب: ${displayPhone}` : `Chat on WhatsApp: ${displayPhone}`}
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5" />
        {/* Subtle ping indicator */}
        <span className="absolute -top-1 -end-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -end-1 w-2.5 h-2.5 bg-white rounded-full" />
      </div>

      <div className="flex flex-col text-start pe-1">
        <span className="text-[11px] font-bold leading-none">
          {isAr ? 'واتساب كوينز (الأردن)' : 'Queens WhatsApp'}
        </span>
        <span className="text-[9px] opacity-90 font-mono tracking-wider" dir="ltr">
          {displayPhone}
        </span>
      </div>
    </a>
  );
};
