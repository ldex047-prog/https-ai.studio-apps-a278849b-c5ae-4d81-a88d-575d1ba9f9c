import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { CartItem, Currency, Language, OrderDetails } from '../types';
import { CURRENCY_RATES } from '../data/products';
import { STORE_CONFIG, getWhatsAppLink } from '../config/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  currency: Currency;
  language: Language;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  currency,
  language,
  onOrderSuccess,
}) => {
  const isAr = language === 'ar';
  const currencyConfig = CURRENCY_RATES[currency];
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(isAr ? 'عَمّان' : 'Amman');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'cliq' | 'card' | 'apple_pay'>('cliq');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedCliq, setCopiedCliq] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.priceSAR * item.quantity,
    0
  );
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const shipping = rawSubtotal >= 350 ? 0 : 35;
  const grandTotal = subtotalAfterDiscount + shipping;

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currencyConfig.rate);
    const symbol = isAr ? currencyConfig.symbolAr : currencyConfig.symbolEn;
    return `${converted} ${symbol}`;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setErrorMessage(isAr ? 'يرجى تعبئة كافة الحقول المطلوبة لإتمام طلبكِ الملكي.' : 'Please fill all required fields.');
      return;
    }
    setErrorMessage(null);

    const newOrder: OrderDetails = {
      orderId: `QN-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: name,
      phone,
      city,
      address,
      paymentMethod,
      items,
      subtotal: rawSubtotal,
      discount: discountAmount,
      shipping,
      total: grandTotal,
      currency,
      date: new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US'),
    };

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);
  };

  const getWhatsAppOrderUrl = () => {
    if (!confirmedOrder) return '#';
    const itemsList = confirmedOrder.items
      .map(
        (it) =>
          `• ${isAr ? it.product.nameAr : it.product.nameEn} (${it.selectedSize || it.product.volumeOrSize}) × ${it.quantity}`
      )
      .join('\n');

    const message = isAr
      ? `👑 *طلب جديد من متجر كوينز للعطور*\n\n*رقم الطلب:* ${confirmedOrder.orderId}\n*الاسم:* ${confirmedOrder.customerName}\n*الهاتف:* ${confirmedOrder.phone}\n*المدينة:* ${confirmedOrder.city}\n*العنوان:* ${confirmedOrder.address}\n*طريقة الدفع:* ${confirmedOrder.paymentMethod === 'cliq' ? 'كليك CliQ' : confirmedOrder.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'بطاقة ائتمانية'}\n\n*المنتجات المطلوبة:*\n${itemsList}\n\n*المبلغ الإجمالي:* ${formatPrice(confirmedOrder.total)}`
      : `👑 *New Order - Queens Perfume*\n\n*Order ID:* ${confirmedOrder.orderId}\n*Customer:* ${confirmedOrder.customerName}\n*Phone:* ${confirmedOrder.phone}\n*City:* ${confirmedOrder.city}\n*Address:* ${confirmedOrder.address}\n\n*Items:*\n${itemsList}\n\n*Total:* ${formatPrice(confirmedOrder.total)}`;

    return getWhatsAppLink(message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#eedcda] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-8 h-8 rounded-full bg-[#fff8f5] border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:text-[#b87982] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!confirmedOrder ? (
          <div className="p-6 sm:p-8">
            <div className="mb-6 pb-4 border-b border-[#eedcda]">
              <span className="text-xs uppercase tracking-widest text-[#b87982] font-semibold">
                {isAr ? 'إتمام الشراء' : 'Secure Checkout'}
              </span>
              <h2 className="text-xl sm:text-2xl font-arabic-title text-[#49363a] font-semibold mt-1">
                {isAr ? 'تأكيد الطلب الفاخر وتفاصيل التوصيل' : 'Delivery Details & Confirmation'}
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Info Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#49363a] mb-1">
                    {isAr ? 'الاسم الكريم *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'مثال: نورة المحمد' : 'e.g. Sarah Miller'}
                    className="w-full bg-[#fff8f5] border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] focus:outline-none focus:border-[#b87982]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#49363a] mb-1">
                    {isAr ? 'رقم الجوال *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isAr ? '05xxxxxxxx' : '+966 5x xxx xxxx'}
                    className="w-full bg-[#fff8f5] border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] focus:outline-none focus:border-[#b87982]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#49363a] mb-1">
                    {isAr ? 'المدينة *' : 'City *'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#fff8f5] border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] focus:outline-none focus:border-[#b87982]"
                  >
                    <option value="عَمّان">{isAr ? 'عَمّان (الأردن)' : 'Amman (Jordan)'}</option>
                    <option value="إربد">{isAr ? 'إربد' : 'Irbid'}</option>
                    <option value="الزرقاء">{isAr ? 'الزرقاء' : 'Zarqa'}</option>
                    <option value="العقبة">{isAr ? 'العقبة' : 'Aqaba'}</option>
                    <option value="السلط">{isAr ? 'السلط' : 'Salt'}</option>
                    <option value="الرياض">{isAr ? 'الرياض (السعودية)' : 'Riyadh (KSA)'}</option>
                    <option value="جدة">{isAr ? 'جدة' : 'Jeddah'}</option>
                    <option value="الدمام">{isAr ? 'الدمام' : 'Dammam'}</option>
                    <option value="دبي">{isAr ? 'دبي (الإمارات)' : 'Dubai (UAE)'}</option>
                    <option value="الكويت">{isAr ? 'الكويت' : 'Kuwait'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#49363a] mb-1">
                    {isAr ? 'العنوان والحي *' : 'District & Street Address *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={isAr ? 'حي النرجس، شارع العليا' : 'District, Street, Villa/Apt'}
                    className="w-full bg-[#fff8f5] border border-[#eedcda] rounded px-3 py-2 text-xs sm:text-sm text-[#49363a] focus:outline-none focus:border-[#b87982]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#49363a] mb-2">
                  {isAr ? 'طريقة الدفع في الأردن والخليج:' : 'Payment Method:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* CliQ (Jordan Instant Bank Transfer) */}
                  <div
                    onClick={() => setPaymentMethod('cliq')}
                    className={`p-3 rounded-lg border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cliq'
                        ? 'border-[#49363a] bg-[#fff8f5] ring-1 ring-[#49363a]'
                        : 'border-[#eedcda] hover:border-[#b87982]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#b87982]" />
                      <span className="text-xs font-bold text-[#49363a]">
                        {isAr ? 'كليك CliQ (الأردن)' : 'Jordan CliQ'}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#49363a]/70 mt-1">
                      {isAr ? 'تحويل فوري عبر تطبيق بنككِ' : 'Instant bank transfer via CliQ'}
                    </div>
                  </div>

                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#49363a] bg-[#fff8f5] ring-1 ring-[#49363a]'
                        : 'border-[#eedcda] hover:border-[#b87982]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#b87982]" />
                      <span className="text-xs font-bold text-[#49363a]">
                        {isAr ? 'عند الاستلام' : 'Cash on Delivery'}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#49363a]/70 mt-1">
                      {isAr ? 'ادفعي نقداً لمندوب التوصيل' : 'Pay when parcel arrives'}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#49363a] bg-[#fff8f5] ring-1 ring-[#49363a]'
                        : 'border-[#eedcda] hover:border-[#b87982]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#b87982]" />
                      <span className="text-xs font-bold text-[#49363a]">
                        {isAr ? 'بطاقة ائتمانية' : 'Credit Card'}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#49363a]/70 mt-1">
                      {isAr ? 'فيزا / ماستركارد' : 'Visa / Mastercard'}
                    </div>
                  </div>
                </div>

                {/* If CliQ is selected, show CliQ Alias box */}
                {paymentMethod === 'cliq' && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1.5 text-emerald-950">
                    <div className="font-bold flex items-center justify-between">
                      <span>{isAr ? 'الاسم المستعار في كليك (CliQ Alias):' : 'CliQ Alias:'}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(STORE_CONFIG.cliqAlias || 'QUEENS.PERFUME');
                          setCopiedCliq(true);
                          setTimeout(() => setCopiedCliq(false), 2500);
                        }}
                        className="text-[11px] bg-white border border-emerald-300 px-2 py-0.5 rounded text-emerald-800 font-mono hover:bg-emerald-100"
                      >
                        {copiedCliq ? (isAr ? 'تم النسخ ✓' : 'Copied ✓') : (isAr ? 'نسخ الاسم' : 'Copy')}
                      </button>
                    </div>
                    <div className="font-mono font-bold text-sm text-[#49363a] bg-white px-2 py-1 rounded border border-emerald-200 inline-block">
                      {STORE_CONFIG.cliqAlias || 'QUEENS.PERFUME'}
                    </div>
                    <p className="text-[11px] text-emerald-800/80">
                      {isAr
                        ? 'حولي المبلغ عبر تطبيق بنككِ في الأردن باستخدام الاسم المستعار أعلاه، وسيتم تأكيد استلامه فوراً عبر واتساب.'
                        : 'Transfer the order amount via your Jordan banking app using this alias.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Order Total Review */}
              <div className="p-4 bg-[#fff8f5] border border-[#eedcda] rounded-xl flex items-center justify-between text-xs text-[#49363a]">
                <div>
                  <span className="font-semibold">{isAr ? 'المبلغ الإجمالي المستحق:' : 'Total Payable:'}</span>
                  <div className="text-[11px] text-[#49363a]/70">
                    {shipping === 0
                      ? isAr ? 'شحن مجاني متضمن' : 'Includes complimentary shipping'
                      : isAr ? 'متضمناً الشحن المبرد' : 'Includes delivery fees'}
                  </div>
                </div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#49363a]">
                  {formatPrice(grandTotal)}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#49363a] hover:bg-[#38282b] text-white text-sm font-semibold rounded shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'تأكيد الطلب الآن' : 'Place Order Now'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">
                {isAr ? 'تم تأكيد طلبكِ بنجاح' : 'Order Confirmed'}
              </span>
              <h2 className="text-2xl font-arabic-title text-[#49363a] font-semibold mt-1">
                {isAr ? `شكراً لكِ، ${confirmedOrder.customerName}` : `Thank you, ${confirmedOrder.customerName}`}
              </h2>
              <p className="text-xs sm:text-sm text-[#49363a]/75 mt-1">
                {isAr
                  ? 'يجري الآن تجهيز طردكِ الملكي بعناية فائقة وتغليفه بشريط فاخر.'
                  : 'Your royal package is being prepared and wrapped with silk ribbons.'}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#fff8f5] border border-[#eedcda] rounded-xl p-5 text-start space-y-3 text-xs text-[#49363a]">
              <div className="flex justify-between pb-2 border-b border-[#eedcda]">
                <span className="font-semibold">{isAr ? 'رقم الطلب الملكي:' : 'Order Number:'}</span>
                <span className="font-mono font-bold text-[#b87982]">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'المدينة والتوصيل:' : 'Destination:'}</span>
                <span>{confirmedOrder.city} - {confirmedOrder.address}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'طريقة الدفع:' : 'Payment:'}</span>
                <span>
                  {confirmedOrder.paymentMethod === 'cliq'
                    ? (isAr ? 'كليك CliQ' : 'CliQ')
                    : confirmedOrder.paymentMethod === 'cod'
                    ? (isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery')
                    : (isAr ? 'بطاقة ائتمانية' : 'Card')}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#eedcda] font-bold text-sm">
                <span>{isAr ? 'الإجمالي:' : 'Grand Total:'}</span>
                <span className="font-mono tabular-nums">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'متابعة الطلب عبر واتساب' : 'Track on WhatsApp'}</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-[#49363a] text-white text-xs font-semibold rounded hover:bg-[#38282b] transition-colors"
              >
                {isAr ? 'العودة للمتجر' : 'Return to Boutique'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
