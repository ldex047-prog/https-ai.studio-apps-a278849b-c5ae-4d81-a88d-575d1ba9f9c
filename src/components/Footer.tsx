import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Phone, Check } from 'lucide-react';
import { Language } from '../types';
import { STORE_CONFIG, getWhatsAppLink } from '../config/store';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#49363a] text-white pt-16 pb-12 border-t border-[#eedcda]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-display-luxury tracking-[0.25em] text-[#f3dfe1] font-semibold uppercase">
                QUEENS
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 border-s border-white/20 ps-3">
                Perfume & Beauty
              </span>
            </div>

            <p className="text-base font-arabic-title text-[#f3dfe1]/90">
              {isAr ? 'كل امرأة تستحق لحظتها الخاصة.' : 'Every woman deserves her sovereign moment.'}
            </p>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              {isAr
                ? 'دار كوينز للعطور الفاخرة ومستحضرات الجمال الملكية. نبتكر توليفات فريدة تأسر الحواس وتمنحكِ هالة من الأناقة تدوم في الذاكرة.'
                : 'House of Queens Haute Parfumerie & Luxury Beauty. We craft signature aromas that enchant the senses and linger gracefully.'}
            </p>

            {/* Concierge WhatsApp Button */}
            <div className="pt-2">
              <a
                href={getWhatsAppLink(
                  isAr ? 'مرحباً كوينز للعطور، أود الاستفسار عن التشكيلة والطلبات' : 'Hello Queens Perfume, I have an inquiry'
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 rounded text-xs text-[#f3dfe1] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>
                  {isAr ? `واتساب مباشر: ${STORE_CONFIG.whatsappFormatted}` : `Direct WhatsApp: ${STORE_CONFIG.whatsappFormatted}`}
                </span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#f3dfe1]">
              {isAr ? 'روابط كوينز' : 'Explore Boutique'}
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {isAr ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  {isAr ? 'أقسام الجمال والعطور' : 'Beauty & Fragrance Universes'}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {isAr ? 'المجموعة الملكية المتكاملة' : 'Full Royal Collection'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {isAr ? 'تواصل وخدمة العملاء' : 'Contact & Boutique Support'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: VIP Newsletter & Inquiries (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#f3dfe1]">
              {isAr ? 'نادي سيدات كوينز' : 'The Queens Society'}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {isAr
                ? 'انضمي لعالمنا الخاص لتصلكِ دعوات الإصدارات الحصرية وخصومات الأعضاء.'
                : 'Join our private circle for private invitations, bespoke launches, and member gifts.'}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAr ? 'بريدكِ الإلكتروني...' : 'Enter your email...'}
                  className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#f3dfe1]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#b87982] hover:bg-[#a66a73] text-white text-xs font-semibold rounded transition-colors"
                >
                  {isAr ? 'انضمي' : 'Join'}
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  <span>{isAr ? 'أهلاً بكِ في عالم كوينز الساحر!' : 'Welcome to the Queens universe!'}</span>
                </div>
              )}
            </form>

            <div className="pt-2 text-[11px] text-white/60 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b87982]" />
                <span>{isAr ? STORE_CONFIG.locations : STORE_CONFIG.locationsEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#b87982]" />
                <span dir="ltr">{STORE_CONFIG.whatsappFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#b87982]" />
                <span>{STORE_CONFIG.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div className="text-center sm:text-start">
            <span className="font-semibold text-white/90">QUEENS PERFUME</span>
            <span className="mx-2">·</span>
            <span>{isAr ? 'كل امرأة تستحق لحظتها الخاصة.' : 'Every woman deserves her sovereign moment.'}</span>
          </div>

          <div className="text-center sm:text-end text-[11px]">
            <span>© {new Date().getFullYear()} Queens Perfume & Beauty. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
