import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isIndexPage = req.nextUrl.pathname === "/";

    // 1. If an Admin tries to load the root Employee landing page, forward them to /admin
    if (isIndexPage && isAuth && token?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    
    // 2. If an Employee tries to type /admin in the URL bar, block them and send them back to /
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Protects all pages automatically. Users must log in.
    },
  }
);

// This tells the middleware to protect your home page and your admin paths
export const config = {
  matcher: ["/", "/admin/:path*"],
};