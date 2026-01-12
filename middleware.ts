import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function log(req: NextRequest) {
  console.log("Path:", req.nextUrl.pathname);
}

function auth(req: NextRequest) {
  const isAuth = req.cookies.get("auth");
  if (!isAuth && req.nextUrl.pathname.startsWith("/users")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export function middleware(req: NextRequest) {
  log(req);

  const authResult = auth(req);
  if (authResult) return authResult;

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*", "/api/:path*"],
};
