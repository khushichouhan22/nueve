import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isPublicRegistration = req.nextUrl.pathname.startsWith("/student/registration");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(token.role === "ADMIN" ? "/teacher/dashboard" : "/student/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth && !isPublicRegistration) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Role-based access control
    if (req.nextUrl.pathname.startsWith("/teacher") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student/dashboard", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/student") && token?.role === "ADMIN" && !isPublicRegistration) {
      return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Let the middleware function handle the logic
    },
  }
);

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/login"],
};
