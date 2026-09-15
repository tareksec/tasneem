export type Locale = "en" | "bn";

export interface Dictionary {
  locale: Locale;
  nav: {
    machines: string;
    services: string;
    about: string;
    howItWorks: string;
    industries: string;
    projects: string;
    resources: string;
    faq: string;
    contact: string;
    requestQuote: string;
  };
  common: {
    requestQuote: string;
    contactUs: string;
    chatWhatsApp: string;
    viewSpecs: string;
    viewAllMachines: string;
    backToMachines: string;
    contactForDetails: string;
    contactForPrice: string;
    contactForAvailability: string;
    complianceBadge: string;
    readMore: string;
    allCategories: string;
    viewTradeLicense: string;
    verifiedTradeLicense: string;
  };
  header: {
    tagline: string;
    languageToggle: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    description: string;
    complianceTitle: string;
    binLabel: string;
    ircLabel: string;
    complianceNote: string;
    machineCategoriesTitle: string;
    companyNavTitle: string;
    contactTitle: string;
    rightsReserved: string;
    b2bTag: string;
    cfrTag: string;
    whatsappText: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    whatsappCta: string;
    cfrBadge: string;
    inspectionBadge: string;
    installBadge: string;
    imageTag: string;
  };
  trustStrip: {
    binTitle: string;
    ircTitle: string;
    cfrTitle: string;
    inspectionTitle: string;
    complianceSub: string;
  };
  categories: {
    badge: string;
    title: string;
    subtitle: string;
    viewAllBtn: string;
    exploreBtn: string;
  };
  featured: {
    badge: string;
    title: string;
    subtitle: string;
    quoteBtn: string;
    specsBtn: string;
  };
  specLabels: {
    cylinderDiameter: string;
    gauge: string;
    feeders: string;
    numberOfSystems: string;
    machineSpeed: string;
    fabricType: string;
    productionCapacity: string;
    application: string;
    powerRequirement: string;
    dimensions: string;
    weight: string;
    origin: string;
    warranty: string;
    availability: string;
    price: string;
    brand: string;
    manufacturer: string;
    machineType: string;
    tableTitle: string;
    tableComplianceNote: string;
    needCustomParams: string;
    contactForDetails: string;
  };
  whyTasneem: {
    badge: string;
    title: string;
    subtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
  };
  sourcing: {
    badge: string;
    title: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
  };
  installation: {
    badge: string;
    title: string;
    subtitle: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    point4Title: string;
    point4Desc: string;
  };
  industries: {
    badge: string;
    title: string;
    subtitle: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };
  quoteBanner: {
    title: string;
    subtitle: string;
    ctaBtn: string;
    whatsappBtn: string;
  };
  quoteForm: {
    title: string;
    subtitle: string;
    nameLabel: string;
    companyLabel: string;
    phoneLabel: string;
    emailLabel: string;
    categoryLabel: string;
    gaugeLabel: string;
    cylinderLabel: string;
    feederLabel: string;
    quantityLabel: string;
    notesLabel: string;
    submitBtn: string;
    submittingBtn: string;
    successMessage: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    locale: "en",
    nav: {
      machines: "Machines",
      services: "Services",
      about: "About",
      howItWorks: "How It Works",
      industries: "Industries",
      projects: "Projects",
      resources: "Resources",
      faq: "FAQ",
      contact: "Contact",
      requestQuote: "Request a Quote",
    },
    common: {
      requestQuote: "Request a Quote",
      contactUs: "Contact Us",
      chatWhatsApp: "Chat via WhatsApp",
      viewSpecs: "View Specifications",
      viewAllMachines: "View All Machines",
      backToMachines: "Back to Machine Catalog",
      contactForDetails: "Contact for details",
      contactForPrice: "Contact for pricing",
      contactForAvailability: "Contact for availability",
      complianceBadge: "Commercial Import & Compliance",
      readMore: "Read More",
      allCategories: "All Categories",
      viewTradeLicense: "View Trade License",
      verifiedTradeLicense: "Government Registered • Verified Trade License",
    },
    header: {
      tagline: "Industrial Circular Knitting Machinery Sourcing Specialist",
      languageToggle: "বাংলা",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
    },
    footer: {
      description:
        "Direct overseas importer and supplier of industrial circular knitting machines, genuine spare parts, and technical after-sales services for the Bangladesh textile and apparel industry.",
      complianceTitle: "Commercial Import & Compliance",
      binLabel: "BIN",
      ircLabel: "IRC",
      complianceNote: "Direct L/C opening & CFR Chattogram shipment assistance.",
      machineCategoriesTitle: "Machine Categories",
      companyNavTitle: "Company & Services",
      contactTitle: "Contact & Inquiry",
      rightsReserved: "All rights reserved.",
      b2bTag: "B2B Industrial Machinery Sourcing",
      cfrTag: "CFR Chattogram Delivery",
      whatsappText: "WhatsApp",
    },
    hero: {
      badge: "Direct Industrial Machinery Importer • Bangladesh Textile Sector",
      title: "Direct Overseas Sourcing for Industrial Circular Knitting Machines",
      subtitle:
        "Factory-direct pricing, certified pre-shipment inspection, CFR Chattogram delivery, and local commissioning.",
      primaryCta: "Request a Custom Machine Quote",
      whatsappCta: "Chat via WhatsApp",
      cfrBadge: "CFR Chattogram Sea Freight",
      inspectionBadge: "3rd-Party Pre-Shipment Inspection",
      installBadge: "Local Installation & Commissioning",
      imageTag: "High-Precision Circular Knitting Architecture",
    },
    trustStrip: {
      binTitle: "BIN Registered Importer",
      ircTitle: "Import Registration Certificate (IRC)",
      cfrTitle: "CFR Chattogram Sea Port Delivery",
      inspectionTitle: "Pre-Shipment Inspection (SGS / BV / Intertek)",
      complianceSub: "Commercial textile machinery compliance in Bangladesh",
    },
    categories: {
      badge: "Machine Categories",
      title: "Engineered Circular Knitting Categories",
      subtitle:
        "Specialized circular knitting machinery configured for high-efficiency Bangladesh export knitwear mills.",
      viewAllBtn: "View All Machine Models",
      exploreBtn: "Explore Category",
    },
    featured: {
      badge: "Featured Equipment",
      title: "High-Demand Circular Knitting Models",
      subtitle: "Reliable overseas machinery ready for factory specification and commercial procurement.",
      quoteBtn: "Request Quote",
      specsBtn: "View Full Specs",
    },
    specLabels: {
      cylinderDiameter: "Cylinder Diameter",
      gauge: "Gauge",
      feeders: "Feeders",
      numberOfSystems: "Number of Systems",
      machineSpeed: "Machine Speed (RPM)",
      fabricType: "Fabric Type",
      productionCapacity: "Production Capacity",
      application: "Application",
      powerRequirement: "Power Requirement",
      dimensions: "Dimensions",
      weight: "Weight",
      origin: "Country of Origin",
      warranty: "Warranty",
      availability: "Availability",
      price: "Estimated Price",
      brand: "Brand",
      manufacturer: "Manufacturer",
      machineType: "Machine Type",
      tableTitle: "Technical Specifications Table",
      tableComplianceNote: "Strict data compliance: unconfirmed values render “Contact for details”.",
      needCustomParams: "Need custom parameters? Contact engineering",
      contactForDetails: "Contact for details",
    },
    whyTasneem: {
      badge: "Why Tasneem",
      title: "Built for High-Yield Bangladesh Knitwear Production",
      subtitle:
        "Zero intermediary markups and end-to-end commercial and engineering support.",
      pillar1Title: "Direct Overseas Importer",
      pillar1Desc:
        "Direct manufacturer sourcing with transparent factory pricing and zero intermediary markups.",
      pillar2Title: "3rd-Party Pre-Shipment Inspection",
      pillar2Desc:
        "Independent SGS or Intertek inspection ensures mechanical alignment before container loading.",
      pillar3Title: "CFR Chattogram Sea Delivery",
      pillar3Desc:
        "Containerized sea shipment to Chattogram Port with complete L/C and customs clearance support.",
      pillar4Title: "Local Installation & After-Sales",
      pillar4Desc:
        "On-site mill assembly, test knitting, operator training, and local spare parts inventory.",
    },
    sourcing: {
      badge: "Transparent Sourcing",
      title: "3-Step Overseas Machinery Sourcing Workflow",
      subtitle: "From technical specification to CFR Chattogram customs and on-site delivery.",
      step1Num: "01",
      step1Title: "Specification & Commercial Quotation",
      step1Desc:
        "Specify cylinder, gauge, and feeder parameters to receive a formal CFR Chattogram proforma invoice.",
      step2Num: "02",
      step2Title: "Factory Build & Pre-Shipment Audit",
      step2Desc:
        "Built-to-order machinery undergoes rigorous mechanical inspection and test knitting before sea packing.",
      step3Num: "03",
      step3Title: "CFR Chattogram Port Delivery & Setup",
      step3Desc:
        "Containerized sea arrival at Chattogram Port with complete on-site mill commissioning.",
    },
    installation: {
      badge: "Engineering Support",
      title: "Local Factory Installation, Commissioning & After-Sales",
      subtitle: "Dedicated technicians ensuring zero downtime for your production floor.",
      point1Title: "On-Site Mechanical Assembly",
      point1Desc: "Precision leveling, frame anchoring, cylinder fitting, and oil lubrication line assembly.",
      point2Title: "Test Knitting & Fabric Validation",
      point2Desc: "Sample run verification to match your exact fabric tension, GSM, and loop density specs.",
      point3Title: "Operator & Technician Training",
      point3Desc: "On-floor training for your mill operators on speed tuning, cam adjustments, and daily maintenance.",
      point4Title: "Genuine Spare Parts Inventory",
      point4Desc: "Direct access to replacement needles, sinkers, cams, feeders, and yarn creel accessories.",
    },
    industries: {
      badge: "Industrial Applications",
      title: "Serving Core Bangladesh Textile Segments",
      subtitle: "Precision machinery tailored for export knitwear, domestic apparel, and high-density fabrics.",
    },
    faq: {
      badge: "Frequently Asked Questions",
      title: "Commercial & Technical FAQs",
      subtitle: "Common inquiries from Bangladeshi textile mill owners and procurement managers.",
      q1: "How does Tasneem handle machinery procurement from overseas?",
      a1: "We connect mill owners directly with certified overseas manufacturers. We assist with technical specification selection, issue official CFR Chattogram proforma invoices for direct L/C opening, coordinate 3rd-party pre-shipment inspections, and provide local factory installation.",
      q2: "What shipping terms are provided for Bangladesh deliveries?",
      a2: "Our standard commercial quotation is based on CFR Chattogram (Cost and Freight). Machinery is shipped via container vessels to Chattogram Sea Port, with complete documentation provided for swift customs clearance.",
      q3: "Can you arrange third-party pre-shipment inspection (PSI)?",
      a3: "Yes. Before machinery is packed into export containers, we can coordinate third-party inspection (such as SGS, Intertek, or Bureau Veritas) to verify mechanical tolerances, feeder synchronization, and complete parts compliance.",
      q4: "Do you provide on-site installation and technician commissioning in Bangladesh?",
      a4: "Yes. Our local engineering team conducts full mechanical assembly, electrical wiring, test knitting, and operator training directly inside your factory.",
      q5: "How are unconfirmed technical specifications handled on the site?",
      a5: "Per our strict compliance standard, unconfirmed machine specifications display 'Contact for details' until verified. We do not provide fabricated marketing specifications.",
      q6: "How do I request a formal machine price quotation?",
      a6: "You can click 'Request a Quote' on any machine page, provide your cylinder, gauge, and feeder requirements, or reach out to our team instantly via WhatsApp.",
    },
    quoteBanner: {
      title: "Ready to Expand Your Mill’s Circular Knitting Capacity?",
      subtitle:
        "Get verified overseas machinery specifications, CFR Chattogram shipping estimates, and full factory installation support.",
      ctaBtn: "Request Machine Quotation",
      whatsappBtn: "WhatsApp Direct Inquiry",
    },
    quoteForm: {
      title: "Request an Industrial Machine Quotation",
      subtitle:
        "Submit your required parameters below. Our commercial machinery specialist will prepare a CFR Chattogram proposal.",
      nameLabel: "Contact Name",
      companyLabel: "Mill / Company Name",
      phoneLabel: "Phone / WhatsApp Number",
      emailLabel: "Email Address",
      categoryLabel: "Machine Category",
      gaugeLabel: "Gauge Required (e.g., 24G, 28G)",
      cylinderLabel: "Cylinder Diameter (e.g., 30\", 34\")",
      feederLabel: "Feeder Count",
      quantityLabel: "Quantity of Machines",
      notesLabel: "Production Targets & Notes",
      submitBtn: "Submit Quote Request",
      submittingBtn: "Submitting...",
      successMessage: "Thank you! Your quote request has been received. Our machinery specialist will contact you shortly.",
    },
    seo: {
      metaTitle: "Tasneem Knitting Industry | Industrial Circular Knitting Machine Importer Bangladesh",
      metaDescription:
        "Direct overseas importer of industrial circular knitting machines in Bangladesh. Double Jersey, Single Jersey, Interlock, Jacquard & Terry machines with pre-shipment inspection, CFR Chattogram delivery, and factory installation.",
      ogTitle: "Tasneem Knitting Industry | Industrial Circular Knitting Machine Sourcing",
      ogDescription:
        "Direct overseas importer of industrial circular knitting machines for Bangladesh textile mills. CFR Chattogram delivery, pre-shipment inspection, and on-site factory commissioning.",
      keywords: [
        "knitting machine Bangladesh",
        "circular knitting machine Bangladesh",
        "industrial knitting machine Bangladesh",
        "double jersey knitting machine Bangladesh",
        "single jersey knitting machine Bangladesh",
        "interlock knitting machine Bangladesh",
        "jacquard knitting machine Bangladesh",
        "terry knitting machine Bangladesh",
        "textile machinery Bangladesh",
        "knitting machine price Bangladesh",
        "CFR Chattogram machinery import",
      ],
    },
  },
  bn: {
    locale: "bn",
    nav: {
      machines: "মেশিন ক্যাটালগ",
      services: "আমাদের সেবাসমূহ",
      about: "আমাদের সম্পর্কে",
      howItWorks: "যেভাবে কাজ করি",
      industries: "যেসব খাতে কাজ করি",
      projects: "প্রজেক্ট",
      resources: "রিসোর্স ও গাইড",
      faq: "সাধারণ জিজ্ঞাসা",
      contact: "যোগাযোগ",
      requestQuote: "কোটেশন নিন",
    },
    common: {
      requestQuote: "কোটেশন নিন",
      contactUs: "আমাদের সাথে কথা বলুন",
      chatWhatsApp: "WhatsApp-এ সরাসরি কথা বলুন",
      viewSpecs: "স্পেসিফিকেশন দেখুন",
      viewAllMachines: "সব মেশিন দেখুন",
      backToMachines: "মেশিন ক্যাটালগে ফিরে যান",
      contactForDetails: "বিস্তারিত জানতে যোগাযোগ করুন",
      contactForPrice: "মূল্য জানতে কল করুন",
      contactForAvailability: "স্টক জানতে যোগাযোগ করুন",
      complianceBadge: "অনুমোদিত বাণিজ্যিক আমদানি ও কমপ্লায়েন্স",
      readMore: "বিস্তারিত পড়ুন",
      allCategories: "সব ক্যাটাগরি",
      viewTradeLicense: "ট্রেড লাইসেন্স দেখুন",
      verifiedTradeLicense: "সরকারি নিবন্ধিত • যাচাইকৃত ট্রেড লাইসেন্স",
    },
    header: {
      tagline: "টেক্সটাইল ও সার্কুলার নিটিং মেশিন সরাসরি আমদানি বিশেষজ্ঞ",
      languageToggle: "EN",
      openMenu: "নেভিগেশন মেনু খুলুন",
      closeMenu: "নেভিগেশন মেনু বন্ধ করুন",
    },
    footer: {
      description:
        "বাংলাদেশের টেক্সটাইল ও তৈরি পোশাক কারখানার জন্য বিশ্বমানের সার্কুলার নিটিং মেশিন, ডাইং, শেয়ারিং ও ফিনিশিং মেশিনারি, আসল স্পেয়ার পার্টস এবং দক্ষ টেকনিক্যাল সার্ভিস নিয়ে আমরা আছি আপনার পাশে।",
      complianceTitle: "বাণিজ্যিক আমদানি ও ট্রেড লাইসেন্স",
      binLabel: "BIN",
      ircLabel: "IRC",
      complianceNote: "সরাসরি L/C খোলা এবং চট্টগ্রাম বন্দর পর্যন্ত CFR সমুদ্র পরিবহন সহায়তা।",
      machineCategoriesTitle: "মেশিন ক্যাটাগরি",
      companyNavTitle: "কোম্পানি ও সেবা",
      contactTitle: "যোগাযোগ ও পরামর্শ",
      rightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
      b2bTag: "B2B টেক্সটাইল মেশিনারি আমদানি",
      cfrTag: "CFR চট্টগ্রাম ডেলিভারি",
      whatsappText: "WhatsApp",
    },
    hero: {
      badge: "সরাসরি ফ্যাক্টরি আমদানি • বাংলাদেশ টেক্সটাইল খাত",
      title: "বিশ্বমানের টেক্সটাইল মেশিনারি, এখন আপনার হাতের নাগালে।",
      subtitle:
        "সরাসরি ফ্যাক্টরি মূল্যে আমদানি, প্রি-শিপমেন্ট কোয়ালিটি অডিট এবং কারখানায় ইনস্টলেশন সাপোর্ট।",
      primaryCta: "মেশিনের কোটেশন নিন",
      whatsappCta: "WhatsApp-এ আলোচনা করুন",
      cfrBadge: "CFR চট্টগ্রাম সমুদ্র শিপমেন্ট",
      inspectionBadge: "আন্তর্জাতিক Pre-shipment Inspection",
      installBadge: "কারখানায় ইনস্টলেশন ও টেস্ট নিটিং",
      imageTag: "উচ্চ-নির্ভুল সার্কুলার নিটিং প্রযুক্তি",
    },
    trustStrip: {
      binTitle: "রেজিস্টার্ড বাণিজ্যিক আমদানিকারক (BIN)",
      ircTitle: "আমদানি নিবন্ধন সনদপত্র (IRC)",
      cfrTitle: "চট্টগ্রাম সমুদ্র বন্দর পর্যন্ত CFR ডেলিভারি",
      inspectionTitle: "Pre-shipment Inspection (SGS / BV / Intertek)",
      complianceSub: "বাংলাদেশের পোশাক কারখানার জন্য সম্পূর্ণ ঝুঁকিমুক্ত আমদানি",
    },
    categories: {
      badge: "মেশিন ক্যাটাগরি",
      title: "আপনার কারখানার জন্য সেরা মেশিনারি",
      subtitle:
        "রপ্তানিমুখী নিট গার্মেন্টস ও কম্পোজিট কারখানার জন্য সর্বোচ্চ প্রোডাক্টিভিটি ও নিখুঁত ফিনিশিংয়ের সার্কুলার নিটিং মেশিন।",
      viewAllBtn: "সব মেশিন মডেল দেখুন",
      exploreBtn: "ক্যাটাগরি দেখুন",
    },
    featured: {
      badge: "জনপ্রিয় মডেলসমূহ",
      title: "সবচেয়ে বেশি চাহিদাসম্পন্ন সার্কুলার নিটিং মেশিন",
      subtitle: "উৎপাদন বাড়াতে ও নিখুঁত কাপড়ের জন্য বাংলাদেশের সেরা কারখানাগুলোর বিশ্বস্ত পছন্দ।",
      quoteBtn: "কোটেশন নিন",
      specsBtn: "সম্পূর্ণ স্পেসিফিকেশন দেখুন",
    },
    specLabels: {
      cylinderDiameter: "Cylinder Diameter (ব্যাস)",
      gauge: "Gauge (গেজ)",
      feeders: "Feeders (ফিডার সংখ্যা)",
      numberOfSystems: "Systems সংখ্যা",
      machineSpeed: "মেশিন স্পিড (RPM)",
      fabricType: "কাপড়ের ধরন (Fabric Type)",
      productionCapacity: "উৎপাদন সক্ষমতা",
      application: "ব্যবহারের ক্ষেত্র",
      powerRequirement: "বিদ্যুৎ খরচ (Power)",
      dimensions: "আকার ও পরিমাপ",
      weight: "ওজন",
      origin: "Country of Origin",
      warranty: "ওয়ারেন্টি সাপোর্ট",
      availability: "স্টক ও প্রাপ্যতা",
      price: "আনুমানিক মূল্য",
      brand: "ব্র্যান্ড",
      manufacturer: "প্রস্তুতকারক",
      machineType: "মেশিনের ধরন",
      tableTitle: "টেকনিক্যাল স্পেসিফিকেশন",
      tableComplianceNote: "সঠিক তথ্য নীতি: প্রস্তুতকারক কর্তৃক নিশ্চিত হওয়া ছাড়া কোনো অনুমানভিত্তিক তথ্য দেওয়া হয় না। নিশ্চিত তথ্যের জন্য অনুগ্রহ করে যোগাযোগ করুন।",
      needCustomParams: "বিশেষ স্পেসিফিকেশন প্রয়োজন? আমাদের টেকনিক্যাল টিমের সাথে কথা বলুন",
      contactForDetails: "বিস্তারিত জানতে যোগাযোগ করুন",
    },
    whyTasneem: {
      badge: "কেন তাসনীম নিটিং ইন্ডাস্ট্রি?",
      title: "আপনার নিট কারখানার উৎপাদন ও মুনাফা বাড়াতে আমরা প্রতিজ্ঞাবদ্ধ",
      subtitle:
        "কোনো মধ্যস্বত্বভোগী নেই—সরাসরি ফ্যাক্টরি আমদানি, কোয়ালিটি অডিট এবং কারখানা পর্যন্ত সম্পূর্ণ সাপোর্ট।",
      pillar1Title: "সরাসরি ফ্যাক্টরি আমদানি",
      pillar1Desc:
        "কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি ফ্যাক্টরি মূল্যে আমদানি সুবিধা।",
      pillar2Title: "আন্তর্জাতিক Pre-shipment Inspection",
      pillar2Desc:
        "জাহাজে তোলার আগে আন্তর্জাতিক SGS বা Intertek সংস্থার মাধ্যমে নিখুঁত কোয়ালিটি অডিট।",
      pillar3Title: "CFR চট্টগ্রাম নিরাপদ সমুদ্র শিপমেন্ট",
      pillar3Desc:
        "সরাসরি আপনার নামে L/C এবং চট্টগ্রাম বন্দর খালাসের পূর্ণাঙ্গ ডকুমেন্টেশন সাপোর্ট।",
      pillar4Title: "কারখানায় ইনস্টলেশন ও দক্ষ সাপোর্ট",
      pillar4Desc:
        "কারখানায় সরাসরি মেশিন অ্যাসেম্বলি, টেস্ট নিটিং এবং দ্রুত স্পেয়ার পার্টস সাপোর্ট।",
    },
    sourcing: {
      badge: "সহজ ও স্বচ্ছ আমদানি প্রক্রিয়া",
      title: "৩টি সহজ ধাপে আপনার কারখানার মেশিন আমদানি",
      subtitle: "স্পেসিফিকেশন চূড়ান্ত করা থেকে চট্টগ্রাম বন্দর খালাস ও কারখানায় উৎপাদন চালু পর্যন্ত সম্পূর্ণ সাপোর্ট।",
      step1Num: "০১",
      step1Title: "মেশিনের স্পেসিফিকেশন ও ফ্যাক্টরি কোটেশন",
      step1Desc:
        "কাপড়ের স্পেসিফিকেশন নির্বাচন করে সরাসরি L/C খোলার অফিসিয়াল CFR চট্টগ্রাম প্রফরমা ইনভয়েস গ্রহণ করুন।",
      step2Num: "০২",
      step2Title: "ফ্যাক্টরি প্রোডাকশন ও কোয়ালিটি ইন্সপেকশন",
      step2Desc:
        "মেশিন তৈরির পর জাহাজে তোলার আগে আন্তর্জাতিক সংস্থার মাধ্যমে কঠোর কোয়ালিটি অডিট সম্পন্ন করা হয়।",
      step3Num: "০৩",
      step3Title: "চট্টগ্রাম বন্দরে ডেলিভারি ও কারখানায় চালু",
      step3Desc:
        "চট্টগ্রাম বন্দরে কন্টেইনার পৌঁছানোর পর কাস্টমস গাইডেন্স ও সরাসরি কারখানায় মেশিন চালু।",
    },
    installation: {
      badge: "টেকনিক্যাল সাপোর্ট ও সার্ভিস",
      title: "কারখানায় ইনস্টলেশন, টেস্ট নিটিং ও বিক্রয়োত্তর সম্পূর্ণ সেবা",
      subtitle: "আপনার ফ্লোরে নিরবচ্ছিন্ন উৎপাদন নিশ্চিত করতে আমাদের অভিজ্ঞ ইঞ্জিনিয়ার ও টেকনিশিয়ান টিম সবসময় প্রস্তুত।",
      point1Title: "ফ্লোরে নিখুঁত মেকানিক্যাল অ্যাসেম্বলি",
      point1Desc: "মেশিন লেভেলিং, ফ্রেম ফিক্সিং, Cylinder ফিটিং এবং অটোমেটিক অয়েলিং সিস্টেম নিখুঁতভাবে স্থাপন।",
      point2Title: "টেস্ট নিটিং ও ফ্যাব্রিক ভ্যালিডেশন",
      point2Desc: "মেশিন চালু করে আপনার পছন্দের GSM ও কাপড়ের কোয়ালিটি টেস্ট রান করে তবেই বুঝিয়ে দেওয়া হয়।",
      point3Title: "মাস্টার ও অপারেটর ট্রেনিং",
      point3Desc: "আপনার ফ্লোরের নিটিং মাস্টার ও অপারেটরদের স্পিড কন্ট্রোল, Cam অ্যাডজাস্টমেন্ট এবং দৈনন্দিন রক্ষণাবেক্ষণের হাতে-কলমে প্রশিক্ষণ।",
      point4Title: "আসল স্পেয়ার পার্টস ও ব্যাকআপ",
      point4Desc: "প্রয়োজনীয় Needle, Sinker, Cam, Feeder ও Creel এক্সেসরিজ সরাসরি অরিজিনাল ফ্যাক্টরি থেকে পাওয়ার নিশ্চয়তা।",
    },
    industries: {
      badge: "ব্যবহারের ক্ষেত্র",
      title: "বাংলাদেশের প্রধান টেক্সটাইল খাতের উপযোগী",
      subtitle: "টি-শার্ট, পোলো, ফ্লিস ও ফ্যাশন ফেব্রিকের জন্য উচ্চমানের সার্কুলার নিটিং মেশিনারি।",
    },
    faq: {
      badge: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
      title: "আমদানি ও টেকনিক্যাল বিষয়ে আপনার প্রশ্নের উত্তর",
      subtitle: "বাংলাদেশের টেক্সটাইল মিল মালিক ও প্রকিউরমেন্ট টিম যেসব বিষয় জানতে চান।",
      q1: "তাসনীম নিটিং ইন্ডাস্ট্রি কীভাবে বিদেশ থেকে মেশিন আমদানিতে সাহায্য করে?",
      a1: "আমরা গার্মেন্টস ও টেক্সটাইল মিল মালিকদের সরাসরি আন্তর্জাতিক প্রস্তুতকারকদের সাথে কানেক্ট করে দিই। সঠিক স্পেসিফিকেশন বা মডেল নির্বাচন, ফ্যাক্টরি প্রাইসে L/C খোলার জন্য CFR চট্টগ্রাম Proforma Invoice (PI), থার্ড-পার্টি প্রি-শিপমেন্ট পরিদর্শন এবং দেশে আসার পর আপনার কারখানায় টেকনিশিয়ান পাঠিয়ে মেশিন সেটআপ ও টেস্ট রান—সবকিছুতেই পাশে থাকি।",
      q2: "মেশিন আমদানির শিপিং শর্তাবলী কেমন?",
      a2: "আমরা প্রধানত CFR চট্টগ্রাম (Cost and Freight) ভিত্তিতে কাজ করি। কন্টেইনার জাহাজে নিরাপদে চট্টগ্রাম সমুদ্র বন্দরে আনা হয় এবং বন্দর থেকে সহজে খালাসের জন্য প্রয়োজনীয় সব ডকুমেন্টেশন সময়মতো সরবরাহ করা হয়।",
      q3: "মেশিন জাহাজে তোলার আগে প্রি-শিপমেন্ট ইন্সপেকশন (PSI) কি সম্ভব?",
      a3: "অবশ্যই। কন্টেইনারে লোড করার আগেই আন্তর্জাতিক খ্যাতিসম্পন্ন সংস্থা (যেমন SGS, Intertek বা Bureau Veritas) দিয়ে মেশিনের যন্ত্রাংশ, ব্যালেন্স ও নির্ভুলতা পরীক্ষা করে ইন্সপেকশন রিপোর্ট পাওয়ার ব্যবস্থা রয়েছে।",
      q4: "আমাদের ফ্যাক্টরিতে এসে কি মেশিন ইনস্টল করে দেওয়া হবে?",
      a4: "হ্যাঁ, নিশ্চয়ই! আমাদের নিজস্ব দক্ষ টেকনিক্যাল টিম সরাসরি আপনার কারখানায় উপস্থিত হয়ে সম্পূর্ণ মেকানিক্যাল অ্যাসেম্বলি, ইলেকট্রিক্যাল কানেকশন, টেস্ট নিটিং এবং আপনার কর্মীদের প্রশিক্ষণ দিয়ে মেশিন বুঝিয়ে দেবেন।",
      q5: "ওয়েবসাইটে কোনো কোনো স্পেসিফিকেশনে 'বিস্তারিত তথ্যের জন্য যোগাযোগ করুন' কেন লেখা থাকে?",
      a5: "আমরা তথ্যের স্বচ্ছতা ও সততায় বিশ্বাস করি। প্রস্তুতকারক থেকে শতভাগ নিশ্চিত না হয়ে আমরা মনগড়া বা ভুল স্পেসিফিকেশন প্রকাশ করি না। যেগুলোর স্পেসিফিকেশন কনফার্মেশন বাকি থাকে, সেগুলোতে যোগাযোগ করতে বলা হয়।",
      q6: "মেশিনের দাম ও আনুষ্ঠানিক কোটেশন কীভাবে পাব?",
      a6: "যেকোনো মেশিনের পেজে গিয়ে 'কোটেশন নিন' বাটনে ক্লিক করে আপনার Cylinder, Gauge ও Feeder-এর চাহিদা জানাতে পারেন, অথবা সরাসরি আমাদের WhatsApp-এ মেসেজ বা কল দিয়ে কথা বলতে পারেন।",
    },
    quoteBanner: {
      title: "আপনার কারখানার নিটিং সক্ষমতা বাড়াতে চান?",
      subtitle:
        "যাচাইকৃত স্পেসিফিকেশন, সরাসরি ফ্যাক্টরি প্রাইস এবং চট্টগ্রাম বন্দর পর্যন্ত নিরাপদ ডেলিভারি নিয়ে আজই আলোচনা শুরু করুন।",
      ctaBtn: "মেশিন কোটেশন নিন",
      whatsappBtn: "WhatsApp-এ সরাসরি কথা বলুন",
    },
    quoteForm: {
      title: "মেশিনের কোটেশনের জন্য অনুরোধ করুন",
      subtitle:
        "আপনার কারখানার প্রয়োজনীয় স্পেসিফিকেশন নিচে পূরণ করুন। আমাদের মেশিনারি স্পেশালিস্ট খুব দ্রুত CFR চট্টগ্রাম অফার নিয়ে আপনার সাথে যোগাযোগ করবেন।",
      nameLabel: "আপনার নাম",
      companyLabel: "মিল বা কোম্পানির নাম",
      phoneLabel: "মোবাইল / WhatsApp নম্বর",
      emailLabel: "ইমেইল অ্যাড্রেস",
      categoryLabel: "মেশিনের ক্যাটাগরি",
      gaugeLabel: "প্রয়োজনীয় Gauge (যেমন: 24G, 28G)",
      cylinderLabel: "Cylinder Diameter (যেমন: 30\", 34\")",
      feederLabel: "Feeder সংখ্যা",
      quantityLabel: "মেশিনের সংখ্যা",
      notesLabel: "আপনার উৎপাদনের লক্ষ্য বা অতিরিক্ত তথ্য",
      submitBtn: "কোটেশন রিকোয়েস্ট পাঠান",
      submittingBtn: "পাঠানো হচ্ছে...",
      successMessage: "ধন্যবাদ! আপনার কোটেশন অনুরোধটি পেয়েছি। আমাদের টেকনিক্যাল টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে।",
    },
    seo: {
      metaTitle: "তাসনীম নিটিং ইন্ডাস্ট্রি | সার্কুলার নিটিং মেশিন আমদানিকারক বাংলাদেশ",
      metaDescription:
        "বাংলাদেশে শিল্প সার্কুলার নিটিং মেশিনের সরাসরি আমদানিকারক। ডাবল জার্সি, সিঙ্গেল জার্সি, ইন্টারলক, জ্যাকার্ড ও টেরি মেশিন। প্রি-শিপমেন্ট পরিদর্শন, সিএফআর চট্টগ্রাম ডেলিভারি এবং কারখানায় সরাসরি ইনস্টলেশন।",
      ogTitle: "তাসনীম নিটিং ইন্ডাস্ট্রি | সার্কুলার নিটিং মেশিন সোর্সিং বাংলাদেশ",
      ogDescription:
        "বাংলাদেশের টেক্সটাইল মিলের জন্য সরাসরি আন্তর্জাতিক সার্কুলার নিটিং মেশিন আমদানি। সিএফআর চট্টগ্রাম ডেলিভারি, কোয়ালিটি পরিদর্শন এবং স্থানীয় টেকনিশিয়ান সাপোর্ট।",
      keywords: [
        "নিটিং মেশিন বাংলাদেশ",
        "সার্কুলার নিটিং মেশিন বাংলাদেশ",
        "শিল্প নিটিং মেশিন",
        "ডাবল জার্সি নিটিং মেশিন",
        "সিঙ্গেল জার্সি নিটিং মেশিন",
        "ইন্টারলক নিটিং মেশিন",
        "জ্যাকার্ড নিটিং মেশিন",
        "টেরি নিটিং মেশিন",
        "টেক্সটাইল মেশিনারি বাংলাদেশ",
        "নিটিং মেশিনের দাম বাংলাদেশ",
        "সিএফআর চট্টগ্রাম ডেলিভারি",
      ],
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
