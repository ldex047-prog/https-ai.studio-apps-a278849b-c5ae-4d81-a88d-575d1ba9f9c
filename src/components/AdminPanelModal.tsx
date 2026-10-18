import React, { useState } from 'react';
import {
  X,
  Settings,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Phone,
  CreditCard,
  Package,
  ShoppingBag,
  HelpCircle,
  ExternalLink,
  RotateCcw,
  Sparkles,
  MessageCircle,
  Download,
} from 'lucide-react';
import { StoreSettings, Product, OrderDetails, Language } from '../types';
import { DEFAULT_STORE_SETTINGS } from '../config/store';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  onSaveSettings: (newSettings: StoreSettings) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateProductPrice: (productId: string, newPriceJOD: number) => void;
  orders: OrderDetails[];
  language: Language;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  products,
  onAddProduct,
  onDeleteProduct,
  onUpdateProductPrice,
  orders,
  language,
}) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'settings' | 'products' | 'orders' | 'guide'>('settings');

  // Form state for Store Settings
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form state for Adding New Product
  const [newProductNameAr, setNewProductNameAr] = useState('');
  const [newProductNameEn, setNewProductNameEn] = useState('');
  const [newCategory, setNewCategory] = useState<'perfume' | 'skincare' | 'cosmetics'>('perfume');
  const [newPriceJOD, setNewPriceJOD] = useState('');
  const [newVolume, setNewVolume] = useState('100 مل');
  const [newDescAr, setNewDescAr] = useState('');
  const [newTopNotes, setNewTopNotes] = useState('برغموت، ياسمين');
  const [newHeartNotes, setNewHeartNotes] = useState('ورد ملكي، عنبر');
  const [newBaseNotes, setNewBaseNotes] = useState('مسك، خشب الصندل');
  const [selectedPresetImage, setSelectedPresetImage] = useState(
    '/src/assets/images/hero_queens_perfume_1792268631444.jpg'
  );
  const [customImageUrl, setCustomImageUrl] = useState('');

  const [productSuccessMsg, setProductSuccessMsg] = useState<string | null>(null);
  const [productErrorMsg, setProductErrorMsg] = useState<string | null>(null);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPriceJOD, setTempPriceJOD] = useState<string>('');
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    setFormData({ ...DEFAULT_STORE_SETTINGS });
    onSaveSettings({ ...DEFAULT_STORE_SETTINGS });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductNameAr.trim() || !newPriceJOD) {
      setProductErrorMsg(isAr ? 'يرجى إدخال اسم المنتج وسعره بالدينار الأردني' : 'Please provide product name and price');
      return;
    }
    setProductErrorMsg(null);

    const priceJODNum = parseFloat(newPriceJOD);
    // Convert JOD to internal baseline SAR (1 JOD ≈ 5.26 SAR)
    const priceSAR = Math.round(priceJODNum / 0.19);

    const product: Product = {
      id: `custom-${Date.now()}`,
      nameAr: newProductNameAr,
      nameEn: newProductNameEn || newProductNameAr,
      category: newCategory,
      priceSAR,
      rating: 5.0,
      reviewCount: 1,
      volumeOrSize: newVolume,
      image: customImageUrl.trim() || selectedPresetImage,
      badgeAr: 'جديد وحصري',
      badgeEn: 'New Arrival',
      shortDescAr: newDescAr.slice(0, 80) || 'توليفة ملكية ساحرة من متجر كوينز للعطور.',
      shortDescEn: 'Exclusive royal creation from Queens Perfume.',
      descriptionAr: newDescAr || 'عطر فاخر مصنوع من أندر الزيوت العطرية والخلاصات النقية ليمنحكِ حضوراً ملكياً دائماً.',
      descriptionEn: 'Luxury fragrance crafted from rare essential oils for a sovereign signature.',
      concentration: 'Eau de Parfum / بارفان ملكي',
      fragranceNotes: {
        top: newTopNotes.split('،').map((s) => s.trim()).filter(Boolean),
        heart: newHeartNotes.split('،').map((s) => s.trim()).filter(Boolean),
        base: newBaseNotes.split('،').map((s) => s.trim()).filter(Boolean),
      },
    };

    onAddProduct(product);
    // Reset product form
    setNewProductNameAr('');
    setNewProductNameEn('');
    setNewPriceJOD('');
    setNewDescAr('');
    setCustomImageUrl('');
    setProductSuccessMsg(isAr ? 'تمت إضافة العطر بنجاح إلى متجركِ!' : 'Product added successfully!');
    setTimeout(() => setProductSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#eedcda] overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#fff8f5] border-b border-[#eedcda] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#49363a] text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5 text-[#f3dfe1]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-arabic-title text-[#49363a] font-bold">
                {isAr ? 'لوحة تحكم وإدارة متجر كوينز (الأردن)' : 'Queens Store Management Panel'}
              </h2>
              <p className="text-xs text-[#49363a]/70">
                {isAr
                  ? 'عدّلي رقم الواتساب، حساب كليك CliQ، أضيفي عطور جديدة، وراقبي طلبياتكِ بنفسكِ'
                  : 'Manage WhatsApp, CliQ alias, add creations, and review incoming orders'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:text-[#b87982] hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#eedcda] bg-white px-6 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#b87982] text-[#b87982]'
                : 'border-transparent text-[#49363a]/70 hover:text-[#49363a]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>{isAr ? 'حساباتي والدفع (CliQ والواتساب)' : 'Account & Payments'}</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#b87982] text-[#b87982]'
                : 'border-transparent text-[#49363a]/70 hover:text-[#49363a]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{isAr ? 'إضافة وتعديل العطور' : 'Manage Products'}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#b87982] text-[#b87982]'
                : 'border-transparent text-[#49363a]/70 hover:text-[#49363a]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {isAr ? 'سجل الطلبيات' : 'Orders'} ({orders.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#b87982] text-[#b87982]'
                : 'border-transparent text-[#49363a]/70 hover:text-[#49363a]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{isAr ? 'دليل الاستخدام والشرح' : 'How-to Guide'}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: SETTINGS & ACCOUNTS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              {savedSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'تم حفظ التعديلات بنجاح وتحديث كافة روابط المتجر والواتساب!' : 'Settings updated successfully!'}</span>
                </div>
              )}

              {/* Contact & WhatsApp */}
              <div className="p-5 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#49363a]">
                  <Phone className="w-4 h-4 text-[#b87982]" />
                  <span>{isAr ? 'إعدادات الواتساب واستقبال الطلبيات' : 'WhatsApp & Order Receiving'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'رقم الواتساب لاستقبال الرسائل (بدون مسافات أو إشارة +) *' : 'Raw WhatsApp Number *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="962776073101"
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] font-mono focus:outline-none focus:border-[#b87982]"
                    />
                    <span className="text-[10px] text-[#49363a]/60">
                      {isAr ? 'مثال: 962776073101 للأردن' : 'e.g. 962776073101 for Jordan'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'طريقة عرض الرقم لزبائنكِ *' : 'Display Phone *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.whatsappDisplay}
                      onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
                      placeholder="+962 7 7607 3101"
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] font-mono focus:outline-none focus:border-[#b87982]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Accounts (CliQ Jordan & Bank IBAN) */}
              <div className="p-5 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#49363a]">
                  <CreditCard className="w-4 h-4 text-[#b87982]" />
                  <span>{isAr ? 'بيانات التحويل الفوري كليك (CliQ الأردن) والحساب البنكي' : 'Jordan CliQ & Banking'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'الاسم المستعار في كليك (CliQ Alias) *' : 'CliQ Alias *'}
                    </label>
                    <input
                      type="text"
                      value={formData.cliqAlias}
                      onChange={(e) => setFormData({ ...formData, cliqAlias: e.target.value })}
                      placeholder="QUEENS.PERFUME أو رقم هاتفكِ"
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] font-mono focus:outline-none focus:border-[#b87982]"
                    />
                    <span className="text-[10px] text-[#49363a]/60">
                      {isAr ? 'يظهر للعملاء لتحويل قيمة الطلب مباشرة عبر كليك في الأردن' : 'Shown to customers for instant CliQ transfers'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'اسم البنك / الخدمة' : 'Bank / Service Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      placeholder="البنك العربي / كليك CliQ"
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] focus:outline-none focus:border-[#b87982]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'رقم الحساب الدولي (IBAN الأردن)' : 'Jordan IBAN'}
                    </label>
                    <input
                      type="text"
                      value={formData.iban}
                      onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                      placeholder="JO29 ARAB 0120 0000 0123 4567 8901 00"
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] font-mono focus:outline-none focus:border-[#b87982]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping & Announcement Bar */}
              <div className="p-5 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-4">
                <div className="text-sm font-bold text-[#49363a]">
                  {isAr ? 'الشحن وشريط الإعلانات في المتجر' : 'Store Announcements & Shipping'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'نص الشريط الإعلاني أعلى الموقع' : 'Top Announcement Text'}
                    </label>
                    <input
                      type="text"
                      value={formData.announcementAr}
                      onChange={(e) => setFormData({ ...formData, announcementAr: e.target.value })}
                      placeholder="توصيل سريع لكافة محافظات الأردن..."
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] focus:outline-none focus:border-[#b87982]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'الحد الأدنى للشحن المجاني (بالدينار الأردني JOD)' : 'Free Shipping Minimum (JOD)'}
                    </label>
                    <input
                      type="number"
                      value={formData.freeShippingMinJOD}
                      onChange={(e) =>
                        setFormData({ ...formData, freeShippingMinJOD: Number(e.target.value) || 0 })
                      }
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] font-mono focus:outline-none focus:border-[#b87982]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'مدة التوصيل الموضحة للعملاء' : 'Delivery Estimate'}
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryTimeJordan}
                      onChange={(e) => setFormData({ ...formData, deliveryTimeJordan: e.target.value })}
                      placeholder="خلال 24 إلى 48 ساعة"
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] focus:outline-none focus:border-[#b87982]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#eedcda]">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-xs text-[#49363a]/60 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'استعادة الإعدادات الأصلية' : 'Restore Defaults'}</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#49363a] hover:bg-[#38282b] text-white text-xs sm:text-sm font-semibold rounded shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Save className="w-4 h-4 text-[#f3dfe1]" />
                  <span>{isAr ? 'حفظ كافة التعديلات الآن' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PRODUCTS MANAGER (ADD & EDIT) */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              {/* Form to Add New Product */}
              <div className="p-6 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#49363a]">
                  <Plus className="w-4 h-4 text-[#b87982]" />
                  <span>{isAr ? 'إضافة عطر أو مستحضر جديد إلى المتجر' : 'Add New Fragrance or Beauty Item'}</span>
                </div>

                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#49363a] mb-1">
                        {isAr ? 'اسم العطر بالعربي *' : 'Product Name (Arabic) *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newProductNameAr}
                        onChange={(e) => setNewProductNameAr(e.target.value)}
                        placeholder="مثال: عطر جوري عمّان الملكي"
                        className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs text-[#49363a] focus:outline-none focus:border-[#b87982]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#49363a] mb-1">
                        {isAr ? 'اسم العطر بالإنجليزي (اختياري)' : 'Product Name (English)'}
                      </label>
                      <input
                        type="text"
                        value={newProductNameEn}
                        onChange={(e) => setNewProductNameEn(e.target.value)}
                        placeholder="e.g. Amman Royal Rose"
                        className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs text-[#49363a] focus:outline-none focus:border-[#b87982]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#49363a] mb-1">
                        {isAr ? 'القسم *' : 'Category *'}
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs text-[#49363a] focus:outline-none focus:border-[#b87982]"
                      >
                        <option value="perfume">{isAr ? 'العطور' : 'Perfumes'}</option>
                        <option value="skincare">{isAr ? 'العناية بالبشرة' : 'Skincare'}</option>
                        <option value="cosmetics">{isAr ? 'مستحضرات التجميل' : 'Cosmetics'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#49363a] mb-1">
                        {isAr ? 'السعر بالدينار الأردني (JOD) *' : 'Price (JOD) *'}
                      </label>
                      <input
                        type="number"
                        required
                        step="0.5"
                        value={newPriceJOD}
                        onChange={(e) => setNewPriceJOD(e.target.value)}
                        placeholder="مثال: 45 دينار"
                        className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs text-[#49363a] font-mono focus:outline-none focus:border-[#b87982]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#49363a] mb-1">
                        {isAr ? 'حجم القارورة' : 'Bottle Size'}
                      </label>
                      <input
                        type="text"
                        value={newVolume}
                        onChange={(e) => setNewVolume(e.target.value)}
                        placeholder="100 مل"
                        className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs text-[#49363a] focus:outline-none focus:border-[#b87982]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#49363a] mb-1">
                        {isAr ? 'صورة العطر (اختاري صورة مجهزة أو ضعي رابطاً)' : 'Product Image'}
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPresetImage('/src/assets/images/hero_queens_perfume_1792268631444.jpg')
                          }
                          className={`w-9 h-9 rounded border overflow-hidden shrink-0 ${
                            selectedPresetImage.includes('hero_queens') ? 'ring-2 ring-[#b87982]' : ''
                          }`}
                        >
                          <img
                            src="/src/assets/images/hero_queens_perfume_1792268631444.jpg"
                            className="w-full h-full object-cover"
                            alt="1"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPresetImage('/src/assets/images/category_perfume_flacon_1792268631917.jpg')
                          }
                          className={`w-9 h-9 rounded border overflow-hidden shrink-0 ${
                            selectedPresetImage.includes('flacon') ? 'ring-2 ring-[#b87982]' : ''
                          }`}
                        >
                          <img
                            src="/src/assets/images/category_perfume_flacon_1792268631917.jpg"
                            className="w-full h-full object-cover"
                            alt="2"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPresetImage('/src/assets/images/category_skincare_elixir_1792268632638.jpg')
                          }
                          className={`w-9 h-9 rounded border overflow-hidden shrink-0 ${
                            selectedPresetImage.includes('skincare') ? 'ring-2 ring-[#b87982]' : ''
                          }`}
                        >
                          <img
                            src="/src/assets/images/category_skincare_elixir_1792268632638.jpg"
                            className="w-full h-full object-cover"
                            alt="3"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPresetImage('/src/assets/images/category_cosmetics_luxury_1792268632757.jpg')
                          }
                          className={`w-9 h-9 rounded border overflow-hidden shrink-0 ${
                            selectedPresetImage.includes('cosmetics') ? 'ring-2 ring-[#b87982]' : ''
                          }`}
                        >
                          <img
                            src="/src/assets/images/category_cosmetics_luxury_1792268632757.jpg"
                            className="w-full h-full object-cover"
                            alt="4"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#49363a] mb-1">
                      {isAr ? 'وصف العطر وإحساسه' : 'Description'}
                    </label>
                    <textarea
                      rows={2}
                      value={newDescAr}
                      onChange={(e) => setNewDescAr(e.target.value)}
                      placeholder="نفحات ساحرة من الورد الجوري والعنبر الملكي..."
                      className="w-full bg-white border border-[#eedcda] rounded px-3 py-2 text-xs text-[#49363a] focus:outline-none focus:border-[#b87982]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#49363a] mb-1">
                        {isAr ? 'قمة العطر (مفصولة بفواصل)' : 'Top Notes'}
                      </label>
                      <input
                        type="text"
                        value={newTopNotes}
                        onChange={(e) => setNewTopNotes(e.target.value)}
                        className="w-full bg-white border border-[#eedcda] rounded px-2 py-1.5 text-xs text-[#49363a]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#49363a] mb-1">
                        {isAr ? 'قلب العطر' : 'Heart Notes'}
                      </label>
                      <input
                        type="text"
                        value={newHeartNotes}
                        onChange={(e) => setNewHeartNotes(e.target.value)}
                        className="w-full bg-white border border-[#eedcda] rounded px-2 py-1.5 text-xs text-[#49363a]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#49363a] mb-1">
                        {isAr ? 'قاعدة العطر' : 'Base Notes'}
                      </label>
                      <input
                        type="text"
                        value={newBaseNotes}
                        onChange={(e) => setNewBaseNotes(e.target.value)}
                        className="w-full bg-white border border-[#eedcda] rounded px-2 py-1.5 text-xs text-[#49363a]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#49363a] hover:bg-[#38282b] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4 text-[#f3dfe1]" />
                    <span>{isAr ? 'إضافة المنتج فوراً للمتجر' : 'Add Product'}</span>
                  </button>
                </form>
              </div>

              {/* Current Products List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#49363a]">
                  {isAr ? `المنتجات المعروضة حالياً (${products.length})` : `Active Creations (${products.length})`}
                </h3>

                {productSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{productSuccessMsg}</span>
                  </div>
                )}

                {productErrorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
                    {productErrorMsg}
                  </div>
                )}

                <div className="space-y-2">
                  {products.map((p) => {
                    const priceInJOD = Math.round(p.priceSAR * 0.19);
                    const isEditingThisPrice = editingPriceId === p.id;
                    const isDeletingThis = deletingProductId === p.id;

                    return (
                      <div
                        key={p.id}
                        className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.image}
                            alt={p.nameAr}
                            className="w-12 h-12 rounded object-cover border border-[#eedcda] shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#49363a] truncate">{p.nameAr}</h4>
                            <span className="text-[11px] text-[#49363a]/60">
                              {p.volumeOrSize} · {p.category === 'perfume' ? 'عطر' : p.category === 'skincare' ? 'عناية' : 'تجميل'}
                            </span>
                          </div>
                        </div>

                        {/* Inline price editing and delete */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isEditingThisPrice ? (
                            <div className="flex items-center gap-1.5 bg-[#fff8f5] p-1 border border-[#eedcda] rounded">
                              <input
                                type="number"
                                value={tempPriceJOD}
                                onChange={(e) => setTempPriceJOD(e.target.value)}
                                className="w-16 bg-white border border-[#eedcda] rounded px-1.5 py-0.5 text-xs font-mono font-bold text-[#49363a]"
                              />
                              <span className="text-[11px] text-[#49363a]/70">د.أ</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const val = parseFloat(tempPriceJOD);
                                  if (!isNaN(val) && val > 0) {
                                    onUpdateProductPrice(p.id, val);
                                  }
                                  setEditingPriceId(null);
                                }}
                                className="px-2 py-0.5 bg-[#49363a] text-white text-[10px] rounded hover:bg-[#38282b]"
                              >
                                حفظ
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingPriceId(null)}
                                className="px-1.5 py-0.5 text-[#49363a]/50 hover:text-[#49363a] text-[10px]"
                              >
                                إلغاء
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-mono font-bold text-[#49363a]">
                                {priceInJOD} د.أ
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPriceId(p.id);
                                  setTempPriceJOD(priceInJOD.toString());
                                }}
                                className="text-[11px] text-[#b87982] hover:underline px-1 cursor-pointer"
                              >
                                {isAr ? 'تعديل السعر' : 'Edit Price'}
                              </button>
                            </div>
                          )}

                          {isDeletingThis ? (
                            <div className="flex items-center gap-1 bg-rose-50 p-1 border border-rose-200 rounded text-[11px]">
                              <span className="text-rose-800 text-[10px]">تأكيد الحذف؟</span>
                              <button
                                type="button"
                                onClick={() => {
                                  onDeleteProduct(p.id);
                                  setDeletingProductId(null);
                                }}
                                className="px-1.5 py-0.5 bg-rose-600 text-white rounded text-[10px]"
                              >
                                نعم
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeletingProductId(null)}
                                className="px-1.5 py-0.5 text-rose-700 text-[10px]"
                              >
                                لا
                              </button>
                            </div>
                          ) : (
                            products.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setDeletingProductId(p.id)}
                                className="text-[#49363a]/40 hover:text-rose-600 p-1.5 rounded transition-colors cursor-pointer"
                                title={isAr ? 'حذف المنتج' : 'Delete'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INCOMING ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#49363a]">
                  {isAr ? 'الطلبيات الواردة من المتجر' : 'Customer Orders'}
                </h3>
                <span className="text-xs text-[#49363a]/60">
                  {isAr ? 'يتم حفظ كافة الطلبات تلقائياً هنا أيضاً' : 'All orders saved locally'}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-14 text-center space-y-2 bg-[#fff8f5] rounded-xl border border-[#eedcda]">
                  <ShoppingBag className="w-10 h-10 text-[#b87982] mx-auto" />
                  <p className="text-sm font-semibold text-[#49363a]">
                    {isAr ? 'لا توجد طلبيات بعد' : 'No orders yet'}
                  </p>
                  <p className="text-xs text-[#49363a]/60 max-w-sm mx-auto">
                    {isAr
                      ? 'عندما تطلب أي عميلة من الموقع، ستصلكِ رسالة واتساب فورية وستظهر بياناتها هنا فوراً.'
                      : 'When customers place orders, details will appear here and on your WhatsApp.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="p-4 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-[#eedcda] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#b87982] font-mono">{order.orderId}</span>
                          <span className="text-[#49363a]/60">· {order.date}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium text-[11px]">
                          {order.paymentMethod === 'cliq'
                            ? (isAr ? 'كليك CliQ' : 'CliQ')
                            : order.paymentMethod === 'cod'
                            ? (isAr ? 'الدفع عند الاستلام' : 'COD')
                            : (isAr ? 'بطاقة ائتمانية' : 'Card')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#49363a]">
                        <div>
                          <strong>{isAr ? 'العميلة:' : 'Customer:'}</strong> {order.customerName} (
                          <span dir="ltr">{order.phone}</span>)
                        </div>
                        <div>
                          <strong>{isAr ? 'المدينة والعنوان:' : 'Address:'}</strong> {order.city} - {order.address}
                        </div>
                      </div>

                      <div className="text-[#49363a]/80">
                        <strong>{isAr ? 'المنتجات:' : 'Items:'}</strong>{' '}
                        {order.items
                          .map((i) => `${isAr ? i.product.nameAr : i.product.nameEn} (×${i.quantity})`)
                          .join('، ')}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#eedcda] font-bold text-sm">
                        <span>
                          {isAr ? 'المجموع:' : 'Total:'}{' '}
                          <span className="font-mono text-[#b87982]">{order.total} {isAr ? 'ر.س أو ما يعادله' : 'Total'}</span>
                        </span>

                        <a
                          href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            isAr
                              ? `مرحباً ${order.customerName}، يسعدنا في كوينز للعطور تأكيد طلبيتكِ رقم ${order.orderId} وهي قيد التجهيز الآن للشحن إلى ${order.city} 👑`
                              : `Hello ${order.customerName}, confirming your order ${order.orderId} 👑`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 bg-[#25D366] text-white rounded text-xs font-medium flex items-center gap-1 hover:bg-[#20ba5a]"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{isAr ? 'مراسلة العميلة' : 'Chat Customer'}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: HOW-TO GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#49363a] leading-relaxed">
              <div className="p-5 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-[#b87982]">
                  <Sparkles className="w-5 h-5" />
                  <span>دليل خطوة بخطوة: كيف تديرين متجركِ وتعدلين حساباتكِ بنفسكِ</span>
                </div>
                <p className="text-xs text-[#49363a]/80 leading-relaxed">
                  تم تصميم متجر كوينز ليكون ملككِ بالكامل ومستقلاً تماماً، بحيث يمكنكِ تعديل أي شيء بضغطة زر دون الحاجة لأي مبرمج أو أدوات معقدة:
                </p>
              </div>

              {/* Step 1 */}
              <div className="p-4 border border-[#eedcda] rounded-xl bg-white space-y-2">
                <h4 className="font-bold text-[#49363a] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>تغيير رقم الواتساب الذي يستقبل الطلبيات</span>
                </h4>
                <p className="text-xs text-[#49363a]/80">
                  من تبويب <strong>«حساباتي والدفع»</strong>، يمكنكِ تغيير رقم الهاتف المخصص للواتساب متى شئتِ. بمجرد الضغط على «حفظ»، ستتغير كافة الأزرار وروابط الطلبات في المتجر إلى رقمكِ الجديد فوراً.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 border border-[#eedcda] rounded-xl bg-white space-y-2">
                <h4 className="font-bold text-[#49363a] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>تعديل حساب كليك (CliQ) والحساب البنكي الأردني</span>
                </h4>
                <p className="text-xs text-[#49363a]/80">
                  أدخلي اسم كليك المستعار الخاص بكِ (CliQ Alias) مثل رقم هاتفكِ أو اسم المتجر. عندما تختار الزبونة الدفع عبر كليك، سيظهر لها هذا الاسم مع زر نسخ سريع لتحويل المبلغ فوراً إلى حسابكِ البنكي الأردني.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 border border-[#eedcda] rounded-xl bg-white space-y-2">
                <h4 className="font-bold text-[#49363a] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>إضافة عطور أو منتجات جديدة وتعديل الأسعار</span>
                </h4>
                <p className="text-xs text-[#49363a]/80">
                  من تبويب <strong>«إضافة وتعديل العطور»</strong>، يمكنكِ إضافة أي عطر جديد مع اسمه بالدينار الأردني ووصفه ومكوناته وصورته، وسيظهر في المعرض فوراً أمام جميع الزائرات. كما يمكنكِ تعديل سعر أي عطر موجود بنقرة واحدة على «تعديل السعر».
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-4 border border-[#eedcda] rounded-xl bg-white space-y-2">
                <h4 className="font-bold text-[#49363a] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>أين أجد هذا الزر مستقبلاً؟</span>
                </h4>
                <p className="text-xs text-[#49363a]/80">
                  ستجدين دائماً زراً ثابتاً في أعلى الموقع وفي أسفل الصفحة يحمل اسم <strong>«إدارة متجري / حسابي ⚙️»</strong> يفتح لكِ هذه اللوحة مباشرة في أي وقت لتعديل ما ترغبين به.
                </p>
              </div>

              {/* Step 5 / Export Project for Vercel */}
              <div className="p-5 border-2 border-[#b87982]/30 rounded-xl bg-[#fff8f5] space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-[#49363a] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#b87982] text-white flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    <span>{isAr ? 'تصدير وتحميل المشروع كاملاً (ملف ZIP جاهز لـ Vercel)' : 'Export & Download Project for Vercel (ZIP)'}</span>
                  </h4>
                  <a
                    href="/queens-perfume-project.zip"
                    download="queens-perfume-project.zip"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#49363a] hover:bg-[#38282b] text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#f3dfe1]" />
                    <span>{isAr ? 'تحميل المشروع كاملاً (ZIP)' : 'Download Project ZIP'}</span>
                  </a>
                </div>
                <p className="text-xs text-[#49363a]/80">
                  {isAr
                    ? 'يحتوي الملف المضغوط على كامل الشيفرة المصدرية للمتجر، ملفات التكوين (package.json و vite.config.ts و vercel.json)، وتصميم المتجر بالكامل، جاهز فوراً للنشر على منصة Vercel بنقرة واحدة.'
                    : 'The ZIP archive contains the complete source code and configurations (package.json, vite.config.ts, vercel.json) ready for instant deployment on Vercel.'}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
