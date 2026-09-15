import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDbBlogPostBySlug, getDbBlogPosts } from "@/lib/db/blog";
import { adminStore } from "@/lib/admin/admin-store";
import { COMPANY_INFO } from "@/lib/constants";
import { BlogPostClientView } from "@/components/blog/BlogPostClientView";

export async function generateStaticParams() {
  const posts = await getDbBlogPosts({ includeDrafts: false });
  if (posts && posts.length > 0) {
    return posts.map((p) => ({ slug: p.slug_en }));
  }
  return [
    { slug: "circular-knitting-gauge-cylinder-selection-guide" },
    { slug: "pre-shipment-inspection-sgs-its-bv-machinery-import-bangladesh" },
    { slug: "cfr-chattogram-lc-machinery-import-cost-breakdown" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post = await getDbBlogPostBySlug(slug);
  if (!post) {
    post = adminStore.getBlogPostBySlug(slug) || adminStore.getBlogPostById(slug);
  }

  if (!post) {
    return {
      title: "Article Not Found | Tasneem Knitting Industry",
    };
  }

  const title = post.seo_title_en || post.title_en || post.title_bn;
  const description = post.seo_desc_en || post.excerpt_en || post.excerpt_bn;
  const canonicalUrl = `${COMPANY_INFO.domain}/blog/${slug}`;

  return {
    title: `${title} | Tasneem Knitting Industry`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${COMPANY_INFO.domain}/en/blog/${slug}`,
        bn: `${COMPANY_INFO.domain}/bn/blog/${slug}`,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author || "Tasneem Team"],
      images: [
        {
          url: post.cover_image || `${COMPANY_INFO.domain}/logo/og-image.png`,
          alt: title,
        },
      ],
    },
  };
}

export default async function PublicBlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = await getDbBlogPostBySlug(slug);
  if (!post) {
    post = adminStore.getBlogPostBySlug(slug) || adminStore.getBlogPostById(slug);
  }

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title_en || post.title_bn,
    description: post.excerpt_en || post.excerpt_bn,
    image: post.cover_image ? `${COMPANY_INFO.domain}${post.cover_image}` : `${COMPANY_INFO.domain}/logo/og-image.png`,
    author: {
      "@type": "Person",
      name: post.author || "Tasneem Team",
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY_INFO.domain}/logo/nave-var.png`,
      },
    },
    datePublished: post.published_at || new Date().toISOString(),
    dateModified: post.updated_at || post.published_at || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY_INFO.domain}/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: COMPANY_INFO.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${COMPANY_INFO.domain}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title_en || post.title_bn,
        item: `${COMPANY_INFO.domain}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClientView post={post} slug={slug} />
    </>
  );
}
