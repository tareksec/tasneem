import { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/lib/constants";
import { CATEGORIES } from "@/lib/machines-data";
import { getDbMachines } from "@/lib/db/machines";

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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}${route}`,
        bn: `${baseUrl}${route}`,
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
        en: `${baseUrl}/machines/${cat.slug}`,
        bn: `${baseUrl}/machines/${cat.slug}`,
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
        en: `${baseUrl}/machines/${m.category}/${m.id}`,
        bn: `${baseUrl}/machines/${m.category}/${m.id}`,
        "x-default": `${baseUrl}/machines/${m.category}/${m.id}`,
      },
    },
  }));

  return [...staticRoutes, ...categoryRoutes, ...machineRoutes];
}
