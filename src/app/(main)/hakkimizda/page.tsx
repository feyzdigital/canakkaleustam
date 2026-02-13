import type { Metadata } from "next";
import {
  Shield,
  Users,
  Star,
  Handshake,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Çanakkale Ustam hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz.",
};

const values = [
  {
    icon: Shield,
    title: "Güvenilirlik",
    description:
      "Tüm ustalarımız kimlik ve vergi levhası doğrulamasından geçer. Admin onayı olmadan platform üzerinde görünmezler.",
  },
  {
    icon: Star,
    title: "Kalite",
    description:
      "Müşteri değerlendirme sistemi sayesinde en kaliteli hizmeti veren ustalar ön plana çıkar.",
  },
  {
    icon: Users,
    title: "Topluluk",
    description:
      "Çanakkale'nin yerel ustalarını ve hizmet arayanları bir araya getirerek güçlü bir topluluk oluşturuyoruz.",
  },
  {
    icon: Handshake,
    title: "Şeffaflık",
    description:
      "Fiyatlar, değerlendirmeler ve usta profilleri şeffaf bir şekilde paylaşılır.",
  },
];

const stats = [
  { value: "500+", label: "Kayıtlı Usta" },
  { value: "17", label: "Hizmet Kategorisi" },
  { value: "12", label: "İlçe" },
  { value: "1000+", label: "Tamamlanan Hizmet" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
          Hakkımızda
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Çanakkale Ustam, Çanakkale ilindeki güvenilir ustaları ve hizmet
          arayan kişileri buluşturan profesyonel bir platformdur. Amacımız,
          kaliteli hizmete hızlı ve güvenli bir şekilde ulaşmanızı sağlamaktır.
        </p>
      </div>

      {/* Misyon & Vizyon */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-brand-primary/5 border-brand-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">
              Misyonumuz
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Çanakkale&apos;de yaşayan insanların ev ve işyeri bakım
              ihtiyaçlarını karşılayacak güvenilir, kaliteli ve uygun fiyatlı
              ustalara kolayca ulaşmasını sağlamak. Aynı zamanda yerel
              ustaların müşteri kitlesini genişletmelerine ve işlerini
              büyütmelerine destek olmak.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-secondary/5 border-brand-secondary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-brand-secondary mb-4">
              Vizyonumuz
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Çanakkale&apos;nin en güvenilir ve kapsamlı usta platformu
              olmak. İlerleyen süreçte tüm Marmara Bölgesi&apos;ne yayılarak,
              Türkiye&apos;nin yerel hizmet sektöründe referans bir platform
              haline gelmek.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Değerlerimiz */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-text text-center mb-10">
          Değerlerimiz
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-text">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-brand-primary rounded-3xl p-8 md:p-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-blue-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Neden Biz */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-text text-center mb-10">
          Neden Çanakkale Ustam?
        </h2>
        <div className="space-y-4">
          {[
            "Tüm ustalar kimlik ve vergi levhası doğrulamasından geçer",
            "Gerçek müşteri değerlendirmeleri ile şeffaf puanlama",
            "Çanakkale'nin tüm ilçelerinde hizmet",
            "Hızlı ve kolay usta bulma deneyimi",
            "KVKK uyumlu güvenli platform",
            "Ücretsiz kayıt ve kullanım",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-accent/50"
            >
              <CheckCircle className="h-5 w-5 text-brand-accent shrink-0 mt-0.5" />
              <span className="text-brand-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Konum */}
      <div className="mt-16 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <span>Çanakkale, Türkiye</span>
        </div>
      </div>
    </div>
  );
}
