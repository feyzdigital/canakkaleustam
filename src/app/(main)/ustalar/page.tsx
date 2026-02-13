import type { Metadata } from "next";
import { SearchBar } from "@/components/shared/SearchBar";

export const metadata: Metadata = {
  title: "Ustalar | Çanakkale'nin Güvenilir Ustaları",
  description:
    "Çanakkale'deki onaylı ustaları keşfedin. Filtreleme ve değerlendirmeler ile size en uygun ustayı bulun.",
};

export default function CraftsmenPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Başlık ve Arama */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
          Çanakkale&apos;deki Ustalar
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Güvenilir ustalarımızı keşfedin ve ihtiyacınıza uygun olanı bulun.
        </p>
        <SearchBar variant="hero" />
      </div>

      {/* İçerik Alanı */}
      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground text-lg mb-2">
          Usta listesi veritabanı bağlantısı yapıldıktan sonra burada görünecektir.
        </p>
        <p className="text-sm text-muted-foreground">
          Bu alan, tRPC ile usta arama, filtreleme ve listeleme özelliklerini içerecektir.
        </p>
      </div>
    </div>
  );
}
