import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FragranceQuizModal } from './components/FragranceQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPanelModal } from './components/AdminPanelModal';
import { InstallAppModal } from './components/InstallAppModal';
import { PRODUCTS } from './data/products';
import { DEFAULT_STORE_SETTINGS } from './config/store';
import {
  Product,
  CartItem,
  Currency,
  Language,
  CategoryType,
  OrderDetails,
  StoreSettings,
} from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  // Default currency is Jordanian Dinar (JOD)
  const [currency, setCurrency] = useState<Currency>('JOD');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');

  // Store Settings (saved in localStorage so the owner can edit independently)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('queens_store_settings');
      return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  // Dynamic Products List (initialized from default PRODUCTS, customizable by owner)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('queens_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('queens_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with localStorage persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('queens_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders History
  const [ordersList, setOrdersList] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('queens_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' | 'info' } | null>(null);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('queens_store_settings', JSON.stringify(storeSettings));
    } catch (e) {
      console.error(e);
    }
  }, [storeSettings]);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('queens_products', JSON.stringify(productsList));
    } catch (e) {
      console.error(e);
    }
  }, [productsList]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('queens_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('queens_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('queens_orders', JSON.stringify(ordersList));
    } catch (e) {
      console.error(e);
    }
  }, [ordersList]);

  // Sync language attribute & direction to HTML document
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    shade?: any
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedShade?.nameEn === shade?.nameEn
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: size || product.availableSizes?.[0] || product.volumeOrSize,
            selectedShade: shade || product.shades?.[0],
          },
        ];
      }
    });

    const msg =
      language === 'ar'
        ? `تمت إضافة "${product.nameAr}" إلى سلتكِ الملكية`
        : `Added "${product.nameEn}" to your bag`;
    showToast(msg, 'cart');
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleToggleWishlist = (productId: string) => {
    const product = productsList.find((p) => p.id === productId);
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        const msg =
          language === 'ar'
            ? `تمت إزالة المنتج من المفضلة`
            : `Removed from wishlist`;
        showToast(msg, 'wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        const msg =
          language === 'ar'
            ? `أضيف "${product?.nameAr || 'المنتج'}" إلى قائمة أمنياتكِ`
            : `Added to your wishlist`;
        showToast(msg, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  const handleCategorySelection = (cat: CategoryType) => {
    setSelectedCategory(cat);
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const categoriesElem = document.getElementById('categories');
    if (categoriesElem) {
      categoriesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = (discountPercent: number) => {
    setCheckoutDiscount(discountPercent);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setOrdersList((prev) => [order, ...prev]);
    setCart([]);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProductsList((prev) => [newProduct, ...prev]);
    showToast(
      language === 'ar'
        ? `تمت إضافة "${newProduct.nameAr}" بنجاح إلى المعرض`
        : `Added "${newProduct.nameEn}" to catalog`,
      'info'
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
    showToast(
      language === 'ar' ? 'تم حذف المنتج من المتجر' : 'Product removed',
      'info'
    );
  };

  const handleUpdateProductPrice = (productId: string, newPriceJOD: number) => {
    // 1 JOD ≈ 5.26 SAR
    const priceSAR = Math.round(newPriceJOD / 0.19);
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, priceSAR } : p))
    );
    showToast(
      language === 'ar' ? 'تم تحديث السعر بنجاح' : 'Price updated successfully',
      'info'
    );
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f5] text-[#49363a] font-arabic-title selection:bg-[#f3dfe1] selection:text-[#49363a]">
      {/* Header */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
        language={language}
        onToggleLanguage={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
        announcementText={
          language === 'ar' ? storeSettings.announcementAr : storeSettings.announcementEn
        }
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onExploreClick={handleExploreClick}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 3 Core Categories Showcase */}
        <CategoryShowcase
          language={language}
          onSelectCategory={handleCategorySelection}
        />

        {/* Full Featured Product Catalog */}
        <ProductCatalog
          products={productsList}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenProductDetail={setActiveModalProduct}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          currency={currency}
          language={language}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={activeModalProduct ? wishlistIds.includes(activeModalProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        currency={currency}
        language={language}
      />

      {/* Interactive Scent Finder Quiz */}
      <FragranceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onOpenProductDetail={setActiveModalProduct}
        currency={currency}
        language={language}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        currency={currency}
        language={language}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountPercent={checkoutDiscount}
        currency={currency}
        language={language}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={productsList}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onOpenProductDetail={setActiveModalProduct}
        currency={currency}
        language={language}
      />

      {/* Store Owner Admin / Self-Management Panel */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={storeSettings}
        onSaveSettings={(newSet) => {
          setStoreSettings(newSet);
          showToast(
            language === 'ar' ? 'تم تحديث إعدادات المتجر بنجاح' : 'Settings updated',
            'info'
          );
        }}
        products={productsList}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProductPrice={handleUpdateProductPrice}
        orders={ordersList}
        language={language}
      />

      {/* Mobile App Install Modal */}
      <InstallAppModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        language={language}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp
        language={language}
        phoneRaw={storeSettings.whatsapp}
        phoneDisplay={storeSettings.whatsappDisplay}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
