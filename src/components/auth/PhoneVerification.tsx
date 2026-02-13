"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OTP_LENGTH, OTP_EXPIRY_MINUTES } from "@/lib/constants";
import { trpc } from "@/lib/trpc";

export function PhoneVerification() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(OTP_EXPIRY_MINUTES * 60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const sendCodeMutation = trpc.auth.sendPhoneVerification.useMutation({
    onSuccess: () => {
      setCountdown(OTP_EXPIRY_MINUTES * 60);
      setCanResend(false);
      setError(null);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const verifyMutation = trpc.auth.verifyPhone.useMutation({
    onSuccess: () => {
      router.push("/panel");
      router.refresh();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // İlk yüklenmede SMS gönder
  useEffect(() => {
    sendCodeMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Otomatik focus
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Tüm haneler dolduysa otomatik doğrula
    const fullCode = newCode.join("");
    if (fullCode.length === OTP_LENGTH) {
      verifyMutation.mutate({ code: fullCode });
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    const newCode = [...code];

    for (let i = 0; i < Math.min(pasteData.length, OTP_LENGTH); i++) {
      newCode[i] = pasteData[i];
    }

    setCode(newCode);

    const fullCode = newCode.join("");
    if (fullCode.length === OTP_LENGTH) {
      verifyMutation.mutate({ code: fullCode });
    }
  }

  function handleResend() {
    setCode(new Array(OTP_LENGTH).fill(""));
    sendCodeMutation.mutate();
    inputRefs.current[0]?.focus();
  }

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
          <Phone className="h-6 w-6 text-brand-primary" />
        </div>
        <CardTitle className="text-2xl">Telefon Doğrulama</CardTitle>
        <CardDescription>
          Telefonunuza gönderilen {OTP_LENGTH} haneli kodu giriniz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold"
                disabled={verifyMutation.isPending}
              />
            ))}
          </div>

          {countdown > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Kod geçerlilik süresi:{" "}
              <span className="font-medium">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                const fullCode = code.join("");
                if (fullCode.length === OTP_LENGTH) {
                  verifyMutation.mutate({ code: fullCode });
                }
              }}
              disabled={
                code.join("").length !== OTP_LENGTH ||
                verifyMutation.isPending
              }
              className="w-full"
            >
              {verifyMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Doğrulanıyor...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Doğrula
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={!canResend || sendCodeMutation.isPending}
              className="w-full"
            >
              {sendCodeMutation.isPending
                ? "Gönderiliyor..."
                : canResend
                  ? "Kodu Tekrar Gönder"
                  : `Tekrar gönder (${minutes}:${seconds.toString().padStart(2, "0")})`}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
