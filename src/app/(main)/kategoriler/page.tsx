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
  LayoutGrid,
  Square,
  DoorClosed,
  Camera,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Hizmet Kategorileri",
  description:
    "Çanakkale'deki tüm hizmet kategorilerini keşfedin. Elektrikçi, tesisatçı, boyacı ve daha fazlası.",
};

const iconMap: Record<string, LucideIcon> = {
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
  PaintBucket: Paintbrush,
  LayoutGrid,
  Square,
  DoorClosed,
  Camera,
  WashingMachine,
};

const categories = [
  { name: "Elektrikçi", slug: "elektrikci", icon: "Zap", description: "Elektrik tesisatı, priz, anahtar, sigorta ve aydınlatma işleri", color: "bg-yellow-100 text-yellow-700" },
  { name: "Tesisatçı", slug: "tesisatci", icon: "Wrench", description: "Su tesisatı, pis su, tıkanıklık açma ve musluk tamiri", color: "bg-blue-100 text-blue-700" },
  { name: "Boyacı", slug: "boyaci", icon: "Paintbrush", description: "İç cephe boya, dış cephe boya, dekoratif boya işleri", color: "bg-purple-100 text-purple-700" },
  { name: "Tadilat", slug: "tadilat", icon: "Hammer", description: "Ev ve işyeri tadilat, renovasyon, dekorasyon işleri", color: "bg-orange-100 text-orange-700" },
  { name: "Temizlik", slug: "temizlik", icon: "Sparkles", description: "Ev temizliği, ofis temizliği, inşaat sonrası temizlik", color: "bg-cyan-100 text-cyan-700" },
  { name: "Nakliyat", slug: "nakliyat", icon: "Truck", description: "Ev taşıma, ofis taşıma, eşya taşıma, ambalajlama", color: "bg-green-100 text-green-700" },
  { name: "Klima", slug: "klima", icon: "Wind", description: "Klima montaj, bakım, onarım ve temizlik hizmetleri", color: "bg-sky-100 text-sky-700" },
  { name: "Çilingir", slug: "cilingir", icon: "Key", description: "Kapı açma, kilit değiştirme, çelik kapı kilidi", color: "bg-red-100 text-red-700" },
  { name: "Marangoz", slug: "marangoz", icon: "TreePine", description: "Mobilya tamiri, kapı montajı, mutfak dolabı", color: "bg-amber-100 text-amber-700" },
  { name: "Bahçıvan", slug: "bahcivan", icon: "Flower2", description: "Bahçe bakımı, çim biçme, ağaç budama, peyzaj", color: "bg-lime-100 text-lime-700" },
  { name: "Kombi Bakımı", slug: "kombi-bakimi", icon: "Flame", description: "Kombi bakım, onarım, montaj ve doğalgaz tesisatı", color: "bg-rose-100 text-rose-700" },
  { name: "Boya Badana", slug: "boya-badana", icon: "Paintbrush", description: "Badana, alçı, kartonpiyer, duvar kaplama işleri", color: "bg-indigo-100 text-indigo-700" },
  { name: "Parke Döşeme", slug: "parke-doseme", icon: "LayoutGrid", description: "Laminat parke, masif parke, seramik ve fayans döşeme", color: "bg-teal-100 text-teal-700" },
  { name: "Cam Balkon", slug: "cam-balkon", icon: "Square", description: "Cam balkon sistemleri, PVC pencere, alüminyum doğrama", color: "bg-violet-100 text-violet-700" },
  { name: "Çelik Kapı", slug: "celik-kapi", icon: "DoorClosed", description: "Çelik kapı montajı, iç kapı, oda kapısı değişimi", color: "bg-zinc-100 text-zinc-700" },
  { name: "Güvenlik Kamera", slug: "guvenlik-kamera", icon: "Camera", description: "Güvenlik kamerası montajı, alarm sistemi kurulumu", color: "bg-emerald-100 text-emerald-700" },
  { name: "Beyaz Eşya Tamiri", slug: "beyaz-esya-tamiri", icon: "WashingMachine", description: "Çamaşır makinesi, bulaşık makinesi, buzdolabı tamiri", color: "bg-pink-100 text-pink-700" },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
          Hizmet Kategorileri
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Çanakkale&apos;deki tüm hizmet kategorilerini keşfedin ve ihtiyacınıza
          uygun ustayı bulun.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Wrench;
          return (
            <Link key={category.slug} href={`/kategoriler/${category.slug}`}>
              <Card className="group h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h2 className="text-lg font-semibold text-brand-text mb-2">
                    {category.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
