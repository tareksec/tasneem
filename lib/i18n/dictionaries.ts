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
      services: "সেবাসমূহ",
      about: "আমাদের পরিচিতি",
      howItWorks: "আমদানি প্রক্রিয়া",
      industries: "শিল্প খাতসমূহ",
      projects: "প্রজেক্ট",
      resources: "টেকনিক্যাল গাইড",
      faq: "সাধারণ জিজ্ঞাসা",
      contact: "যোগাযোগ",
      requestQuote: "কোটেশন রিকোয়েস্ট",
    },
    common: {
      requestQuote: "কোটেশন রিকোয়েস্ট করুন",
      contactUs: "যোগাযোগ করুন",
      chatWhatsApp: "WhatsApp-এ সরাসরি আলোচনা",
      viewSpecs: "স্পেসিফিকেশন দেখুন",
      viewAllMachines: "সকল মেশিনারি দেখুন",
      backToMachines: "মেশিন ক্যাটালগে ফিরুন",
      contactForDetails: "বিস্তারিত তথ্যের জন্য যোগাযোগ করুন",
      contactForPrice: "মূল্যের জন্য যোগাযোগ করুন",
      contactForAvailability: "স্টক ও প্রাপ্যতা জানতে যোগাযোগ করুন",
      complianceBadge: "বাণিজ্যিক আমদানি ও ট্রেড কমপ্লায়েন্স",
      readMore: "বিস্তারিত পড়ুন",
      allCategories: "সকল ক্যাটাগরি",
      viewTradeLicense: "ট্রেড লাইসেন্স দেখুন",
      verifiedTradeLicense: "সরকারি নিবন্ধিত • ভেরিফায়েড ট্রেড লাইসেন্স",
    },
    header: {
      tagline: "ইন্ডাস্ট্রিয়াল সার্কুলার নিটিং মেশিন সরাসরি আমদানি ও সোর্সিং বিশেষজ্ঞ",
      languageToggle: "EN",
      openMenu: "নেভিগেশন মেনু খুলুন",
      closeMenu: "নেভিগেশন মেনু বন্ধ করুন",
    },
    footer: {
      description:
        "বাংলাদেশের টেক্সটাইল ও রপ্তানিমুখী পোশাক কারখানার জন্য সার্কুলার নিটিং মেশিনারি, জেনুইন স্পেয়ার পার্টস এবং অন-সাইট টেকনিক্যাল সার্ভিসের বিশ্বস্ত আমদানিকারক ও সরবরাহকারী।",
      complianceTitle: "বাণিজ্যিক আমদানি ও কমপ্লায়েন্স",
      binLabel: "BIN",
      ircLabel: "IRC",
      complianceNote: "সরাসরি ফ্যাক্টরি L/C খোলা এবং CFR চট্টগ্রাম সমুদ্র পরিবহন ও কাস্টমস সহায়তা।",
      machineCategoriesTitle: "মেশিনারি ক্যাটাগরি",
      companyNavTitle: "কোম্পানি ও সার্ভিসেস",
      contactTitle: "যোগাযোগ ও ইনকোয়ারি",
      rightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
      b2bTag: "B2B ইন্ডাস্ট্রিয়াল মেশিনারি সোর্সিং",
      cfrTag: "CFR চট্টগ্রাম পোর্ট ডেলিভারি",
      whatsappText: "WhatsApp",
    },
    hero: {
      badge: "সরাসরি ইন্ডাস্ট্রিয়াল মেশিনারি আমদানিকারক • বাংলাদেশ টেক্সটাইল সেক্টর",
      title: "ইন্ডাস্ট্রিয়াল সার্কুলার নিটিং মেশিন সরাসরি আন্তর্জাতিক প্রস্তুতকারক থেকে আমদানি",
      subtitle:
        "সরাসরি ফ্যাক্টরি প্রাইস, সার্টিফায়েড প্রি-শিপমেন্ট ইন্সপেকশন, CFR চট্টগ্রাম ডেলিভারি এবং আপনার মিলে লোকাল কমিশনিং।",
      primaryCta: "কাস্টম মেশিন কোটেশন রিকোয়েস্ট করুন",
      whatsappCta: "WhatsApp-এ সরাসরি কথা বলুন",
      cfrBadge: "CFR চট্টগ্রাম সি-ফ্রেইট শিপমেন্ট",
      inspectionBadge: "থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন",
      installBadge: "কারখানায় ইনস্টলেশন ও অন-সাইট কমিশনিং",
      imageTag: "হাই-প্রিসিশন সার্কুলার নিটিং আর্কিটেকচার",
    },
    trustStrip: {
      binTitle: "BIN নিবন্ধিত আমদানিকারক",
      ircTitle: "ইমপোর্ট রেজিস্ট্রেশন সার্টিফিকেট (IRC)",
      cfrTitle: "CFR চট্টগ্রাম সমুদ্র বন্দর সরাসরি ডেলিভারি",
      inspectionTitle: "প্রি-শিপমেন্ট ইন্সপেকশন (SGS / BV / Intertek)",
      complianceSub: "বাংলাদেশের টেক্সটাইল খাতের জন্য শতভাগ কমার্শিয়াল কমপ্লায়েন্স",
    },
    categories: {
      badge: "মেশিনারি ক্যাটাগরি",
      title: "উচ্চ সক্ষমতার সার্কুলার নিটিং ক্যাটাগরি",
      subtitle:
        "বাংলাদেশের রপ্তানিমুখী কম্পোজিট নিট মিলের উচ্চ উৎপাদনশীলতার জন্য বিশেষভাবে কনফিগার করা সার্কুলার নিটিং মেশিনারি।",
      viewAllBtn: "সকল মেশিন মডেল দেখুন",
      exploreBtn: "ক্যাটাগরি এক্সপ্লোর করুন",
    },
    featured: {
      badge: "নির্বাচিত ইকুইপমেন্ট",
      title: "সর্বাধিক চাহিদাসম্পন্ন সার্কুলার নিটিং মডেলসমূহ",
      subtitle: "আপনার কারখানার চাহিদা অনুযায়ী কনফিগারেশন এবং কমার্শিয়াল প্রকিউরমেন্টের জন্য প্রস্তুত নির্ভরযোগ্য আন্তর্জাতিক মেশিনারি।",
      quoteBtn: "কোটেশন রিকোয়েস্ট",
      specsBtn: "পূর্ণাঙ্গ স্পেসিফিকেশন দেখুন",
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
      tableTitle: "টেকনিক্যাল স্পেসিফিকেশন টেবিল",
      tableComplianceNote: "কঠোর ডেটা কমপ্লায়েন্স: প্রস্তুতকারক কর্তৃক শতভাগ নিশ্চিত না হওয়া পর্যন্ত কোনো স্পেক অনুমান করে দেওয়া হয় না—সেক্ষেত্রে 'বিস্তারিত তথ্যের জন্য যোগাযোগ করুন' প্রদর্শিত হয়।",
      needCustomParams: "কাস্টম প্যারামিটার বা বিশেষ কনফিগারেশন প্রয়োজন? আমাদের ইঞ্জিনিয়ারিং টিমের সাথে যোগাযোগ করুন",
      contactForDetails: "বিস্তারিত তথ্যের জন্য যোগাযোগ করুন",
    },
    whyTasneem: {
      badge: "কেন তাসনীম",
      title: "বাংলাদেশের নিটওয়্যার কারখানায় সর্বোচ্চ উৎপাদনের নির্ভরযোগ্য অংশীদার",
      subtitle:
        "কোনো মধ্যস্থতাকারী কমিশন ছাড়া সরাসরি ফ্যাক্টরি প্রাইস এবং শুরু থেকে শেষ পর্যন্ত পূর্ণাঙ্গ কমার্শিয়াল ও ইঞ্জিনিয়ারিং সাপোর্ট।",
      pillar1Title: "সরাসরি আন্তর্জাতিক আমদানিকারক",
      pillar1Desc:
        "সরাসরি প্রস্তুতকারক ফ্যাক্টরি থেকে স্বচ্ছ সোর্সিং—কোনো থার্ড-পার্টি বা মধ্যস্বত্বভোগীর বাড়তি কমিশন ছাড়া।",
      pillar2Title: "থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন",
      pillar2Desc:
        "কন্টেইনারে লোড করার আগে স্বাধীন SGS বা Intertek ইন্সপেকশনের মাধ্যমে নিখুঁত মেকানিক্যাল অ্যালাইনমেন্ট নিশ্চিতকরণ।",
      pillar3Title: "CFR চট্টগ্রাম সমুদ্র ডেলিভারি",
      pillar3Desc:
        "চট্টগ্রাম বন্দর পর্যন্ত কন্টেইনারে নিরাপদ সমুদ্র শিপমেন্টসহ সরাসরি L/C খোলা এবং কাস্টমস ক্লিয়ারেন্সের পূর্ণাঙ্গ সহায়তা।",
      pillar4Title: "লোকাল ইনস্টলেশন ও বিক্রয়োত্তর সেবা",
      pillar4Desc:
        "সরাসরি আপনার মিলে মেকানিক্যাল অ্যাসেম্বলি, টেস্ট নিটিং, অপারেটর ট্রেনিং এবং স্থানীয় স্পেয়ার পার্টসের সার্বক্ষণিক নিশ্চয়তা।",
    },
    sourcing: {
      badge: "স্বচ্ছ সোর্সিং প্রক্রিয়া",
      title: "৩ ধাপে বিদেশ থেকে ইন্ডাস্ট্রিয়াল মেশিনারি সোর্সিং ওয়ার্কফ্লো",
      subtitle: "টেকনিক্যাল স্পেসিফিকেশন নির্ধারণ থেকে শুরু করে CFR চট্টগ্রাম কাস্টমস ও কারখানায় অন-সাইট ডেলিভারি।",
      step1Num: "০১",
      step1Title: "স্পেসিফিকেশন ও কমার্শিয়াল কোটেশন",
      step1Desc:
        "আপনার লক্ষ্য অনুযায়ী Cylinder, Gauge ও Feeder প্যারামিটার স্পেসিফাই করে সরাসরি L/C খোলার জন্য অফিশিয়াল CFR চট্টগ্রাম Proforma Invoice বুঝে নিন।",
      step2Num: "০২",
      step2Title: "ফ্যাক্টরি বিল্ড ও প্রি-শিপমেন্ট অডিট",
      step2Desc:
        "অর্ডার অনুযায়ী মেশিন তৈরির পর সমুদ্রযাত্রার প্যাকিং করার আগে নিখুঁত মেকানিক্যাল ইন্সপেকশন ও টেস্ট নিটিং সম্পন্ন করা হয়।",
      step3Num: "০৩",
      step3Title: "CFR চট্টগ্রাম পোর্ট ডেলিভারি ও সেটআপ",
      step3Desc:
        "চট্টগ্রাম বন্দরে কন্টেইনারে মেশিন পৌঁছানোর পর খালাস সম্পন্ন করে সরাসরি আপনার মিলে স্থাপন ও অন-সাইট কমিশনিং।",
    },
    installation: {
      badge: "ইঞ্জিনিয়ারিং সাপোর্ট",
      title: "লোকাল ফ্যাক্টরি ইনস্টলেশন, কমিশনিং ও বিক্রয়োত্তর সেবা",
      subtitle: "আপনার প্রোডাকশন ফ্লোরে জিরো ডাউনটাইম নিশ্চিত করতে আমাদের সার্বক্ষণিক নিবেদিত টেকনিশিয়ান টিম।",
      point1Title: "অন-সাইট মেকানিক্যাল অ্যাসেম্বলি",
      point1Desc: "প্রিসিশন লেভেলিং, ফ্রেম অ্যাংকরিং, Cylinder ফিটিং এবং অটোমেটিক অয়েল লুব্রিকেশন লাইন অ্যাসেম্বলি।",
      point2Title: "টেস্ট নিটিং ও ফ্যাব্রিক ভ্যালিডেশন",
      point2Desc: "আপনার নির্ধারিত ফ্যাব্রিক টেনশন, GSM ও লুপ ডেনসিটি স্পেক অনুযায়ী স্যাম্পল রান ও কোয়ালিটি ভেরিফিকেশন।",
      point3Title: "অপারেটর ও টেকনিশিয়ান ট্রেনিং",
      point3Desc: "আপনার ফ্লোরের অপারেটরদের স্পিড টিউনিং, Cam অ্যাডজাস্টমেন্ট ও প্রাত্যহিক মেইনটেন্যান্সের ওপর হ্যান্ডস-অন ট্রেনিং।",
      point4Title: "জেনুইন স্পেয়ার পার্টস ইনভেন্টরি",
      point4Desc: "প্রয়োজনীয় অরিজিনাল Needle, Sinker, Cam, Feeder ও Yarn Creel এক্সেসরিজের স্থানীয় স্টক ও তাৎক্ষণিক সরবরাহ।",
    },
    industries: {
      badge: "ইন্ডাস্ট্রিয়াল অ্যাপ্লিকেশন",
      title: "বাংলাদেশের কোর টেক্সটাইল খাতের নির্ভরযোগ্য পার্টনার",
      subtitle: "এক্সপোর্ট নিটওয়্যার, ডোমেস্টিক অ্যাপারেল এবং হাই-ডেনসিটি ফ্যাব্রিকের জন্য বিশেষভাবে কনফিগার করা প্রেসিশন মেশিনারি।",
    },
    faq: {
      badge: "সাধারণ প্রশ্নোত্তর",
      title: "কমার্শিয়াল ও টেকনিক্যাল সাধারণ জিজ্ঞাসা",
      subtitle: "বাংলাদেশের টেক্সটাইল মিল মালিক ও প্রকিউরমেন্ট ম্যানেজারদের বহুল জিজ্ঞাসিত প্রশ্নসমূহ।",
      q1: "তাসনীম বিদেশ থেকে মেশিনারি প্রকিউরমেন্ট কীভাবে পরিচালনা করে?",
      a1: "আমরা মিল মালিকদের সরাসরি সার্টিফায়েড আন্তর্জাতিক প্রস্তুতকারকদের সাথে যুক্ত করি। টেকনিক্যাল স্পেসিফিকেশন নির্ধারণে সহায়তা, সরাসরি L/C খোলার জন্য অফিশিয়াল CFR চট্টগ্রাম Proforma Invoice প্রদান, থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন সমন্বয় এবং স্থানীয় কারখানায় সরাসরি ইনস্টলেশন ও কমিশনিং সম্পন্ন করি।",
      q2: "বাংলাদেশে ডেলিভারির জন্য কোন শিপিং টার্মস প্রযোজ্য?",
      a2: "আমাদের স্ট্যান্ডার্ড কমার্শিয়াল কোটেশন CFR চট্টগ্রাম (Cost and Freight) ভিত্তিতে নির্ধারিত। কন্টেইনার ভেসেলের মাধ্যমে চট্টগ্রাম সমুদ্র বন্দরে পণ্য পাঠানো হয় এবং দ্রুত কাস্টমস ক্লিয়ারেন্সের জন্য সম্পূর্ণ ডকুমেন্টেশন সরবরাহ করা হয়।",
      q3: "আপনারা কি থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন (PSI) ব্যবস্থা করতে পারেন?",
      a3: "হ্যাঁ। এক্সপোর্ট কন্টেইনারে প্যাক করার আগে আমরা SGS, Intertek বা Bureau Veritas-এর মতো শীর্ষস্থানীয় আন্তর্জাতিক সংস্থার মাধ্যমে মেকানিক্যাল টলারেন্স, ফিডার সিঙ্ক্রোনাইজেশন ও যন্ত্রাংশের সঠিকতা যাচাইয়ের ইন্সপেকশন সমন্বয় করি।",
      q4: "আপনারা কি বাংলাদেশে অন-সাইট ইনস্টলেশন ও টেকনিশিয়ান কমিশনিং সুবিধা দেন?",
      a4: "হ্যাঁ। আমাদের নিজস্ব ইঞ্জিনিয়ারিং টিম সরাসরি আপনার কারখানায় সম্পূর্ণ মেকানিক্যাল অ্যাসেম্বলি, ইলেকট্রিক্যাল ওয়্যারিং, টেস্ট নিটিং এবং ফ্লোর অপারেটরদের হ্যান্ডস-অন ট্রেনিং প্রদান করে।",
      q5: "ওয়েবসাইটে অপ্রমাণিত টেকনিক্যাল স্পেসিফিকেশন কীভাবে হ্যান্ডেল করা হয়?",
      a5: "আমাদের কঠোর কমপ্লায়েন্স নীতি অনুযায়ী, প্রস্তুতকারক কর্তৃক চূড়ান্তভাবে নিশ্চিত না হওয়া পর্যন্ত কোনো অনুমিত তথ্য দেওয়া হয় না—সেক্ষেত্রে 'বিস্তারিত তথ্যের জন্য যোগাযোগ করুন' প্রদর্শিত হয়। আমরা কোনো মনগড়া মার্কেটিং স্পেসিফিকেশন দিই না।",
      q6: "অফিশিয়াল মেশিন প্রাইজ কোটেশন কীভাবে রিকোয়েস্ট করব?",
      a6: "যেকোনো মেশিনের পেজে 'কোটেশন রিকোয়েস্ট' বাটনে ক্লিক করে আপনার প্রয়োজনীয় Cylinder, Gauge ও Feeder প্যারামিটার জানাতে পারেন, অথবা সরাসরি আমাদের টিমের সাথে WhatsApp-এ যোগাযোগ করতে পারেন।",
    },
    quoteBanner: {
      title: "আপনার মিলের সার্কুলার নিটিং ক্যাপাসিটি বাড়াতে প্রস্তুত?",
      subtitle:
        "যাচাইকৃত আন্তর্জাতিক মেশিনারি স্পেসিফিকেশন, CFR চট্টগ্রাম শিপিং প্রাক্কলন এবং কারখানায় ফুল ইনস্টলেশন সাপোর্ট পেতে আজই যোগাযোগ করুন।",
      ctaBtn: "মেশিন কোটেশন রিকোয়েস্ট করুন",
      whatsappBtn: "WhatsApp-এ সরাসরি ইনকোয়ারি",
    },
    quoteForm: {
      title: "ইন্ডাস্ট্রিয়াল মেশিনারি কোটেশন রিকোয়েস্ট করুন",
      subtitle:
        "আপনার প্রয়োজনীয় টেকনিক্যাল প্যারামিটার নিচে পূরণ করুন। আমাদের কমার্শিয়াল স্পেশালিস্ট একটি পূর্ণাঙ্গ CFR চট্টগ্রাম প্রপোজাল প্রস্তুত করে যোগাযোগ করবেন।",
      nameLabel: "যোগাযোগকারীর নাম (Contact Name)",
      companyLabel: "মিল / কোম্পানির নাম (Mill / Company Name)",
      phoneLabel: "মোবাইল / WhatsApp নম্বর",
      emailLabel: "ইমেইল অ্যাড্রেস",
      categoryLabel: "মেশিন ক্যাটাগরি",
      gaugeLabel: "প্রয়োজনীয় Gauge (উদাঃ 24G, 28G)",
      cylinderLabel: "Cylinder Diameter (উদাঃ 30\", 34\")",
      feederLabel: "Feeder সংখ্যা (Feeder Count)",
      quantityLabel: "মেশিনের পরিমাণ (Quantity)",
      notesLabel: "প্রোডাকশন টার্গেট ও টেকনিক্যাল নোট",
      submitBtn: "কোটেশন রিকোয়েস্ট সাবমিট করুন",
      submittingBtn: "সাবমিট হচ্ছে...",
      successMessage: "ধন্যবাদ! আপনার কোটেশন রিকোয়েস্টটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের মেশিনারি স্পেশালিস্ট অতি দ্রুত আপনার সাথে যোগাযোগ করবেন।",
    },
    seo: {
      metaTitle: "তাসনীম নিট ইন্ডাস্ট্রি | ইন্ডাস্ট্রিয়াল সার্কুলার নিটিং মেশিন আমদানিকারক বাংলাদেশ",
      metaDescription:
        "বাংলাদেশে ইন্ডাস্ট্রিয়াল সার্কুলার নিটিং মেশিনের সরাসরি আমদানিকারক। Double Jersey, Single Jersey, Interlock, Jacquard ও Terry মেশিন। প্রি-শিপমেন্ট ইন্সপেকশন, CFR চট্টগ্রাম ডেলিভারি এবং কারখানায় অন-সাইট কমিশন সাপোর্ট।",
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
