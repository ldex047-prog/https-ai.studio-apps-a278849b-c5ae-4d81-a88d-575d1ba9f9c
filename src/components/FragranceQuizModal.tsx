import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { PRODUCTS } from '../data/products';

interface FragranceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onOpenProductDetail: (p: Product) => void;
  currency: Currency;
  language: Language;
}

export const FragranceQuizModal: React.FC<FragranceQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenProductDetail,
  language,
}) => {
  const isAr = language === 'ar';
  const ArrowNext = isAr ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<string>('floral');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('signature');
  const [selectedAura, setSelectedAura] = useState<string>('regal');
  const [resultProduct, setResultProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const questions = [
    {
      titleAr: 'ما هو الطابع العطري المفضل لديكِ؟',
      titleEn: 'What is your preferred fragrance family?',
      options: [
        {
          id: 'floral',
          titleAr: 'زهري رومانسي ناعم (ورد جوري، ياسمين، فاوانيا)',
          titleEn: 'Soft & Romantic Floral (Damask Rose, Jasmine, Peony)',
          descAr: 'لمن تبحث عن أنوثة راقية ورقيقة تسحر الألباب',
          descEn: 'For timeless graceful femininity and elegance',
        },
        {
          id: 'oriental',
          titleAr: 'شرقي غني ودافئ (عود، عنبر، بهارات ملكية)',
          titleEn: 'Rich Oriental Amber (Cambodian Oud, Amber, Spices)',
          descAr: 'لمن تعشق الهيبة الشرقية والغموض الساحر',
          descEn: 'For majestic depth, allure, and unforgettable presence',
        },
        {
          id: 'nectar',
          titleAr: 'عنبري دافئ بنفحات العسل وزهر البرتقال',
          titleEn: 'Golden Amber & Honeyed Orange Blossom',
          descAr: 'توليفة شمسية مشعة تعكس الدفء والجاذبية',
          descEn: 'Solar luminous warmth that glows on skin',
        },
      ],
    },
    {
      titleAr: 'في أي مناسبة تفضلين التألق بهذا العطر؟',
      titleEn: 'For which occasions do you desire this fragrance?',
      options: [
        {
          id: 'signature',
          titleAr: 'توقيعي اليومي الدائم في كل لحظة',
          titleEn: 'My everyday signature scent',
          descAr: 'عطر يليق بكل صباح ومساء ويبقى في الذاكرة',
          descEn: 'Versatile, comforting, and distinctive day or night',
        },
        {
          id: 'royal',
          titleAr: 'الأمسيات الفاخرة والمناسبات الكبرى',
          titleEn: 'Grand royal evenings & celebrations',
          descAr: 'حضور ملكي استثنائي يلفت كل الأنظار',
          descEn: 'High projection and undeniable regal majesty',
        },
      ],
    },
    {
      titleAr: 'ما هو الأثر الذي ترغبين أن يتركه عطركِ؟',
      titleEn: 'What impression do you want your sillage to create?',
      options: [
        {
          id: 'regal',
          titleAr: 'فخامة ملكية آسرة تدوم طوال اليوم',
          titleEn: 'Captivating royal luxury with high longevity',
          descAr: 'ثبات يتجاوز 24 ساعة مع فوحان راقٍ',
          descEn: 'Lasting over 24 hours with elegant diffusion',
        },
        {
          id: 'intimate',
          titleAr: 'لمسة مخملية ناعمة وقريبة من القلب',
          titleEn: 'Intimate velvet aura close to the heart',
          descAr: 'دفء مغناطيسي جذاب يحيط بكِ كالحرير',
          descEn: 'Magnetic sensual warmth wrapping you like silk',
        },
      ],
    },
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate match
      let match = PRODUCTS[0]; // Queens Royal Rose
      if (selectedProfile === 'oriental') {
        match = PRODUCTS.find((p) => p.id === 'queens-oud-velvet') || PRODUCTS[0];
      } else if (selectedProfile === 'nectar') {
        match = PRODUCTS.find((p) => p.id === 'aurelia-golden-nectar') || PRODUCTS[0];
      } else {
        match = PRODUCTS.find((p) => p.id === 'queens-royal-rose-parfum') || PRODUCTS[0];
      }
      setResultProduct(match);
      setStep(3); // Result step
    }
  };

  const handleRestart = () => {
    setStep(0);
    setResultProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#eedcda] overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-8 h-8 rounded-full bg-[#fff8f5] border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:text-[#b87982] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b87982] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'مستشار كوينز للعطور الفاخرة' : 'Queens Bespoke Scent Sommelier'}</span>
        </div>

        {/* Quiz Steps */}
        {step < 3 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#49363a]/60 pb-2 border-b border-[#eedcda]">
              <span>
                {isAr ? `السؤال ${step + 1} من ${questions.length}` : `Question ${step + 1} of ${questions.length}`}
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full transition-colors ${
                      i <= step ? 'bg-[#b87982]' : 'bg-[#eedcda]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-arabic-title text-[#49363a] font-normal leading-snug">
              {isAr ? questions[step].titleAr : questions[step].titleEn}
            </h3>

            <div className="space-y-3">
              {questions[step].options.map((opt) => {
                const currentVal =
                  step === 0 ? selectedProfile : step === 1 ? selectedOccasion : selectedAura;
                const isSelected = currentVal === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (step === 0) setSelectedProfile(opt.id);
                      if (step === 1) setSelectedOccasion(opt.id);
                      if (step === 2) setSelectedAura(opt.id);
                    }}
                    className={`w-full p-4 text-start rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#fff8f5] border-[#b87982] ring-1 ring-[#b87982] shadow-xs'
                        : 'bg-white border-[#eedcda] hover:border-[#b87982]/60'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-[#b87982] bg-[#b87982] text-white'
                          : 'border-[#eedcda] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#49363a]">
                        {isAr ? opt.titleAr : opt.titleEn}
                      </div>
                      <div className="text-xs text-[#49363a]/70 mt-0.5">
                        {isAr ? opt.descAr : opt.descEn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#eedcda]">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-[#49363a] hover:text-[#b87982]"
                >
                  {isAr ? 'السابق' : 'Back'}
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#49363a] hover:bg-[#38282b] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{step === 2 ? (isAr ? 'عرض عطركِ الملكي' : 'Reveal My Royal Scent') : (isAr ? 'التالي' : 'Next')}</span>
                <ArrowNext className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Result Match Screen */
          resultProduct && (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#f3dfe1] flex items-center justify-center text-[#b87982]">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#b87982] font-semibold">
                  {isAr ? 'عطركِ الأيقوني المختار' : 'Your Signature Match'}
                </span>
                <h3 className="text-2xl font-arabic-title text-[#49363a] font-semibold mt-1">
                  {isAr ? resultProduct.nameAr : resultProduct.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#49363a]/75 mt-2 max-w-md mx-auto">
                  {isAr ? resultProduct.shortDescAr : resultProduct.shortDescEn}
                </p>
              </div>

              {/* Product Match Card Preview */}
              <div className="bg-[#fff8f5] border border-[#eedcda] rounded-xl p-4 flex items-center gap-4 text-start">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-[#eedcda]">
                  <img
                    src={resultProduct.image}
                    alt={resultProduct.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#b87982] font-semibold">
                    {resultProduct.concentration || (isAr ? 'عطر فاخر' : 'Haute Parfumerie')}
                  </div>
                  <div className="text-sm font-bold text-[#49363a] mt-0.5">
                    {resultProduct.priceSAR} {isAr ? 'ر.س' : 'SAR'}
                  </div>
                  <div className="text-xs text-[#49363a]/70 mt-1">
                    {isAr ? 'ثبات يدوم طويلاً مع انتشار ملكي' : 'Exceptional sillage and longevity'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(resultProduct);
                    onClose();
                  }}
                  className="w-full sm:flex-1 py-3 bg-[#49363a] hover:bg-[#38282b] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#f3dfe1]" />
                  <span>{isAr ? 'أضيفي إلى سلتكِ الآن' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenProductDetail(resultProduct);
                  }}
                  className="w-full sm:w-auto px-4 py-3 bg-white border border-[#eedcda] hover:border-[#b87982] text-[#49363a] text-xs font-semibold rounded"
                >
                  {isAr ? 'تفاصيل العطر' : 'View Details'}
                </button>
              </div>

              <button
                onClick={handleRestart}
                className="text-xs text-[#49363a]/60 hover:text-[#b87982] underline"
              >
                {isAr ? 'إعادة الاختبار' : 'Retake Quiz'}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
