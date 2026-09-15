import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ file: string[] }> }
) {
  try {
    const { file } = await context.params;
    const requestedPath = file.join("/");

    // 1. Check if the file exists in public/uploads
    const filePath = path.join(process.cwd(), "public", "uploads", requestedPath);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        const fileBuffer = await fs.promises.readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();

        let contentType = "image/jpeg";
        if (ext === ".png") contentType = "image/png";
        else if (ext === ".webp") contentType = "image/webp";
        else if (ext === ".gif") contentType = "image/gif";
        else if (ext === ".svg") contentType = "image/svg+xml";

        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    }

    // 2. Fallback: If requested image doesn't exist on disk, serve the default fallback image
    // This prevents Next.js _next/image from returning 400 Bad Request when an image is missing
    const fallbackPath = path.join(
      process.cwd(),
      "public",
      "images",
      "machines",
      "cat-double-jersey.webp"
    );

    if (fs.existsSync(fallbackPath)) {
      const fallbackBuffer = await fs.promises.readFile(fallbackPath);
      return new NextResponse(fallbackBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    return new NextResponse("Image not found", { status: 404 });
  } catch (error) {
    console.error("GET /uploads/[...file] error:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}
