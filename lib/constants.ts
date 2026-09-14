// Client-Confirmed Facts & Final Decisions (Locked)
// Business: Tasneem Knitting Industry — Industrial Machinery Importer & Supplier
export const COMPANY_INFO = {
  name: "Tasneem Knitting Industry",
  legalName: "TASNEEM KNITTING INDUSTRY",
  owner: "MD MAMUNUR RASHID",
  contactPerson: "Mr Hasan",
  tagline: "Industrial Circular Knitting, Dyeing, Shearing & Textile Machinery Importer",
  description:
    "Direct importer and supplier of circular knitting machines, dyeing machines, shearing machines, finishing equipment, and textile/garment machinery across Bangladesh.",

  // Primary Operating & Showroom Address (Client confirmed exact wording)
  address: "Plot-594, Industrial Park, Chan Nagor, নতুন রাস্তার পশ্চিম পার্শ্বে, BSCIC, 4No New Road, Narayanganj-1421, Bangladesh",
  addressShort: "BSCIC Industrial Park, Narayanganj, Bangladesh",
  addressBn: "প্লট-৫৯৪, ইন্ডাস্ট্রিয়াল পার্ক, চান নগর, নতুন রাস্তার পশ্চিম পার্শ্বে, বিসিক, ৪নং নিউ রোড, নারায়ণগঞ্জ-১৪২১, বাংলাদেশ",

  // Legal Registered Address (per Trade License / VAT registration — kept separate, not merged)
  registeredAddress: "24/3, Aukpara, Ashulia, Savar, Dhaka, Bangladesh",
  registeredAddressBn: "২৪/৩, আউকপাড়া, আশুলিয়া, সাভার, ঢাকা, বাংলাদেশ",

  // Confirmed Contact Details (3 Reconciled Numbers)
  hotline: "01887683333", // Primary Listed Hotline (General inquiries)
  phone: "01887683333", // Primary Phone alias
  directContact: "+880 1884-611888", // Direct Sales Contact (Mr Hasan)
  phoneAlt: "+880 1884-611888", // Secondary phone alias
  whatsapp: "+8801711110516", // WhatsApp specifically
  whatsappFormatted: "+880 1711-110516",
  email: "sales@tasneemknitindustry.com", // Company domain quote notification inbox
  domain: "https://tasneemknitindustry.com",
  businessHours: "Saturday – Thursday: 9:00 AM – 7:00 PM (BST)",

  // Confirmed Legal & Compliance Credentials
  registration: {
    bin: "006673859-0403",
    etin: "626339507948",
    tradeLicense: "20252617218016419",
    irc: "Verified (Imports Category)",
    ownershipType: "Proprietorship",
    majorActivity: "Retail/Wholesale Trading, Imports",
    validity: "Through 30.06.2026 (FY 2025-2026)",
    yearEstablished: "Contact for details", // Unconfirmed: left as contact for details per client decision
    status: "Direct Importer / Registered Commercial Entity",
  },

  // Direct convenience aliases
  get operatingAddress() {
    return this.address;
  },
  get bin() {
    return this.registration.bin;
  },
  get etin() {
    return this.registration.etin;
  },
  get tradeLicense() {
    return this.registration.tradeLicense;
  },
  get tradeLicenseValidity() {
    return this.registration.validity;
  },
};

export const NAV_LINKS = [
  { name: "Machines", href: "/machines" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Industries", href: "/industries" },
  { name: "Projects", href: "/projects" },
  { name: "Resources", href: "/resources" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];
