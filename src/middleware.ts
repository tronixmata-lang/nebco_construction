import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth/jwt";

type RedirectEntry = { from: string; to: string; statusCode: 301 | 302 };

let redirectCache: { data: RedirectEntry[]; expires: number } | null = null;

async function getRedirects(request: NextRequest): Promise<RedirectEntry[]> {
  if (redirectCache && Date.now() < redirectCache.expires) {
    return redirectCache.data;
  }
  try {
    const url = new URL("/api/public/redirects", request.url);
    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = (await res.json()) as RedirectEntry[];
    redirectCache = { data, expires: Date.now() + 60_000 };
    return data;
  } catch {
    return [];
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    const redirects = await getRedirects(request);
    const match = redirects.find((r) => r.from === pathname);
    if (match) {
      const destination = match.to.startsWith("http")
        ? match.to
        : new URL(match.to, request.url).toString();
      return NextResponse.redirect(destination, match.statusCode);
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const session = await verifySessionToken(token);
    if (!session) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    if (pathname.startsWith("/admin/users") && session.role !== "superadmin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      const session = await verifySessionToken(token);
      if (session) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|uploads|.*\\..*).*)",
  ],
};
