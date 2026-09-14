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
    // Operating Address (Office & Machinery Yard)
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot-594, Road No. 4, BSCIC Industrial Park, Chan Nagor, Shashongaon, Enayetnagar, Fatullah",
      addressLocality: "Fatullah, Narayanganj",
      addressRegion: "Dhaka Division",
      postalCode: "1421",
      addressCountry: "BD",
    },
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
      streetAddress: "Plot-594, Road No. 4, BSCIC Industrial Park, Chan Nagor, Shashongaon, Enayetnagar, Fatullah",
      addressLocality: "Fatullah, Narayanganj",
      addressRegion: "Dhaka Division",
      postalCode: "1421",
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
