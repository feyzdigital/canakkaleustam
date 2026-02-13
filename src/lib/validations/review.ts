import { z } from "zod";
import { MIN_RATING, MAX_RATING } from "@/lib/constants";

// Değerlendirme oluşturma şeması
export const createReviewSchema = z.object({
  serviceRequestId: z.string().min(1, "Hizmet talebi ID'si gereklidir."),
  craftsmanId: z.string().min(1, "Usta ID'si gereklidir."),
  rating: z
    .number()
    .min(MIN_RATING, `Puan en az ${MIN_RATING} olmalıdır.`)
    .max(MAX_RATING, `Puan en fazla ${MAX_RATING} olabilir.`)
    .int("Puan tam sayı olmalıdır."),
  comment: z
    .string()
    .max(1000, "Yorum en fazla 1000 karakter olabilir.")
    .optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
