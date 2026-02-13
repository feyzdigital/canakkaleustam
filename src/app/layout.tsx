import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Çanakkale Ustam | Güvenilir Ustaların Adresi",
    template: "%s | Çanakkale Ustam",
  },
  description:
    "Çanakkale'nin güvenilir ustalarını bulun. Elektrikçi, tesisatçı, boyacı ve daha fazlası tek bir platformda.",
  keywords: [
    "çanakkale usta",
    "çanakkale elektrikçi",
    "çanakkale tesisatçı",
    "çanakkale boyacı",
    "çanakkale tadilat",
    "usta bul",
    "hizmet bul",
  ],
  authors: [{ name: "Çanakkale Ustam" }],
  creator: "Çanakkale Ustam",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Çanakkale Ustam",
    title: "Çanakkale Ustam | Güvenilir Ustaların Adresi",
    description:
      "Çanakkale'nin güvenilir ustalarını bulun. Elektrikçi, tesisatçı, boyacı ve daha fazlası tek bir platformda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Çanakkale Ustam | Güvenilir Ustaların Adresi",
    description:
      "Çanakkale'nin güvenilir ustalarını bulun.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
