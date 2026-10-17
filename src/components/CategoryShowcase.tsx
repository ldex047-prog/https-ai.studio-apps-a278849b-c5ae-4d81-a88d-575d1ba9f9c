import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_METADATA } from '../data/products';
import { CategoryType, Language } from '../types';

interface CategoryShowcaseProps {
  language: Language;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  language,
  onSelectCategory,
}) => {
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="categories" className="py-16 md:py-24 bg-[#fff8f5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-[#b87982] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'عوالم كوينز' : 'Queens Universes'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-arabic-title text-[#49363a] font-normal tracking-tight">
            {isAr ? 'اكتشفي عالم الجمال' : 'Discover the World of Beauty'}
          </h2>

          <p className="text-base sm:text-lg text-[#49363a]/75 font-normal">
            {isAr ? 'اختيارات صُممت لتناسب ذوقكِ' : 'Curated creations tailored to your exquisite taste'}
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES_METADATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-white border border-[#eedcda] rounded-xl overflow-hidden hover:border-[#b87982] transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3dfe1]/40">
                <img
                  src={cat.image}
                  alt={isAr ? cat.titleAr : cat.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

                {/* Counter kicker on image */}
                <div className="absolute bottom-3 start-4 text-xs font-medium text-white/90 drop-shadow">
                  {isAr ? cat.itemCount : cat.itemCountEn}
                </div>
              </div>

              {/* Category Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl font-arabic-title text-[#b87982] font-semibold group-hover:text-[#49363a] transition-colors">
                    {isAr ? cat.titleAr : cat.titleEn}
                  </h3>
                  <p className="mt-2 text-sm text-[#49363a]/80 leading-relaxed">
                    {isAr ? cat.taglineAr : cat.taglineEn}
                  </p>
                  <p className="mt-1 text-xs text-[#49363a]/60 line-clamp-2">
                    {isAr ? cat.subtitleAr : cat.subtitleEn}
                  </p>
                </div>

                {/* Call to action text */}
                <div className="pt-3 border-t border-[#eedcda]/70 flex items-center justify-between text-xs font-semibold text-[#49363a] group-hover:text-[#b87982] transition-colors">
                  <span>{isAr ? 'تصفحي القسم' : 'Browse Category'}</span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
