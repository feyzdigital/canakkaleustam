# canakkaleustam.com - Yerel Usta Hizmet Platformu

Canakkale ilinde faaliyet gosterecek, ustalari ve hizmet arayan kisileri bulusturan profesyonel bir web platformu.

## Teknoloji Stack'i

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui
- **State:** Zustand (global), TanStack Query (server state)
- **Form:** React Hook Form + Zod v4
- **Backend:** Next.js API Routes + tRPC v11
- **ORM:** Prisma 7 (PostgreSQL)
- **Auth:** NextAuth.js v5 (Credentials provider, JWT)
- **Harita:** Leaflet / React Leaflet

## Baslangic

### Gereksinimler

- Node.js 20+
- PostgreSQL veritabani (Supabase, Neon veya lokal)

### Kurulum

```bash
# Bagimliliklari kur
npm install

# Prisma client olustur
npm run db:generate

# .env dosyasini duzenle
cp .env.example .env.local
# DATABASE_URL ve NEXTAUTH_SECRET degiskenlerini ayarla

# Veritabani migration
npm run db:push

# Seed verilerini yukle
npm run db:seed

# Gelistirme sunucusu
npm run dev
```

### Ortam Degiskenleri

`.env.example` dosyasindaki tum degiskenleri `.env.local` dosyasina kopyalayip doldurun.

## Proje Yapisi

```
src/
  app/              # Next.js App Router sayfalari
    (auth)/         # Giris, kayit, dogrulama
    (main)/         # Ana sayfa, ustalar, kategoriler
    (dashboard)/    # Kullanici ve usta paneli
    admin/          # Admin paneli
    api/            # API route'lari (tRPC, NextAuth)
  components/       # React bilesenleri
    ui/             # shadcn/ui bilesenleri
    layout/         # Header, Footer, Sidebar, MobileNav
    auth/           # Auth form bilesenleri
    shared/         # Paylasilan bilesenler
    review/         # Degerlendirme bilesenleri
  server/           # Server-side kod
    api/routers/    # tRPC router'lari
    auth/           # NextAuth yapilandirmasi
    db/             # Prisma client
  lib/              # Yardimci fonksiyonlar
    validations/    # Zod validasyon semalari
  hooks/            # Custom React hook'lari
  store/            # Zustand store
  types/            # TypeScript tipleri
prisma/
  schema.prisma     # Veritabani semasi
  seed.ts           # Baslangic verileri
```

## Sayfalar

| URL | Aciklama |
|-----|----------|
| `/` | Ana sayfa |
| `/ustalar` | Usta listeleme |
| `/ustalar/[slug]` | Usta profil |
| `/kategoriler` | Tum kategoriler |
| `/kategoriler/[slug]` | Kategori detay |
| `/hakkimizda` | Hakkimizda |
| `/iletisim` | Iletisim |
| `/giris` | Giris yap |
| `/kayit` | Musteri kayit |
| `/kayit/usta` | Usta kayit |
| `/dogrulama` | Telefon dogrulama |
| `/panel` | Musteri paneli |
| `/usta-panel` | Usta paneli |
| `/admin` | Admin paneli |

## Lisans

Tum haklari saklidir.
