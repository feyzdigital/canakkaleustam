import { z } from "zod";
import { DISTRICTS } from "@/lib/constants";

// Usta profil güncelleme şeması
export const updateCraftsmanProfileSchema = z.object({
  businessName: z
    .string()
    .min(2, "İşletme adı en az 2 karakter olmalıdır.")
    .max(100, "İşletme adı en fazla 100 karakter olabilir.")
    .optional(),
  description: z
    .string()
    .max(1000, "Açıklama en fazla 1000 karakter olabilir.")
    .optional(),
  bio: z
    .string()
    .max(500, "Kısa tanıtım en fazla 500 karakter olabilir.")
    .optional(),
  district: z
    .enum(DISTRICTS as unknown as [string, ...string[]])
    .optional(),
  address: z
    .string()
    .min(5, "Adres en az 5 karakter olmalıdır.")
    .max(200, "Adres en fazla 200 karakter olabilir.")
    .optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  categoryIds: z
    .array(z.string())
    .min(1, "En az bir hizmet kategorisi seçmelisiniz.")
    .optional(),
});

export type UpdateCraftsmanProfileInput = z.infer<
  typeof updateCraftsmanProfileSchema
>;

// Hizmet oluşturma şeması
export const createServiceSchema = z.object({
  categoryId: z.string().min(1, "Kategori seçimi zorunludur."),
  title: z
    .string()
    .min(3, "Hizmet başlığı en az 3 karakter olmalıdır.")
    .max(100, "Hizmet başlığı en fazla 100 karakter olabilir."),
  description: z
    .string()
    .max(1000, "Açıklama en fazla 1000 karakter olabilir.")
    .optional(),
  minPrice: z
    .number()
    .min(0, "Minimum fiyat 0'dan küçük olamaz.")
    .optional(),
  maxPrice: z
    .number()
    .min(0, "Maksimum fiyat 0'dan küçük olamaz.")
    .optional(),
  priceUnit: z.enum(["FIXED", "HOURLY", "DAILY"]).default("FIXED"),
  duration: z
    .string()
    .max(50, "Süre bilgisi en fazla 50 karakter olabilir.")
    .optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

// Hizmet güncelleme şeması
export const updateServiceSchema = createServiceSchema.partial().extend({
  id: z.string().min(1, "Hizmet ID'si gereklidir."),
});

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;

// Usta arama şeması
export const searchCraftsmanSchema = z.object({
  query: z.string().optional(),
  categorySlug: z.string().optional(),
  district: z.string().optional(),
  minRating: z.number().min(0).max(5).optional(),
  sortBy: z
    .enum(["rating", "reviewCount", "newest"])
    .default("rating"),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
});

export type SearchCraftsmanInput = z.infer<typeof searchCraftsmanSchema>;
