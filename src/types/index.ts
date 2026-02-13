import type { Role } from "@/generated/prisma/client";

// Session types
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: Role;
  avatar?: string | null;
  phone?: string | null;
  phoneVerified: boolean;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

// Search & Filter
export interface CraftsmanSearchParams {
  query?: string;
  categorySlug?: string;
  district?: string;
  minRating?: number;
  sortBy?: "rating" | "reviewCount" | "newest";
  page?: number;
  limit?: number;
}

// Map types
export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

// File upload
export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

// Notification types
export type NotificationType =
  | "SERVICE_REQUEST"
  | "REQUEST_ACCEPTED"
  | "REQUEST_REJECTED"
  | "REQUEST_COMPLETED"
  | "NEW_REVIEW"
  | "NEW_MESSAGE"
  | "PROFILE_APPROVED"
  | "PROFILE_REJECTED"
  | "SYSTEM";
