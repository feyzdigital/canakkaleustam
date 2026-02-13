"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-brand-primary/20 mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-muted-foreground mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ustalar">
              <Search className="h-4 w-4 mr-2" />
              Usta Ara
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          <Button variant="ghost" size="sm" onClick={() => history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Button>
        </div>
      </div>
    </div>
  );
}
