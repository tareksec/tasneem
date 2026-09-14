import { NextResponse } from "next/server";
import { getDbBlogPosts, getDbBlogPostBySlug } from "@/lib/db/blog";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (slug) {
      const post = await getDbBlogPostBySlug(slug);
      return NextResponse.json({ success: true, post });
    }

    const category = searchParams.get("category") || undefined;
    const posts = await getDbBlogPosts({ category, includeDrafts: false });

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load blog posts." },
      { status: 500 }
    );
  }
}
