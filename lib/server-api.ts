import "server-only";
import { cookies } from "next/headers";
import { ApiError, buildQuery, parseEnvelope } from "./api-client";
import type { PaginationMeta } from "./types";

export const SESSION_COOKIE = "gearup_token";

const BASE_URL = process.env.BACKEND_API_URL ?? "http://localhost:5000/api";

interface RequestOptions {
  searchParams?: Record<string, string | number | boolean | undefined>;
}

interface PublicRequestOptions extends RequestOptions {
  revalidate?: number;
}

async function authHeaders(): Promise<Record<string, string>> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function emptyMeta(count: number): PaginationMeta {
  return { page: 1, limit: count, total: count, totalPages: 1 };
}

export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}${buildQuery(options.searchParams)}`, {
    headers: await authHeaders(),
    cache: "no-store",
  });
  const envelope = await parseEnvelope<T>(res);
  return envelope.data;
}

export async function apiGetList<T>(
  path: string,
  options: RequestOptions = {}
): Promise<{ items: T[]; meta: PaginationMeta }> {
  const res = await fetch(`${BASE_URL}${path}${buildQuery(options.searchParams)}`, {
    headers: await authHeaders(),
    cache: "no-store",
  });
  const envelope = await parseEnvelope<T[]>(res);
  const items = envelope.data ?? [];
  return { items, meta: envelope.meta ?? emptyMeta(items.length) };
}

async function mutate<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(await authHeaders()) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const envelope = await parseEnvelope<T>(res);
  return envelope.data;
}

export const apiPost = <T>(path: string, body?: unknown) => mutate<T>("POST", path, body);
export const apiPatch = <T>(path: string, body?: unknown) => mutate<T>("PATCH", path, body);
export const apiPut = <T>(path: string, body?: unknown) => mutate<T>("PUT", path, body);
export const apiDelete = <T>(path: string) => mutate<T>("DELETE", path);

/** Unauthenticated reads — safe for Server Components rendering public content. */
export async function apiPublicGet<T>(
  path: string,
  options: PublicRequestOptions = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}${buildQuery(options.searchParams)}`, {
    next: { revalidate: options.revalidate ?? 30 },
  });
  const envelope = await parseEnvelope<T>(res);
  return envelope.data;
}

export async function apiPublicGetList<T>(
  path: string,
  options: PublicRequestOptions = {}
): Promise<{ items: T[]; meta: PaginationMeta }> {
  const res = await fetch(`${BASE_URL}${path}${buildQuery(options.searchParams)}`, {
    next: { revalidate: options.revalidate ?? 30 },
  });
  const envelope = await parseEnvelope<T[]>(res);
  const items = envelope.data ?? [];
  return { items, meta: envelope.meta ?? emptyMeta(items.length) };
}

export { ApiError };
