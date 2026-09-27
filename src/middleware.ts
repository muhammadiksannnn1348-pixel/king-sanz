import { NextRequest, NextResponse } from "next/server";

const LOGIN_ACCESS_COOKIE = "admin_login_access";
const LOGIN_PATH = "/auth/login";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const secretKey = process.env.ADMIN_LOGIN_KEY;
  const keyFromPath = pathname.startsWith(`${LOGIN_PATH}/`)
    ? pathname.replace(`${LOGIN_PATH}/`, "")
    : "";
  const keyFromQuery = searchParams.get("key") ?? "";

  // ==========================================
  // /auth/login/SECRET_KEY
  // ==========================================
  if (pathname.startsWith(`${LOGIN_PATH}/`)) {
    const key = keyFromPath || keyFromQuery;

    if (!secretKey || key !== secretKey) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));

    response.cookies.set({
      name: LOGIN_ACCESS_COOKIE,
      value: "granted",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300,
      path: "/",
    });

    return response;
  }

  // ==========================================
  // /auth/login TANPA KEY
  // ==========================================
  if (pathname === LOGIN_PATH) {
    const accessCookie = request.cookies.get(LOGIN_ACCESS_COOKIE);

    if (accessCookie?.value === "granted") {
      return NextResponse.next();
    }

    if (secretKey && keyFromQuery === secretKey) {
      const response = NextResponse.next();

      response.cookies.set({
        name: LOGIN_ACCESS_COOKIE,
        value: "granted",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 300,
        path: "/",
      });

      return response;
    }

    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/login/:path*",
  ],
};