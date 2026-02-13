import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticPages = [
    "",
    "/ustalar",
    "/kategoriler",
    "/hakkimizda",
    "/iletisim",
    "/giris",
    "/kayit",
    "/kayit/usta",
  ];

  const categoryPages = [
    "elektrikci",
    "tesisatci",
    "boyaci",
    "tadilat",
    "temizlik",
    "nakliyat",
    "klima",
    "cilingir",
    "marangoz",
    "bahcivan",
    "kombi-bakimi",
    "boya-badana",
    "parke-doseme",
    "cam-balkon",
    "celik-kapi",
    "guvenlik-kamera",
    "beyaz-esya-tamiri",
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
    ...categoryPages.map((slug) => ({
      url: `${baseUrl}/kategoriler/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
