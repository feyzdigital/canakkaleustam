import { z } from "zod";
import { PASSWORD_MIN_LENGTH, OTP_LENGTH } from "@/lib/constants";

// Giriş şeması
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta adresi gereklidir.")
    .email("Geçerli bir e-posta adresi giriniz."),
  password: z
    .string()
    .min(1, "Şifre gereklidir."),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Müşteri kayıt şeması
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Ad en az 2 karakter olmalıdır.")
      .max(50, "Ad en fazla 50 karakter olabilir."),
    surname: z
      .string()
      .min(2, "Soyad en az 2 karakter olmalıdır.")
      .max(50, "Soyad en fazla 50 karakter olabilir."),
    email: z
      .string()
      .min(1, "E-posta adresi gereklidir.")
      .email("Geçerli bir e-posta adresi giriniz."),
    phone: z
      .string()
      .min(10, "Geçerli bir telefon numarası giriniz.")
      .regex(
        /^(\+90|0)?[5][0-9]{9}$/,
        "Geçerli bir Türkiye cep telefonu numarası giriniz."
      ),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır.`
      )
      .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir.")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir.")
      .regex(/[0-9]/, "Şifre en az bir rakam içermelidir."),
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir."),
    kvkkConsent: z.literal(true, {
      message: "KVKK aydınlatma metnini onaylamanız gerekiyor.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// Usta kayıt şeması
export const registerCraftsmanSchema = z
  .object({
    name: z
      .string()
      .min(2, "Ad en az 2 karakter olmalıdır.")
      .max(50, "Ad en fazla 50 karakter olabilir."),
    surname: z
      .string()
      .min(2, "Soyad en az 2 karakter olmalıdır.")
      .max(50, "Soyad en fazla 50 karakter olabilir."),
    email: z
      .string()
      .min(1, "E-posta adresi gereklidir.")
      .email("Geçerli bir e-posta adresi giriniz."),
    phone: z
      .string()
      .min(10, "Geçerli bir telefon numarası giriniz.")
      .regex(
        /^(\+90|0)?[5][0-9]{9}$/,
        "Geçerli bir Türkiye cep telefonu numarası giriniz."
      ),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır.`
      )
      .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir.")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir.")
      .regex(/[0-9]/, "Şifre en az bir rakam içermelidir."),
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir."),
    businessName: z
      .string()
      .min(2, "İşletme adı en az 2 karakter olmalıdır.")
      .max(100, "İşletme adı en fazla 100 karakter olabilir."),
    taxNumber: z
      .string()
      .min(10, "Vergi numarası 10 haneli olmalıdır.")
      .max(11, "Vergi numarası en fazla 11 haneli olabilir.")
      .regex(/^\d+$/, "Vergi numarası sadece rakam içermelidir."),
    description: z
      .string()
      .max(1000, "Açıklama en fazla 1000 karakter olabilir.")
      .optional(),
    district: z.string().min(1, "İlçe seçimi zorunludur."),
    address: z.string().min(5, "Adres en az 5 karakter olmalıdır.").optional(),
    categoryIds: z
      .array(z.string())
      .min(1, "En az bir hizmet kategorisi seçmelisiniz."),
    kvkkConsent: z.literal(true, {
      message: "KVKK aydınlatma metnini onaylamanız gerekiyor.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type RegisterCraftsmanInput = z.infer<typeof registerCraftsmanSchema>;

// Telefon doğrulama şeması
export const phoneVerificationSchema = z.object({
  code: z
    .string()
    .length(OTP_LENGTH, `Doğrulama kodu ${OTP_LENGTH} haneli olmalıdır.`)
    .regex(/^\d+$/, "Doğrulama kodu sadece rakam içermelidir."),
});

export type PhoneVerificationInput = z.infer<typeof phoneVerificationSchema>;

// Şifre sıfırlama talep şeması
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta adresi gereklidir.")
    .email("Geçerli bir e-posta adresi giriniz."),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// Şifre sıfırlama şeması
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Geçersiz sıfırlama bağlantısı."),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır.`
      )
      .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir.")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir.")
      .regex(/[0-9]/, "Şifre en az bir rakam içermelidir."),
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
