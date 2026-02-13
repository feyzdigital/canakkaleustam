"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uygulama hatası:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-3">
          Bir Hata Oluştu
        </h1>
        <p className="text-muted-foreground mb-8">
          Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya daha sonra
          tekrar ziyaret edin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Tekrar Dene
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
