import React from 'react';
import { ShoppingBag, Heart, Sparkles, Globe, Settings } from 'lucide-react';
import { Currency, Language } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onOpenAdmin: () => void;
  onOpenInstall?: () => void;
  language: Language;
  onToggleLanguage: () => void;
  currency: Currency;
  onSelectCurrency: (c: Currency) => void;
  announcementText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onOpenAdmin,
  onOpenInstall,
  language,
  onToggleLanguage,
  currency,
  onSelectCurrency,
  announcementText,
}) => {
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#eedcda] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#49363a] text-white text-[12px] py-1.5 px-4 text-center tracking-wider flex items-center justify-center gap-2 flex-wrap">
        <span>
          {announcementText ||
            (isAr
              ? 'توصيل سريع لكافة محافظات الأردن مع عينات عطرية ملكية مجانية 👑'
              : 'Express delivery across Jordan with complimentary royal samples 👑')}
        </span>
        {onOpenInstall && (
          <button
            onClick={onOpenInstall}
            className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full font-bold cursor-pointer transition-colors"
          >
            📱 {isAr ? 'تثبيت على الشاشة' : 'Install App'}
          </button>
        )}
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#home"
            className="text-2xl sm:text-3xl font-display-luxury tracking-[0.22em] text-[#b87982] font-semibold uppercase whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
            title="Queens Perfume & Beauty"
          >
            QUEENS
          </a>
          <span className="hidden sm:inline-block text-[11px] tracking-[0.2em] uppercase text-[#49363a]/60 font-body border-s border-[#eedcda] ps-3">
            Perfume & Beauty
          </span>
        </div>

        {/* Zone 2: Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#49363a] whitespace-nowrap">
          <a
            href="#home"
            className="hover:text-[#b87982] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#b87982]"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </a>
          <a
            href="#categories"
            className="hover:text-[#b87982] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#b87982]"
          >
            {isAr ? 'الأقسام' : 'Categories'}
          </a>
          <a
            href="#catalog"
            className="hover:text-[#b87982] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#b87982]"
          >
            {isAr ? 'المجموعة الملكية' : 'Collection'}
          </a>
          <button
            onClick={onOpenQuiz}
            className="hover:text-[#b87982] transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#b87982] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b87982]" />
            <span>{isAr ? 'مستشار العطور' : 'Scent Finder'}</span>
          </button>
          <a
            href="#contact"
            className="hover:text-[#b87982] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#b87982]"
          >
            {isAr ? 'تواصلي معنا' : 'Contact'}
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Wishlist, Currency/Lang, Cart CTA) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className="relative inline-block text-xs text-[#49363a]">
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as Currency)}
              className="bg-transparent border border-[#eedcda] rounded px-2 py-1.5 text-xs text-[#49363a] focus:outline-none focus:border-[#b87982] cursor-pointer"
              aria-label="Currency"
            >
              <option value="JOD">JOD (د.أ)</option>
              <option value="SAR">SAR (ر.س)</option>
              <option value="AED">AED (د.إ)</option>
              <option value="KWD">KWD (د.ك)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 text-xs text-[#49363a] hover:text-[#b87982] px-2 py-1.5 border border-[#eedcda] rounded transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#b87982]" />
            <span className="font-semibold uppercase">{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#49363a] hover:text-[#b87982] transition-colors"
            title={isAr ? 'قائمة الأمنيات' : 'Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 -end-1 bg-[#b87982] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Store Owner Admin / Settings Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 p-1.5 px-2.5 text-xs text-[#49363a] hover:text-[#b87982] border border-[#eedcda] rounded hover:bg-[#fff8f5] transition-colors"
            title={isAr ? 'لوحة تحكم المتجر وتعديل حساباتي' : 'Store Admin & Accounts'}
          >
            <Settings className="w-3.5 h-3.5 text-[#b87982]" />
            <span className="hidden sm:inline font-medium text-[11px]">
              {isAr ? 'إدارة المتجر' : 'Admin'}
            </span>
          </button>

          {/* Primary Action: Shopping Cart Drawer Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#49363a] text-white px-4 py-2.5 rounded hover:bg-[#38282b] transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#f3dfe1]" />
            <span className="text-sm font-medium whitespace-nowrap">
              {isAr ? 'السلة' : 'Bag'}
            </span>
            <span className="bg-[#b87982] text-white text-xs px-1.5 py-0.2 rounded-full font-bold min-w-5 text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
