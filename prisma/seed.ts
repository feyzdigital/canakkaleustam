import { PrismaClient } from "../src/generated/prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Veritabanı seed işlemi başlıyor...");

  // Admin kullanıcı oluştur
  const adminPassword = await hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@canakkaleustam.com" },
    update: {},
    create: {
      email: "admin@canakkaleustam.com",
      password: adminPassword,
      name: "Admin",
      surname: "Kullanıcı",
      role: "ADMIN",
      phone: "+905001234567",
      phoneVerified: true,
      isActive: true,
    },
  });
  console.log(`✅ Admin kullanıcı oluşturuldu: ${admin.email}`);

  // Ana kategoriler
  const categories = [
    {
      name: "Elektrikçi",
      slug: "elektrikci",
      icon: "Zap",
      description: "Elektrik tesisatı, priz, anahtar, sigorta ve aydınlatma işleri",
      sortOrder: 1,
    },
    {
      name: "Tesisatçı",
      slug: "tesisatci",
      icon: "Wrench",
      description: "Su tesisatı, pis su, tıkanıklık açma ve musluk tamiri",
      sortOrder: 2,
    },
    {
      name: "Boyacı",
      slug: "boyaci",
      icon: "Paintbrush",
      description: "İç cephe boya, dış cephe boya, dekoratif boya işleri",
      sortOrder: 3,
    },
    {
      name: "Tadilat",
      slug: "tadilat",
      icon: "Hammer",
      description: "Ev ve işyeri tadilat, renovasyon, dekorasyon işleri",
      sortOrder: 4,
    },
    {
      name: "Temizlik",
      slug: "temizlik",
      icon: "Sparkles",
      description: "Ev temizliği, ofis temizliği, inşaat sonrası temizlik",
      sortOrder: 5,
    },
    {
      name: "Nakliyat",
      slug: "nakliyat",
      icon: "Truck",
      description: "Ev taşıma, ofis taşıma, eşya taşıma, ambalajlama",
      sortOrder: 6,
    },
    {
      name: "Klima",
      slug: "klima",
      icon: "Wind",
      description: "Klima montaj, bakım, onarım ve temizlik hizmetleri",
      sortOrder: 7,
    },
    {
      name: "Çilingir",
      slug: "cilingir",
      icon: "Key",
      description: "Kapı açma, kilit değiştirme, çelik kapı kilidi, oto çilingir",
      sortOrder: 8,
    },
    {
      name: "Marangoz",
      slug: "marangoz",
      icon: "TreePine",
      description: "Mobilya tamiri, kapı montajı, mutfak dolabı, gardırop",
      sortOrder: 9,
    },
    {
      name: "Bahçıvan",
      slug: "bahcivan",
      icon: "Flower2",
      description: "Bahçe bakımı, çim biçme, ağaç budama, peyzaj düzenleme",
      sortOrder: 10,
    },
    {
      name: "Kombi Bakımı",
      slug: "kombi-bakimi",
      icon: "Flame",
      description: "Kombi bakım, onarım, montaj ve doğalgaz tesisatı",
      sortOrder: 11,
    },
    {
      name: "Boya Badana",
      slug: "boya-badana",
      icon: "PaintBucket",
      description: "Badana, alçı, kartonpiyer, duvar kaplama işleri",
      sortOrder: 12,
    },
    {
      name: "Parke Döşeme",
      slug: "parke-doseme",
      icon: "LayoutGrid",
      description: "Laminat parke, masif parke, seramik ve fayans döşeme",
      sortOrder: 13,
    },
    {
      name: "Cam Balkon",
      slug: "cam-balkon",
      icon: "Square",
      description: "Cam balkon sistemleri, PVC pencere, alüminyum doğrama",
      sortOrder: 14,
    },
    {
      name: "Çelik Kapı",
      slug: "celik-kapi",
      icon: "DoorClosed",
      description: "Çelik kapı montajı, iç kapı, oda kapısı değişimi",
      sortOrder: 15,
    },
    {
      name: "Güvenlik Kamera",
      slug: "guvenlik-kamera",
      icon: "Camera",
      description: "Güvenlik kamerası montajı, alarm sistemi kurulumu",
      sortOrder: 16,
    },
    {
      name: "Beyaz Eşya Tamiri",
      slug: "beyaz-esya-tamiri",
      icon: "WashingMachine",
      description: "Çamaşır makinesi, bulaşık makinesi, buzdolabı tamiri",
      sortOrder: 17,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log(`✅ ${categories.length} ana kategori oluşturuldu`);

  // Alt kategoriler
  const tadilatCategory = await prisma.category.findUnique({
    where: { slug: "tadilat" },
  });

  if (tadilatCategory) {
    const subCategories = [
      {
        name: "Mutfak Tadilat",
        slug: "mutfak-tadilat",
        icon: "ChefHat",
        description: "Mutfak yenileme, dolap değişimi, tezgah montajı",
        parentId: tadilatCategory.id,
        sortOrder: 1,
      },
      {
        name: "Banyo Tadilat",
        slug: "banyo-tadilat",
        icon: "Bath",
        description: "Banyo yenileme, küvet, duş kabin, seramik değişimi",
        parentId: tadilatCategory.id,
        sortOrder: 2,
      },
      {
        name: "Komple Tadilat",
        slug: "komple-tadilat",
        icon: "Building",
        description: "Komple ev yenileme, daire tadilat, ofis tadilat",
        parentId: tadilatCategory.id,
        sortOrder: 3,
      },
    ];

    for (const sub of subCategories) {
      await prisma.category.upsert({
        where: { slug: sub.slug },
        update: sub,
        create: sub,
      });
    }
    console.log(`✅ ${subCategories.length} alt kategori oluşturuldu (Tadilat)`);
  }

  const tesisatCategory = await prisma.category.findUnique({
    where: { slug: "tesisatci" },
  });

  if (tesisatCategory) {
    const subCategories = [
      {
        name: "Su Tesisatı",
        slug: "su-tesisati",
        icon: "Droplets",
        description: "Temiz su tesisatı, su kaçağı tespiti ve tamiri",
        parentId: tesisatCategory.id,
        sortOrder: 1,
      },
      {
        name: "Doğalgaz Tesisatı",
        slug: "dogalgaz-tesisati",
        icon: "Fuel",
        description: "Doğalgaz tesisatı, sayaç montajı, gaz kaçağı kontrolü",
        parentId: tesisatCategory.id,
        sortOrder: 2,
      },
    ];

    for (const sub of subCategories) {
      await prisma.category.upsert({
        where: { slug: sub.slug },
        update: sub,
        create: sub,
      });
    }
    console.log(`✅ ${subCategories.length} alt kategori oluşturuldu (Tesisat)`);
  }

  console.log("🎉 Seed işlemi tamamlandı!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed hatası:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
