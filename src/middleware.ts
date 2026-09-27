import { NextRequest, NextResponse } from "next/server";

const LOGIN_ACCESS_COOKIE = "admin_login_access";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secretKey = process.env.ADMIN_LOGIN_KEY;

  // ==========================================
  // /auth/login/SECRET_KEY
  // ==========================================
  if (pathname.startsWith("/auth/login/")) {
    const parts = pathname.split("/").filter(Boolean);

    // Kata kunci harus tepat:
    // /auth/login
    if (parts.length !== 3) {
      return NextResponse.rewrite(
        new URL("/404", request.url)
      );
    }

    const key = parts[2];

    // Key salah
    // Jika key salah maka akan menuju ke halaman not-found yang sudah di custom
    if (!secretKey || key !== secretKey) {
      return NextResponse.rewrite(
        new URL("/404", request.url)
      );
    }

    // Key benar
    // Jika key benar maka langsung menuju halaman /Auth/Login
    const response = NextResponse.redirect(
      new URL("/auth/login", request.url)
    );

    response.cookies.set({
      name: LOGIN_ACCESS_COOKIE,
      value: "granted",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300,
      path: "/auth/login",
    });

    return response;
  }

  // ==========================================
  // /auth/login TANPA KEY
  // ==========================================
  if (pathname === "/auth/login") {
    const accessCookie = request.cookies.get(
      LOGIN_ACCESS_COOKIE
    );

    // Belum memasukkan secret key
    // Jika belum memasukkan kata kunci maka akan menuju pada halaman not-found yang sudah di custom
    if (accessCookie?.value !== "granted") {
      return NextResponse.rewrite(
        new URL("/404", request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/login/:path*",
  ],
};