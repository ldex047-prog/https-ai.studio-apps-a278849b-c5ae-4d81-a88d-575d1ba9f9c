import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Gift, Truck } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExploreClick, onOpenQuiz }) => {
  const isAr = language === 'ar';

  return (
    <section id="home" className="relative bg-[#f3dfe1]/60 overflow-hidden border-b border-[#eedcda]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 end-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#eedcda]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 start-0 translate-y-12 -translate-x-12 w-96 h-96 bg-white/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left / Text column (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-start space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#b87982] uppercase">
              <span className="w-8 h-[1px] bg-[#b87982]/60 hidden sm:inline-block" />
              <span>YOUR BEAUTY, YOUR RULES</span>
              <span className="w-8 h-[1px] bg-[#b87982]/60 hidden sm:inline-block" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-arabic-title text-[#49363a] font-normal leading-[1.25] tracking-tight text-balance">
              {isAr ? 'جمالكِ، عالمكِ، واختياركِ' : 'Your Beauty, Your World, Your Sovereign Choice'}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-[#49363a]/80 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isAr
                ? 'اكتشفي عطورًا آسرة، وعناية لبشرتكِ، ومستحضرات تجميل تحبينها.'
                : 'Discover captivating fragrances, restorative skincare, and makeup you will adore.'}
            </p>

            {/* Editorial Quote */}
            <div className="p-4 bg-white/80 border border-[#eedcda] rounded-lg max-w-xl mx-auto lg:mx-0 shadow-sm">
              <p className="text-xs sm:text-sm text-[#49363a]/75 italic leading-relaxed">
                {isAr
                  ? '«كل تفصيلة في كوينز صُممت لتمنح المرأة إحساساً بالفرادة والرفاهية التي تدوم طويلاً.»'
                  : '"Every nuance at Queens is crafted to bestow enduring distinction and effortless elegance."'}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#49363a] hover:bg-[#38282b] text-white text-base font-medium rounded shadow-sm hover:shadow transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'اكتشفي مجموعتنا' : 'Explore The Collection'}</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#fff8f5] text-[#49363a] border border-[#eedcda] hover:border-[#b87982] text-base font-medium rounded shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#b87982]" />
                <span>{isAr ? 'مستشار العطور الذكي' : 'Find Your Scent'}</span>
              </button>
            </div>
          </div>

          {/* Right / Visual column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#b87982]/20 to-transparent rounded-2xl transform rotate-1 pointer-events-none" />
              
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#eedcda] bg-white aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
                <img
                  src="/src/assets/images/hero_queens_perfume_1792268631444.jpg"
                  alt="Queens Royal Parfum Masterpiece"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#49363a]/90 via-[#49363a]/50 to-transparent p-5 text-white">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#f3dfe1] font-semibold">
                    {isAr ? 'الإصدار الأيقوني' : 'Iconic Edition'}
                  </div>
                  <div className="text-lg font-arabic-title font-medium mt-0.5">
                    {isAr ? 'عطر كوينز رويال روز' : 'Queens Royal Rose Extrait'}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Trust Strip */}
        <div className="mt-14 pt-8 border-t border-[#eedcda]/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-start">
          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#eedcda] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#b87982]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#49363a]">
                {isAr ? 'أصالة معتمدة 100%' : '100% Authentic Luxury'}
              </div>
              <div className="text-xs text-[#49363a]/70">
                {isAr ? 'تركيبات ملكية معتمدة ومختبرة' : 'Certified formulas & ingredients'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#eedcda] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#b87982]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#49363a]">
                {isAr ? 'توصيل مبرد وسريع' : 'Express White-Glove Delivery'}
              </div>
              <div className="text-xs text-[#49363a]/70">
                {isAr ? 'توصيل خلال 24-48 ساعة' : 'To your door in 24-48 hours'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#eedcda] flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-[#b87982]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#49363a]">
                {isAr ? 'تغليف هدايا ملكي مجاني' : 'Bespoke Royal Gift Packaging'}
              </div>
              <div className="text-xs text-[#49363a]/70">
                {isAr ? 'مع شريط حريري وبطاقة إهداء' : 'Silken ribbon & complimentary card'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
