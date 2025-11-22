import { NextResponse } from "next/server";

export function middleware(request) {
  const authCookie = request.cookies.get("admin_auth");

  // List of protected routes (only for admin)
  const protectedPaths = ["/admin", "/api/messages"];

  // Check if user trying to access a protected route
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // ✅ If trying to access protected route without login
  if (isProtected && authCookie?.value !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ If logged in and trying to access /login again → redirect to /admin
  if (request.nextUrl.pathname === "/login" && authCookie?.value === "true") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Otherwise allow request to continue
  return NextResponse.next();
}

// ✅ Apply middleware only on these routes
export const config = {
  matcher: ["/admin/:path*", "/api/messages/:path*", "/login"],
};
