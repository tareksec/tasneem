import { COMPANY_INFO } from "@/lib/constants";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.domain,
    logo: `${COMPANY_INFO.domain}/logo/nave-var.png`,
    description: COMPANY_INFO.description,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    sameAs: [
      COMPANY_INFO.facebook,
    ],
    vatID: COMPANY_INFO.registration.bin,
    taxID: COMPANY_INFO.registration.etin,
    founder: {
      "@type": "Person",
      name: COMPANY_INFO.owner,
    },
    // Corporate Head Office Address
    address: {
      "@type": "PostalAddress",
      streetAddress: "House # 38 (Flat-1A), Road # 5/A, Sector-5, Uttara",
      addressLocality: "Uttara, Dhaka",
      addressRegion: "Dhaka Division",
      postalCode: "1230",
      addressCountry: "BD",
    },
    department: [
      {
        "@type": "LocalBusiness",
        name: "Tasneem Knitting Industry - Machinery Showroom & Hub",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot-594, Road No. 4, BSCIC Industrial Park, Chan Nagor, Shashongaon, Enayetnagar, Fatullah",
          addressLocality: "Fatullah, Narayanganj",
          addressRegion: "Dhaka Division",
          postalCode: "1421",
          addressCountry: "BD",
        },
        telephone: COMPANY_INFO.phone,
      },
      {
        "@type": "Organization",
        name: "Shaoxing Nawar International Import and Export Co., Ltd. (China Office)",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Room 1213, Building 2, Shaoxing Textile Trade Center, 2998 Jinkeqiao Avenue, Anchang Street, Keqiao District",
          addressLocality: "Shaoxing",
          addressRegion: "Zhejiang Province",
          addressCountry: "CN",
        },
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY_INFO.phone,
        contactType: "Sales & Sourcing Support",
        name: COMPANY_INFO.contactPerson,
        areaServed: "BD",
        availableLanguage: ["English", "Bengali"],
      },
      {
        "@type": "ContactPoint",
        telephone: COMPANY_INFO.phoneAlt,
        contactType: "Customer Support & Operations",
        name: "Mr Hasan",
        areaServed: "BD",
        availableLanguage: ["English", "Bengali"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_INFO.name,
    image: `${COMPANY_INFO.domain}/logo/og-image.png`,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    url: COMPANY_INFO.domain,
    sameAs: [
      COMPANY_INFO.facebook,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "House # 38 (Flat-1A), Road # 5/A, Sector-5, Uttara",
      addressLocality: "Uttara, Dhaka",
      addressRegion: "Dhaka Division",
      postalCode: "1230",
      addressCountry: "BD",
    },
    priceRange: "$$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
