import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Statik kategori verileri (gerçekte API'den gelecek)
const categoryData: Record<string, { name: string; description: string }> = {
  elektrikci: { name: "Elektrikçi", description: "Elektrik tesisatı, priz, anahtar, sigorta ve aydınlatma işleri" },
  tesisatci: { name: "Tesisatçı", description: "Su tesisatı, pis su, tıkanıklık açma ve musluk tamiri" },
  boyaci: { name: "Boyacı", description: "İç cephe boya, dış cephe boya, dekoratif boya işleri" },
  tadilat: { name: "Tadilat", description: "Ev ve işyeri tadilat, renovasyon, dekorasyon işleri" },
  temizlik: { name: "Temizlik", description: "Ev temizliği, ofis temizliği, inşaat sonrası temizlik" },
  nakliyat: { name: "Nakliyat", description: "Ev taşıma, ofis taşıma, eşya taşıma, ambalajlama" },
  klima: { name: "Klima", description: "Klima montaj, bakım, onarım ve temizlik hizmetleri" },
  cilingir: { name: "Çilingir", description: "Kapı açma, kilit değiştirme, çelik kapı kilidi" },
  marangoz: { name: "Marangoz", description: "Mobilya tamiri, kapı montajı, mutfak dolabı" },
  bahcivan: { name: "Bahçıvan", description: "Bahçe bakımı, çim biçme, ağaç budama, peyzaj" },
  "kombi-bakimi": { name: "Kombi Bakımı", description: "Kombi bakım, onarım, montaj ve doğalgaz tesisatı" },
  "boya-badana": { name: "Boya Badana", description: "Badana, alçı, kartonpiyer, duvar kaplama işleri" },
  "parke-doseme": { name: "Parke Döşeme", description: "Laminat parke, masif parke, seramik ve fayans döşeme" },
  "cam-balkon": { name: "Cam Balkon", description: "Cam balkon sistemleri, PVC pencere, alüminyum doğrama" },
  "celik-kapi": { name: "Çelik Kapı", description: "Çelik kapı montajı, iç kapı, oda kapısı değişimi" },
  "guvenlik-kamera": { name: "Güvenlik Kamera", description: "Güvenlik kamerası montajı, alarm sistemi kurulumu" },
  "beyaz-esya-tamiri": { name: "Beyaz Eşya Tamiri", description: "Çamaşır makinesi, bulaşık makinesi, buzdolabı tamiri" },
};

export async function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryData[slug];

  if (!category) {
    return { title: "Kategori Bulunamadı" };
  }

  return {
    title: `${category.name} | Çanakkale'de ${category.name} Ustaları`,
    description: `Çanakkale'de ${category.name.toLowerCase()} hizmeti veren güvenilir ustaları bulun. ${category.description}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryData[slug];

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Kategori Bulunamadı</h1>
        <p className="text-muted-foreground mb-6">
          Aradığınız kategori bulunamadı.
        </p>
        <Button asChild>
          <Link href="/kategoriler">Kategorilere Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-brand-primary">
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link href="/kategoriler" className="hover:text-brand-primary">
          Kategoriler
        </Link>
        <span>/</span>
        <span className="text-brand-text font-medium">{category.name}</span>
      </div>

      {/* Başlık */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/kategoriler">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tüm Kategoriler
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
          {category.name}
        </h1>
        <p className="text-muted-foreground text-lg">{category.description}</p>
        <div className="mt-4">
          <Badge variant="secondary">Çanakkale</Badge>
        </div>
      </div>

      {/* Usta Listesi Placeholder */}
      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground text-lg mb-4">
          Bu kategoride henüz kayıtlı usta bulunmuyor.
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          Usta kaydı yapıldıktan sonra burada listelenecektir.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/kayit/usta">Usta Olarak Kayıt Ol</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ustalar">Tüm Ustaları Gör</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
