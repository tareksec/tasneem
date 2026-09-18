import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const secret = process.env.NEXTAUTH_SECRET || "tasneem-default-local-dev-jwt-secret-key-32chars";

  // Check if current route is inside /admin
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret });

    // Allow access to login page
    if (pathname === "/admin/login") {
      // If already logged in, redirect to admin dashboard
      if (token) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    // If not authenticated, redirect to /admin/login
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle locale prefix routing (/en/... and /bn/...)
  if (pathname.startsWith("/en") || pathname.startsWith("/bn")) {
    const isEn = pathname.startsWith("/en");
    const locale = isEn ? "en" : "bn";
    const strippedPath = pathname.replace(/^\/(en|bn)/, "") || "/";

    // Rewrite internally to the stripped path
    const url = req.nextUrl.clone();
    url.pathname = strippedPath;

    // Pass x-locale in request headers so Server Components can read it via headers()
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", locale);

    const res = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
    res.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
    res.headers.set("x-locale", locale);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/en",
    "/en/:path*",
    "/bn",
    "/bn/:path*",
  ],
};
