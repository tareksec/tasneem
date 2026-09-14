import { Machine, CategoryInfo, MachineCategory, MainCategory, CircularKnittingSubCategory } from "./types";

export const MAIN_CATEGORIES: CategoryInfo[] = [
  {
    slug: "circular-knitting",
    name: "Circular Knitting Machines",
    name_bn: "সার্কুলার নিটিং মেশিন",
    tagline: "Single jersey, double jersey, interlock, jacquard & fleece circular knitting machinery",
    tagline_bn: "সিঙ্গেল জার্সি, ডাবল জার্সি, ইন্টারলক, জ্যাকার্ড ও টেরি সার্কুলার নিটিং মেশিনারি",
    description: "High-productivity circular knitting machinery imported from leading manufacturers in Taiwan and China for composite export textile mills across Bangladesh.",
    description_bn: "বাংলাদেশের রপ্তানিমুখী টেক্সটাইল কারখানার জন্য তাইওয়ান ও চীন থেকে সরাসরি আমদানি করা উচ্চ উৎপাদনশীল সার্কুলার নিটিং মেশিন।",
    typicalGauge: "14G – 44G",
    commonApplications: ["Export T-Shirts", "Polo Shirts", "Rib Fabric", "Fleece", "Innerwear"],
    isTopLevel: true,
  },
  {
    slug: "dyeing",
    name: "Dyeing Machines",
    name_bn: "ডাইং মেশিন",
    tagline: "High-temperature & atmospheric fabric and yarn dyeing equipment",
    tagline_bn: "হাই-টেম্পারেচার ও কম পানি সাশ্রয়ী ফ্যাব্রিক এবং সুতা ডাইং মেশিন",
    description: "Energy-efficient eco-dyeing vessels with low liquor ratio, smart heating controls, and stainless steel metallurgy for knitwear processing.",
    description_bn: "কম লিকার রেশিও ও বিদ্যুৎ সাশ্রয়ী আধুনিক স্টেইনলেস স্টিল টেক্সটাইল ডাইং ভেসেল।",
    typicalGauge: "Universal",
    commonApplications: ["Cotton Knit Dyeing", "Polyester Blend Dyeing", "Yarn Dyeing", "Tubular Fabric"],
    isTopLevel: true,
  },
  {
    slug: "shearing",
    name: "Shearing Machines",
    name_bn: "শিয়ারিং মেশিন",
    tagline: "Precision fabric surface leveling and pile shearing machinery",
    tagline_bn: "নিখুঁত সারফেস ফিনিশিং ও পাইল শিয়ারিং মেশিনারি",
    description: "Industrial rotary shearing and cropping machines for loop terry, polar fleece, velour, and flannel fabrics ensuring clean, uniform pile height.",
    description_bn: "পোলার ফ্লিস, ফ্রেঞ্চ টেরি ও তোয়ালে কাপড়ের জন্য নিখুঁত সারফেস কাটিং ও ফিনিশিং মেশিন।",
    typicalGauge: "Universal",
    commonApplications: ["Polar Fleece", "French Terry", "Velour Fabrics", "Flannel Blankets"],
    isTopLevel: true,
  },
  {
    slug: "finishing",
    name: "Finishing Machines",
    name_bn: "ফিনিশিং মেশিন",
    tagline: "Inspection, rolling, compacting, and batching machinery for knit mills",
    tagline_bn: "ফ্যাব্রিক ইন্সপেকশন, টেনশনলেস রোলিং ও কোয়ালিটি কন্ট্রোল মেশিন",
    description: "Essential post-knitting handling, roll inspection, and tensionless batching machinery ensuring export quality control before packaging.",
    description_bn: "রপ্তানিমুখী নিট কারখানার জন্য আধুনিক ফ্যাব্রিক ইন্সপেকশন ও টেনশনলেস রোল উইন্ডিং মেশিন।",
    typicalGauge: "Universal",
    commonApplications: ["Fabric Inspection", "Roll Winding", "Tensionless Batching", "Quality Control"],
    isTopLevel: true,
  },
  {
    slug: "other",
    name: "Other Textile & Garments Machinery",
    name_bn: "অন্যান্য টেক্সটাইল ও গার্মেন্টস যন্ত্রপাতি",
    tagline: "Stenters, compactors, flat knit collar accessories, and specialized garment tools",
    tagline_bn: "স্টেন্টার, কমপ্যাক্টর, ফ্ল্যাট নিট কলার ট্রিমস ও টেক্সটাইল এক্সেসরিজ",
    description: "Turnkey equipment supporting composite mill expansion, including open-width compactors, computerized flat knit collar machines, and spare components.",
    description_bn: "কম্পোজিট কারখানার জন্য ওপেন-উইডথ কমপ্যাক্টর, কলার মেশিন ও আসল স্পেয়ার পার্টস।",
    typicalGauge: "Universal",
    commonApplications: ["Open-Width Compacting", "Collar & Cuff Knitting", "Pre-Shrinkage", "Spare Parts"],
    isTopLevel: true,
  },
];

export const CIRCULAR_SUB_CATEGORIES: CategoryInfo[] = [
  {
    slug: "double-jersey",
    name: "Double Jersey",
    name_bn: "ডাবল জার্সি",
    tagline: "High-productivity circular knitting for rib, interlock, and structural fabrics",
    tagline_bn: "রিব, ইন্টারলক ও স্ট্রাকচার্ড কাপড়ের জন্য হাই-স্পিড মেশিন",
    description: "Versatile double jersey circular machines engineered for high efficiency, uniform tension, and superior fabric stability for export-quality textiles.",
    description_bn: "রপ্তানিমানের কাপড়ের জন্য সুষম টেনশন ও দীর্ঘস্থায়ী কোয়ালিটির নির্ভরযোগ্য ডাবল জার্সি মেশিন।",
    typicalGauge: "14G – 40G",
    commonApplications: ["Rib Fabric", "Interlock Fabric", "Thermal Wear", "Sportswear", "Collar & Cuffs"],
    parentCategory: "circular-knitting",
    isTopLevel: false,
  },
  {
    slug: "single-jersey",
    name: "Single Jersey",
    name_bn: "সিঙ্গেল জার্সি",
    tagline: "High-speed precision knitting for plain jersey, pique, and fleece",
    tagline_bn: "টি-শার্ট ও পোলো কাপড়ের জন্য হাই-স্পিড প্রিসিশন মেশিন",
    description: "Reliable single jersey machines optimized for high RPM, minimal oil mist, and consistent fabric yield in high-volume export factories.",
    description_bn: "উচ্চ RPM, কম তেল ছিটকানো এবং বেশি প্রোডাকশনের জন্য সেরা সিঙ্গেল জার্সি মেশিনারি।",
    typicalGauge: "18G – 44G",
    commonApplications: ["T-Shirts", "Undergarments", "Pique Polo Fabrics", "Single Fleece", "Activewear"],
    parentCategory: "circular-knitting",
    isTopLevel: false,
  },
  {
    slug: "interlock",
    name: "Interlock",
    name_bn: "ইন্টারলক",
    tagline: "Smooth double-knit circular machinery for high-density fabric",
    tagline_bn: "উভয় পিঠে সমান মসৃণ ডাবল-নিট ফ্যাব্রিক মেশিন",
    description: "Specialized interlock circular knitting machines producing ultra-smooth surface textures with equal appearance on both faces.",
    description_bn: "হাই-এন্ড ফ্যাব্রিকের জন্য উভয় পিঠে সমান মসৃণ সারফেস ও নিখুঁত ফিনিশের ইন্টারলক মেশিন।",
    typicalGauge: "20G – 40G",
    commonApplications: ["High-End Innerwear", "Sports Apparel", "Children's Clothing", "Casual Tops"],
    parentCategory: "circular-knitting",
    isTopLevel: false,
  },
  {
    slug: "jacquard",
    name: "Jacquard",
    name_bn: "জ্যাকার্ড",
    tagline: "Electronic pattern selection for complex fashion designs",
    tagline_bn: "কম্পিউটারাইজড প্যাটার্ন ও ফ্যাশন নিটওয়্যার মেশিন",
    description: "High-precision computerized circular jacquard machinery enabling rapid pattern changes and intricate knit structures.",
    description_bn: "ইলেকট্রনিক নিডল সিলেকশন সহ যেকোনো জটিল ডিজাইন ও ফ্যাব্রিক স্ট্রাকচারের জ্যাকার্ড মেশিন।",
    typicalGauge: "18G – 36G",
    commonApplications: ["Fashion Knitwear", "Mattress Ticking", "Patterned Sportswear", "Automotive Fabrics"],
    parentCategory: "circular-knitting",
    isTopLevel: false,
  },
  {
    slug: "terry",
    name: "Terry",
    name_bn: "টেরি",
    tagline: "Loop pile circular knitting for towels, fleece, and plush fabrics",
    tagline_bn: "তোয়ালে, ফ্লিস ও সফট প্লাশ কাপড়ের লুপ পাইল মেশিন",
    description: "Industrial terry circular machines designed for consistent loop height, high plushness, and optimal yarn feeding.",
    description_bn: "নিখুঁত ও সমান লুপের তোয়ালে ও ফ্লিস কাপড়ের জন্য ইন্ডাস্ট্রিয়াল টেরি সার্কুলার মেশিন।",
    typicalGauge: "16G – 28G",
    commonApplications: ["Terry Towels", "Bathrobes", "French Terry Sweaters", "Plush Blankets"],
    parentCategory: "circular-knitting",
    isTopLevel: false,
  },
];

export const CATEGORIES: CategoryInfo[] = [...MAIN_CATEGORIES, ...CIRCULAR_SUB_CATEGORIES];

export const MACHINES: Machine[] = [
  {
    id: "jiunn-long-double-jersey",
    name: "Jiunn Long Double Jersey High-Speed Circular Knitting Machine",
    name_bn: "জিউন লং ডাবল জার্সি হাই-স্পিড সার্কুলার নিটিং মেশিন",
    brand: "Jiunn Long",
    manufacturer: "Jiunn Long Precision Machinery Co., Ltd.",
    machineType: "Double Jersey Circular Knitting Machine",
    category: "double-jersey",
    cylinderDiameter: "34\"",
    gauge: "24G – 28G",
    feeders: 102,
    numberOfSystems: 4,
    machineSpeed: "22 – 26 RPM",
    fabricType: "Interlock, Rib 1x1, Thermal Waffle, Structured Knit",
    fabricType_bn: "ইন্টারলক, ১x১ রিব, থার্মাল ওয়াফেল, স্ট্রাকচার্ড নিট",
    productionCapacity: "380 – 460 kg/24 hrs (Ne 30/1 combed cotton)",
    application: ["Export T-Shirts", "Thermal Underwear", "Sportswear", "Collar & Cuffs"],
    application_bn: ["রপ্তানি টি-শার্ট", "থার্মাল ইনারওয়্যার", "স্পোর্টসওয়্যার", "কলার ও কাফ ট্রিমস"],
    origin: "Taiwan / China Import",
    warranty: "1 Year International Manufacturer Warranty + Local Support",
    availability: "made-to-order",
    price: undefined, // "Contact for details" per PRD Section 6.3
    description:
      "Engineered for heavy-duty composite textile factories requiring maximum dimensional stability and low oil contamination. Features precision dial-cylinder concentricity, central stitch adjustment, and imported Japanese alloy sinkers.",
    description_bn:
      "উচ্চ উৎপাদন এবং নিখুঁত কাপড়ের জন্য নির্ভরযোগ্য জিউন লং ডাবল জার্সি সার্কুলার নিটিং মেশিন। ১০০% প্রি-শিপমেন্ট পরিদর্শন, চট্টগ্রাম বন্দর পর্যন্ত CFR ডেলিভারি এবং আপনার কারখানায় সরাসরি ইনস্টলেশন ও টেস্ট নিটিং সুবিধা।",
    features: [
      "Precision alloy dial & cylinder with hard chrome anti-friction coating",
      "Centralized computerized oil mist lubrication system (ISO VG 22)",
      "Positive yarn feeding units with ceramic wear-resistant eyelets",
      "Electronic inverter drive with smooth start-stop deceleration",
      "Turnkey CFR Chattogram sea shipment and on-site factory commissioning",
    ],
    features_bn: [
      "অ্যালয় সিলিন্ডার ও ডায়ালে অ্যান্টি-ফ্রিকশন ক্রোম কোটিং",
      "অটোমেটিক সেন্ট্রালাইজড অয়েল মিস্ট লুব্রিকেশন সিস্টেম",
      "সিরামিক আইলেটযুক্ত পজিটিভ সুতা ফিডার",
      "মসৃণ স্টার্ট-স্টপ ও ইনভার্টার ড্রাইভ কন্ট্রোল",
      "চট্টগ্রাম বন্দর পর্যন্ত CFR শিপমেন্ট ও কারখানায় সরাসরি ইনস্টলেশন",
    ],
    images: ["/product-image/product-1.jpg", "/images/machines/cat-double-jersey.webp", "/images/machines/spotlight-installation.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-1.jpg", alt_en: "Jiunn Long Double Jersey Machine front view", alt_bn: "জিউন লং ডাবল জার্সি মেশিনের সামনের দৃশ্য", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-double-jersey.webp", alt_en: "Double jersey knitting machine cylinder and feeders", alt_bn: "ডাবল জার্সি নিটিং সিলিন্ডার ও সুতা ফিডার", isPrimary: false },
      { id: "img-3", url: "/images/machines/spotlight-installation.webp", alt_en: "Factory installation and leveling in Bangladesh", alt_bn: "বাংলাদেশে কারখানায় মেশিন স্থাপন ও লেভেলিং", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-02-15",
    updatedAt: "2026-03-10",
    seoTitle_en: "Jiunn Long Double Jersey Circular Knitting Machine | Tasneem Knit Industry",
    seoTitle_bn: "জিউন লং ডাবল জার্সি সার্কুলার নিটিং মেশিন | তাসনীম নিট ইন্ডাস্ট্রি",
    seoDesc_en: "Direct import of Jiunn Long Double Jersey Circular Knitting Machines in Bangladesh. 34-inch, 24G-28G, CFR Chattogram delivery.",
    seoDesc_bn: "বাংলাদেশে জিউন লং ডাবল জার্সি নিটিং মেশিন সরাসরি আমদানি। ৩৪ ইঞ্চি, ২৪জি-২৮জি, সিএফআর চট্টগ্রাম ডেলিভারি ও লোকাল ইনস্টলেশন।",
  },
  {
    id: "longjun-double-jersey",
    name: "Longjun Industrial Double Jersey Interlock Machine",
    name_bn: "লংজুন ইন্ডাস্ট্রিয়াল ডাবল জার্সি ইন্টারলক মেশিন",
    brand: "Longjun",
    manufacturer: "Longjun Textile Machinery Ltd.",
    machineType: "Double Jersey Circular Knitting Machine",
    category: "double-jersey",
    cylinderDiameter: "30\" – 38\"",
    gauge: "18G – 32G",
    feeders: 96,
    numberOfSystems: 4,
    machineSpeed: "20 – 24 RPM",
    fabricType: "Double Pique, Heavy Interlock, Lycra Rib",
    fabricType_bn: "ডাবল পিক, ইন্টারলক, লাইক্রা রিব",
    productionCapacity: "420 kg/24 hrs",
    application: ["Cardigans", "Winter Fleece", "Industrial Workwear", "Tracksuits"],
    origin: "China Import",
    warranty: "1 Year Standard Warranty",
    availability: "made-to-order",
    price: undefined,
    description:
      "Versatile double jersey unit featuring modular cam box design allowing rapid switching between rib and interlock production cycles.",
    description_bn:
      "উন্নত ক্যাম বক্স ডিজাইনের আধুনিক ইন্টারলক মেশিন, যা খুব সহজে রিব ও ইন্টারলক প্রোডাকশন মোডে পরিবর্তন করে চালানো যায়।",
    features: [
      "Modular cam arrangement for quick knit/tuck/miss pattern changes",
      "Heavy cast iron frame with vibration-damped leveling pads",
      "Full digital yarn length measuring sensor",
      "Pre-shipment inspection with SGS / BV certification available",
    ],
    features_bn: [
      "সহজে প্যাটার্ন পরিবর্তনের জন্য মডুলার ক্যাম বক্স",
      "মজবুত কাস্ট আয়রন বডি ও অ্যান্টি-ভাইব্রেশন প্যাড",
      "ডিজিটাল সুতা পরিমাপ সেন্সর",
      "জাহাজে তোলার পূর্বে SGS / BV দিয়ে কোয়ালিটি পরিদর্শনের সুযোগ",
    ],
    images: ["/product-image/product-2.jpg", "/images/machines/cat-double-jersey.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-2.jpg", alt_en: "Longjun Double Jersey Machine operational overview", alt_bn: "লংজুন ডাবল জার্সি মেশিনের সার্বিক দৃশ্য", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-double-jersey.webp", alt_en: "Cylinder head and yarn path view", alt_bn: "সিলিন্ডার হেড ও সুতার গতিপথ", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-02-20",
    updatedAt: "2026-03-08",
  },
  {
    id: "rongxiang-single-jersey",
    name: "Rongxiang High-Speed 4-Track Single Jersey Machine",
    name_bn: "রংজিয়াং হাই-স্পিড ৪-ট্র্যাক সিঙ্গেল জার্সি মেশিন",
    brand: "Rongxiang",
    manufacturer: "Rongxiang Precision Machinery Corp.",
    machineType: "High-Speed Single Jersey Circular Knitting Machine",
    category: "single-jersey",
    cylinderDiameter: "30\"",
    gauge: "24G – 28G",
    feeders: 90,
    numberOfSystems: 4,
    machineSpeed: "28 – 34 RPM",
    fabricType: "Plain Single Jersey, Pique Polo, 2-Thread Fleece, Spandex Jersey",
    fabricType_bn: "সিঙ্গেল জার্সি, পোলো পিক, ২-থ্রেড ফ্লিস, স্প্যানডেক্স জার্সি",
    productionCapacity: "450 – 520 kg/24 hrs",
    application: ["Basic T-Shirts", "Export Polo Shirts", "Innerwear", "Athletic Wear"],
    origin: "China Import",
    warranty: "1 Year Full Mechanical Parts Support",
    availability: "in-stock",
    price: undefined,
    description:
      "High-speed 4-track single jersey circular knitting machine engineered for mass production export lines. Built with high-tensile alloy cam boxes and automatic needle oil misting.",
    description_bn:
      "রপ্তানিমুখী পোশাক কারখানায় দ্রুতগতির সিঙ্গেল জার্সি এবং পোলো পিক কাপড়ের জন্য সেরা মানের মেশিন। কম সুতা ছেঁড়া ও মসৃণ পারফরম্যান্স নিশ্চিত করে।",
    features: [
      "4-track cam box system allowing versatile single jersey knit structures",
      "High operating speed up to 34 RPM with ultra-low vibration",
      "Specialized sinker cams for spandex Lycra elasticity control",
      "Stock available for prompt CFR Chattogram shipping schedule",
    ],
    features_bn: [
      "বিভিন্ন সিঙ্গেল জার্সি নিট ডিজাইনের জন্য ৪-ট্র্যাক ক্যাম বক্স",
      "৩৪ RPM পর্যন্ত উচ্চগতি ও অতি-কম ভাইব্রেশন",
      "স্প্যানডেক্স লাইক্রা কাপড়ে ইলাস্টিসিটি নিয়ন্ত্রণে বিশেষ সিঙ্কার ক্যাম",
      "দ্রুত চট্টগ্রাম বন্দর পৌঁছানোর জন্য রেডি স্টক",
    ],
    images: ["/product-image/product-3.jpg", "/images/machines/cat-single-jersey.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-3.jpg", alt_en: "Rongxiang High Speed Single Jersey Machine", alt_bn: "রংজিয়াং হাই-স্পিড সিঙ্গেল জার্সি মেশিন", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-single-jersey.webp", alt_en: "Single jersey knitting needles and sinkers", alt_bn: "সিঙ্গেল জার্সি নিটিং নিডল ও সিঙ্কার", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-02-25",
    updatedAt: "2026-03-12",
  },
  {
    id: "shanli-double-jersey",
    name: "Shanli Heavy-Duty Double Jersey Rib Knitting Machine",
    name_bn: "শানলি হেভি-ডিউটি ডাবল জার্সি রিব নিটিং মেশিন",
    brand: "Shanli",
    manufacturer: "Shanli Machinery Manufacturing Ltd.",
    machineType: "Double Jersey Circular Knitting Machine",
    category: "double-jersey",
    cylinderDiameter: "34\"",
    gauge: "28G",
    feeders: 96,
    machineSpeed: "22 – 25 RPM",
    fabricType: "Rib Fabric, Collar Rib, High Elastic Interlock",
    application: ["Heavy Sweaters", "Polo Collar Trims", "Sportswear Waistbands"],
    origin: "China Import",
    warranty: "1 Year",
    availability: "made-to-order",
    price: undefined,
    description:
      "Heavy-duty double jersey circular machine engineered specifically for consistent loop formation on heavy cotton and modal yarns.",
    description_bn:
      "ভারী কটন ও মোডাল সুতায় নিখুঁত লুপ এবং কলার ট্রিমসের জন্য হেভি-ডিউটি ডাবল জার্সি মেশিন।",
    features: [
      "Reinforced heavy-duty body frame",
      "Multi-feeder high efficiency design",
      "Precision stitch tension regulation dials",
    ],
    features_bn: [
      "মজবুত ও দীর্ঘস্থায়ী হেভি-ডিউটি বডি ফ্রেম",
      "উচ্চ উৎপাদনের জন্য মাল্টি-ফিডার ডিজাইন",
      "নিখুঁত স্টিচ টেনশন অ্যাডজাস্টমেন্ট ডায়াল",
    ],
    images: ["/product-image/product-4.jpg", "/images/machines/cat-double-jersey.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-4.jpg", alt_en: "Shanli Double Jersey Machine", alt_bn: "শানলি ডাবল জার্সি মেশিন", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-double-jersey.webp", alt_en: "Shanli rib cylinder detail", alt_bn: "শানলি রিব সিলিন্ডার বিস্তারিত", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-09",
  },
  {
    id: "wjm-double-jersey",
    name: "WJM Heavy-Gauge Double Jersey Rib & Fleece Machine",
    name_bn: "ডব্লিউজেএম হেভি-গেজ ডাবল জার্সি রিব ও ফ্লিস মেশিন",
    brand: "WJM",
    manufacturer: "WJM Precision Industrial Co.",
    machineType: "Double Jersey Circular Knitting Machine",
    category: "double-jersey",
    cylinderDiameter: "32\"",
    gauge: "18G – 24G",
    feeders: 84,
    fabricType: "Thermal Winter Fabric, Coarse Rib, Fleece Foundation",
    application: ["Thermal Underwear", "Winter Apparel", "Fleece Outerwear"],
    origin: "China Import",
    warranty: "1 Year Parts",
    availability: "contact-for-availability",
    price: undefined,
    description:
      "Specialized for coarse to medium gauge double knit fabrics, thermal winter wear, and industrial technical knit structures.",
    description_bn:
      "মোটা ও মাঝারি গেজের ডাবল নিট ফ্যাব্রিক, শীতের থার্মাল কাপড় ও টেকনিক্যাল কাপড়ের জন্য বিশেষভাবে তৈরি।",
    features: [
      "Optimized needle curve for coarse count yarns",
      "Extended feeder creel support for large yarn packages",
      "Heavy-duty fabric rolling and tensionless take-down system",
    ],
    features_bn: [
      "মোটা সুতার জন্য অপটিমাইজড নিডল কার্ভ",
      "বড় সুতার কোনের জন্য বর্ধিত ফিডার ক্রিল সাপোর্ট",
      "টেনশনলেস ফ্যাব্রিক রোলিং ও টেক-ডাউন সিস্টেম",
    ],
    images: ["/product-image/product-5.jpg"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-5.jpg", alt_en: "WJM Heavy Gauge Machine", alt_bn: "ডব্লিউজেএম হেভি গেজ মেশিন", isPrimary: true },
    ],
    status: "published",
    createdAt: "2026-03-02",
    updatedAt: "2026-03-05",
  },
  {
    id: "xiangying-double-jersey",
    name: "Xiangying Precision Double Jersey Interlock System",
    name_bn: "জিয়াংয়িং প্রিসিশন ডাবল জার্সি ইন্টারলক সিস্টেম",
    brand: "Xiangying",
    manufacturer: "Xiangying Textile Equipment Co.",
    machineType: "Double Jersey Circular Knitting Machine",
    category: "double-jersey",
    cylinderDiameter: "34\"",
    gauge: "24G – 32G",
    feeders: 102,
    fabricType: "High Density Interlock, Smooth Surface Fabric",
    application: ["High-End Fashion Knits", "Premium Infantwear", "Technical Sportswear"],
    origin: "China Import",
    warranty: "1 Year",
    availability: "made-to-order",
    price: undefined,
    description:
      "Ultra-fine interlock knitting unit featuring zero-backlash gearing for maximum stitch uniformity on fine combed cotton.",
    description_bn:
      "জিরো-ব্যাকল্যাশ গিয়ারিং সুবিধাযুক্ত ফাইন ইন্টারলক মেশিন, যা উন্নত কম্বড কটনে সর্বোচ্চ স্টিচ ইউনিফর্মিটি প্রদান করে।",
    features: [
      "Zero-backlash transmission gear assembly",
      "High feeder density for elevated daily output",
      "Oil-free yarn path preventing fabric discoloration",
    ],
    features_bn: [
      "জিরো-ব্যাকল্যাশ ট্রান্সমিশন গিয়ার অ্যাসেম্বলি",
      "বেশি দৈনিক উৎপাদনের জন্য হাই-ডেনসিটি ফিডার",
      "কাপড়ে দাগ পড়া রোধে তেলমুক্ত সুতার গতিপথ",
    ],
    images: ["/product-image/product-6.jpg"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-6.jpg", alt_en: "Xiangying Precision Double Jersey System", alt_bn: "জিয়াংয়িং প্রিসিশন সিস্টেম", isPrimary: true },
    ],
    status: "published",
    createdAt: "2026-03-03",
    updatedAt: "2026-03-10",
  },
  {
    id: "precision-interlock-series",
    name: "Tasneem Precision Interlock Series Circular Machine",
    name_bn: "তাসনীম প্রিসিশন ইন্টারলক সিরিজ সার্কুলার মেশিন",
    brand: "Tasneem Machinery",
    manufacturer: "Sourced Overseas Plant (Taiwan/China)",
    machineType: "Interlock Circular Knitting Machine",
    category: "interlock",
    cylinderDiameter: "34\"",
    gauge: "24G – 28G",
    feeders: 96,
    fabricType: "Pure Interlock, Lycra Interlock, Super-Fine Cotton",
    application: ["Children's Apparel", "Export Polo Inner", "Active Tops"],
    origin: "Overseas Direct Import",
    warranty: "1 Year + Local Technician Support",
    availability: "made-to-order",
    price: undefined,
    description:
      "Dedicated interlock circular machinery producing ultra-smooth surface textures with equal, balanced stitch density on both face and back.",
    description_bn:
      "কাপড়ের উভয় পাশে সমান ঘন ও মসৃণ ফিনিশিংয়ের জন্য বিশেষায়িত ইন্টারলক সার্কুলার মেশিন।",
    features: [
      "Balanced dial and cylinder cam configuration",
      "Uniform loop length across all 96 feeders",
      "Dust and lint exhaust fan array",
    ],
    features_bn: [
      "ভারসাম্যপূর্ণ ডায়াল ও সিলিন্ডার ক্যাম কনফিগারেশন",
      "সবগুলো ৯৬টি ফিডারে সুষম ও সমান লুপ দৈর্ঘ্য",
      "ধূলা ও তুলা দূরীকরণে শক্তিশালী এগজস্ট ফ্যান",
    ],
    images: ["/product-image/product-7.jpg", "/images/machines/cat-interlock.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-7.jpg", alt_en: "Precision Interlock Machine", alt_bn: "প্রিসিশন ইন্টারলক মেশিন", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-interlock.webp", alt_en: "Interlock cylinder knitting head", alt_bn: "ইন্টারলক সিলিন্ডার নিটিং হেড", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-03-04",
    updatedAt: "2026-03-11",
  },
  {
    id: "electronic-jacquard-series",
    name: "Computerized Electronic Circular Jacquard Machine",
    name_bn: "কম্পিউটারাইজড ইলেকট্রনিক সার্কুলার জ্যাকার্ড মেশিন",
    brand: "Tasneem Jacquard",
    manufacturer: "Sourced Overseas Manufacturer",
    machineType: "Computerized Jacquard Circular Knitting Machine",
    category: "jacquard",
    cylinderDiameter: "30\" – 34\"",
    gauge: "18G – 28G",
    feeders: 72,
    fabricType: "Jacquard Mattress Ticking, Patterned Fashion Knits, Mesh Jacquard",
    application: ["Mattress Fabrics", "Fashion Apparel", "Shoe Upper Knits", "Automotive Upholstery"],
    origin: "China Import",
    warranty: "1 Year Electronics & Mechanics",
    availability: "made-to-order",
    price: undefined,
    description:
      "Advanced 3-way computerized piezoelectric ceramic actuator jacquard machine allowing instant pattern loading via USB and zero pattern change downtime.",
    description_bn:
      "৩-ওয়ে পিজোইলেকট্রিক সিরামিক অ্যাকচুয়েটর সুবিধাসম্পন্ন আধুনিক জ্যাকার্ড মেশিন, যাতে ইউএসবি দিয়ে তাৎক্ষণিক ডিজাইন লোড করা যায়।",
    features: [
      "Piezoelectric ceramic electronic needle selection (3-way: Knit, Tuck, Miss)",
      "High-resolution LCD pattern controller with USB design transfer",
      "Capable of complex multi-color structural patterns",
    ],
    features_bn: [
      "পিজোইলেকট্রিক সিরামিক ইলেকট্রনিক নিডল সিলেকশন (৩-ওয়ে: Knit, Tuck, Miss)",
      "সহজে ইউএসবি দিয়ে ডিজাইন লোডের হাই-রেজোলিউশন এলসিডি কন্ট্রোলার",
      "যেকোনো জটিল ও মাল্টি-কালার ফ্যাব্রিক প্যাটার্ন নিটিং সক্ষমতা",
    ],
    images: ["/product-image/product-8.jpg", "/images/machines/cat-jacquard.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-8.jpg", alt_en: "Electronic Jacquard Circular Machine", alt_bn: "ইলেকট্রনিক জ্যাকার্ড সার্কুলার মেশিন", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-jacquard.webp", alt_en: "Jacquard needle selection actuators", alt_bn: "জ্যাকার্ড নিডল সিলেকশন অ্যাকচুয়েটর", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-03-05",
    updatedAt: "2026-03-11",
  },
  {
    id: "high-pile-terry-series",
    name: "High-Speed Industrial Loop Pile Terry Machine",
    name_bn: "হাই-স্পিড ইন্ডাস্ট্রিয়াল লুপ পাইল টেরি মেশিন",
    brand: "Tasneem Terry",
    manufacturer: "Sourced Overseas Manufacturer",
    machineType: "Single / Double Terry Circular Knitting Machine",
    category: "terry",
    cylinderDiameter: "30\" – 32\"",
    gauge: "18G – 24G",
    feeders: 72,
    fabricType: "French Terry, Towel Pile, Polar Fleece Base",
    application: ["Bath Towels", "Hoodies & Sweatshirts", "Sport Fleece", "Bathrobes"],
    origin: "China Import",
    warranty: "1 Year",
    availability: "contact-for-availability",
    price: undefined,
    description:
      "Industrial terry circular knitting machine designed for consistent plush loop height, uniform yarn tension, and high yield on fleece apparel.",
    description_bn:
      "তোয়ালে ও ফ্লিস কাপড়ে নিখুঁত ও সমান লুপের জন্য ইন্ডাস্ট্রিয়াল টেরি সার্কুলার মেশিন।",
    features: [
      "Dual sinker track for high stability pile formation",
      "Even loop height across high-speed rotations",
      "Specialized shearing-ready loop density",
    ],
    features_bn: [
      "স্থিতিশীল পাইল গঠনের জন্য ডুয়াল সিঙ্কার ট্র্যাক",
      "হাই-স্পিড অপারেশনেও প্রতিটি লুপের সমান উচ্চতা",
      "শিয়ারিং উপযোগী সুষম ও নিখুঁত ফ্যাব্রিক ডেনসিটি",
    ],
    images: ["/product-image/product-9.jpg", "/images/machines/cat-terry.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-9.jpg", alt_en: "Industrial Loop Pile Terry Machine", alt_bn: "ইন্ডাস্ট্রিয়াল লুপ পাইল টেরি মেশিন", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-terry.webp", alt_en: "Terry sinker and loop formation detail", alt_bn: "টেরি সিঙ্কার ও লুপ তৈরির বিবরণ", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-03-06",
    updatedAt: "2026-03-11",
  },
  {
    id: "tubular-fabric-inspection-machine",
    name: "Industrial Fabric Inspection & Tensionless Rolling Machine",
    name_bn: "ইন্ডাস্ট্রিয়াল ফ্যাব্রিক ইন্সপেকশন ও রোলিং মেশিন",
    brand: "Tasneem Finishing",
    manufacturer: "Sourced Overseas Plant",
    machineType: "Finishing & Inspection Equipment",
    category: "finishing",
    cylinderDiameter: undefined, // "Contact for details"
    gauge: undefined,
    feeders: undefined,
    fabricType: "All Circular Knit Tubular Fabrics",
    application: ["Post-Knitting Quality Control", "Flaw Detection", "Roll Packaging"],
    origin: "China Import",
    warranty: "1 Year",
    availability: "in-stock",
    price: undefined,
    description:
      "Essential post-knitting quality inspection machinery equipped with dual LED lighting screens and precision length measurement counter.",
    description_bn:
      "ডুয়াল এলইডি লাইটিং স্ক্রিন ও ডিজিটাল কাউন্টারযুক্ত আধুনিক ফ্যাব্রিক কোয়ালিটি ইন্সপেকশন ও রোলিং মেশিন।",
    features: [
      "High-luminance LED inspection illumination panel",
      "Electronic tensionless fabric rolling device",
      "Accurate digital length encoder in meters / yards",
    ],
    features_bn: [
      "উজ্জ্বল এলইডি ফ্যাব্রিক ইন্সপেকশন প্যানেল",
      "কাপড় কুঁচকে যাওয়া রোধে ইলেকট্রনিক টেনশনলেস রোলিং",
      "মিটার ও গজে নিখুঁত ডিজিটাল পরিমাপ সেন্সর",
    ],
    images: ["/product-image/product-10.jpg", "/images/machines/cat-finishing.webp"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-10.jpg", alt_en: "Fabric Inspection Machine", alt_bn: "ফ্যাব্রিক ইন্সপেকশন মেশিন", isPrimary: true },
      { id: "img-2", url: "/images/machines/cat-finishing.webp", alt_en: "Lighting board inspection screen", alt_bn: "লাইটিং বোর্ড ইন্সপেকশন স্ক্রিন", isPrimary: false },
    ],
    status: "published",
    createdAt: "2026-03-07",
    updatedAt: "2026-03-11",
  },
  {
    id: "draft-prototype-single-jersey",
    name: "[Draft Model] Ultra-Fine 36G Single Jersey Spandex",
    name_bn: "[খসড়া মডেল] আল্ট্রা-ফাইন ৩৬জি সিঙ্গেল জার্সি স্প্যানডেক্স",
    brand: "Experimental / Prototype",
    manufacturer: "Overseas Engineering Lab",
    machineType: "High Gauge Single Jersey",
    category: "single-jersey",
    cylinderDiameter: "30\"",
    gauge: "32G – 36G",
    feeders: 90,
    fabricType: "Ultra-thin modal, active Lycra",
    application: ["Seamless Sportswear", "High-gauge modal"],
    origin: "China Import",
    warranty: "Pending",
    availability: "contact-for-availability",
    price: undefined,
    description: "Sample unreleased machine for testing draft state filtering in admin panel.",
    features: ["Special high-density sinkers"],
    images: ["/product-image/product-11.jpg"],
    galleryImages: [
      { id: "img-1", url: "/product-image/product-11.jpg", alt_en: "Draft Model preview", alt_bn: "খসড়া মডেল প্রিভিউ", isPrimary: true },
    ],
    status: "draft", // DRAFT MACHINE: Hidden on public catalog, visible in admin!
    createdAt: "2026-03-12",
    updatedAt: "2026-03-12",
  },
  {
    id: "thies-eco-dyeing-machine",
    name: "Industrial High-Temperature Eco-Dyeing Machine",
    name_bn: "হাই-টেম্পারেচার ইকো ফ্যাব্রিক ডাইং মেশিন",
    brand: "Thies / Industrial Partner",
    manufacturer: "Thies Partner Machinery Co., Ltd.",
    machineType: "High Temperature High Pressure Fabric Dyeing Machine",
    category: "dyeing",
    mainCategory: "dyeing",
    productionCapacity: "350 – 500 kg per batch",
    fabricType: "Cotton Knit, Polyester Blends, Viscose & Spandex",
    fabricType_bn: "কটন নিট, পলিয়েস্টার ব্লেন্ড, ভিসকস ও স্প্যানডেক্স",
    application: ["Tubular Fabric Dyeing", "Open Width Dyeing", "Eco-Friendly Knitwear"],
    application_bn: ["টিউবুলার ফ্যাব্রিক ডাইং", "ওপেন উইডথ ডাইং", "পরিবেশবান্ধব নিটওয়্যার"],
    origin: "China / Europe Certified",
    warranty: "1 Year International Manufacturer Warranty + Commissioning Support",
    availability: "made-to-order",
    price: undefined,
    description:
      "Advanced industrial high-temperature fabric dyeing machine featuring low liquor ratio (1:4.5), internal lint filtration, variable speed circulation pump, and intelligent touch-screen curve control.",
    description_bn:
      "উচ্চ তাপমাত্রা ও প্রেসারযুক্ত আধুনিক টেক্সটাইল ডাইং মেশিন। কম পানি ও কেমিক্যাল ব্যবহারে সর্বোচ্চ কোয়ালিটি নিশ্চিত করে। চট্টগ্রাম বন্দর পর্যন্ত CFR ডেলিভারি ও কারখানা স্থাপন সুবিধা।",
    features: [
      "Ultra-low liquor ratio design (1:4 to 1:5.5) saving water and steam",
      "High-efficiency stainless steel circulation pump with inverter speed control",
      "Intelligent programmable multi-stage temperature curve controller",
      "Internal automatic lint collection filter and non-tangle fabric delivery reel",
      "CFR Chattogram port delivery and local technical engineer commissioning",
    ],
    features_bn: [
      "কম লিকার রেশিও ডিজাইন (১:৪ থেকে ১:৫.৫), যা পানি ও বাষ্প সাশ্রয়ী",
      "ইনভার্টার স্পিড কন্ট্রোলযুক্ত স্টেইনলেস স্টিল সার্কুলেশন পাম্প",
      "স্মার্ট প্রোগ্রামযোগ্য মাল্টি-স্টেজ তাপমাত্রা নিয়ন্ত্রক",
      "স্বয়ংক্রিয় লিন্ট কালেকশন ফিল্টার ও জটমুক্ত ফ্যাব্রিক ডেলিভারি রিল",
      "চট্টগ্রাম বন্দর পর্যন্ত CFR ডেলিভারি ও বিশেষজ্ঞ ইঞ্জিনিয়ারিং সাপোর্ট",
    ],
    images: ["/images/machines/cat-dyeing.webp"],
    galleryImages: [
      { id: "img-1", url: "/images/machines/cat-dyeing.webp", alt_en: "Industrial High-Temperature Eco-Dyeing Machine in factory", alt_bn: "কারখানায় স্থাপিত হাই-টেম্পারেচার ইকো ডাইং মেশিন", isPrimary: true },
    ],
    status: "published",
    createdAt: "2026-03-13",
    updatedAt: "2026-03-13",
  },
  {
    id: "crosta-rotary-fabric-shearing",
    name: "Precision Industrial Rotary Fabric Shearing Machine",
    name_bn: "হাই-প্রিসিশন রোটারি ফ্যাব্রিক শিয়ারিং মেশিন",
    brand: "Crosta / Industrial Sourcing",
    manufacturer: "Precision Textile Finishing Equipment Ltd.",
    machineType: "Industrial Rotary Pile Shearing & Cropping Machine",
    category: "shearing",
    mainCategory: "shearing",
    productionCapacity: "15 – 35 meters / minute",
    fabricType: "Polar Fleece, French Terry, Velour, Flannel & Velvet",
    fabricType_bn: "পোলার ফ্লিস, ফ্রেঞ্চ টেরি, ভেলোর, ফ্লানেল ও ভেলভেট",
    application: ["Fleece Pile Leveling", "Terry Towel Cropping", "Velour Surface Finishing"],
    application_bn: ["ফ্লিস পাইল লেভেলিং", "তোয়ালে ক্রপিং", "ভেলোর সারফেস ফিনিশিং"],
    origin: "China Import",
    warranty: "1 Year Manufacturer Warranty",
    availability: "made-to-order",
    price: undefined,
    description:
      "Heavy-duty industrial shearing machine for knit fabric surface leveling. Equipped with hardened spiral cutting cylinder, ledger blade micrometric gap adjustment, and integrated high-vacuum flock exhaust.",
    description_bn:
      "নিট ও ওভেন কাপড়ের নিখুঁত সারফেস লেভেলিং শিয়ারিং মেশিন। শক্ত অ্যালয় স্পাইরাল কাটিং ব্লেড এবং হাই-ভ্যাকুয়াম ডাস্ট এক্সহস্ট সিস্টেম অন্তর্ভুক্ত।",
    features: [
      "Precision-ground alloy steel spiral cylinder with 24-blade configuration",
      "Micro-metric ledger blade clearance adjustment with digital readout",
      "Integrated heavy-duty vacuum suction system for trimmed fiber waste",
      "Tensionless fabric feed rollers with computerized AC inverter synchronizer",
      "Comprehensive factory setup and operator training in Bangladesh",
    ],
    features_bn: [
      "২৪-ব্লেডযুক্ত প্রিসিশন অ্যালয় স্টিল স্পাইরাল সিলিন্ডার",
      "ডিজিটাল রিডআউটযুক্ত মাইক্রোমেট্রিক ব্লেড অ্যাডজাস্টমেন্ট",
      "কর্তনকৃত ফাইবার বর্জ্য নিষ্কাশনে শক্তিশালী ভ্যাকুয়াম সাকশন সিস্টেম",
      "টেনশনলেস ফ্যাব্রিক ফিড রোলার ও এসি ইনভার্টার ড্রাইভ",
      "বাংলাদেশে সরাসরি কারখানা ইনস্টলেশন ও অপারেটর প্রশিক্ষণ",
    ],
    images: ["/images/machines/cat-shearing.webp"],
    galleryImages: [
      { id: "img-1", url: "/images/machines/cat-shearing.webp", alt_en: "Precision Industrial Rotary Fabric Shearing Machine in factory", alt_bn: "কারখানায় কার্যরত প্রিসিশন ফ্যাব্রিক শিয়ারিং মেশিন", isPrimary: true },
    ],
    status: "published",
    createdAt: "2026-03-13",
    updatedAt: "2026-03-13",
  },
  {
    id: "bruckner-open-width-compactor",
    name: "Industrial Continuous Open-Width Stenter & Compactor Line",
    name_bn: "ওপেন-উইডথ স্টেন্টার ও কমপ্যাক্টর ফিনিশিং লাইন",
    brand: "Bruckner / Industrial Sourcing",
    manufacturer: "Textile Finishing Engineering Consortium",
    machineType: "Continuous Open-Width Stenter & Compactor",
    category: "other",
    mainCategory: "other",
    productionCapacity: "20 – 45 meters / minute",
    fabricType: "Cotton Single Jersey, Interlock, Pique Polo & Lycra Blends",
    fabricType_bn: "কটন সিঙ্গেল জার্সি, ইন্টারলক, পোলো পিক ও লাইক্রা ব্লেন্ড",
    application: ["Residual Shrinkage Control", "Width Setting", "Soft-Handle Finishing"],
    application_bn: ["কাপড়ের সংকোচন (Shrinkage) নিয়ন্ত্রণ", "উইডথ সেটিং", "সফট হ্যান্ডেল ফিনিশিং"],
    origin: "China / Europe Partner Certified",
    warranty: "1 Year Commercial Warranty + Commissioning",
    availability: "made-to-order",
    price: undefined,
    description:
      "State-of-the-art open-width finishing line delivering zero-tension shrinkage control (residual shrinkage under 3%) and ultra-soft fabric handle for export garments.",
    description_bn:
      "রপ্তানিমুখী পোশাকের জন্য প্রি-শ্রিংকেজ নিয়ন্ত্রণ ও নিখুঁত নরম ফিনিশিংয়ের কন্টিনিউয়াস ওপেন-উইডথ স্টেন্টার ও কমপ্যাক্টর।",
    features: [
      "High-precision fabric centering and spreading rollers with optical sensors",
      "Nomex felt compacting belts with adjustable overfeed ratio up to +40%",
      "Steam dampening chamber with uniform moisture dispersion",
      "Integrated cooling zone and precision rolling batcher",
      "CFR Chattogram delivery with professional mechanical and electrical engineers",
    ],
    features_bn: [
      "অপটিক্যাল সেন্সরযুক্ত প্রিসিশন ফ্যাব্রিক সেন্টারিং ও স্প্রেডার রোলার",
      "নোমেক্স ফেল্ট কমপ্যাক্টিং বেল্ট (ওভারফিড রেশিও +৪০% পর্যন্ত সমন্বয়যোগ্য)",
      "ইউনিফর্ম বাষ্পযুক্ত আর্দ্রতাকরণ চেম্বার",
      "ইন্টিগ্রেটেড কুলিং জোন ও টেনশনলেস রোলিং ব্যাচার",
      "চট্টগ্রাম বন্দর পর্যন্ত CFR ডেলিভারি ও প্রফেশনাল ইঞ্জিনিয়ার দ্বারা কমিশনিং",
    ],
    images: ["/images/machines/cat-other.webp"],
    galleryImages: [
      { id: "img-1", url: "/images/machines/cat-other.webp", alt_en: "Continuous Open-Width Stenter & Compactor Line", alt_bn: "ওপেন-উইডথ স্টেন্টার ও কমপ্যাক্টর ফিনিশিং লাইন", isPrimary: true },
    ],
    status: "published",
    createdAt: "2026-03-13",
    updatedAt: "2026-03-13",
  },
];

// Helper functions with client storage support
export function getAllMachines(includeDrafts = false): Machine[] {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem("tasneem_admin_machines");
      if (stored) {
        const parsed = JSON.parse(stored) as Machine[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return includeDrafts ? parsed : parsed.filter((m) => m.status !== "draft");
        }
      }
    } catch {
      // Fall through to hardcoded MACHINES
    }
  }
  return includeDrafts ? MACHINES : MACHINES.filter((m) => m.status !== "draft");
}

export function getMachinesByCategory(category: MachineCategory, includeDrafts = false): Machine[] {
  return getAllMachines(includeDrafts).filter(
    (m) =>
      m.category === category ||
      m.mainCategory === category ||
      m.subCategory === category ||
      (category === "circular-knitting" &&
        (!m.mainCategory || m.mainCategory === "circular-knitting") &&
        (m.category === "double-jersey" ||
          m.category === "single-jersey" ||
          m.category === "interlock" ||
          m.category === "jacquard" ||
          m.category === "terry"))
  );
}

export function getMachinesByMainCategory(mainCategory: MainCategory, includeDrafts = false): Machine[] {
  return getMachinesByCategory(mainCategory as MachineCategory, includeDrafts);
}

export function getMachinesBySubCategory(subCategory: CircularKnittingSubCategory, includeDrafts = false): Machine[] {
  return getAllMachines(includeDrafts).filter(
    (m) => m.subCategory === subCategory || m.category === subCategory
  );
}

export function getMachineById(id: string, includeDrafts = true): Machine | undefined {
  return getAllMachines(includeDrafts).find((m) => m.id === id);
}

export function getCategoryInfo(category: MachineCategory): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === category);
}

export function getMainCategories(): CategoryInfo[] {
  return MAIN_CATEGORIES;
}

export function getCircularSubCategories(): CategoryInfo[] {
  return CIRCULAR_SUB_CATEGORIES;
}

export function getSubCategories(mainCategorySlug?: string): CategoryInfo[] {
  if (!mainCategorySlug || mainCategorySlug === "circular-knitting") {
    return CIRCULAR_SUB_CATEGORIES;
  }
  return [];
}

