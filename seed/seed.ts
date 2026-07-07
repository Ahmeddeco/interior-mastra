import { ProductStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { faker } from "@faker-js/faker"


// بيانات ثابتة وواقعية لأقسام الديكور لضمان جودة البيانات
const DECOR_CLASSES = [
  { titleAr: 'غرف نوم', titleEn: 'Bedrooms', slug: 'bedrooms' },
  { titleAr: 'غرف سفرة', titleEn: 'Dining Rooms', slug: 'dining-rooms' },
  { titleAr: 'غرف أطفال', titleEn: 'Kids Rooms', slug: 'kids-rooms' },
  { titleAr: 'ستائر ومفروشات', titleEn: 'Curtains & Textiles', slug: 'curtains-textiles' },
  { titleAr: 'إكسسوارات الديكور', titleEn: 'Decor Accessories', slug: 'decor-accessories' },
  { titleAr: 'تابلوهات ولوحات فنية', titleEn: 'Wall Art & Tableaux', slug: 'wall-art' },
  { titleAr: 'إضاءة ووحدات إنارة', titleEn: 'Lighting', slug: 'lighting' },
  { titleAr: 'أثاث مكتبي', titleEn: 'Office Furniture', slug: 'office-furniture' },
]

// بيانات ثابتة وواقعية لاستايلات الديكور العالمية
const DECOR_STYLES = [
  { titleAr: 'مودرن', titleEn: 'Modern', slug: 'modern', descAr: 'تتميز بالخطوط البسيطة والنظيفة والابتعاد عن الزخرفة الزائدة.', descEn: 'Characterized by clean lines, simple color palettes, and the use of materials like metal and glass.' },
  { titleAr: 'كلاسيك', titleEn: 'Classic', slug: 'classic', descAr: 'يعتمد على الفخامة والتناظر والأثاث الخشبي المحفور والمنسوجات الغنية.', descEn: 'Refined, developed, and rich in details. Features symmetry, antique pieces, and rich fabrics.' },
  { titleAr: 'مينيماليزم (تبسيطية)', titleEn: 'Minimalism', slug: 'minimalism', descAr: 'التركيز على الأساسيات فقط، ألوان محايدة، ومساحات مفتوحة مريحة.', descEn: 'Focus on essential elements, neutral color palettes, and functional layout. Less is more.' },
  { titleAr: 'نيو كلاسيك', titleEn: 'Neo-Classical', slug: 'neo-classic', descAr: 'مزيج بين فخامة الكلاسيك وبساطة المودرن بشكل أنيق ومعاصر.', descEn: 'A modern take on traditional classical design, blending elegance with contemporary trends.' },
  { titleAr: 'إسكندنافي', titleEn: 'Scandinavian', slug: 'scandinavian', descAr: 'يركز على البساطة، الوظيفة، واستخدام الأخشاب الفاتحة والإضاءة الطبيعية.', descEn: 'Focuses on functionality, simplicity, and a connection to nature through light woods and natural light.' },
]

// ألوان شائعة في تصاميم الديكور والدهانات
const DECOR_COLORS = [
  { titleAr: 'أبيض مطفي', titleEn: 'Matte White', slug: 'matte-white', code: '#F5F5F5' },
  { titleAr: 'رمادي دافئ', titleEn: 'Warm Gray', slug: 'warm-gray', code: '#8B8C89' },
  { titleAr: 'بيج كشمير', titleEn: 'Cashmere Beige', slug: 'cashmere-beige', code: '#E6D7C3' },
  { titleAr: 'أزرق ملوكي', titleEn: 'Royal Blue', slug: 'royal-blue', code: '#002366' },
  { titleAr: 'أخضر زيتي', titleEn: 'Olive Green', slug: 'olive-green', code: '#556B2F' },
  { titleAr: 'خردلي دافئ', titleEn: 'Warm Mustard', slug: 'warm-mustard', code: '#E1AD01' },
  { titleAr: 'أسود كربوني', titleEn: 'Carbon Black', slug: 'carbon-black', code: '#1C1C1C' },
]

async function main() {
  console.log('⏳ بدء عملية تنظيف وقذف البيانات (Seeding)...')

  // 1. تنظيف قاعدة البيانات لتجنب تكرار الـ Unique constraints عند إعادة التشغيل
  await prisma.favorite.deleteMany()
  await prisma.product.deleteMany()
  await prisma.factory.deleteMany()
  await prisma.user.deleteMany()
  await prisma.class.deleteMany()
  await prisma.style.deleteMany()
  await prisma.color.deleteMany()

  console.log('✅ تم تنظيف البيانات القديمة بنجاح.')

  // 2. إنشاء أقسام الديكور (Classes)
  const createdClasses = await Promise.all(
    DECOR_CLASSES.map((cls) =>
      prisma.class.create({
        data: {
          titleAr: cls.titleAr,
          titleEn: cls.titleEn,
          slug: cls.slug,
          image: faker.image.url(),
          descriptionAr: `قسم مخصص لـ ${cls.titleAr} بجميع أنواعها وتصاميمها المختلفة.`,
          descriptionEn: `Specialized section for all kinds of ${cls.titleEn} and their custom layouts.`,
        },
      })
    )
  )
  console.log(`🎉 تم إنشاء ${createdClasses.length} أقسام رئيسية للديكور.`)

  // 3. إنشاء استايلات الديكور (Styles)
  const createdStyles = await Promise.all(
    DECOR_STYLES.map((style) =>
      prisma.style.create({
        data: {
          titleAr: style.titleAr,
          titleEn: style.titleEn,
          slug: style.slug,
          descriptionAr: style.descAr,
          descriptionEn: style.descEn,
          image: faker.image.url(),
        },
      })
    )
  )
  console.log(`🎉 تم إنشاء ${createdStyles.length} استايلات ديكور.`)

  // 4. إنشاء الألوان (Colors)
  const createdColors = await Promise.all(
    DECOR_COLORS.map((color) =>
      prisma.color.create({
        data: {
          titleAr: color.titleAr,
          titleEn: color.titleEn,
          slug: color.slug,
          colorCode: color.code,
        },
      })
    )
  )
  console.log(`🎉 تم إنشاء ${createdColors.length} ألوان ديكور.`)

  // 5. إنشاء مستخدمين (Users) بأدوار مختلفة (خاصة Manufacturer لربطهم بالمصانع)
  const usersData = [
    { name: 'أحمد عبد الفتاح', email: 'ahmed@decor.com', role: Role.manufacturer },
    { name: 'سارة علي', email: 'sara@decor.com', role: Role.designer },
    { name: 'محمد محمود', email: 'mohamed@decor.com', role: Role.client },
    { name: 'كريم خالد', email: 'karim@decor.com', role: Role.manufacturer },
  ]

  const createdUsers = await Promise.all(
    usersData.map((u) =>
      prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          mobile: faker.helpers.fromRegExp(/01[0125][0-8]{8}/),
          role: u.role,
          emailVerified: true,
          city: 'القاهرة',
          state: 'القاهرة',
          country: 'مصر',
        },
      })
    )
  )
  console.log(`🎉 تم إنشاء ${createdUsers.length} مستخدمين.`)

  // تصفية المستخدمين الذين يملكون دور مصنع لربطهم بالمصانع
  const manufacturers = createdUsers.filter((u) => u.role === Role.manufacturer)

  // 6. إنشاء مصانع الديكور والأثاث (Factories)
  const factoryNames = ['مصنع موبيليات الشرق', 'روائع الأثاث الحديث', 'Modern Home Factory']
  const createdFactories = await Promise.all(
    factoryNames.map((name, index) => {
      const ownerUser = manufacturers[index % manufacturers.length]
      return prisma.factory.create({
        data: {
          name,
          slug: faker.helpers.slugify(`${name}-${index}-${faker.string.alphanumeric(3)}`.toLowerCase()),
          logo: faker.image.avatar(),
          info: `من أكبر المصانع المتخصصة في صناعة وتوريد مستلزمات الديكور والأثاث الفاخر.`,
          country: 'مصر',
          state: 'دمياط',
          city: 'المنطقة الصناعية',
          mobile: faker.helpers.fromRegExp(/01[0125][0-8]{8}/),
          hotLine: '19XXX',
          owner: {
            connect: { id: ownerUser.id }, // ربط المصنع بمالكه (علاقة Many-to-Many حسب الاسكيما)
          },
        },
      })
    })
  )
  console.log(`🎉 تم إنشاء ${createdFactories.length} مصانع أثاث وديكور.`)

  // 7. إنشاء المنتجات (Products) مع ربط العلاقات (Factory, Style, Class, Colors)
  console.log('⏳ جاري توليد المنتجات وربط العلاقات المتبادلة...')

  for (let i = 0; i < 30; i++) {
    const randomClass = faker.helpers.arrayElement(createdClasses)
    const randomStyle = faker.helpers.arrayElement(createdStyles)
    const randomFactory = faker.helpers.arrayElement(createdFactories)

    // اختيار عشوائي للونين أو ثلاثة للمنتج الواحد (علاقة Many-to-Many)
    const randomColors = faker.helpers.arrayElements(createdColors, { min: 1, max: 3 })

    const productNameEn = `${randomStyle.titleEn} ${randomClass.titleEn.slice(0, -1)} - Model ${faker.string.alphanumeric(4).toUpperCase()}`
    const productNameAr = `${randomClass.titleAr} استايل ${randomStyle.titleAr} - موديل ${faker.string.alphanumeric(4).toUpperCase()}`

    await prisma.product.create({
      data: {
        titleAr: productNameAr,
        titleEn: productNameEn,
        miniDescriptionAr: `منتج راقٍ وعالي الجودة يناسب عشاق الديكور الـ ${randomStyle.titleAr}.`,
        miniDescriptionEn: `An elegant high-quality product that perfectly fits ${randomStyle.titleEn} design lovers.`,
        descriptionAr: `تم تصنيع هذا المنتج باستخدام أفضل الخامات المقاومة للتلف، وبتشطيب احترافي يضمن لك المتانة والأناقة الممتدة التي تضفي لمسة جمالية فريدة على مساحتك الخاصة.`,
        descriptionEn: `Crafted with premium durable materials and expert finishing, ensuring long-lasting elegance and durability that adds a stunning visual aesthetic to your custom space.`,
        slug: faker.helpers.slugify(faker.string.alphanumeric(3).toLowerCase()),
        model: `DEC-${faker.string.numeric(5)}-${i}`,
        status: faker.helpers.arrayElement([ProductStatus.published, ProductStatus.draft]),
        quantity: faker.number.int({ min: 5, max: 150 }),
        lowStock: 10,
        price: faker.number.int({ min: 1500, max: 45000 }),
        discount: faker.helpers.arrayElement([0, 5, 10, 15, 20]),
        mainImage: faker.image.url(),
        images: [
          faker.image.url(),
          faker.image.url(),
        ],
        // ربط العلاقات
        factoryId: randomFactory.id,
        styleId: randomStyle.id,
        classId: randomClass.id,
        color: {
          connect: randomColors.map((c: { id: string }) => ({ id: c.id })),
        },
      },
    })
  }

  // 8. إنشاء قائمة المفضلة (Favorites) لربط المستخدمين بالمنتجات بشكل عشوائي
  const allProducts = await prisma.product.findMany({ where: { status: ProductStatus.published } })
  const clients = createdUsers.filter((u) => u.role === Role.client || u.role === Role.designer)

  if (allProducts.length > 0 && clients.length > 0) {
    for (const client of clients) {
      // كل مستخدم يفضل منتجين عشوائيين
      const favoredProducts = faker.helpers.arrayElements(allProducts, 2)
      for (const prod of favoredProducts) {
        await prisma.favorite.create({
          data: {
            userId: client.id,
            productId: prod.id,
          },
        }).catch(() => {
          // تفادي الخطأ في حال تكرار العشوائية على نفس الـ Composite Unique key
        })
      }
    }
    console.log('🎉 تم ربط بعض المنتجات بقائمة المفضلة للمستخدمين.')
  }

  console.log('🏁 تم الانتهاء من عملية Seeding بنجاح وامتلأت قاعدة البيانات بالكامل!')
}

main()
  .catch((e) => {
    console.error('❌ حدث خطأ أثناء تنفيذ الـ Seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })