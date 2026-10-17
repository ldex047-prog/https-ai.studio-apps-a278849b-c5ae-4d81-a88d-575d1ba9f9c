import { StoreSettings } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'QUEENS',
  storeSubtitle: 'PERFUME & BEAUTY · الأردن',
  country: 'المملكة الأردنية الهاشمية',
  whatsapp: '962776073101',
  whatsappDisplay: '+962 7 7607 3101',
  cliqAlias: 'QUEENS.PERFUME',
  bankName: 'البنك العربي / كليك CliQ الأردن',
  iban: 'JO29 ARAB 0120 0000 0123 4567 8901 00',
  announcementAr: 'توصيل سريع لكافة محافظات الأردن (عمّان، إربد، الزرقاء، العقبة...) مع عينات عطرية ملكية مجانية 👑',
  announcementEn: 'Express delivery across Jordan (Amman, Irbid, Zarqa, Aqaba...) with complimentary royal samples 👑',
  freeShippingMinJOD: 30, // 30 Jordanian Dinars
  deliveryTimeJordan: 'خلال 24 إلى 48 ساعة لباب منزلكِ',
  instagram: '@queens.perfume.jo',
  tiktok: '@queensperfume.jo',
  facebook: 'Queens Perfume Jordan',
};

export const STORE_CONFIG = {
  ...DEFAULT_STORE_SETTINGS,
  whatsappRaw: DEFAULT_STORE_SETTINGS.whatsapp,
  whatsappFormatted: DEFAULT_STORE_SETTINGS.whatsappDisplay,
  locations: 'عَمّان · كافة محافظات الأردن',
  locationsEn: 'Amman · All Jordan Governorates',
  email: 'care@queensperfume.com',
};

export const getWhatsAppLink = (firstArg: string, secondArg?: string) => {
  if (secondArg !== undefined) {
    const cleanPhone = firstArg.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(secondArg)}`;
  }
  return `https://wa.me/${DEFAULT_STORE_SETTINGS.whatsapp}?text=${encodeURIComponent(firstArg)}`;
};
