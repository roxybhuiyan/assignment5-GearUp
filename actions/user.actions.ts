"use server";

import { revalidatePath } from "next/cache";
import { apiPatch, ApiError } from "@/lib/server-api";
import { updateProfileSchema } from "@/lib/validations/profile";
import { fieldErrorsFromZod, type ActionState } from "@/lib/action-state";
import type { User } from "@/lib/types";

export async function updateProfile(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = updateProfileSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    address: formData.get("address") || undefined,
    profilePicture: formData.get("profilePicture") || undefined,
  });
  if (!parsed.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  try {
    await apiPatch<User>("/users/me", parsed.data);
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to update profile.",
    };
  }

  revalidatePath("/dashboard/profile");
  return { success: true, message: "Profile updated." };
}
