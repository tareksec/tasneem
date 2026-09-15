import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = posts.map((p) => ({
      ...p,
      published_at: p.published_at || (p.createdAt ? p.createdAt.toISOString().split("T")[0] : ""),
      updated_at: p.updatedAt ? p.updatedAt.toISOString().split("T")[0] : "",
    }));

    return NextResponse.json({ success: true, posts: formatted });
  } catch (error) {
    console.error("GET /api/admin/blog error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title_en,
      title_bn,
      slug_en,
      slug_bn,
      cover_image,
      excerpt_en,
      excerpt_bn,
      body_en,
      body_bn,
      category,
      tags,
      seo_title_en,
      seo_title_bn,
      seo_desc_en,
      seo_desc_bn,
      status,
      published_at,
      author,
    } = body;

    if (!title_en && !title_bn) {
      return NextResponse.json(
        { success: false, error: "Title is required in at least one language." },
        { status: 400 }
      );
    }

    const safeSlug =
      slug_en ||
      (title_en
        ? title_en.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
        : `post-${Date.now()}`);

    const postData = {
      title_en: title_en || "",
      title_bn: title_bn || "",
      slug_en: safeSlug,
      slug_bn: slug_bn || null,
      cover_image: cover_image || "/product-image/product-1.jpg",
      excerpt_en: excerpt_en || null,
      excerpt_bn: excerpt_bn || null,
      body_en: body_en || "",
      body_bn: body_bn || null,
      category: category || "Technical Sourcing",
      tags: tags || [],
      seo_title_en: seo_title_en || null,
      seo_title_bn: seo_title_bn || null,
      seo_desc_en: seo_desc_en || null,
      seo_desc_bn: seo_desc_bn || null,
      status: status || "draft",
      published_at: published_at || new Date().toISOString().split("T")[0],
      author: author || "Admin Staff",
    };

    let post;
    if (id && !id.startsWith("post-")) {
      post = await prisma.blogPost.upsert({
        where: { id },
        update: postData,
        create: postData,
      });
    } else {
      post = await prisma.blogPost.create({
        data: postData,
      });
    }

    // Revalidate blog cache on creation/update across all language variants
    revalidateBlogCache(post.slug_en, post.slug_bn);

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("POST /api/admin/blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save blog post." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}

function revalidateBlogCache(slugEn?: string | null, slugBn?: string | null) {
  revalidatePath("/blog");
  revalidatePath("/en/blog");
  revalidatePath("/bn/blog");
  revalidatePath("/blog/[slug]", "page");

  const slugs = [slugEn, slugBn].filter(Boolean) as string[];
  for (const slug of slugs) {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
    revalidatePath(`/bn/blog/${slug}`);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Post ID is required." },
        { status: 400 }
      );
    }

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (existingPost) {
      await prisma.blogPost.delete({
        where: { id },
      });

      // Revalidate cache after deletion across all language variants
      revalidateBlogCache(existingPost.slug_en, existingPost.slug_bn);
    } else {
      revalidateBlogCache();
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete post." },
      { status: 500 }
    );
  }
}
