// ===========================================
// Uygulama Sabitleri
// ===========================================

export const APP_NAME = "Çanakkale Ustam";
export const APP_DESCRIPTION =
  "Çanakkale'nin güvenilir ustalarını bulun. Elektrikçi, tesisatçı, boyacı ve daha fazlası tek bir platformda.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Şehir bilgisi
export const CITY = "Çanakkale";
export const CITY_CENTER = {
  latitude: 40.1553,
  longitude: 26.4142,
};

// Çanakkale ilçeleri
export const DISTRICTS = [
  "Merkez",
  "Ayvacık",
  "Bayramiç",
  "Biga",
  "Bozcaada",
  "Çan",
  "Eceabat",
  "Ezine",
  "Gelibolu",
  "Gökçeada",
  "Lapseki",
  "Yenice",
] as const;

export type District = (typeof DISTRICTS)[number];

// Sayfalama
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Dosya yükleme
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

// SMS doğrulama
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 3;
export const SMS_RATE_LIMIT = {
  maxRequests: 3,
  windowMinutes: 5,
};

// Şifre politikası
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const PASSWORD_REQUIREMENTS =
  "Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.";

// Rate limiting
export const RATE_LIMITS = {
  login: { maxRequests: 5, windowSeconds: 300 },
  register: { maxRequests: 3, windowSeconds: 600 },
  sms: { maxRequests: 3, windowSeconds: 300 },
  api: { maxRequests: 100, windowSeconds: 60 },
};

// Değerlendirme
export const MIN_RATING = 1;
export const MAX_RATING = 5;

// JWT
export const JWT_MAX_AGE = 24 * 60 * 60; // 24 saat (saniye)

// Kategori ikonları (lucide-react ikon isimleri)
export const CATEGORY_ICONS: Record<string, string> = {
  elektrikci: "Zap",
  tesisatci: "Wrench",
  boyaci: "Paintbrush",
  tadilat: "Hammer",
  temizlik: "Sparkles",
  nakliyat: "Truck",
  klima: "Wind",
  cilingir: "Key",
  marangoz: "TreePine",
  bahcivan: "Flower2",
  "kombi-bakimi": "Flame",
  "boya-badana": "PaintBucket",
  "parke-doseme": "LayoutGrid",
  "cam-balkon": "Square",
  "celik-kapi": "DoorClosed",
  "su-tesisati": "Droplets",
  "dogalgaz-tesisati": "Fuel",
  "guvenlik-kamera": "Camera",
  "beyaz-esya-tamiri": "WashingMachine",
};

// SEO
export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";
export const SITE_KEYWORDS = [
  "çanakkale usta",
  "çanakkale elektrikçi",
  "çanakkale tesisatçı",
  "çanakkale boyacı",
  "çanakkale tadilat",
  "çanakkale temizlik",
  "çanakkale nakliyat",
  "usta bul",
  "hizmet bul",
  "güvenilir usta",
];
