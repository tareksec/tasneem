import prisma from "@/lib/prisma";
import { BlogPost } from "@/lib/admin/types";
import { STATIC_BLOG_POSTS } from "@/lib/blog-data";

function formatDbBlogPost(raw: any): BlogPost {
  return {
    id: raw.id,
    title_en: raw.title_en,
    title_bn: raw.title_bn || "",
    slug_en: raw.slug_en,
    slug_bn: raw.slug_bn || "",
    cover_image: raw.cover_image || "/product-image/product-1.jpg",
    excerpt_en: raw.excerpt_en || "",
    excerpt_bn: raw.excerpt_bn || "",
    body_en: raw.body_en || "",
    body_bn: raw.body_bn || "",
    category: raw.category || "General",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    seo_title_en: raw.seo_title_en || "",
    seo_title_bn: raw.seo_title_bn || "",
    seo_desc_en: raw.seo_desc_en || "",
    seo_desc_bn: raw.seo_desc_bn || "",
    status: raw.status as "published" | "draft",
    published_at: raw.published_at || (raw.createdAt ? new Date(raw.createdAt).toISOString().split("T")[0] : ""),
    updated_at: raw.updatedAt ? new Date(raw.updatedAt).toISOString().split("T")[0] : "",
    author: raw.author || "Tasneem Team",
  };
}

export async function getDbBlogPosts(options: {
  category?: string;
  includeDrafts?: boolean;
} = {}): Promise<BlogPost[]> {
  const { category, includeDrafts = false } = options;

  try {
    const where: any = {};
    if (!includeDrafts) {
      where.status = "published";
    }
    if (category && category !== "All") {
      where.category = category;
    }

    const records = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (records && records.length > 0) {
      return records.map(formatDbBlogPost);
    }
  } catch (error) {
    console.warn("Prisma getDbBlogPosts fallback to static blog data:", error);
  }

  // Fallback to static blog posts for reliable production and SEO
  let fallbackPosts = [...STATIC_BLOG_POSTS];
  if (!includeDrafts) {
    fallbackPosts = fallbackPosts.filter((p) => p.status === "published");
  }
  if (category && category !== "All") {
    fallbackPosts = fallbackPosts.filter((p) => p.category === category);
  }

  return fallbackPosts;
}

export async function getDbBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const record = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug_en: slug }, { slug_bn: slug }, { id: slug }],
      },
    });

    if (record) {
      return formatDbBlogPost(record);
    }
  } catch (error) {
    console.warn(`Prisma getDbBlogPostBySlug(${slug}) fallback to static blog data:`, error);
  }

  return STATIC_BLOG_POSTS.find(
    (p) => p.slug_en === slug || p.slug_bn === slug || p.id === slug
  );
}
