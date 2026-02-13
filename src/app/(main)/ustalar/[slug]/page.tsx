import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CraftsmanPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Static export (Firebase) için örnek/placeholder sayfalar.
  // Gerçek veriler SSR/DB ile geldiğinde bu liste kaldırılabilir.
  return [
    { slug: "ornek-usta" },
    { slug: "ahmet-usta-elektrik" },
    { slug: "kaya-tesisat" },
  ];
}

export async function generateMetadata({
  params,
}: CraftsmanPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Usta Profili - ${slug}`,
    description: `Çanakkale'de ${slug} hakkında detaylı bilgi ve değerlendirmeler.`,
  };
}

export default async function CraftsmanPage({ params }: CraftsmanPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-brand-primary">
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link href="/ustalar" className="hover:text-brand-primary">
          Ustalar
        </Link>
        <span>/</span>
        <span className="text-brand-text font-medium">{slug}</span>
      </div>

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/ustalar">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tüm Ustalar
        </Link>
      </Button>

      {/* Profil Placeholder */}
      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground text-lg mb-2">
          Usta profili veritabanı bağlantısı yapıldıktan sonra burada görünecektir.
        </p>
        <p className="text-sm text-muted-foreground">
          Usta bilgileri, hizmetler, değerlendirmeler ve iletişim formu bu sayfada yer alacaktır.
        </p>
      </div>
    </div>
  );
}
