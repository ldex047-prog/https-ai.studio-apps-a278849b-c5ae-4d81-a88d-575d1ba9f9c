import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { CartItem, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (discountPercent: number) => void;
  currency: Currency;
  language: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency,
  language,
}) => {
  const isAr = language === 'ar';
  const currencyConfig = CURRENCY_RATES[currency];
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currencyConfig.rate);
    const symbol = isAr ? currencyConfig.symbolAr : currencyConfig.symbolEn;
    return `${converted} ${symbol}`;
  };

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.priceSAR * item.quantity,
    0
  );

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const freeShippingThreshold = 350;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const freeShippingProgress = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'QUEEN10' || code === 'QUEENS10') {
      setDiscountPercent(10);
      setPromoMessage({
        text: isAr ? 'تم تطبيق خصم الملوكية 10% بنجاح!' : '10% Royal privilege discount applied!',
        error: false,
      });
    } else if (code === 'VIP20' && rawSubtotal >= 500) {
      setDiscountPercent(20);
      setPromoMessage({
        text: isAr ? 'تم تفعيل خصم VIP بقيمة 20%!' : 'VIP 20% discount unlocked!',
        error: false,
      });
    } else {
      setDiscountPercent(0);
      setPromoMessage({
        text: isAr ? 'كوبون غير صالح. جربي كود: QUEEN10' : 'Invalid promo. Try code: QUEEN10',
        error: true,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Drawer Container */}
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl border-s border-[#eedcda] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#eedcda] flex items-center justify-between bg-[#fff8f5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#b87982]" />
            <h3 className="text-lg font-arabic-title text-[#49363a] font-semibold">
              {isAr ? 'حقيبة التسوق الملكية' : 'Royal Shopping Bag'}
            </h3>
            <span className="text-xs text-[#49363a]/60">
              ({items.reduce((acc, curr) => acc + curr.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:text-[#b87982] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-[#f3dfe1]/30 border-b border-[#eedcda]">
          <div className="flex items-center justify-between text-xs text-[#49363a]">
            {amountToFreeShipping > 0 ? (
              <span>
                {isAr ? (
                  <>
                    أضيفي <strong className="font-mono text-[#b87982]">{formatPrice(amountToFreeShipping)}</strong> للحصول على شحن مجاني
                  </>
                ) : (
                  <>
                    Add <strong className="font-mono text-[#b87982]">{formatPrice(amountToFreeShipping)}</strong> for free luxury shipping
                  </>
                )}
              </span>
            ) : (
              <span className="font-semibold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {isAr ? 'تهانينا! طلبيتكِ مؤهلة لشحن ملكي مجاني' : 'Congratulations! Your order qualifies for free delivery'}
              </span>
            )}
            <span className="text-[11px] font-mono text-[#49363a]/60">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full bg-[#eedcda] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#b87982] h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#fff8f5] border border-[#eedcda] flex items-center justify-center text-[#b87982]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-semibold text-[#49363a]">
                {isAr ? 'حقيبة التسوق فارغة' : 'Your bag is empty'}
              </h4>
              <p className="text-xs text-[#49363a]/70 max-w-xs">
                {isAr
                  ? 'اختاري عطركِ المفضل أو مستحضر العناية ودللي نفسكِ بلحظة استثنائية.'
                  : 'Choose your signature fragrance or skincare and indulge in a moment of luxury.'}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#49363a] text-white text-xs font-semibold rounded hover:bg-[#38282b]"
              >
                {isAr ? 'تصفح المجموعة' : 'Explore Collections'}
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${index}`}
                className="flex gap-3 pb-4 border-b border-[#eedcda]/70 items-start"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 rounded-lg overflow-hidden bg-[#fff8f5] border border-[#eedcda] shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#49363a] line-clamp-1">
                    {isAr ? item.product.nameAr : item.product.nameEn}
                  </h4>

                  <div className="text-[11px] text-[#49363a]/70 mt-0.5 space-x-1">
                    {item.selectedSize && <span>{item.selectedSize}</span>}
                    {item.selectedShade && (
                      <span> · {isAr ? item.selectedShade.nameAr : item.selectedShade.nameEn}</span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-[#49363a] font-mono tabular-nums mt-1">
                    {formatPrice(item.product.priceSAR * item.quantity)}
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[#eedcda] rounded text-xs">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-[#fff8f5] text-[#49363a]"
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono tabular-nums text-[11px] font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-[#fff8f5] text-[#49363a]"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-[#49363a]/50 hover:text-rose-600 transition-colors p-1"
                      title={isAr ? 'حذف' : 'Remove'}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#eedcda] bg-[#fff8f5] space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={isAr ? 'كود الخصم (جربي QUEEN10)' : 'Promo Code (try QUEEN10)'}
                  className="w-full bg-white border border-[#eedcda] rounded px-3 py-1.5 text-xs text-[#49363a] placeholder:text-[#49363a]/40 focus:outline-none focus:border-[#b87982]"
                />
                <Tag className="w-3.5 h-3.5 text-[#49363a]/40 absolute end-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#49363a] text-white text-xs font-semibold rounded hover:bg-[#38282b] transition-colors"
              >
                {isAr ? 'تطبيق' : 'Apply'}
              </button>
            </form>

            {promoMessage && (
              <p
                className={`text-[11px] ${
                  promoMessage.error ? 'text-rose-600' : 'text-emerald-700 font-medium'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#49363a]">
              <div className="flex justify-between">
                <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-mono tabular-nums">{formatPrice(rawSubtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>{isAr ? `خصم ملكي (${discountPercent}%)` : `Privilege Discount (${discountPercent}%)`}</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#49363a]/75">
                <span>{isAr ? 'الشحن والتوصيل' : 'Delivery'}</span>
                <span className="font-mono">
                  {amountToFreeShipping === 0
                    ? isAr ? 'مجاني بالكامل' : 'Complimentary'
                    : formatPrice(35)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#eedcda] flex justify-between text-sm font-bold text-[#49363a]">
                <span>{isAr ? 'الإجمالي التقديري' : 'Estimated Total'}</span>
                <span className="font-mono tabular-nums text-base">
                  {formatPrice(
                    subtotalAfterDiscount + (amountToFreeShipping === 0 ? 0 : 35)
                  )}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onProceedToCheckout(discountPercent)}
              className="w-full py-3 bg-[#49363a] hover:bg-[#38282b] text-white text-sm font-medium rounded shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>{isAr ? 'متابعة الدفع والطلب' : 'Proceed to Checkout'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#49363a]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b87982]" />
              <span>{isAr ? 'دفع آمن 100% ومعتمد في الخليج' : '100% Encrypted & Secure Checkout'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
