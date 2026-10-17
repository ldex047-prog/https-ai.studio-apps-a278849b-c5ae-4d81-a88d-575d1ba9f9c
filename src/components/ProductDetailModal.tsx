import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

import { STORE_CONFIG, getWhatsAppLink } from '../config/store';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, quantity: number, size?: string, shade?: any) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  currency: Currency;
  language: Language;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  currency,
  language,
}) => {
  if (!product) return null;

  const isAr = language === 'ar';
  const currencyConfig = CURRENCY_RATES[currency];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes ? product.availableSizes[0] : product.volumeOrSize
  );
  const [selectedShade, setSelectedShade] = useState(
    product.shades ? product.shades[0] : undefined
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currencyConfig.rate);
    const symbol = isAr ? currencyConfig.symbolAr : currencyConfig.symbolEn;
    return `${converted} ${symbol}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#eedcda] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-white/90 border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:bg-[#fff8f5] hover:text-[#b87982] transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Showcase (5 cols) */}
          <div className="md:col-span-5 bg-[#fff8f5] p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-e border-[#eedcda]">
            <div className="w-full aspect-[4/3] md:aspect-square rounded-xl overflow-hidden shadow-sm border border-[#eedcda] bg-white">
              <img
                src={product.image}
                alt={isAr ? product.nameAr : product.nameEn}
                className="w-full h-full object-cover object-center"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Product Trust Markers */}
            <div className="w-full mt-6 space-y-3 pt-4 border-t border-[#eedcda]">
              <div className="flex items-center gap-2.5 text-xs text-[#49363a]/80">
                <ShieldCheck className="w-4 h-4 text-[#b87982] shrink-0" />
                <span>{isAr ? 'عطر أصلي مصنّع من خلاصات طبيعية نادرة' : 'Authentic formula crafted from rare botanicals'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#49363a]/80">
                <Truck className="w-4 h-4 text-[#b87982] shrink-0" />
                <span>{isAr ? 'تغليف ملكي مع شحن سريع وبطاقة إهداء' : 'Royal gift boxing with express delivery'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b87982]">
                  {product.category === 'perfume'
                    ? (isAr ? 'عطور ملكية' : 'Royal Fragrance')
                    : product.category === 'skincare'
                    ? (isAr ? 'عناية وإكسير البشرة' : 'Skincare & Elixir')
                    : (isAr ? 'مستحضرات تجميل' : 'Haute Cosmetics')}
                </span>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#49363a] hover:text-[#b87982] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#b87982] text-[#b87982]' : ''}`} />
                  <span>{isWishlisted ? (isAr ? 'في المفضلة' : 'Saved') : (isAr ? 'حفظ' : 'Save')}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="mt-2 text-xl sm:text-2xl font-arabic-title text-[#49363a] font-semibold leading-snug">
                {isAr ? product.nameAr : product.nameEn}
              </h2>

              {/* Rating & Concentration */}
              <div className="mt-2 flex items-center gap-3 text-xs text-[#49363a]/75">
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold tabular-nums font-mono">{product.rating}</span>
                  <span className="text-[#49363a]/50">({product.reviewCount} {isAr ? 'تقييم ملكي' : 'reviews'})</span>
                </div>
                {product.concentration && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[#49363a]">{product.concentration}</span>
                  </>
                )}
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#49363a] tabular-nums font-mono">
                  {formatPrice(product.priceSAR)}
                </span>
                {product.originalPriceSAR && (
                  <span className="text-sm text-[#49363a]/50 line-through tabular-nums font-mono">
                    {formatPrice(product.originalPriceSAR)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#49363a]/80 leading-relaxed">
              {isAr ? product.descriptionAr : product.descriptionEn}
            </p>

            {/* Olfactory Pyramid (If Perfume) */}
            {product.fragranceNotes && (
              <div className="p-4 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#b87982] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الهرم العطري والنوتات' : 'Olfactory Pyramid Notes'}</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-[#49363a]">{isAr ? 'قمة العطر (Top Notes): ' : 'Top Notes: '}</span>
                    <span className="text-[#49363a]/80">{product.fragranceNotes.top.join(' · ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#49363a]">{isAr ? 'قلب العطر (Heart Notes): ' : 'Heart Notes: '}</span>
                    <span className="text-[#49363a]/80">{product.fragranceNotes.heart.join(' · ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#49363a]">{isAr ? 'قاعدة العطر (Base Notes): ' : 'Base Notes: '}</span>
                    <span className="text-[#49363a]/80">{product.fragranceNotes.base.join(' · ')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Skincare Benefits (If Skincare) */}
            {product.benefitsAr && (
              <div className="p-4 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-2">
                <div className="text-xs font-semibold text-[#b87982] uppercase tracking-wider">
                  {isAr ? 'فوائد التركيبة الفعالة' : 'Key Formula Benefits'}
                </div>
                <ul className="space-y-1 text-xs text-[#49363a]/80 list-disc list-inside">
                  {(isAr ? product.benefitsAr : product.benefitsEn)?.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shades Selector (If Cosmetics) */}
            {product.shades && (
              <div>
                <div className="text-xs font-semibold text-[#49363a] mb-2">
                  {isAr ? 'اختاري الدرجة:' : 'Select Shade:'}{' '}
                  <span className="text-[#b87982] font-normal">
                    {isAr ? selectedShade?.nameAr : selectedShade?.nameEn}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.nameEn}
                      onClick={() => setSelectedShade(shade)}
                      className={`group flex items-center gap-2 p-1.5 rounded-lg border transition-all ${
                        selectedShade?.nameEn === shade.nameEn
                          ? 'border-[#49363a] bg-[#f3dfe1]/50'
                          : 'border-[#eedcda] hover:border-[#b87982]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="text-xs text-[#49363a] font-medium">
                        {isAr ? shade.nameAr : shade.nameEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.availableSizes && (
              <div>
                <div className="text-xs font-semibold text-[#49363a] mb-2">
                  {isAr ? 'الحجم:' : 'Bottle Size:'}
                </div>
                <div className="flex items-center gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-1.5 text-xs font-medium rounded border transition-colors ${
                        selectedSize === size
                          ? 'bg-[#49363a] text-white border-[#49363a]'
                          : 'bg-white text-[#49363a] border-[#eedcda] hover:border-[#b87982]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#eedcda] rounded overflow-hidden w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2.5 text-sm font-bold text-[#49363a] hover:bg-[#fff8f5]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-xs font-bold font-mono tabular-nums text-[#49363a]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2.5 text-sm font-bold text-[#49363a] hover:bg-[#fff8f5]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={() => {
                  onAddToCart(product, quantity, selectedSize, selectedShade);
                  onClose();
                }}
                className="flex-1 py-3 px-6 bg-[#49363a] hover:bg-[#38282b] text-white text-sm font-medium rounded shadow-sm hover:shadow transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#f3dfe1]" />
                <span>{isAr ? 'أضيفي إلى السلة' : 'Add to Bag'}</span>
              </button>

              {/* WhatsApp Quick Inquire Link */}
              <a
                href={getWhatsAppLink(
                  isAr
                    ? `مرحباً كوينز للعطور، أود الاستفسار وطلب: ${product.nameAr} (${selectedSize}) بسعر ${formatPrice(product.priceSAR)}`
                    : `Hello Queens Perfume, I would like to order: ${product.nameEn} (${selectedSize}) at ${formatPrice(product.priceSAR)}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/40 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title={isAr ? 'طلب فوري عبر واتساب' : 'Order via WhatsApp'}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{isAr ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
