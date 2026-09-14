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

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
