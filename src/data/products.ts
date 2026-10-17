import { Product } from '../types';

export const CURRENCY_RATES = {
  SAR: { rate: 1, symbolAr: 'ر.س', symbolEn: 'SAR' },
  JOD: { rate: 0.19, symbolAr: 'د.أ', symbolEn: 'JOD' },
  AED: { rate: 0.98, symbolAr: 'د.إ', symbolEn: 'AED' },
  KWD: { rate: 0.082, symbolAr: 'د.ك', symbolEn: 'KWD' },
  USD: { rate: 0.27, symbolAr: '$', symbolEn: 'USD' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'queens-royal-rose-parfum',
    nameAr: 'عطر كوينز رويال روز - إكستري دو بارفان',
    nameEn: 'Queens Royal Rose - Extrait de Parfum',
    category: 'perfume',
    priceSAR: 480,
    originalPriceSAR: 560,
    rating: 4.9,
    reviewCount: 142,
    volumeOrSize: '100 مل',
    availableSizes: ['50 مل', '100 مل'],
    image: '/src/assets/images/hero_queens_perfume_1792268631444.jpg',
    badgeAr: 'الأكثر مبيعاً',
    badgeEn: 'Bestseller',
    shortDescAr: 'مزيج ساحر يجمع بتلات الورد الجوري الملكي مع نفحات العنبر وخشب الصندل النادر.',
    shortDescEn: 'A majestic blend of royal Taif rose petals, warm amber, and precious sandalwood.',
    descriptionAr: 'عطر كوينز رويال روز هو التجسيد الحقيقي للأنوثة الملكية والجاذبية التي لا تقاوم. تم تصميمه بعناية فائقة لعاشقات التميز، حيث تفتتح القمة بانتعاش توت العليق والبرغموت الإيطالي لتأخذك إلى قلب ينبض بورد دمشق الفاخر والفاوانيا، وترتكز على قاعدة غنية من المسك الحريري والباتشولي والفانيليا المدغشقرية.',
    descriptionEn: 'Queens Royal Rose is the quintessential expression of regal femininity. Crafted for unforgettable presence, sparkling top notes of raspberry and Italian bergamot surrender to a lavish heart of Damask rose and peony, resting on warm velvet musk and Madagascar vanilla.',
    concentration: 'Extrait de Parfum (ثبات يتجاوز 24 ساعة)',
    fragranceNotes: {
      top: ['توت العليق البري', 'البرغموت الإيطالي', 'الفلفل الوردي'],
      heart: ['الورد الجوري الملكي', 'الفاوانيا التركية', 'زهر البرتقال'],
      base: ['العنبر الذهبي', 'خشب الصندل الكشميري', 'الفانيليا المدغشقرية', 'المسك الحريري']
    }
  },
  {
    id: 'aurelia-golden-nectar',
    nameAr: 'عطر أوريليا الذهبي - أو دو بارفان',
    nameEn: 'Aurélia Golden Nectar - Eau de Parfum',
    category: 'perfume',
    priceSAR: 420,
    rating: 4.8,
    reviewCount: 98,
    volumeOrSize: '100 مل',
    availableSizes: ['50 مل', '100 مل'],
    image: '/src/assets/images/category_perfume_flacon_1792268631917.jpg',
    badgeAr: 'إصدار حصري',
    badgeEn: 'Exclusive Edition',
    shortDescAr: 'نفحات شرقية زهرية مفعمة بالدفء والرقي مع لمسات العسل الأبيض والياسمين الليلي.',
    shortDescEn: 'An opulent warm amber and floral fragrance kissed by white honey and nocturnal jasmine.',
    descriptionAr: 'عطر أوريليا يعكس سحر الغسق الذهبي، يمزج بين عبير الياسمين الملكي والزهور البيضاء النادرة مع قاعدة عنبرية دافئة تمنحك هالة لا تُنسى في كل مناسبة.',
    descriptionEn: 'Aurélia captures the enchantment of golden hour, blending imperial jasmine and white blooms with rich resinous amber that leaves a lasting aura.',
    concentration: 'Eau de Parfum (تركيز عالي)',
    fragranceNotes: {
      top: ['زهر البرتقال التونسي', 'اليوسفي المشمس', 'الهيل الفاخر'],
      heart: ['الياسمين الملكي الليلي', 'الأوركيد الذهبي', 'العسل الأبيض'],
      base: ['اللبان العماني', 'العنبر الرمادي', 'خشب الأرز الأطلسي']
    }
  },
  {
    id: 'essence-botanique-radiance-serum',
    nameAr: 'سيروم إكسير النضارة النباتي الفاخر',
    nameEn: 'Essence Botanique - Radiance Elixir Serum',
    category: 'skincare',
    priceSAR: 290,
    originalPriceSAR: 340,
    rating: 5.0,
    reviewCount: 215,
    volumeOrSize: '30 مل',
    availableSizes: ['30 مل', '50 مل'],
    image: '/src/assets/images/category_skincare_elixir_1792268632638.jpg',
    badgeAr: 'تركيبة نقية 100%',
    badgeEn: '100% Pure Formula',
    shortDescAr: 'إكسير مكثف غني بحمض الهيالورونيك وخلاصة ماء الورد والجرانيوم لتجديد نضارة البشرة الفوري.',
    shortDescEn: 'Intensive elixir infused with multi-molecular hyaluronic acid, rose water, and geranium for instant glow.',
    descriptionAr: 'دللي بشرتكِ بجرعة يومية من الصفاء والإشراق مع سيروم كوينز النباتي. تركيبة حريرية خفيفة الوزن تمتصها البشرة فوراً لتعيد إليها ترطيبها العميق ومظهرها الممتلئ المشع بالحيوية دون أي ملمس دهني.',
    descriptionEn: 'Pamper your skin with daily hydration and luminous glow. Lightweight silky texture penetrates deep within moments to restore plump moisture and barrier radiance.',
    benefitsAr: [
      'ترطيب عميق يستمر لمدة 72 ساعة',
      'تعزيز إنتاج الكولاجين ومرونة البشرة',
      'توحيد لون البشرة والتخفيف من التصبغات',
      'مناسب لجميع أنواع البشرة حتى الحساسة'
    ],
    benefitsEn: [
      '72-hour continuous deep hydration',
      'Supports natural collagen and skin elasticity',
      'Evens tone and diminishes dullness',
      'Ideal for all skin types, including sensitive'
    ],
    ingredientsAr: ['حمض الهيالورونيك الثلاثي', 'ماء الورد المقطر', 'خلاصة نبات الجيرانيوم', 'فيتامين E النقي']
  },
  {
    id: 'aveline-velvet-duo',
    nameAr: 'مجموعة أحمر الشفاه الساتاني وبودرة الخدود المخملية',
    nameEn: 'Aveline Satin Lipstick & Velvet Blush Duo',
    category: 'cosmetics',
    priceSAR: 260,
    originalPriceSAR: 310,
    rating: 4.9,
    reviewCount: 167,
    volumeOrSize: 'حجم كامل + مرآة وفرشاة',
    image: '/src/assets/images/category_cosmetics_luxury_1792268632757.jpg',
    badgeAr: 'ثنائي الجمال الملكي',
    badgeEn: 'Royal Beauty Duo',
    shades: [
      { nameAr: 'وردي كوينز الملكي', nameEn: 'Queens Royal Rose', hex: '#b87982' },
      { nameAr: 'توتي دافئ مخملي', nameEn: 'Warm Velvet Berry', hex: '#873d4d' },
      { nameAr: 'نيود حريري ناعم', nameEn: 'Silky Nude Blossom', hex: '#c5958a' }
    ],
    shortDescAr: 'أحمر شفاه كريمي غني بلمسة حريرية وبلاش ناعم يمنح الوجنتين إشراقة وردية طبيعية طوال اليوم.',
    shortDescEn: 'Ultra-creamy satin lipstick paired with a finely milled velvet blush for an effortless, radiant complexion.',
    descriptionAr: 'ثنائي أفيلين الفاخر المصمم في علبة مغناطيسية مضلعة مطلية بلون الذهب الوردي. يمنح شفتيكِ ترطيباً غنياً ولوناً ثابتاً يدوم لساعات، بينما تتناغم بودرة الخدود المخملية مع دفء بشرتكِ لتعكس نضارة ملكية لا مثيل لها.',
    descriptionEn: 'Presented in fluted rose-gold magnetic casing, this luxurious duo delivers pigmented, hydrating lip comfort alongside a weightless, radiant cheek flush that blends seamlessly.',
    benefitsAr: [
      'تركيبة غنية بزبدة الشيا وفيتامين E',
      'ثبات يدوم حتى 12 ساعة بدون جفاف',
      'علبة معدنية فاخرة مع مرآة وفرشاة ناعمة'
    ],
    benefitsEn: [
      'Enriched with shea butter and vitamin E',
      'Up to 12-hour wear without flaking or dryness',
      'Sculpted magnetic rose gold case with vanity mirror'
    ]
  },
  {
    id: 'queens-oud-velvet',
    nameAr: 'عطر عود كوينز المخملي - بارفان شرقي',
    nameEn: 'Queens Oud Velvet - Oriental Parfum',
    category: 'perfume',
    priceSAR: 520,
    rating: 5.0,
    reviewCount: 84,
    volumeOrSize: '100 مل',
    availableSizes: ['50 مل', '100 مل'],
    image: '/src/assets/images/category_perfume_flacon_1792268631917.jpg',
    badgeAr: 'أرقى أنواع العود',
    badgeEn: 'Noble Cambodian Oud',
    shortDescAr: 'توليفة شرقية راقية تجمع دهن العود الكمبودي المعتق مع خشب الورد والبخور الملكي.',
    shortDescEn: 'A sovereign oriental signature harmonizing vintage Cambodian oud, rosewood, and precious frankincense.',
    descriptionAr: 'لكل من تعشق الفخامة والأصالة، صُنعت هذه التوليفة الساحرة من خشب العود المعتّق مع لمسات بخورية هادئة وبلسم البيرو لتمنحكِ وقاراً وسحراً استثنائياً.',
    descriptionEn: 'An opulent creation honoring Arabian heritage, weaving aged agarwood with delicate floral inflections and balsamic base notes.',
    concentration: 'Pure Parfum',
    fragranceNotes: {
      top: ['الزعفران الإيراني', 'حب الهال الأخضر', 'زهرة الخزامى'],
      heart: ['خشب الورد', 'القرفة السيلانية', 'الورد البلغاري'],
      base: ['دهن العود الكمبودي النقي', 'البخور الظفاري', 'الجلد السويدي الفاخر']
    }
  },
  {
    id: 'botanical-glow-cream',
    nameAr: 'كريم التجديد الليلي بالورد والنياسيناميد',
    nameEn: 'Overnight Rose & Niacinamide Renewal Cream',
    category: 'skincare',
    priceSAR: 275,
    rating: 4.8,
    reviewCount: 76,
    volumeOrSize: '50 مل',
    image: '/src/assets/images/category_skincare_elixir_1792268632638.jpg',
    badgeAr: 'عناية ليلية متقدمة',
    badgeEn: 'Overnight Radiance',
    shortDescAr: 'كريم فاخر غني بالببتيدات ومستخلص الورد لتجديد خلايا البشرة أثناء النوم واستعادة إشراقتها.',
    shortDescEn: 'Restorative overnight cream infused with peptides and rose stem cells to rejuvenate tired skin.',
    descriptionAr: 'يعمل أثناء ساعات نومكِ على تجديد حيوية حاجز البشرة، تغذية الأنسجة بعمق، والحد من الخطوط الدقيقة لتحصلي صباحاً على بشرة ناعمة كالحرير ومشرقة بالراحة.',
    descriptionEn: 'Infuses deep cellular hydration while you sleep, fortifying your skin moisture barrier so you awaken with a supple, luminous complexion.',
    benefitsAr: [
      'تغذية مكثفة وترميم حاجز البشرة',
      'تفتيح البقع وتوحيد لون البشرة مع 5% نياسيناميد',
      'ملمس مخملي سريع الامتصاص غير لامع'
    ],
    benefitsEn: [
      'Deep overnight barrier repair and replenishment',
      'Brightens tone with 5% pure niacinamide',
      'Velvety quick-absorbing, non-greasy finish'
    ]
  }
];

export const CATEGORIES_METADATA = [
  {
    id: 'perfume' as const,
    titleAr: 'العطور',
    titleEn: 'Fragrances',
    subtitleAr: 'روائح تعبّر عن شخصيتكِ وتخلّد حضوركِ الملكي.',
    subtitleEn: 'Scents that reflect your persona and seal your royal presence.',
    taglineAr: 'روائح تعبّر عن شخصيتكِ.',
    taglineEn: 'Scents that express who you are.',
    image: '/src/assets/images/category_perfume_flacon_1792268631917.jpg',
    itemCount: '18 عطر استثنائي',
    itemCountEn: '18 Signature Scents'
  },
  {
    id: 'skincare' as const,
    titleAr: 'العناية بالبشرة',
    titleEn: 'Skincare',
    subtitleAr: 'دلّلي بشرتكِ كل يوم بمكونات طبيعية وأمصال فائقة النقاء.',
    subtitleEn: 'Pamper your skin daily with organic botanicals and pure active elixirs.',
    taglineAr: 'دلّلي بشرتكِ كل يوم.',
    taglineEn: 'Pamper your skin every day.',
    image: '/src/assets/images/category_skincare_elixir_1792268632638.jpg',
    itemCount: '12 تركيبة علاجية',
    itemCountEn: '12 Radiance Formulas'
  },
  {
    id: 'cosmetics' as const,
    titleAr: 'مستحضرات التجميل',
    titleEn: 'Cosmetics',
    subtitleAr: 'جمالكِ بأسلوبكِ الخاص بلمسات مخملية وألوان تحتفي بجاذبيتكِ.',
    subtitleEn: 'Your beauty, your way, with velvety textures celebrating your charm.',
    taglineAr: 'جمالكِ بأسلوبكِ الخاص.',
    taglineEn: 'Your beauty in your own style.',
    image: '/src/assets/images/category_cosmetics_luxury_1792268632757.jpg',
    itemCount: '24 درجة لونية فاخرة',
    itemCountEn: '24 Luxury Shades'
  }
];
