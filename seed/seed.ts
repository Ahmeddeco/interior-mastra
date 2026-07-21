import { ProductStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { faker } from "@faker-js/faker"


async function main() {
  console.log("🌱 Starting database seeding...")

  // 1. Clean up existing data
  console.log("🧹 Cleaning up old data...")
  await prisma.favorite.deleteMany()
  await prisma.design.deleteMany()
  await prisma.product.deleteMany()
  await prisma.factory.deleteMany()
  await prisma.class.deleteMany()
  await prisma.color.deleteMany()
  await prisma.style.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  // 2. Seed Users
  console.log("👤 Seeding Users...")
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@interior.com",
      mobile: "+201000000001",
      role: Role.admin,
      city: "Cairo",
      state: "Cairo",
      country: "Egypt",
    },
  })

  await prisma.user.create({
    data: {
      name: "Ahmed Designer",
      email: "designer@interior.com",
      mobile: "+201000000002",
      role: Role.designer,
      city: "Shebin El Kom",
      state: "Menofia",
      country: "Egypt",
    },
  })

  const manufacturerUser = await prisma.user.create({
    data: {
      name: "Furniture Factory Owner",
      email: "manufacturer@interior.com",
      mobile: "+201000000003",
      role: Role.manufacturer,
      city: "Sadat City",
      state: "Menofia",
      country: "Egypt",
    },
  })

  const clientUser = await prisma.user.create({
    data: {
      name: "Client Customer",
      email: "client@interior.com",
      mobile: "+201000000004",
      role: Role.client,
      city: "New Cairo",
      state: "Cairo",
      country: "Egypt",
    },
  })

  // 3. Seed Styles
  console.log("🎨 Seeding Styles...")
  const stylesData = [
    { titleEn: "Modern", titleAr: "مودرن", slug: "modern" },
    { titleEn: "Classic", titleAr: "كلاسيك", slug: "classic" },
    { titleEn: "Minimalist", titleAr: "بسيط", slug: "minimalist" },
    { titleEn: "Industrial", titleAr: "صناعي", slug: "industrial" },
    { titleEn: "Bohemian", titleAr: "بوهيمي", slug: "bohemian" },
  ]

  const createdStyles = []
  for (const s of stylesData) {
    const style = await prisma.style.create({
      data: {
        titleEn: s.titleEn,
        titleAr: s.titleAr,
        slug: s.slug,
        descriptionEn: faker.lorem.paragraph(),
        descriptionAr: faker.lorem.paragraph(),
        image: faker.image.url(),
      },
    })
    createdStyles.push(style)
  }

  // 4. Seed Colors
  console.log("🌈 Seeding Colors...")
  const colorsData = [
    { titleEn: "Beige", titleAr: "بيج", slug: "beige", colorCode: "#F5F5DC" },
    { titleEn: "Charcoal", titleAr: "فحمي", slug: "charcoal", colorCode: "#36454F" },
    { titleEn: "Gold", titleAr: "ذهبي", slug: "gold", colorCode: "#FFD700" },
    { titleEn: "Emerald Green", titleAr: "أخضر زمردي", slug: "emerald-green", colorCode: "#50C878" },
    { titleEn: "Warm White", titleAr: "أبيض دافئ", slug: "warm-white", colorCode: "#FDFBF7" },
  ]

  const createdColors = []
  for (const c of colorsData) {
    const color = await prisma.color.create({
      data: c,
    })
    createdColors.push(color)
  }

  // 5. Seed Classes
  console.log("🛋️ Seeding Classes...")
  const classesData = [
    { titleEn: "Living Room", titleAr: "غرفة معيشة", slug: "living-room" },
    { titleEn: "Bedroom", titleAr: "غرفة نوم", slug: "bedroom" },
    { titleEn: "Dining Room", titleAr: "غرفة طعام", slug: "dining-room" },
    { titleEn: "Office", titleAr: "مكتب", slug: "office" },
  ]

  const createdClasses = []
  for (const cl of classesData) {
    const cClass = await prisma.class.create({
      data: {
        ...cl,
        descriptionEn: faker.lorem.sentence(),
        descriptionAr: faker.lorem.sentence(),
        image: faker.image.url(),
      },
    })
    createdClasses.push(cClass)
  }

  // 6. Seed Factories
  console.log("🏭 Seeding Factories...")
  const factory = await prisma.factory.create({
    data: {
      name: "Luxury Wood Works",
      slug: "luxury-wood-works",
      info: "Premium custom furniture manufacturing factory.",
      country: "Egypt",
      state: "Menofia",
      city: "Sadat City",
      mobile: "+20480000000",
      hotLine: "19000",
      owner: {
        connect: [{ id: manufacturerUser.id }],
      },
    },
  })

  // 7. Seed Products
  console.log("📦 Seeding Products...")
  for (let i = 1; i <= 10; i++) {
    const titleEn = `Modern Sofa Model ${i}`
    await prisma.product.create({
      data: {
        titleEn: titleEn,
        titleAr: `كنبة مودرن موديل ${i}`,
        miniDescriptionEn: "High-quality modular sofa built with solid beech wood.",
        miniDescriptionAr: "كنبة مودرن عالية الجودة مصنعة من الخشب الزان الأحمر.",
        descriptionEn: faker.lorem.paragraphs(2),
        descriptionAr: faker.lorem.paragraphs(2),
        slug: faker.helpers.slugify(titleEn).toLowerCase(),
        model: `MOD-SOFA-${1000 + i}`,
        status: ProductStatus.published,
        quantity: 25,
        lowStock: 5,
        price: faker.number.int({ min: 15000, max: 80000 }),
        discount: 10,
        mainImage: faker.image.url(),
        images: [
          faker.image.url(),
          faker.image.url(),
        ],
        factory: { connect: { id: factory.id } },
        style: { connect: { id: createdStyles[i % createdStyles.length].id } },
        class: { connect: { id: createdClasses[i % createdClasses.length].id } },
        color: {
          connect: [{ id: createdColors[i % createdColors.length].id }],
        },
      },
    })
  }

  // 8. Seed Designs
  console.log("✏️ Seeding 3D Interior Designs...")
  for (let i = 1; i <= 5; i++) {
    const titleEn = `Luxury Villa Interior Concept ${i}`
    await prisma.design.create({
      data: {
        titleEn: titleEn,
        titleAr: `تصميم داخلي لفيلة فاخرة ${i}`,
        slug: faker.helpers.slugify(titleEn).toLowerCase(),
        descriptionEn: faker.lorem.paragraphs(3),
        descriptionAr: faker.lorem.paragraphs(3),
        painPointsEn: "Dark tight spaces with poor natural lighting integration.",
        painPointsAr: "المساحات المظلمة الضيقة مع ضعف استغلال الإضاءة الطبيعية.",
        solutionsEn: "Utilized open-plan layout, light oak wood cladding, and hidden LED channels.",
        solutionsAr: "استخدام مسقط مفتوح مع تجاليد خشبية فاتحة وإضاءة مخفية.",
        mainImage: faker.image.url(),
        images: [
          faker.image.url(),
          faker.image.url(),
        ],
        country: "Egypt",
        state: "Cairo",
        city: "New Cairo",
        client: { connect: { id: clientUser.id } },
        style: { connect: { id: createdStyles[i % createdStyles.length].id } },
      },
    })
  }

  console.log("✅ Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })