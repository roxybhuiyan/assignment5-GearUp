import { NextResponse, type NextRequest } from "next/server";
import { decodeJwt } from "jose";

const SESSION_COOKIE = "gearup_token";

function roleHome(role: string) {
  return `/dashboard/${role.toLowerCase()}`;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  let session: { userId: string; role: string; exp?: number } | null = null;
  if (token) {
    try {
      const payload = decodeJwt(token) as { userId: string; role: string; exp?: number };
      if (!payload.exp || payload.exp * 1000 >= Date.now()) {
        session = { userId: payload.userId, role: payload.role, exp: payload.exp };
      }
    } catch {
      session = null;
    }
  }

  if (!session) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const segments = pathname.split("/").filter(Boolean); // ["dashboard", "<role>", ...]
  const requestedRoleSegment = segments[1];
  const ownRoleSegment = session.role.toLowerCase();
  const roleSegments = ["customer", "provider", "admin"];

  if (
    requestedRoleSegment &&
    roleSegments.includes(requestedRoleSegment) &&
    requestedRoleSegment !== ownRoleSegment
  ) {
    return NextResponse.redirect(new URL(roleHome(session.role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
