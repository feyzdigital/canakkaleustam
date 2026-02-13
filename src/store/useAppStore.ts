import { create } from "zustand";

interface SearchFilters {
  query: string;
  categorySlug: string;
  district: string;
  minRating: number;
  sortBy: "rating" | "reviewCount" | "newest";
}

interface AppState {
  // Arama filtreleri
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;

  // Mobil menü
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Sidebar
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const defaultSearchFilters: SearchFilters = {
  query: "",
  categorySlug: "",
  district: "",
  minRating: 0,
  sortBy: "rating",
};

export const useAppStore = create<AppState>((set) => ({
  // Arama filtreleri
  searchFilters: defaultSearchFilters,
  setSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    })),
  resetSearchFilters: () =>
    set({ searchFilters: defaultSearchFilters }),

  // Mobil menü
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  // Sidebar
  isSidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
}));
