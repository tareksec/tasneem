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
      machines: "মেশিনসমূহ",
      services: "সার্ভিস ও সাপোর্ট",
      about: "আমাদের সম্পর্কে",
      howItWorks: "আমদানি যেভাবে হয়",
      industries: "ইন্ডাস্ট্রি ও ফেব্রিক",
      projects: "প্রজেক্ট গ্যালারি",
      resources: "টেকনিক্যাল গাইড",
      faq: "সাধারণ জিজ্ঞাসা",
      contact: "যোগাযোগ",
      requestQuote: "কোটেশন নিন",
    },
    common: {
      requestQuote: "কোটেশন চান",
      contactUs: "যোগাযোগ করুন",
      chatWhatsApp: "WhatsApp-এ সরাসরি কথা বলুন",
      viewSpecs: "স্পেসিফিকেশন দেখুন",
      viewAllMachines: "সব মডেল দেখুন",
      backToMachines: "পেছনে যান (সব মেশিন)",
      contactForDetails: "বিস্তারিত জানতে যোগাযোগ করুন",
      contactForPrice: "দামের জন্য যোগাযোগ করুন",
      contactForAvailability: "স্টক ও ডেলিভারি সময় জানতে যোগাযোগ করুন",
      complianceBadge: "রেজিস্টার্ড ইমপোর্টার ও লিগ্যাল কমপ্লায়েন্স",
      readMore: "বিস্তারিত পড়ুন",
      allCategories: "সকল ক্যাটাগরি",
      viewTradeLicense: "ট্রেড লাইসেন্স দেখুন",
      verifiedTradeLicense: "সরকারি নিবন্ধিত • ভেরিফায়েড ট্রেড লাইসেন্স",
    },
    header: {
      tagline: "আন্তর্জাতিক প্রস্তুতকারক থেকে সরাসরি সার্কুলার নিটিং মেশিন আমদানি ও টেকনিক্যাল সাপোর্ট",
      languageToggle: "EN",
      openMenu: "নেভিগেশন মেনু খুলুন",
      closeMenu: "নেভিগেশন মেনু বন্ধ করুন",
    },
    footer: {
      description:
        "বাংলাদেশের নিটওয়্যার ও টেক্সটাইল মিলের জন্য সরাসরি সার্কুলার নিটিং মেশিন আমদানি, অরিজিনাল স্পেয়ার পার্টস সরবরাহ এবং অভিজ্ঞ ইঞ্জিনিয়ারদের মাধ্যমে ফ্যাক্টরিতে অন-সাইট সার্ভিস।",
      complianceTitle: "বাণিজ্যিক আমদানি ও কমপ্লায়েন্স",
      binLabel: "BIN",
      ircLabel: "IRC",
      complianceNote: "সরাসরি প্রস্তুতকারকের নামে L/C খোলা, CFR চট্টগ্রাম শিপমেন্ট ও দ্রুত কাস্টমস ছাড়করণে পূর্ণ সহায়তা।",
      machineCategoriesTitle: "মেশিনের ক্যাটাগরি",
      companyNavTitle: "কোম্পানি ও সেবা",
      contactTitle: "যোগাযোগ ও তথ্য",
      rightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
      b2bTag: "টেক্সটাইল মিলের বিশ্বস্ত মেশিনারি পার্টনার",
      cfrTag: "CFR চট্টগ্রাম নির্ভরযোগ্য ডেলিভারি",
      whatsappText: "WhatsApp",
    },
    hero: {
      badge: "সরাসরি মেশিনারি আমদানিকারক • কোনো থার্ড-পার্টি বা মধ্যস্বত্বভোগী নেই",
      title: "বিশ্বমানের টেক্সটাইল মেশিনারি, এখন আপনার হাতের নাগালে।",
      subtitle:
        "ফ্যাক্টরি প্রাইসে স্বচ্ছ সোর্সিং, নির্ভরযোগ্য প্রি-শিপমেন্ট ইন্সপেকশন, নিরাপদ CFR চট্টগ্রাম শিপমেন্ট এবং আপনার কারখানায় সরাসরি ইনস্টলেশন ও ট্রায়াল রান।",
      primaryCta: "কোটেশন ও বিস্তারিত জানুন",
      whatsappCta: "WhatsApp-এ সরাসরি কথা বলুন",
      cfrBadge: "CFR চট্টগ্রাম নিরাপদ শিপমেন্ট",
      inspectionBadge: "SGS / Intertek প্রি-শিপমেন্ট ইন্সপেকশন",
      installBadge: "আপনার ফ্যাক্টরিতে ইনস্টলেশন ও কমিশনিং",
      imageTag: "হাই-স্পিড এক্সপোর্ট কোয়ালিটি সার্কুলার নিটিং মেশিন",
    },
    trustStrip: {
      binTitle: "BIN নিবন্ধিত বৈধ আমদানিকারক",
      ircTitle: "ভেরিফায়েড ইমপোর্ট রেজিস্ট্রেশন (IRC)",
      cfrTitle: "CFR চট্টগ্রাম বন্দরে নিরাপদ ডেলিভারি",
      inspectionTitle: "প্রি-শিপমেন্ট ইন্সপেকশন (SGS / BV / Intertek)",
      complianceSub: "বাংলাদেশ ব্যাংকের নিয়ম ও কাস্টমস বিধি মেনে শতভাগ নিরাপদ আমদানি",
    },
    categories: {
      badge: "মেশিন সিলেকশন",
      title: "আপনার মিলের ফ্যাব্রিক অনুযায়ী সঠিক মেশিন বেছে নিন",
      subtitle:
        "সিঙ্গেল জার্সি, ডাবল জার্সি, রিব কিংবা ইন্টারলক—রপ্তানিমুখী পোশাকের কাঙ্ক্ষিত GSM ও ফিনিশিং নিশ্চিতে তৈরি আধুনিক মেশিন।",
      viewAllBtn: "সব মডেল দেখুন",
      exploreBtn: "মডেল ও স্পেক দেখুন",
    },
    featured: {
      badge: "জনপ্রিয় মেশিনারি",
      title: "বাংলাদেশের কারখানায় সবচেয়ে বেশি ব্যবহৃত মডেলগুলো",
      subtitle: "সুতার কাউন্ট ও কাপড়ের ধরন অনুযায়ী সঠিক Gauge ও Cylinder সাইজে কাস্টমাইজ করে সরাসরি আমদানির সুবিধা।",
      quoteBtn: "কোটেশন চান",
      specsBtn: "সম্পূর্ণ স্পেসিফিকেশন দেখুন",
    },
    specLabels: {
      cylinderDiameter: "Cylinder Diameter (ইঞ্চি)",
      gauge: "Gauge (G)",
      feeders: "Feeder সংখ্যা",
      numberOfSystems: "সিস্টেম সংখ্যা (Number of Systems)",
      machineSpeed: "মেশিন স্পিড (RPM)",
      fabricType: "ফ্যাব্রিকের ধরন (Fabric Type)",
      productionCapacity: "প্রোডাকশন ক্যাপাসিটি",
      application: "অ্যাপ্লিকেশন / ব্যবহারের ক্ষেত্র",
      powerRequirement: "পাওয়ার রিকোয়ারমেন্ট (kW / HP)",
      dimensions: "ডাইমেনশন ও আকার",
      weight: "মেশিনের ওজন (কেজি)",
      origin: "Country of Origin (উৎপত্তিস্থল)",
      warranty: "ওয়ারেন্টি শর্তাবলী",
      availability: "প্রাপ্যতা ও ডেলিভারি সময়",
      price: "প্রাক্কলিত মূল্য (Estimated Price)",
      brand: "ব্র্যান্ড",
      manufacturer: "প্রস্তুতকারক (Manufacturer)",
      machineType: "মেশিনের ধরন",
      tableTitle: "টেকনিক্যাল স্পেসিফিকেশন",
      tableComplianceNote: "সঠিক তথ্যের নিশ্চয়তা: প্রস্তুতকারকের ক্যাটালগ অনুযায়ী যাচাই করা ছাড়া আমরা কোনো মনগড়া স্পেক উল্লেখ করি না। কোনো তথ্য আপডেট হতে থাকলে সরাসরি আমাদের সাথে কথা বলতে পারেন।",
      needCustomParams: "বিশেষ কোনো Gauge, Feeder বা কাস্টম সাইজ প্রয়োজন? আমাদের টেকনিক্যাল টিমের সাথে আলাপ করুন",
      contactForDetails: "বিস্তারিত জানতে যোগাযোগ করুন",
    },
    whyTasneem: {
      badge: "আমাদের বিশেষত্ব",
      title: "মেশিন নির্বাচন থেকে ফ্যাক্টরি প্রোডাকশন—সব ধাপে আমরা আপনার পাশে",
      subtitle:
        "সরাসরি প্রস্তুতকারক থেকে আমদানি করায় কোনো মধ্যস্বত্বভোগীর বাড়তি খরচ নেই; সাথে পাবেন অভিজ্ঞ ইঞ্জিনিয়ারদের টেকনিক্যাল ব্যাকআপ।",
      pillar1Title: "সরাসরি ফ্যাক্টরি সোর্সিং",
      pillar1Desc:
        "আন্তর্জাতিক প্রস্তুতকারক কারখানা থেকে সরাসরি সরবরাহ, তাই কোনো হিডেন চার্জ বা মধ্যস্বত্বভোগীর বাড়তি খরচ নেই।",
      pillar2Title: "জাহাজীকরণের আগে কোয়ালিটি চেক",
      pillar2Desc:
        "কন্টেইনারে তোলার আগেই SGS বা Intertek-এর মাধ্যমে মেকানিক্যাল অ্যালাইনমেন্ট ও রানিং পারফরম্যান্স যাচাই করে নেওয়া হয়।",
      pillar3Title: "CFR চট্টগ্রাম ও কাস্টমস সহায়তা",
      pillar3Desc:
        "চট্টগ্রাম বন্দর পর্যন্ত নিরাপদ শিপমেন্ট, ব্যাংক L/C ডকুমেন্টেশন তৈরি এবং কাস্টমস ক্লিয়ারেন্সে সার্বক্ষণিক সাপোর্ট।",
      pillar4Title: "অন-সাইট সেটআপ ও টেকনিক্যাল সাপোর্ট",
      pillar4Desc:
        "আপনার মিলে মেশিন স্থাপন, ট্রায়াল নিটিং, টেকনিশিয়ানদের ট্রেনিং এবং প্রয়োজনীয় অরিজিনাল স্পেয়ার পার্টসের দ্রুত সরবরাহ।",
    },
    sourcing: {
      badge: "আমদানির সহজ ধাপ",
      title: "সহজ ৩টি ধাপে বিদেশ থেকে আপনার মিলে মেশিনারি আমদানি",
      subtitle: "প্রয়োজনীয় স্পেসিফিকেশন নির্ধারণ থেকে শুরু করে চট্টগ্রাম পোর্ট হয়ে আপনার ফ্যাক্টরি ফ্লোরে চালু করা পর্যন্ত।",
      step1Num: "০১",
      step1Title: "প্যারামিটার বাছাই ও Proforma Invoice",
      step1Desc:
        "আপনার কাপড়ের ধরন অনুযায়ী Gauge, Cylinder ও Feeder সংখ্যা ঠিক করে সরাসরি L/C খোলার জন্য অফিশিয়াল Proforma Invoice (PI) বুঝে নিন।",
      step2Num: "০২",
      step2Title: "ফ্যাক্টরিতে মেশিন তৈরি ও ট্রায়াল",
      step2Desc:
        "প্রস্তুতকারক কারখানায় আপনার স্পেক অনুযায়ী মেশিন তৈরি শেষে নিখুঁত মেকানিক্যাল ইন্সপেকশন ও ট্রায়াল নিটিং সম্পন্ন করা হয়।",
      step3Num: "০৩",
      step3Title: "চট্টগ্রামে পৌঁছানো ও ফ্যাক্টরিতে কমিশনিং",
      step3Desc:
        "চট্টগ্রাম বন্দরে কন্টেইনার আসার পর কাস্টমস ক্লিয়ারেন্স সম্পন্ন করে সরাসরি আপনার মিলে ডেলিভারি ও মেশিন চালু করা হয়।",
    },
    installation: {
      badge: "টেকনিক্যাল সাপোর্ট",
      title: "কারখানায় মেশিন স্থাপন, ট্রায়াল রান ও নিয়মিত টেকনিক্যাল সেবা",
      subtitle: "উৎপাদন যাতে এক মুহূর্তের জন্যও ব্যাহত না হয়, সেজন্য রয়েছে আমাদের দক্ষ টেকনিশিয়ান ও ইঞ্জিনিয়ারদের টিম।",
      point1Title: "ফ্যাক্টরিতে মেকানিক্যাল অ্যাসেম্বলি",
      point1Desc: "ফ্লোর লেভেলিং, ফ্রেম অ্যাংকরিং, Cylinder ও Cam বক্স ফিটিংসহ স্বয়ংক্রিয় লুব্রিকেশন লাইন নিখুঁতভাবে সেটআপ।",
      point2Title: "ট্রায়াল নিটিং ও ফ্যাব্রিক কোয়ালিটি চেক",
      point2Desc: "আপনার চাহিদামতো কাপড়ের GSM, সুতার টান ও লুপ স্ট্রাকচার নিশ্চিত করতে ফ্লোরে সরাসরি স্যাম্পল ফ্যাব্রিক তৈরি।",
      point3Title: "অপারেটর ও মাস্টারদের হ্যান্ডস-অন ট্রেনিং",
      point3Desc: "আপনার ফ্লোরের কর্মীদের স্পিড কন্ট্রোল, Cam অ্যাডজাস্টমেন্ট এবং দৈনন্দিন মেইনটেন্যান্স বিষয়ে হাতে-কলমে প্রশিক্ষণ।",
      point4Title: "অরিজিনাল স্পেয়ার পার্টস ও এক্সেসরিজ",
      point4Desc: "জরুরি প্রয়োজনে অরিজিনাল Needle, Sinker, Cam, Feeder ও Creel এক্সেসরিজ আমাদের স্থানীয় স্টক থেকে দ্রুত পাওয়ার নিশ্চয়তা।",
    },
    industries: {
      badge: "ইন্ডাস্ট্রিয়াল অ্যাপ্লিকেশন",
      title: "বাংলাদেশের কোর টেক্সটাইল খাতের নির্ভরযোগ্য পার্টনার",
      subtitle: "এক্সপোর্ট নিটওয়্যার, ডোমেস্টিক অ্যাপারেল এবং হাই-ডেনসিটি ফ্যাব্রিকের জন্য বিশেষভাবে কনফিগার করা প্রেসিশন মেশিনারি।",
    },
    faq: {
      badge: "সাধারণ প্রশ্নোত্তর",
      title: "কমার্শিয়াল ও টেকনিক্যাল সাধারণ জিজ্ঞাসা",
      subtitle: "মেশিন আমদানি ও টেকনিক্যাল বিষয়ে মিল মালিক ও প্রকিউরমেন্ট টিম সচরাচর যা জানতে চান।",
      q1: "তাসনীম বিদেশ থেকে মেশিনারি প্রকিউরমেন্ট কীভাবে পরিচালনা করে?",
      a1: "আমরা সরাসরি আন্তর্জাতিক প্রস্তুতকারকের সাথে মিল মালিকদের যুক্ত করে দিই। আপনার মিলের প্রয়োজন অনুযায়ী সঠিক স্পেসিফিকেশন নির্বাচন, L/C খোলার জন্য অফিশিয়াল Proforma Invoice তৈরি, জাহাজীকরণের আগে প্রি-শিপমেন্ট ইন্সপেকশন এবং দেশে আসার পর ফ্যাক্টরিতে ইনস্টলেশন ও ট্রায়াল রান—সব দায়িত্ব আমরা নিই।",
      q2: "বাংলাদেশে ডেলিভারির জন্য কোন শিপিং টার্মস প্রযোজ্য?",
      a2: "আমাদের কোটেশন সাধারণত CFR চট্টগ্রাম (Cost and Freight) ভিত্তিতে হয়ে থাকে। কন্টেইনার জাহাজে করে মেশিন চট্টগ্রাম বন্দরে পৌঁছায় এবং কাস্টমস ক্লিয়ারেন্সের জন্য প্রয়োজনীয় সব শিপিং ডকুমেন্টস আমরা সময়মতো বুঝিয়ে দিই।",
      q3: "আপনারা কি থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন (PSI) ব্যবস্থা করতে পারেন?",
      a3: "অবশ্যই। জাহাজে তোলার আগেই SGS, Intertek কিংবা Bureau Veritas-এর মতো আন্তর্জাতিক সংস্থার মাধ্যমে মেশিনের পার্টস, ফিডার টাইমিং ও রানিং সক্ষমতা নিখুঁতভাবে পরীক্ষা করিয়ে রিপোর্ট প্রদান করা হয়।",
      q4: "আপনারা কি বাংলাদেশে অন-সাইট ইনস্টলেশন ও টেকনিশিয়ান কমিশনিং সুবিধা দেন?",
      a4: "হ্যাঁ, বন্দর থেকে খালাসের পর আমাদের নিজস্ব টেকনিক্যাল টিম আপনার কারখানায় উপস্থিত হয়ে সম্পূর্ণ মেকানিক্যাল ফিটিংস, ওয়্যারিং, টেস্ট নিটিং এবং আপনার ফ্লোর অপারেটরদের প্রয়োজনীয় ট্রেনিং সম্পন্ন করে।",
      q5: "ওয়েবসাইটে অপ্রমাণিত টেকনিক্যাল স্পেসিফিকেশন কীভাবে হ্যান্ডেল করা হয়?",
      a5: "আমরা তথ্যের স্বচ্ছতায় বিশ্বাসী। প্রস্তুতকারকের ক্যাটালগে নিশ্চিত হওয়া ছাড়া আমরা কোনো মনগড়া স্পেক দিই না। কোনো নির্দিষ্ট প্যারামিটার জানতে চাইলে আমাদের সাথে সরাসরি যোগাযোগ করলেই আমরা সঠিক ডাটা জানিয়ে দিই।",
      q6: "অফিশিয়াল মেশিন প্রাইজ কোটেশন কীভাবে রিকোয়েস্ট করব?",
      a6: "মেশিন পেজের 'কোটেশন রিকোয়েস্ট' বাটনে ক্লিক করে আপনার কাঙ্ক্ষিত Cylinder, Gauge ও Feeder সংখ্যা উল্লেখ করে ফর্ম সাবমিট করুন। অথবা আরো দ্রুত আলোচনার জন্য আমাদের WhatsApp-এ মেসেজ বা কল দিতে পারেন।",
    },
    quoteBanner: {
      title: "আপনার মিলের উৎপাদন ক্ষমতা বাড়াতে সঠিক মেশিন খুঁজছেন?",
      subtitle:
        "সরাসরি ফ্যাক্টরি প্রাইস, নিরাপদ CFR চট্টগ্রাম শিপমেন্ট এবং আপনার মিলে ইনস্টলেশন সাপোর্ট পেতে আজই আমাদের সাথে কথা বলুন।",
      ctaBtn: "কোটেশনের জন্য কথা বলুন",
      whatsappBtn: "WhatsApp-এ কথা বলুন",
    },
    quoteForm: {
      title: "মেশিন কোটেশন রিকোয়েস্ট ফরম",
      subtitle:
        "আপনার মিলের প্রয়োজনীয় স্পেসিফিকেশন নিচে উল্লেখ করুন। আমাদের কমার্শিয়াল টিম বিস্তারিত CFR চট্টগ্রাম প্রপোজাল নিয়ে দ্রুত আপনার সাথে যোগাযোগ করবে।",
      nameLabel: "আপনার নাম",
      companyLabel: "মিল / ফ্যাক্টরির নাম",
      phoneLabel: "মোবাইল / WhatsApp নম্বর",
      emailLabel: "ইমেইল অ্যাড্রেস",
      categoryLabel: "মেশিনের ক্যাটাগরি",
      gaugeLabel: "প্রয়োজনীয় Gauge (যেমন: 24G, 28G)",
      cylinderLabel: "Cylinder সাইজ (যেমন: 30\", 34\")",
      feederLabel: "Feeder সংখ্যা",
      quantityLabel: "মেশিনের সংখ্যা (ইউনিট)",
      notesLabel: "কাঙ্ক্ষিত ফ্যাব্রিক ও অন্যান্য চাহিদা (নোট)",
      submitBtn: "রিকোয়েস্ট পাঠান",
      submittingBtn: "পাঠানো হচ্ছে...",
      successMessage: "ধন্যবাদ! আপনার তথ্য পেয়েছি। খুব দ্রুত আমাদের টেকনিক্যাল টিম আপনার সাথে ফোনে বা WhatsApp-এ যোগাযোগ করবে।",
    },
    seo: {
      metaTitle: "তাসনীম নিট ইন্ডাস্ট্রি | সরাসরি সার্কুলার নিটিং মেশিন আমদানিকারক বাংলাদেশ",
      metaDescription:
        "বাংলাদেশে বিশ্বমানের সার্কুলার নিটিং মেশিন আমদানির নির্ভরযোগ্য প্রতিষ্ঠান। ফ্যাক্টরি প্রাইসে Double Jersey, Single Jersey, Interlock ও Jacquard মেশিন, নিরাপদ CFR চট্টগ্রাম শিপমেন্ট এবং অন-সাইট সার্ভিস।",
      ogTitle: "তাসনীম নিট ইন্ডাস্ট্রি | ইন্ডাস্ট্রিয়াল সার্কুলার নিটিং মেশিন সোর্সিং",
      ogDescription:
        "বাংলাদেশের টেক্সটাইল ও নিটওয়্যার মিলের জন্য সরাসরি বিদেশ থেকে সার্কুলার নিটিং মেশিন আমদানি। CFR চট্টগ্রাম ডেলিভারি, প্রি-শিপমেন্ট ইন্সপেকশন এবং লোকাল ফ্যাক্টরি কমিশনিং।",
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
