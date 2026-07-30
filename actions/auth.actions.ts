"use server";

import { redirect } from "next/navigation";
import { apiPost, ApiError } from "@/lib/server-api";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { fieldErrorsFromZod, type ActionState } from "@/lib/action-state";
import type { User } from "@/lib/types";

interface AuthResult {
  user: User;
  token: string;
}

function resolveDestination(next: FormDataEntryValue | null, role: string): string {
  if (typeof next === "string" && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return `/dashboard/${role.toLowerCase()}`;
}

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  let result: AuthResult;
  try {
    result = await apiPost<AuthResult>("/auth/login", parsed.data);
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Login failed. Please try again.",
    };
  }

  await setSessionCookie(result.token);
  redirect(resolveDestination(formData.get("next"), result.user.role));
}

export async function register(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    role: formData.get("role") || "CUSTOMER",
  });
  if (!parsed.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  let result: AuthResult;
  try {
    result = await apiPost<AuthResult>("/auth/register", parsed.data);
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Registration failed. Please try again.",
    };
  }

  await setSessionCookie(result.token);
  redirect(resolveDestination(formData.get("next"), result.user.role));
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect("/auth/login");
}
