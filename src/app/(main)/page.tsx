import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Wrench,
  Paintbrush,
  Hammer,
  Sparkles,
  Truck,
  Wind,
  Key,
  TreePine,
  Flower2,
  Flame,
  Search,
  CheckCircle,
  ArrowRight,
  Star,
  MapPin,
  Shield,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchBar } from "@/components/shared/SearchBar";
import { StarRating } from "@/components/review/StarRating";

export const metadata: Metadata = {
  title: "Çanakkale Ustam | Güvenilir Ustaların Adresi",
  description:
    "Çanakkale'nin güvenilir ustalarını bulun. Elektrikçi, tesisatçı, boyacı, tadilat ve daha fazlası tek bir platformda.",
};

// Kategori verileri
const categories = [
  { name: "Elektrikçi", slug: "elektrikci", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
  { name: "Tesisatçı", slug: "tesisatci", icon: Wrench, color: "bg-blue-100 text-blue-700" },
  { name: "Boyacı", slug: "boyaci", icon: Paintbrush, color: "bg-purple-100 text-purple-700" },
  { name: "Tadilat", slug: "tadilat", icon: Hammer, color: "bg-orange-100 text-orange-700" },
  { name: "Temizlik", slug: "temizlik", icon: Sparkles, color: "bg-cyan-100 text-cyan-700" },
  { name: "Nakliyat", slug: "nakliyat", icon: Truck, color: "bg-green-100 text-green-700" },
  { name: "Klima", slug: "klima", icon: Wind, color: "bg-sky-100 text-sky-700" },
  { name: "Çilingir", slug: "cilingir", icon: Key, color: "bg-red-100 text-red-700" },
  { name: "Marangoz", slug: "marangoz", icon: TreePine, color: "bg-amber-100 text-amber-700" },
  { name: "Bahçıvan", slug: "bahcivan", icon: Flower2, color: "bg-lime-100 text-lime-700" },
  { name: "Kombi Bakımı", slug: "kombi-bakimi", icon: Flame, color: "bg-rose-100 text-rose-700" },
  { name: "Boyacı / Badana", slug: "boya-badana", icon: Paintbrush, color: "bg-indigo-100 text-indigo-700" },
];

// Örnek usta verileri (gerçekte API'den gelecek)
const featuredCraftsmen = [
  {
    name: "Ahmet Yılmaz",
    business: "Ahmet Usta Elektrik",
    category: "Elektrikçi",
    district: "Merkez",
    rating: 4.9,
    reviewCount: 127,
    slug: "ahmet-usta-elektrik",
  },
  {
    name: "Mehmet Kaya",
    business: "Kaya Tesisat",
    category: "Tesisatçı",
    district: "Biga",
    rating: 4.8,
    reviewCount: 95,
    slug: "kaya-tesisat",
  },
  {
    name: "Ali Demir",
    business: "Demir Tadilat",
    category: "Tadilat",
    district: "Merkez",
    rating: 4.7,
    reviewCount: 83,
    slug: "demir-tadilat",
  },
  {
    name: "Hasan Çelik",
    business: "Çelik Boya",
    category: "Boyacı",
    district: "Gelibolu",
    rating: 4.9,
    reviewCount: 72,
    slug: "celik-boya",
  },
];

// Örnek yorumlar
const recentReviews = [
  {
    customer: "Ayşe H.",
    craftsman: "Ahmet Usta Elektrik",
    rating: 5,
    comment: "Çok hızlı ve temiz iş çıkardı. Fiyatı da gayet makuldü. Kesinlikle tavsiye ederim.",
    date: "2 gün önce",
  },
  {
    customer: "Fatma K.",
    craftsman: "Kaya Tesisat",
    rating: 5,
    comment: "Acil durumda hemen geldi. Sorunu kısa sürede çözdü. Teşekkürler!",
    date: "3 gün önce",
  },
  {
    customer: "Mustafa T.",
    craftsman: "Demir Tadilat",
    rating: 4,
    comment: "Banyomuzun tadilatını çok güzel yaptı. İşçilik kaliteli, detaylara özen gösteren bir usta.",
    date: "1 hafta önce",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Yapılandırılmış Veri */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Çanakkale Ustam",
            description:
              "Çanakkale'nin güvenilir ustalarını buluşturan platform",
            url: "https://canakkaleustam.com",
            areaServed: {
              "@type": "City",
              name: "Çanakkale",
              "@id": "https://www.wikidata.org/wiki/Q80540",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Çanakkale",
              addressCountry: "TR",
            },
          }),
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Çanakkale&apos;nin #1 Usta Platformu
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Çanakkale&apos;nin{" "}
              <span className="text-brand-secondary">Güvenilir</span>{" "}
              Ustaları
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              İhtiyacınız olan hizmeti seçin, bölgenizdeki en iyi ustalarla
              hemen iletişime geçin.
            </p>

            <SearchBar variant="hero" />

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Onaylı Ustalar</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>Değerlendirme Sistemi</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Hızlı Hizmet</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>500+ Usta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dalga efekti */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* 2. KATEGORİ GRID */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
              Hizmet Kategorileri
            </h2>
            <p className="text-muted-foreground text-lg">
              İhtiyacınız olan hizmeti seçin
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/kategoriler/${category.slug}`}>
                <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-transparent hover:border-brand-primary/20">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div
                      className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-7 w-7" />
                    </div>
                    <span className="text-sm font-medium text-brand-text">
                      {category.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/kategoriler">
                Tüm Kategorileri Gör
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. NASIL ÇALIŞIR */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
              Nasıl Çalışır?
            </h2>
            <p className="text-muted-foreground text-lg">
              3 basit adımda ustanızı bulun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                icon: Search,
                title: "Hizmet Seçin",
                description:
                  "İhtiyacınız olan hizmet kategorisini seçin ve bölgenizi belirleyin.",
              },
              {
                step: "2",
                icon: Users,
                title: "Usta Bulun",
                description:
                  "Değerlendirmeleri inceleyin, profillerini karşılaştırın ve size uygun ustayı seçin.",
              },
              {
                step: "3",
                icon: CheckCircle,
                title: "Hizmeti Tamamlayın",
                description:
                  "Ustanızla iletişime geçin, hizmeti alın ve deneyiminizi paylaşın.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-brand-primary/20 transition-colors">
                    <item.icon className="h-10 w-10 text-brand-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-secondary text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-brand-text">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ÖNE ÇIKAN USTALAR */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
                Öne Çıkan Ustalar
              </h2>
              <p className="text-muted-foreground">
                En yüksek puanlı ustalarımız
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/ustalar">
                Tümünü Gör
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCraftsmen.map((craftsman) => (
              <Link
                key={craftsman.slug}
                href={`/ustalar/${craftsman.slug}`}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20 mb-4 ring-4 ring-brand-primary/10 group-hover:ring-brand-primary/30 transition-all">
                        <AvatarFallback className="bg-brand-primary text-white text-xl font-bold">
                          {craftsman.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-brand-text mb-1">
                        {craftsman.business}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {craftsman.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className="mb-3"
                      >
                        {craftsman.category}
                      </Badge>
                      <div className="flex items-center gap-1 mb-2">
                        <StarRating rating={craftsman.rating} size="sm" />
                        <span className="text-sm font-medium ml-1">
                          {craftsman.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {craftsman.district}, Çanakkale
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {craftsman.reviewCount} değerlendirme
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/ustalar">
                Tüm Ustaları Gör
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. SON DEĞERLENDİRMELER */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
              Müşteri Yorumları
            </h2>
            <p className="text-muted-foreground text-lg">
              Kullanıcılarımız ne diyor?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {recentReviews.map((review, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-sm text-brand-text leading-relaxed mb-4">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-brand-text">
                        {review.customer}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {review.craftsman}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. USTA KAYIT CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-brand-secondary to-amber-500 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Siz de Ustanızı Kaydedin!
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Çanakkale Ustam platformuna katılın, müşterilerinize kolayca
                ulaşın ve işinizi büyütün. Kayıt tamamen ücretsizdir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-brand-secondary hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/kayit/usta">
                    <Wrench className="h-5 w-5 mr-2" />
                    Usta Olarak Kayıt Ol
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/hakkimizda">
                    Daha Fazla Bilgi
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
