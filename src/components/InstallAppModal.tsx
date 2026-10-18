import React, { useState, useEffect } from 'react';
import { X, Smartphone, Share2, PlusSquare, MoreVertical, Download, CheckCircle2, Sparkles, Copy } from 'lucide-react';
import { Language } from '../types';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isAr = language === 'ar';
  const [activeDevice, setActiveDevice] = useState<'iphone' | 'android'>('iphone');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installedSuccess, setInstalledSuccess] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    // Detect if device is Android or iPhone
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setActiveDevice('iphone');
    } else if (/android/.test(userAgent)) {
      setActiveDevice('android');
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledSuccess(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#eedcda] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#fff8f5] border-b border-[#eedcda] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#49363a] text-white flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#f3dfe1]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-arabic-title text-[#49363a] font-bold">
                {isAr ? 'تثبيت متجر كوينز على شاشة هاتفكِ' : 'Install Queens on Home Screen'}
              </h3>
              <p className="text-xs text-[#49363a]/70">
                {isAr
                  ? 'ليكون متجركِ تطبيقاً سريعاً بضغطة زر واحدة دون نسخ الروابط!'
                  : 'Access your boutique instantly like a native mobile app'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#eedcda] flex items-center justify-center text-[#49363a] hover:text-[#b87982] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Device Switcher Tabs */}
        <div className="grid grid-cols-2 p-2 bg-[#f3dfe1]/30 border-b border-[#eedcda]">
          <button
            onClick={() => setActiveDevice('iphone')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeDevice === 'iphone'
                ? 'bg-white text-[#49363a] shadow-xs'
                : 'text-[#49363a]/70 hover:text-[#49363a]'
            }`}
          >
            🍎 {isAr ? 'أجهزة آيفون (iPhone)' : 'iPhone (Safari)'}
          </button>
          <button
            onClick={() => setActiveDevice('android')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeDevice === 'android'
                ? 'bg-white text-[#49363a] shadow-xs'
                : 'text-[#49363a]/70 hover:text-[#49363a]'
            }`}
          >
            🤖 {isAr ? 'أجهزة أندرويد (Samsung / Xiaomi)' : 'Android (Chrome)'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Visual App Icon Preview */}
          <div className="p-4 bg-[#fff8f5] border border-[#eedcda] rounded-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#49363a] flex items-center justify-center text-white shadow-md border-2 border-white shrink-0">
              <span className="font-display-luxury text-xl font-bold tracking-widest text-[#b87982]">
                Q
              </span>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#b87982] uppercase tracking-wider">
                {isAr ? 'تطبيق المتجر المباشر' : 'Mobile Web App'}
              </div>
              <h4 className="text-sm font-bold text-[#49363a]">Queens Perfume · الأردن</h4>
              <p className="text-[11px] text-[#49363a]/70">
                {isAr
                  ? 'يفتح كأي تطبيق أصلي بدون شريط المتصفح وبشكل فوري!'
                  : 'Launches full-screen without browser address bar'}
              </p>
            </div>
          </div>

          {/* IPHONE INSTRUCTIONS */}
          {activeDevice === 'iphone' && (
            <div className="space-y-3 text-xs text-[#49363a]">
              <div className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-bold">{isAr ? 'افتحي الرابط في متصفح سفاري (Safari)' : 'Open in Safari'}</div>
                  <div className="text-[#49363a]/70 text-[11px] mt-0.5">
                    {isAr
                      ? 'تأكدي من فتح الموقع عبر متصفح Safari الخاص بالآيفون.'
                      : 'Ensure you open the link directly in Safari.'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>{isAr ? 'اضغطي على زر المشاركة (Share)' : 'Tap the Share Button'}</span>
                    <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-[#49363a]/70 text-[11px] mt-0.5">
                    {isAr
                      ? 'ستجدين أيقونة المربع الصغير مع سهم يشير للأعلى ⬆️ في أسفل شاشة الآيفون.'
                      : 'Look for the square icon with an upward arrow at the bottom toolbar.'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>{isAr ? 'اختاري «إضافة إلى الصفحة الرئيسية»' : 'Tap "Add to Home Screen"'}</span>
                    <PlusSquare className="w-3.5 h-3.5 text-[#b87982]" />
                  </div>
                  <div className="text-[#49363a]/70 text-[11px] mt-0.5">
                    {isAr
                      ? 'مرري الخيارات للأسفل قليلاً واضغطي على (Add to Home Screen ➕).'
                      : 'Scroll down the share sheet and tap Add to Home Screen.'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <div className="font-bold">{isAr ? 'اضغطي «إضافة» (Add) في أعلى الشاشة' : 'Tap Add in the top-right'}</div>
                  <div className="text-[#49363a]/70 text-[11px] mt-0.5">
                    {isAr
                      ? 'مبروك! ستجدين أيقونة تطبيق كوينز الفاخرة على شاشة هاتفكِ فوراً.'
                      : 'Done! The Queens app icon is now resting on your phone screen.'}
                  </div>
                </div>
              </div>
            </div>
          )}

              {/* Link Sharing Box */}
              <div className="p-3.5 bg-[#fff8f5] border border-[#eedcda] rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#49363a]">
                    {isAr ? '🔗 رابط المتجر المباشر:' : 'Direct Store Link:'}
                  </span>
                  <button
                    onClick={() => {
                      const url = window.location.href.split('#')[0];
                      navigator.clipboard.writeText(url);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#49363a] hover:bg-[#38282b] text-white text-[11px] font-bold rounded-md transition-colors cursor-pointer"
                  >
                    {linkCopied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isAr ? 'نسخ الرابط' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] font-mono text-[#49363a]/80 bg-white p-2 rounded border border-[#eedcda] break-all select-all">
                  {typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://ais-pre-wnmjc4xnhg5kjo4ltcy4t4-102800815290.europe-west1.run.app'}
                </div>
              </div>

              {/* ANDROID INSTRUCTIONS */}
              {activeDevice === 'android' && (
                <div className="space-y-3 text-xs text-[#49363a]">
                  {/* Critical note about In-App browser (WhatsApp / Instagram / etc.) */}
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900 text-[11px] leading-relaxed">
                    <span className="text-base shrink-0">💡</span>
                    <div>
                      <strong className="block font-bold">
                        {isAr ? 'ملاحظة هامة جداً إذا فتحتِ الرابط من داخل واتساب:' : 'Important Note if opened from WhatsApp:'}
                      </strong>
                      <span>
                        {isAr
                          ? 'إذا كان الرابط يفتح داخل تطبيق واتساب أو فيسبوك، لن يظهر خيار إضافة للشاشة مباشرة! اضغطي أولاً على الثلاث نقاط (⋮) في أعلى شاشة الواتساب واختاري «فتح في Chrome» أو «Open in Chrome».'
                          : 'If opening from within WhatsApp or social apps, first tap the menu and choose "Open in Chrome".'}
                      </span>
                    </div>
                  </div>

                  {deferredPrompt && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                      <p className="font-bold text-emerald-800 text-xs">
                        {isAr ? '🎉 متصفحكِ جاهز الآن للتثبيت الفوري بضغطة زر واحدة!' : 'Direct 1-click install is ready!'}
                      </p>
                      <button
                        onClick={handleNativeInstall}
                        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 mx-auto shadow-sm cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{isAr ? 'تثبيت التطبيق على الشاشة الآن' : 'Install App Now'}</span>
                      </button>
                    </div>
                  )}

                  {installedSuccess && (
                    <div className="p-3 bg-emerald-100 text-emerald-900 rounded-lg flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>{isAr ? 'تم تثبيت التطبيق بنجاح على واجهة هاتفكِ!' : 'Installed to home screen!'}</span>
                    </div>
                  )}

                  <div className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{isAr ? 'افتحي تطبيق Google Chrome واضغطي الثلاث نقاط (⋮)' : 'Tap the Chrome 3-dots Menu (⋮)'}</span>
                        <MoreVertical className="w-3.5 h-3.5 text-[#49363a]" />
                      </div>
                      <div className="text-[#49363a]/70 text-[11px] mt-0.5">
                        {isAr
                          ? 'في الزاوية العلوية لمتصفح كروم (أعلى اليسار أو اليمين حسب لغة هاتفكِ).'
                          : 'In the top corner of your Chrome browser.'}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#49363a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <span className="text-[#b87982] font-black">
                          {isAr ? 'ابحثي عن خيار: «تثبيت التطبيق» أو «الإضافة إلى الشاشة الرئيسية»' : 'Tap "Install app" or "Add to Home screen"'}
                        </span>
                        <Download className="w-3.5 h-3.5 text-[#b87982]" />
                      </div>
                      <div className="text-[#49363a]/80 text-[11px] mt-1 space-y-1">
                        <p>
                          {isAr
                            ? '• في إصدارات كروم الحديثة، يكون اسمه: «تثبيت التطبيق» (Install app).'
                            : '• In modern Chrome, it is called: "Install app".'}
                        </p>
                        <p>
                          {isAr
                            ? '• في الإصدارات الأخرى، يكون اسمه: «الإضافة إلى الشاشة الرئيسية» (Add to Home screen).'
                            : '• In older versions, it is called: "Add to Home screen".'}
                        </p>
                        <p className="text-[#49363a]/60">
                          {isAr
                            ? '(إذا لم تريه فوراً، اسحبي القائمة لأسفل قليلاً وستجدينه قبل خيار "الموقع المخصص للكمبيوتر").'
                            : '(If you do not see it, scroll down the menu slightly).'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-[#eedcda] rounded-xl flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-bold">{isAr ? 'اضغطي على «تثبيت» (Install)' : 'Confirm Install'}</div>
                      <div className="text-[#49363a]/70 text-[11px] mt-0.5">
                        {isAr
                          ? 'سيظهر لكِ مربع تأكيد صغير، اضغطي «تثبيت»، وسيضاف تطبيق متجر كوينز فوراً لأيقونات هاتفكِ الرئيسية مثل أي تطبيق جاهز!'
                          : 'A popup will confirm, tap Install and Queens will appear right on your home screen!'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

          {/* Close CTA */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#49363a] hover:bg-[#38282b] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {isAr ? 'حسناً، فهمت الطريقة 👍' : 'Got it!'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
