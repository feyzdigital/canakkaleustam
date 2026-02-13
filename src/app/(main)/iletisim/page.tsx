"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simüle edilmiş form gönderimi
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
          İletişim
        </h1>
        <p className="text-muted-foreground text-lg">
          Sorularınız, önerileriniz veya geri bildirimleriniz için bize
          ulaşabilirsiniz.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* İletişim Bilgileri */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-posta</h3>
                <a
                  href="mailto:info@canakkaleustam.com"
                  className="text-sm text-muted-foreground hover:text-brand-primary"
                >
                  info@canakkaleustam.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Telefon</h3>
                <a
                  href="tel:+902860000000"
                  className="text-sm text-muted-foreground hover:text-brand-primary"
                >
                  +90 (286) 000 00 00
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Adres</h3>
                <p className="text-sm text-muted-foreground">
                  Çanakkale Merkez, Çanakkale
                  <br />
                  Türkiye
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                <p className="text-sm text-muted-foreground">
                  Pazartesi - Cumartesi
                  <br />
                  09:00 - 18:00
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* İletişim Formu */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Bize Yazın</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-brand-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Mesajınız İletildi!
                  </h3>
                  <p className="text-muted-foreground">
                    En kısa sürede size geri dönüş yapacağız.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSubmitted(false)}
                  >
                    Yeni Mesaj Gönder
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input
                        id="name"
                        placeholder="Adınız Soyadınız"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input
                      id="subject"
                      placeholder="Mesajınızın konusu"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea
                      id="message"
                      placeholder="Mesajınızı buraya yazın..."
                      rows={6}
                      className="resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Gönderiliyor...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Mesaj Gönder
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
