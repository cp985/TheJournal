import { auth } from "@/auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const userRole = req.auth?.user?.role;
  const { nextUrl } = req;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isProfileRoute = nextUrl.pathname.startsWith("/profile");
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  if (isProfileRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
});
export const config = { matcher: ["/profile/:path*", "/admin/:path*"] };

