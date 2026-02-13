// ===========================================
// Dosya Yükleme Servisi (Placeholder)
// ===========================================

import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "./constants";

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Dosya boyutu en fazla ${MAX_FILE_SIZE / 1024 / 1024}MB olabilir.`,
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Sadece JPG, PNG ve PDF dosyaları yüklenebilir.",
    };
  }

  return { valid: true };
}

export function sanitizeFileName(fileName: string): string {
  // Dosya adındaki özel karakterleri temizle
  const sanitized = fileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();

  // Benzersiz isim oluştur
  const timestamp = Date.now();
  const ext = sanitized.split(".").pop();
  const name = sanitized.replace(`.${ext}`, "");

  return `${name}_${timestamp}.${ext}`;
}

export async function uploadFile(file: File): Promise<UploadResult> {
  const validation = validateFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const provider = process.env.UPLOAD_PROVIDER || "uploadthing";

  // Geliştirme ortamında dosya yüklemeyi simüle et
  if (process.env.NODE_ENV === "development") {
    const sanitizedName = sanitizeFileName(file.name);
    console.log(`[UPLOAD DEV] File: ${sanitizedName}, Size: ${file.size}`);
    return {
      success: true,
      url: `/uploads/${sanitizedName}`,
    };
  }

  switch (provider) {
    case "s3":
      return uploadToS3(file);
    case "uploadthing":
    default:
      return uploadToUploadThing(file);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadToUploadThing(_file: File): Promise<UploadResult> {
  // UploadThing entegrasyonu buraya eklenecek
  return { success: false, error: "UploadThing henüz yapılandırılmamış" };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadToS3(_file: File): Promise<UploadResult> {
  // AWS S3 entegrasyonu buraya eklenecek
  return { success: false, error: "S3 henüz yapılandırılmamış" };
}
