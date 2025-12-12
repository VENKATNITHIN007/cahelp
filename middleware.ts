// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Allow only common static file extensions (images, fonts, css, js)
const STATIC_FILE_EXT_RE = /\.(png|jpg|jpeg|webp|avif|svg|gif|ico|css|js|map|woff2?)$/i;

const PUBLIC_ASSET_PREFIXES = [
  "/favicon.ico",
  "/manifest.webmanifest",
  "/robots.txt",
  "/apple-touch-icon",
  "/android-chrome",
  "/sitemap",
  "/icon-",
];

const PUBLIC_PAGES = ["/", "/login", "/contactus"];

export default withAuth(
  () => NextResponse.next(),
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // 1) static files (images, css, js) -> public
        if (STATIC_FILE_EXT_RE.test(pathname)) return true;

        // 2) specific public asset prefixes -> public
        if (PUBLIC_ASSET_PREFIXES.some(p => pathname.startsWith(p))) return true;

        // 3) next-auth routes -> public
        if (pathname.startsWith("/api/auth")) return true;

        // 4) public pages -> public
        if (PUBLIC_PAGES.some(p => pathname === p || pathname.startsWith(p + "/"))) return true;

        // 5) otherwise, user must be logged in
        return Boolean(token);
      },
    },
  }
);

// Exclude heavy static folders from middleware entirely for performance
export const config = {
  matcher: ['/((?!_next/static|_next/image|api/auth).*)'],
};
