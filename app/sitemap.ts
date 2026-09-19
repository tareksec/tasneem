import { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/lib/constants";
import { CATEGORIES } from "@/lib/machines-data";
import { getDbMachines } from "@/lib/db/machines";
import { getDbBlogPosts } from "@/lib/db/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = COMPANY_INFO.domain;

  // Static core routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/how-it-works",
    "/industries",
    "/projects",
    "/resources",
    "/faq",
    "/quote",
    "/contact",
    "/machines",
    "/blog",
    "/reviews",
    "/careers",
    "/terms",
    "/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/en${route}`,
        bn: `${baseUrl}/bn${route}`,
        "x-default": `${baseUrl}${route}`,
      },
    },
  }));

  // High-Impact Sourcing & Technical Guides (SEO / GEO / AEO)
  const sourcingGuidesRoutes = [
    "/circular-knitting-machine-price-in-bangladesh",
    "/double-jersey-circular-knitting-machine-sourcing",
    "/single-jersey-circular-knitting-machine-sourcing",
    "/import-circular-knitting-machine-bangladesh",
    "/spare-parts-needles-narayanganj",
    "/dyeing-finishing-machinery-importer-bangladesh",
    "/pre-shipment-inspection-textile-machinery",
    "/knitwear-factory-setup-consultancy-bangladesh",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: {
      languages: {
        en: `${baseUrl}/en${route}`,
        bn: `${baseUrl}/bn${route}`,
        "x-default": `${baseUrl}${route}`,
      },
    },
  }));

  // Dynamic category routes
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/machines/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/en/machines/${cat.slug}`,
        bn: `${baseUrl}/bn/machines/${cat.slug}`,
        "x-default": `${baseUrl}/machines/${cat.slug}`,
      },
    },
  }));

  // Dynamic machine detail routes
  const machines = await getDbMachines();
  const machineRoutes = machines.map((m) => ({
    url: `${baseUrl}/machines/${m.category}/${m.id}`,
    lastModified: m.updatedAt ? new Date(m.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}/en/machines/${m.category}/${m.id}`,
        bn: `${baseUrl}/bn/machines/${m.category}/${m.id}`,
        "x-default": `${baseUrl}/machines/${m.category}/${m.id}`,
      },
    },
  }));

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await getDbBlogPosts();
    blogRoutes = blogPosts.map((post) => {
      const slug = post.slug_en || post.id;
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${slug}`,
            bn: `${baseUrl}/bn/blog/${slug}`,
            "x-default": `${baseUrl}/blog/${slug}`,
          },
        },
      };
    });
  } catch {
    // fallback if db unavailable
  }

  return [...staticRoutes, ...sourcingGuidesRoutes, ...categoryRoutes, ...machineRoutes, ...blogRoutes];
}
