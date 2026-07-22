import { ProductStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

async function main() {
  console.log('🌱 Starting database seeding...')

  // 1. Clean existing seed data (Optional: Order matters due to foreign keys)
  await prisma.favorite.deleteMany()
  await prisma.product.deleteMany()
  await prisma.design.deleteMany()
  await prisma.article.deleteMany()
  await prisma.factory.deleteMany()
  await prisma.style.deleteMany()
  await prisma.color.deleteMany()
  await prisma.class.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleaned database tables.')

  // 2. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'أحمد محمود (مصمم دافينشي)',
      email: 'admin@decor-app.com',
      mobile: '+201000000001',
      role: Role.admin,
      city: 'القاهرة',
      state: 'القاهرة',
      country: 'مصر',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  })

  const designerUser = await prisma.user.create({
    data: {
      name: 'م. سارة فاروق',
      email: 'sara.designer@decor-app.com',
      mobile: '+201000000002',
      role: Role.designer,
      city: 'الإسكندرية',
      state: 'الإسكندرية',
      country: 'مصر',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
  })

  const manufacturerUser = await prisma.user.create({
    data: {
      name: 'مؤسسة الفخامة للأثاث',
      email: 'contact@luxury-furniture.com',
      mobile: '+201000000003',
      role: Role.manufacturer,
      city: 'دمياط',
      state: 'دمياط',
      country: 'مصر',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
  })

  // 3. Create Factories
  const factory1 = await prisma.factory.create({
    data: {
      name: 'مصنع روائع دمياط للأثاث الحديث',
      slug: 'rawae-domyat-factory',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      info: 'مصنع متخصص في تصنيع الأثاث الخشبي الطبيعي المودرن والنيوكلاسيك بأعلى معايير الجودة العالمية.',
      country: 'مصر',
      state: 'دمياط',
      city: 'دمياط الجديدة',
      mobile: '+201200000111',
      hotLine: '19000',
      owner: { connect: { id: manufacturerUser.id } },
    },
  })

  const factory2 = await prisma.factory.create({
    data: {
      name: 'ستوديو الأثاث الإيطالي',
      slug: 'italian-furniture-studio',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80',
      info: 'متخصصون في الأثاث المودرن الفاخر والإضاءات الديكورية ذات الطابع الأوروبي العصري.',
      country: 'مصر',
      state: 'القاهرة',
      city: 'التجمع الخامس',
      mobile: '+201200000222',
      hotLine: '19888',
      owner: { connect: { id: adminUser.id } },
    },
  })

  // 4. Create Styles
  const styleModern = await prisma.style.create({
    data: {
      titleAr: 'مودرن عصري',
      titleEn: 'Modern',
      slug: 'modern',
      descriptionAr: 'يعتمد على البساطة، الخطوط المستقيمة، والألوان المحايدة مع التخلي عن البهرجة الزائدة.',
      descriptionEn: 'Focuses on simplicity, clean lines, and a neutral color palette.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    },
  })

  const styleClassic = await prisma.style.create({
    data: {
      titleAr: 'كلاسيك فاخر',
      titleEn: 'Classic',
      slug: 'classic',
      descriptionAr: 'يتميز بالحفر الخشبي اليدوي، الأقمشة الثقيلة كالفيلمور والمخمل، والتفاصيل الذهبية الفخمة.',
      descriptionEn: 'Characterized by intricate wood carvings, rich fabrics, and opulent gold details.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    },
  })

  const styleNeoclassic = await prisma.style.create({
    data: {
      titleAr: 'نيوكلاسيك',
      titleEn: 'Neoclassic',
      slug: 'neoclassic',
      descriptionAr: 'مزيج رائع يجمع بين أصالة وفخامة الكلاسيك وبساطة وراحة الاستخدام المودرن.',
      descriptionEn: 'A perfect blend of classic elegance and modern minimalism.',
      image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80',
    },
  })

  const styleBoho = await prisma.style.create({
    data: {
      titleAr: 'بوهيمي',
      titleEn: 'Bohemian',
      slug: 'bohemian',
      descriptionAr: 'يعتمد على المواد الطبيعية مثل الخيزران، النباتات الداخلية، والألوان المبهجة المفعمة بالحيوية.',
      descriptionEn: 'Emphasizes natural elements, rattan textures, plants, and relaxed vibrant vibes.',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    },
  })

  // 5. Create Colors
  const colorGrey = await prisma.color.create({
    data: { titleAr: 'رمادي هادئ', titleEn: 'Calm Grey', slug: 'calm-grey', colorCode: '#808080' },
  })
  const colorBeige = await prisma.color.create({
    data: { titleAr: 'بيج دافئ', titleEn: 'Warm Beige', slug: 'warm-beige', colorCode: '#F5F5DC' },
  })
  await prisma.color.create({
    data: { titleAr: 'ذهبي ملكي', titleEn: 'Royal Gold', slug: 'royal-gold', colorCode: '#FFD700' },
  })
  await prisma.color.create({
    data: { titleAr: 'أخضر زمردي', titleEn: 'Emerald Green', slug: 'emerald-green', colorCode: '#50C878' },
  })
  await prisma.color.create({
    data: { titleAr: 'بني خشبي طبيعي', titleEn: 'Natural Walnut', slug: 'natural-walnut', colorCode: '#5C4033' },
  })

  // 6. Create Classes (Categories)
  const classLiving = await prisma.class.create({
    data: {
      titleAr: 'غرف المعيشة والصالون',
      titleEn: 'Living Room Furniture',
      slug: 'living-room',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'تشكيلة راقية من الكنب، الصالونات، والركنات المريحة لغرفة المعيشة.',
      descriptionEn: 'Sophisticated collection of sofas, sectionals, and living space furniture.',
    },
  })

  const classBedroom = await prisma.class.create({
    data: {
      titleAr: 'غرف النوم',
      titleEn: 'Bedroom Furniture',
      slug: 'bedroom',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'أسرة فاخرة وخزائن ملابس توفر الراحة والهدوء التام.',
      descriptionEn: 'Luxury beds and wardrobes designed for ultimate comfort and relaxation.',
    },
  })

  const classLighting = await prisma.class.create({
    data: {
      titleAr: 'الإضاءة والديكورات',
      titleEn: 'Lighting & Decor',
      slug: 'lighting-decor',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'نجف، أباجورات، وحدة إضاءة جدارية وإكسسوارات منزلية فريدة.',
      descriptionEn: 'Chandeliers, lamps, wall lighting, and unique home accessories.',
    },
  })

  const classDining = await prisma.class.create({
    data: {
      titleAr: 'غرف الطعام والسفرة',
      titleEn: 'Dining Room',
      slug: 'dining-room',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'طاولات سفرة وكراسي بتصاميم تجمع الفخامة بالعملية.',
      descriptionEn: 'Elegant dining tables and chairs for high-end dining experiences.',
    },
  })

  // ==========================================
  // 7. SEED PRODUCTS (متنوعة وبصور دقيقة)
  // ==========================================
  console.log('📦 Seeding Products...')

  await prisma.product.createMany({
    data: [
      {
        titleAr: 'كنبة مودرن رمادية زاوية (ركنة)',
        titleEn: 'Modern Grey Sectional Sofa',
        miniDescriptionAr: 'ركنة مودرن مريحة للغاية بمقاسات واسعة وخامات زان أحمر متينة.',
        miniDescriptionEn: 'Comfortable L-shaped modern sofa made from solid beech wood.',
        descriptionAr: 'صممت هذه الركنة لتجمع بين الراحة المطلقة والمظهر العصري الأنيق. القماش الخارجي مقاوم للبقع وسهل التنظيف، والإسفنج ذو كثافة عالية 33 لضمان عدم الهبوط مع الاستخدام المستمر.',
        descriptionEn: 'Designed to merge maximum comfort with high-end modern aesthetics. Stain-resistant fabric with high-density foam padding.',
        slug: 'modern-grey-sectional-sofa',
        model: 'SOFA-MOD-2026-01',
        status: ProductStatus.published,
        quantity: 15,
        lowStock: 3,
        price: 24500,
        discount: 10,
        mainImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
        ],
        factoryId: factory1.id,
        styleId: styleModern.id,
        classId: classLiving.id,
      },
      {
        titleAr: 'طقم صالون كلاسيك مذهب فاخر',
        titleEn: 'Royal Classic Golden Salon Set',
        miniDescriptionAr: 'صالون كلاسيكي راقي بحفر يدوي وأوراق الذهب الفرنساوي.',
        miniDescriptionEn: 'Hand-carved classical salon set finished with French gold leaf.',
        descriptionAr: 'طقم صالون يتكون من كنبة ثلاثية، 4 كراسي فوتيه، وطاولة قاطعة هرمية. مصنوع بالكامل من خشب الزان الأحمر الروماني المطعّم بالبوليستر المذهب والقماش المخملي الفاخر.',
        descriptionEn: 'Includes a 3-seater sofa, 4 armchairs, and a center table. Crafted with high-grade solid beech wood and luxury velvet fabric.',
        slug: 'royal-classic-golden-salon',
        model: 'SALON-CLS-2026-02',
        status: ProductStatus.published,
        quantity: 5,
        lowStock: 1,
        price: 68000,
        discount: 5,
        mainImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1000&q=80',
        ],
        factoryId: factory1.id,
        styleId: styleClassic.id,
        classId: classLiving.id,
      },
      {
        titleAr: 'سرير نوم نيوكلاسيك مجدّد بخلفية كابيتونيه',
        titleEn: 'Neoclassic Tufted Upholstered Bed',
        miniDescriptionAr: 'سرير غرفة نوم بتصميم نيوكلاسيك هادئ مع ظهر كابيتونيه قماش مخملي.',
        miniDescriptionEn: 'Neoclassic master bed featuring a soft velvet hand-tufted headboard.',
        descriptionAr: 'يتميز هذا السرير بظهر مرتفع ومبطن بعناية بتصميم الكابيتونيه اليدوي الأنيق. يمنح غرفة النوم إحساساً بالفخامة والهدوء مع هيكل يدعم المراتب المائية أو الطبيعية بشكل ممتاز.',
        descriptionEn: 'High tufted headboard providing exceptional back support and a refined luxury vibe to your master bedroom.',
        slug: 'neoclassic-tufted-upholstered-bed',
        model: 'BED-NEO-2026-03',
        status: ProductStatus.published,
        quantity: 8,
        lowStock: 2,
        price: 32000,
        discount: 0,
        mainImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
        ],
        factoryId: factory2.id,
        styleId: styleNeoclassic.id,
        classId: classBedroom.id,
      },
      {
        titleAr: 'طاولة سفرة رخام مودرن مع 8 كراسي',
        titleEn: 'Modern Marble Dining Table with 8 Chairs',
        miniDescriptionAr: 'طاولة سفرة بسطح رخامي إسباني وقواعد معدنية مذهبة.',
        miniDescriptionEn: 'Contemporary dining set featuring Spanish marble top and brass metal legs.',
        descriptionAr: 'طاولة طعام تكفي لـ 8 أفراد مصنوعة من رخام الكرارا الطبيعي المقاوم للحرارة والخدش، مع كراسي مريحة كابيتونيه مكسوة بقماش البوكلي المعالج.',
        descriptionEn: 'Seats 8 comfortably with heat and scratch-resistant natural Spanish marble top and ergonomic bouclé upholstered chairs.',
        slug: 'modern-marble-dining-table-8-chairs',
        model: 'DINING-MOD-2026-04',
        status: ProductStatus.published,
        quantity: 10,
        lowStock: 2,
        price: 45000,
        discount: 15,
        mainImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1000&q=80',
        ],
        factoryId: factory2.id,
        styleId: styleModern.id,
        classId: classDining.id,
      },
      {
        titleAr: 'نجفة معلقة مودرن موديل حلقي ذهبي',
        titleEn: 'Modern Golden Ring Chandelier',
        miniDescriptionAr: 'وحدة إضاءة سقفية معلقة بتقنية LED الموفرة للطاقة.',
        miniDescriptionEn: 'Minimalist ring LED pendant light fixture in brushed gold finish.',
        descriptionAr: 'ثريا مودرن على شكل حلقات متداخلة مع إمكانية التحكم بحدة الإضاءة (Dimmer) ودرجات الحرارة (أصفر / أبيض / دافئ). تضفي لمسة فنية ساحرة فوق طاولة السفرة أو في الصالة.',
        descriptionEn: 'Adjustable LED light temperature ring chandelier with dimmable capabilities, perfect over dining tables or living foyers.',
        slug: 'modern-golden-ring-chandelier',
        model: 'LIGHT-RING-2026-05',
        status: ProductStatus.published,
        quantity: 25,
        lowStock: 5,
        price: 8500,
        discount: 0,
        mainImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=1000&q=80',
        ],
        factoryId: factory2.id,
        styleId: styleModern.id,
        classId: classLighting.id,
      },
      {
        titleAr: 'كرسي هزاز بوهيمي من الخيزران الطبيعي',
        titleEn: 'Natural Rattan Bohemian Armchair',
        miniDescriptionAr: 'كرسي راتان بوهيمي مصنوع يدوياً للمساحات الداخلية والمكشوفة.',
        miniDescriptionEn: 'Handcrafted natural rattan accent chair with plush cushion.',
        descriptionAr: 'يضيف هذا الكرسي البوهيمي المصنوع من الروتان الطبيعي لمسة دفء وعفوية لأي ركن للقراءة أو في الشرفات. مزود بشلتة مريحة بقماش كتان ناعم.',
        descriptionEn: 'Handcrafted from 100% natural rattan, providing warmth and relaxing boho vibes for reading nooks or balconies.',
        slug: 'natural-rattan-bohemian-armchair',
        model: 'BOHO-CHAIR-2026-06',
        status: ProductStatus.published,
        quantity: 12,
        lowStock: 4,
        price: 6200,
        discount: 12,
        mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
        ],
        factoryId: factory1.id,
        styleId: styleBoho.id,
        classId: classLiving.id,
      }
    ],
  })

  // Connect Relations to Products (Colors)
  const products = await prisma.product.findMany()
  for (const prod of products) {
    await prisma.product.update({
      where: { id: prod.id },
      data: {
        color: {
          connect: [{ id: colorGrey.id }, { id: colorBeige.id }],
        },
      },
    })
  }

  // ==========================================
  // 8. SEED DESIGNS (مشروعات وتصاميم معمارية)
  // ==========================================
  console.log('🎨 Seeding Designs...')

  await prisma.design.create({
    data: {
      titleAr: 'تصميم داخلي لفيلة سكنية مودرن بالتجمع الخامس',
      titleEn: 'Modern Luxury Villa Interior Design',
      slug: 'modern-luxury-villa-fifth-settlement',
      descriptionAr: 'مشروع تصميم وتنفيذ داخلي بالكامل لفيلًا بمساحة 450 متر مربع. تم الاعتماد على الألوان الترابية المريحة للعين والإضاءات الغاطسة في السقف (Magnetic Tracks).',
      descriptionEn: 'Full interior design and execution for a 450 sqm villa focusing on earth tones and linear magnetic track lights.',
      painPointsAr: 'كانت المشكلة الأساسية هي ضيق المساحات الظاهرية بسب سوء توزيع الأعمدة والكتل المعمارية، بالإضافة لضعف الإضاءة الطبيعية في الصالة السفلية.',
      painPointsEn: 'The core challenges were limited visual space due to structural column layouts and dark natural lighting in the ground foyer.',
      solutionsAr: 'تم استخدام المرايا الممتدة من الأرض للسقف لإعطاء اتساع بصري، واستبدال القواطع الخرسانية بقواطع زجاجية سوداء مموهة، واستغلال فتحات السقف للإضاءة المستمرة.',
      solutionsEn: 'Applied floor-to-ceiling tinted mirrors for visual expansion, replaced solid walls with fluted glass dividers, and integrated sky tracks.',
      mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      ],
      country: 'مصر',
      state: 'القاهرة',
      city: 'القاهرة الجديدة',
      userId: designerUser.id,
      styleId: styleModern.id,
    },
  })

  await prisma.design.create({
    data: {
      titleAr: 'تجديد بنتهاوس بطابع نيوكلاسيك أنيق',
      titleEn: 'Elegant Neoclassic Penthouse Redesign',
      slug: 'elegant-neoclassic-penthouse-redesign',
      descriptionAr: 'إعادة توزيع فراغات وتصميم شقة بنتهاوس بأسلوب يدمج بين بانوهات الحوائط النيوكلاسيك والأثاث المودرن ذو الألوان الجريئة.',
      descriptionEn: 'Spatial redesign of a penthouse blending classic wall molding (Boiserie) with sleek contemporary accent furniture.',
      painPointsAr: 'ارتفاع الأسقف المنخفض نسبياً مع رغبة العميل في تركيب بانوهات وركنيات كلاسيكية دون إحداث ازدحام بصري.',
      painPointsEn: 'Relatively low ceiling heights combined with the client request for classical wall moldings without cluttering.',
      solutionsAr: 'استخدام بانوهات طويلة ونحيفة تسحب العين رأسياً لإعطاء إيحاء بالارتفاع، مع دهانات بدرجات الفانيلا ميكس لزيادة الانعكاس الضوئي.',
      solutionsEn: 'Utilized tall, slender wall panel moldings to draw the eye vertically, finished with high-reflectance Off-White paint shades.',
      mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      ],
      country: 'مصر',
      state: 'الإسكندرية',
      city: 'سموحة',
      userId: designerUser.id,
      styleId: styleNeoclassic.id,
    },
  })

  await prisma.design.create({
    data: {
      titleAr: 'ديكور شقة بوهيمي دافئ مليء بالنباتات والخشب',
      titleEn: 'Cozy Boho Apartment Design with Natural Elements',
      slug: 'cozy-boho-apartment-natural-elements',
      descriptionAr: 'تصميم داخلي لشقة شبابية تعتمد على الراحة، خامات الخيزران، والمنسوجات اليدوية مع إدخال عنصر النباتات الطبيعية بكثافة.',
      descriptionEn: 'Interior design for a trendy apartment emphasizing comfort, woven rattan textures, and rich indoor greenery.',
      painPointsAr: 'الميزانية المحدودة للعميل ورغبته في الحصول على بيئة دافئة ومميزة تبتعد عن التصاميم التجارية التقليدية.',
      painPointsEn: 'Limited budget constraints alongside a request for a warm, non-traditional personalized living space.',
      solutionsAr: 'الاعتماد على قطع أثاث معاد تصنيعها من الخشب الطبيعي، والإكثار من المنسوجات الكتان والمعلقات المكرمية اليدوية، واستخدام النباتات كعنصر رئيسي للجماليات.',
      solutionsEn: 'Sourced reclaimed natural wood furniture, integrated macramé wall hangings, and leveraged indoor plants as main decor pieces.',
      mainImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      ],
      country: 'مصر',
      state: 'الجيزة',
      city: 'الشيخ زايد',
      userId: adminUser.id,
      styleId: styleBoho.id,
    },
  })

  // ==========================================
  // 9. SEED ARTICLES (مقالات نصية وتثقيفية)
  // ==========================================
  console.log('📰 Seeding Articles...')

  await prisma.article.create({
    data: {
      titleAr: 'كيف تختار الإضاءة المناسبة لكل غرفة في منزلك؟',
      titleEn: 'How to Choose the Right Lighting for Every Room in Your Home',
      slug: 'how-to-choose-right-lighting-for-your-home',
      descriptionAr: 'دليل شامل لتقسيم الإضاءة إلى (عامة، توجيهية، وديكورية) وكيفية استخدام درجة حرارة الضوء (الكلفن) بشكل صحيح.',
      descriptionEn: 'A comprehensive guide on ambient, task, and accent lighting layering, and choosing the right Color Temperature (Kelvin).',
      topicAr: `
## توزيع الإضاءة بذكاء: مفتاح جمال منزلك

تعد الإضاءة أحد أهم عناصر التصميم الداخلي التي قد تبرز جمال الديكور أو تفسده بالكامل. لتصميم مخطط إضاءة ناجح، يجب تقسيم الإضاءة إلى ثلاثة مستويات رئيسية:

### 1. الإضاءة المحيطة (Ambient Lighting)
وهي الإضاءة العامة التي تغمر الغرفة بالكامل وتسمح بالحركة الرؤية الواضحة. يفضل استخدام إضاءة دافئة (3000K) في غرف النوم والمعيشة لإعطاء شعور بالاسترخاء.

### 2. الإضاءة الوظيفية (Task Lighting)
تستخدم للتركيز على مناطق العمل مثل:
* أضواء القراءة بجانب السرير.
* الإضاءة الموجهة أسفل وحدات المطبخ لتحضير الطعام.
* إضاءة المكاتب.

### 3. الإضاءة الجمالية (Accent Lighting)
تستخدم لتسليط الضوء على اللوحات الفنية، الديكورات الجدارية، أو الملمس الخشبي للحوائط، وتضفي عمقاً بصرياً فخماً للمكان.
      `,
      topicEn: `
## Smart Lighting Distribution: The Key to a Beautiful Home

Lighting is one of the most critical interior design elements that can either elevate your decor or completely ruin it. 

### 1. Ambient Lighting
General illumination that fills the room. Warm white (3000K) is ideal for bedrooms and living rooms to foster relaxation.

### 2. Task Lighting
Focused illumination for specific work zones, such as under-cabinet kitchen LEDs or reading desk lamps.

### 3. Accent Lighting
Used to highlight artwork, architectural wall textures, or features, adding depth and luxury to the room.
      `,
      mainImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=1200&q=80',
      ],
      userId: designerUser.id,
    },
  })

  await prisma.article.create({
    data: {
      titleAr: 'الفرق بين الخشب الطبيعي والأم دي إف (MDF) في صناعة الأثاث',
      titleEn: 'Natural Wood vs MDF: Which Should You Choose for Furniture?',
      slug: 'natural-wood-vs-mdf-furniture-guide',
      descriptionAr: 'مقارنة هندسية وعملية بين أخشاب الزان والموسكي وبين ألواح MDF المعالجة لمساعدتك في اتخاذ قرار الشراء الصح.',
      descriptionEn: 'A practical comparison between solid woods (Beech/Oak) and engineered MDF boards to help you make informed decisions.',
      topicAr: `
## أيهما أفضل لمشروعك: الخشب الطبيعي أم الألواح المضغوطة؟

عند تجهيز منزلك، ستواجه حتماً هذا السؤال المصيري: هل أشتري أثاثاً من الخشب الطبيعي أم أكتفي بألواح MDF؟

### الخشب الطبيعي (مثل الزان والأرو)
* **المميزات:** عمر افتراضي يتجاوز العشرات من السنين، قوة تحمل عالية جداً للرطوبة والأوزان، إمكانية إعادة الدهان والتجديد بسهولة.
* **العيوب:** التكلفة المرتفعة، والوزن الثقيل.

### أخشاب الـ MDF والألواح الصناعية
* **المميزات:** أسطح مستوية تماماً مثالية للدهانات المودرن والدوكو، تكلفة اقتصادية، خيارات أشكال غير محدودة.
* **العيوب:** تأثرها السريع بالمياه والرطوبة إذا لم تكن معالجة بشكل ممتاز، وصعوبة إصلاحها في حال التلف.
      `,
      topicEn: `
## Solid Wood vs Engineered MDF: Making the Right Choice

When furnishing your home, choosing between solid wood and engineered wood (MDF) is a vital decision.

### Solid Wood (Beech, Oak, Walnut)
* **Pros:** Decades of durability, incredible strength, highly water-resistant, and easily repairable/refinished.
* **Cons:** Higher cost and heavy weight.

### MDF (Medium-Density Fiberboard)
* **Pros:** Perfectly smooth surfaces for modern lacquered finishes, cost-effective, uniform structure.
* **Cons:** Vulnerable to water and moisture if sealings are damaged, and harder to repair once cracked.
      `,
      mainImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      ],
      userId: adminUser.id,
    },
  })

  await prisma.article.create({
    data: {
      titleAr: '5 قواعـد ذهبيـة لتنسيـق الألوان في التصميم الداخلي',
      titleEn: '5 Golden Rules for Color Matching in Interior Design',
      slug: '5-golden-rules-color-matching-interior-design',
      descriptionAr: 'تعرف على قاعدة 60-30-10 الشهيرة وكيفية استخدام عجلة الألوان لخلق تناغم بصري مريح في منزلك.',
      descriptionEn: 'Learn the famous 60-30-10 color rule and how to utilize the color wheel for harmonious visual appeal.',
      topicAr: `
## تناغم الألوان: قاعدة 60-30-10

اختيار ألوان المنزل ليس عشوائياً، بل يخضع لقواعد تصميمية تضمن لك الراحة النفسية والجمال.

### قاعدة 60-30-10:
1. **60% اللون الأساسي (Dominant Color):** يكون عادةً لون الحوائط أو السقف (مثل الأوف وايت أو البيج) ليمنح المساحة اتساعاً.
2. **30% اللون الثانوي (Secondary Color):** يكون لون قطع الأثاث الرئيسية مثل الكنب والستائر (مثل الرمادي أو الخشبي).
3. **10% لون التباين (Accent Color):** لون جريء ومبهج للوسائد، اللوحات، أو الإكسسوارات (مثل الذهبي، الأخضر الزمردي، أو الكحلي).
      `,
      topicEn: `
## Mastering Color Harmony: The 60-30-10 Rule

Choosing colors is rooted in psychological and architectural principles.

### The 60-30-10 Rule Breakdown:
1. **60% Main Color:** Usually walls and ceiling (Off-white, light beige) for spatial openness.
2. **30% Secondary Color:** Major furniture pieces like sofas, rugs, and drapes.
3. **10% Accent Color:** Bold popping color used in cushions, art pieces, and lamps.
      `,
      mainImage: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      ],
      userId: designerUser.id,
    },
  })

  console.log('✅ Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })