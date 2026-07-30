import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "jose";
import { apiGet, SESSION_COOKIE } from "./server-api";
import type { Role, User } from "./types";

const SEVEN_DAYS = 60 * 60 * 24 * 7;

export interface SessionPayload {
  userId: string;
  role: Role;
  exp?: number;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SEVEN_DAYS,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** Optimistic session read: decodes (does not verify) the JWT from the cookie. */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = decodeJwt(token) as { userId: string; role: Role; exp?: number };
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return { userId: payload.userId, role: payload.role, exp: payload.exp };
  } catch {
    return null;
  }
});

/** Authoritative user fetch: re-validated by the backend on every call. */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const session = await getSession();
  if (!session) return null;
  try {
    return await apiGet<User>("/auth/me");
  } catch {
    return null;
  }
});

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  return user;
}

export async function requireRole(role: Role): Promise<User> {
  const user = await requireUser();
  if (user.role !== role) redirect(`/dashboard/${user.role.toLowerCase()}`);
  return user;
}
