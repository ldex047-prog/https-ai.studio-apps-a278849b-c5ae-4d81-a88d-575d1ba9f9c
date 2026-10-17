export type CategoryType = 'perfume' | 'skincare' | 'cosmetics';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: CategoryType;
  priceSAR: number;
  originalPriceSAR?: number;
  rating: number;
  reviewCount: number;
  volumeOrSize: string;
  availableSizes?: string[];
  shades?: { nameAr: string; nameEn: string; hex: string }[];
  image: string;
  badgeAr?: string;
  badgeEn?: string;
  shortDescAr: string;
  shortDescEn: string;
  descriptionAr: string;
  descriptionEn: string;
  fragranceNotes?: FragranceNotes;
  concentration?: string;
  ingredientsAr?: string[];
  ingredientsEn?: string[];
  benefitsAr?: string[];
  benefitsEn?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedShade?: { nameAr: string; nameEn: string; hex: string };
}

export type Currency = 'SAR' | 'JOD' | 'AED' | 'KWD' | 'USD';

export type Language = 'ar' | 'en';

export interface StoreSettings {
  storeName: string;
  storeSubtitle: string;
  country: string;
  whatsapp: string;
  whatsappDisplay: string;
  cliqAlias: string;
  bankName: string;
  iban: string;
  announcementAr: string;
  announcementEn: string;
  freeShippingMinJOD: number;
  deliveryTimeJordan: string;
  instagram: string;
  tiktok: string;
  facebook: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'cliq' | 'card' | 'apple_pay';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: Currency;
  date: string;
}
