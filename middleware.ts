import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const isAuth = req.cookies.get("auth")?.value === "true"; //boolean flag
 
  if (!isAuth && pathname.startsWith("/users")) {
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (isAuth && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/users", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*", "/auth/:path*"],
};
