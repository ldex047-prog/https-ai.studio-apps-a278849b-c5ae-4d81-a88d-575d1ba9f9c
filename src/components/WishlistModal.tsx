import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onOpenProductDetail: (p: Product) => void;
  currency: Currency;
  language: Language;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProductDetail,
  currency,
  language,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const currencyConfig = CURRENCY_RATES[currency];

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currencyConfig.rate);
    const symbol = isAr ? currencyConfig.symbolAr : currencyConfig.symbolEn;
    return `${converted} ${symbol}`;
  };

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#eedcda] overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#eedcda]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#b87982] text-[#b87982]" />
            <h3 className="text-xl font-arabic-title text-[#49363a] font-semibold">
              {isAr ? 'قائمة الأمنيات الملكية' : 'Royal Wishlist'}
            </h3>
            <span className="text-xs text-[#49363a]/60">({wishlistedProducts.length})</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:text-[#b87982]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 max-h-[60vh] overflow-y-auto space-y-3">
          {wishlistedProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Heart className="w-10 h-10 text-[#eedcda] mx-auto" />
              <p className="text-sm text-[#49363a]/70">
                {isAr
                  ? 'لم تقومي بإضافة أي منتجات إلى قائمتكِ بعد.'
                  : 'You have not added any creations to your wishlist yet.'}
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-[#eedcda] bg-[#fff8f5]/40 hover:bg-[#fff8f5] transition-colors"
              >
                <div
                  onClick={() => {
                    onClose();
                    onOpenProductDetail(product);
                  }}
                  className="w-16 h-16 rounded overflow-hidden bg-white shrink-0 border border-[#eedcda] cursor-pointer"
                >
                  <img src={product.image} alt={product.nameEn} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onClose();
                      onOpenProductDetail(product);
                    }}
                    className="text-xs font-semibold text-[#49363a] hover:text-[#b87982] cursor-pointer truncate"
                  >
                    {isAr ? product.nameAr : product.nameEn}
                  </h4>
                  <div className="text-[11px] text-[#49363a]/60 mt-0.5">
                    {product.volumeOrSize}
                  </div>
                  <div className="text-xs font-bold font-mono text-[#49363a] mt-1">
                    {formatPrice(product.priceSAR)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product.id);
                    }}
                    className="p-2 bg-[#49363a] hover:bg-[#38282b] text-white rounded text-xs flex items-center gap-1 transition-colors"
                    title={isAr ? 'نقل إلى السلة' : 'Move to bag'}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isAr ? 'للسلة' : 'Bag'}</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2 text-[#49363a]/50 hover:text-rose-600 rounded"
                    title={isAr ? 'حذف' : 'Remove'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
