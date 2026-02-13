import { z } from "zod";

// Hizmet talebi oluşturma şeması
export const createServiceRequestSchema = z.object({
  craftsmanId: z.string().min(1, "Usta seçimi zorunludur."),
  categoryId: z.string().min(1, "Kategori seçimi zorunludur."),
  title: z
    .string()
    .min(5, "Başlık en az 5 karakter olmalıdır.")
    .max(200, "Başlık en fazla 200 karakter olabilir."),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır.")
    .max(2000, "Açıklama en fazla 2000 karakter olabilir."),
  address: z
    .string()
    .min(5, "Adres en az 5 karakter olmalıdır.")
    .max(200, "Adres en fazla 200 karakter olabilir.")
    .optional(),
  preferredDate: z
    .string()
    .datetime("Geçerli bir tarih giriniz.")
    .optional(),
  preferredTime: z
    .string()
    .max(20, "Saat bilgisi çok uzun.")
    .optional(),
});

export type CreateServiceRequestInput = z.infer<
  typeof createServiceRequestSchema
>;

// Hizmet talebi durum güncelleme şeması
export const updateServiceRequestStatusSchema = z.object({
  id: z.string().min(1, "Talep ID'si gereklidir."),
  status: z.enum(["ACCEPTED", "REJECTED", "COMPLETED", "CANCELLED"]),
});

export type UpdateServiceRequestStatusInput = z.infer<
  typeof updateServiceRequestStatusSchema
>;

// Mesaj gönderme şeması
export const sendMessageSchema = z.object({
  receiverId: z.string().min(1, "Alıcı gereklidir."),
  serviceRequestId: z.string().optional(),
  content: z
    .string()
    .min(1, "Mesaj boş olamaz.")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir."),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
