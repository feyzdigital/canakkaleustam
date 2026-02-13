import "./globals.css";

export const metadata = {
  title: "Çanakkale Ustam",
  description: "Çanakkale'nin güvenilir ustalarını bulun.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

