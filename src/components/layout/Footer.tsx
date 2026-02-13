import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  platform: [
    { href: "/ustalar", label: "Ustalar" },
    { href: "/kategoriler", label: "Kategoriler" },
    { href: "/kayit/usta", label: "Usta Kaydı" },
    { href: "/hakkimizda", label: "Hakkımızda" },
  ],
  legal: [
    { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
    { href: "/gizlilik", label: "Gizlilik Politikası" },
    { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
    { href: "/cerez-politikasi", label: "Çerez Politikası" },
  ],
  categories: [
    { href: "/kategoriler/elektrikci", label: "Elektrikçi" },
    { href: "/kategoriler/tesisatci", label: "Tesisatçı" },
    { href: "/kategoriler/boyaci", label: "Boyacı" },
    { href: "/kategoriler/tadilat", label: "Tadilat" },
    { href: "/kategoriler/temizlik", label: "Temizlik" },
    { href: "/kategoriler/nakliyat", label: "Nakliyat" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-text text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                Çanakkale <span className="text-brand-secondary">Ustam</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Çanakkale&apos;nin güvenilir ustalarını bulun. Elektrikçi, tesisatçı,
              boyacı ve daha fazlası tek bir platformda.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Çanakkale, Türkiye</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+90 (286) 000 00 00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@canakkaleustam.com</span>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popüler Kategoriler */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Popüler Kategoriler
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Yasal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Çanakkale Ustam. Tüm hakları
            saklıdır.
          </p>
          <p>Çanakkale&apos;nin güvenilir usta platformu</p>
        </div>
      </div>
    </footer>
  );
}
