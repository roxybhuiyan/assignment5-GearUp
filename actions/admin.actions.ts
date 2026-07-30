"use server";

import { revalidatePath } from "next/cache";
import { apiPatch, ApiError } from "@/lib/server-api";
import type { ActionState } from "@/lib/action-state";
import type { User, UserStatus } from "@/lib/types";

export async function updateUserStatus(userId: string, status: UserStatus): Promise<ActionState> {
  try {
    await apiPatch<User>(`/admin/users/${userId}`, { status });
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to update user.",
    };
  }

  revalidatePath("/dashboard/admin/users");
  return { success: true, message: `User ${status === "SUSPENDED" ? "suspended" : "activated"}.` };
}
