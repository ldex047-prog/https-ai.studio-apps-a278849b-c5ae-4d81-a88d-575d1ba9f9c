import React, { useState, useMemo } from 'react';
import { Search, Heart, Eye, ShoppingBag, Star, SlidersHorizontal } from 'lucide-react';
import { Product, CategoryType, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: CategoryType | 'all';
  onSelectCategory: (cat: CategoryType | 'all') => void;
  onOpenProductDetail: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  currency: Currency;
  language: Language;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenProductDetail,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  currency,
  language,
}) => {
  const isAr = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const currencyConfig = CURRENCY_RATES[currency];

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currencyConfig.rate);
    const symbol = isAr ? currencyConfig.symbolAr : currencyConfig.symbolEn;
    return `${converted} ${symbol}`;
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchNameAr = item.nameAr.toLowerCase().includes(query);
        const matchNameEn = item.nameEn.toLowerCase().includes(query);
        const matchDescAr = item.descriptionAr.toLowerCase().includes(query);
        const matchDescEn = item.descriptionEn.toLowerCase().includes(query);
        const matchNotes = item.fragranceNotes
          ? [...item.fragranceNotes.top, ...item.fragranceNotes.heart, ...item.fragranceNotes.base]
              .join(' ')
              .toLowerCase()
              .includes(query)
          : false;

        if (!matchNameAr && !matchNameEn && !matchDescAr && !matchDescEn && !matchNotes) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceSAR - b.priceSAR;
      if (sortBy === 'price-desc') return b.priceSAR - a.priceSAR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-white border-b border-[#eedcda]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#eedcda]">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#b87982] uppercase mb-1">
              {isAr ? 'المختارات الملكية' : 'Royal Selection'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-arabic-title text-[#49363a] font-normal">
              {isAr ? 'مجموعتنا الفاخرة' : 'Our Exclusive Creations'}
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#fff8f5] border border-[#eedcda] rounded-lg overflow-x-auto max-w-full">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#49363a] text-white shadow-xs'
                  : 'text-[#49363a] hover:text-[#b87982]'
              }`}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => onSelectCategory('perfume')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'perfume'
                  ? 'bg-[#49363a] text-white shadow-xs'
                  : 'text-[#49363a] hover:text-[#b87982]'
              }`}
            >
              {isAr ? 'العطور' : 'Perfumes'}
            </button>
            <button
              onClick={() => onSelectCategory('skincare')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'skincare'
                  ? 'bg-[#49363a] text-white shadow-xs'
                  : 'text-[#49363a] hover:text-[#b87982]'
              }`}
            >
              {isAr ? 'العناية بالبشرة' : 'Skincare'}
            </button>
            <button
              onClick={() => onSelectCategory('cosmetics')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'cosmetics'
                  ? 'bg-[#49363a] text-white shadow-xs'
                  : 'text-[#49363a] hover:text-[#b87982]'
              }`}
            >
              {isAr ? 'مستحضرات التجميل' : 'Cosmetics'}
            </button>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحثي عن عطر، مكون، أو مستحضر...' : 'Search for scents, ingredients, beauty...'}
              className="w-full bg-[#fff8f5] border border-[#eedcda] rounded-lg ps-10 pe-4 py-2 text-xs sm:text-sm text-[#49363a] placeholder:text-[#49363a]/50 focus:outline-none focus:border-[#b87982]"
            />
            <Search className="w-4 h-4 text-[#49363a]/60 absolute start-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#49363a]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#b87982]" />
            <span className="font-medium whitespace-nowrap">{isAr ? 'ترتيب حسب:' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#fff8f5] border border-[#eedcda] rounded px-3 py-1.5 text-xs text-[#49363a] focus:outline-none focus:border-[#b87982] cursor-pointer"
            >
              <option value="featured">{isAr ? 'المميز والأعلى طلباً' : 'Featured & Bestselling'}</option>
              <option value="price-asc">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              <option value="rating">{isAr ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <p className="text-lg text-[#49363a]/80">
              {isAr ? 'لم نعثر على نتائج مطابقة لبحثكِ' : 'No matching creations found for your search'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#b87982] border border-[#b87982] rounded hover:bg-[#fff8f5]"
            >
              {isAr ? 'إعادة ضبط البحث' : 'Reset Search Filters'}
            </button>
          </div>
        )}

        {/* Products Grid: 3-column desktop baseline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-4">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-[#fff8f5]/40 border border-[#eedcda] rounded-xl overflow-hidden hover:border-[#b87982] transition-all duration-300 hover:shadow-md flex flex-col"
              >
                {/* Product Card Image Frame: 65-75% visual weight */}
                <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={isAr ? product.nameAr : product.nameEn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Single Clean Tag if applicable */}
                  {product.badgeAr && (
                    <div className="absolute top-3 start-3 bg-[#49363a]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded tracking-wide shadow-xs">
                      {isAr ? product.badgeAr : product.badgeEn}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:text-[#b87982] transition-colors shadow-xs active:scale-90"
                    title={isWishlisted ? (isAr ? 'إزالة من المفضلة' : 'Remove from wishlist') : (isAr ? 'إضافة للمفضلة' : 'Add to wishlist')}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-[#b87982] text-[#b87982]' : ''}`}
                    />
                  </button>

                  {/* Quick View Hover Button */}
                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="absolute bottom-3 inset-x-4 bg-white/95 text-[#49363a] py-2 px-3 rounded text-xs font-semibold tracking-wide border border-[#eedcda] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 hover:bg-[#fff8f5]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#b87982]" />
                    <span>{isAr ? 'معاينة سريعة والتفاصيل' : 'Quick Details'}</span>
                  </button>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed metadata: Category · Size · Rating */}
                    <div className="flex items-center gap-2 text-[12px] text-[#49363a]/70 font-medium">
                      <span>{product.category === 'perfume' ? (isAr ? 'عطور' : 'Perfume') : product.category === 'skincare' ? (isAr ? 'عناية بالبشرة' : 'Skincare') : (isAr ? 'تجميل' : 'Cosmetics')}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.volumeOrSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-0.5 text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="tabular-nums font-mono text-[11px]">{product.rating}</span>
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onOpenProductDetail(product)}
                      className="mt-1 text-base font-semibold text-[#49363a] group-hover:text-[#b87982] transition-colors cursor-pointer line-clamp-1"
                    >
                      {isAr ? product.nameAr : product.nameEn}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-1 text-xs text-[#49363a]/75 line-clamp-2 leading-relaxed">
                      {isAr ? product.shortDescAr : product.shortDescEn}
                    </p>
                  </div>

                  {/* Price & Add to Bag Row */}
                  <div className="pt-3 border-t border-[#eedcda]/70 flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#49363a] tabular-nums font-mono">
                        {formatPrice(product.priceSAR)}
                      </span>
                      {product.originalPriceSAR && (
                        <span className="text-xs text-[#49363a]/50 line-through tabular-nums font-mono">
                          {formatPrice(product.originalPriceSAR)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3.5 py-1.5 bg-[#49363a] hover:bg-[#38282b] text-white text-xs font-medium rounded transition-colors active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      aria-label="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#f3dfe1]" />
                      <span>{isAr ? 'أضيفي للسلة' : 'Add to Bag'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
