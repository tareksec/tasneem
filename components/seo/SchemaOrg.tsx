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
    telephone: COMPANY_INFO.phoneIntl,
    email: COMPANY_INFO.email,
    sameAs: [
      COMPANY_INFO.facebook,
      "https://youtu.be/ONTd4X4M-Vo",
    ],
    vatID: COMPANY_INFO.registration.bin,
    taxID: COMPANY_INFO.registration.etin,
    founder: {
      "@type": "Person",
      name: COMPANY_INFO.owner,
      jobTitle: "Proprietor",
    },
    // Corporate Head Office Address
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.headOffice.address,
      addressLocality: COMPANY_INFO.headOffice.city,
      addressRegion: "Dhaka Division",
      postalCode: COMPANY_INFO.headOffice.postalCode,
      addressCountry: "BD",
    },
    department: [
      {
        "@type": "LocalBusiness",
        name: "Tasneem Knitting Industry - Machinery Showroom & Hub",
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY_INFO.showroomOffice.address,
          addressLocality: "Narayanganj",
          addressRegion: "Dhaka Division",
          postalCode: "1421",
          addressCountry: "BD",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: COMPANY_INFO.maps.lat,
          longitude: COMPANY_INFO.maps.lng,
        },
        hasMap: COMPANY_INFO.maps.shortUrl,
        telephone: COMPANY_INFO.phoneIntl,
      },
      {
        "@type": "Organization",
        name: `${COMPANY_INFO.chinaOffice.company} (${COMPANY_INFO.chinaOffice.name})`,
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY_INFO.chinaOffice.address,
          addressLocality: COMPANY_INFO.chinaOffice.city,
          addressRegion: `${COMPANY_INFO.chinaOffice.province} Province`,
          addressCountry: "CN",
        },
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY_INFO.phoneIntl,
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
    legalName: COMPANY_INFO.legalName,
    image: `${COMPANY_INFO.domain}/logo/og-image.png`,
    telephone: COMPANY_INFO.phoneIntl,
    email: COMPANY_INFO.email,
    url: COMPANY_INFO.domain,
    sameAs: [
      COMPANY_INFO.facebook,
      "https://youtu.be/ONTd4X4M-Vo",
    ],
    vatID: COMPANY_INFO.registration.bin,
    taxID: COMPANY_INFO.registration.etin,
    hasMap: COMPANY_INFO.maps.shortUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.showroomOffice.address,
      addressLocality: "Narayanganj",
      addressRegion: "Dhaka Division",
      postalCode: "1421",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_INFO.maps.lat,
      longitude: COMPANY_INFO.maps.lng,
    },
    department: [
      {
        "@type": "Place",
        name: "Corporate Head Office (Uttara, Dhaka)",
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY_INFO.headOffice.address,
          addressLocality: COMPANY_INFO.headOffice.city,
          addressRegion: "Dhaka Division",
          postalCode: COMPANY_INFO.headOffice.postalCode,
          addressCountry: "BD",
        },
      },
      {
        "@type": "Place",
        name: "China Sourcing Office (Shaoxing, Zhejiang)",
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY_INFO.chinaOffice.address,
          addressLocality: COMPANY_INFO.chinaOffice.city,
          addressRegion: `${COMPANY_INFO.chinaOffice.province} Province`,
          addressCountry: "CN",
        },
      },
    ],
    priceRange: "$$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function VideoObjectSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Tasneem Knitting Industry - Owner Introduction & Narayanganj Operational Hub",
    description:
      "Proprietor Md. Mamunur Rashid explains direct industrial knitting machinery import from China and Taiwan, CFR Chattogram shipping terms, and turnkey factory commissioning in Bangladesh.",
    thumbnailUrl: [
      "https://img.youtube.com/vi/ONTd4X4M-Vo/hqdefault.jpg",
      "https://img.youtube.com/vi/ONTd4X4M-Vo/maxresdefault.jpg",
    ],
    uploadDate: "2026-03-01T10:00:00+06:00",
    embedUrl: "https://www.youtube-nocookie.com/embed/ONTd4X4M-Vo",
    contentUrl: "https://www.youtube.com/watch?v=ONTd4X4M-Vo",
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY_INFO.domain}/logo/nave-var.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
