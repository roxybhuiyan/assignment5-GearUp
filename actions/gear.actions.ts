"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiPost, apiPut, apiDelete, ApiError } from "@/lib/server-api";
import { gearSchema, parseImageUrls } from "@/lib/validations/gear";
import { fieldErrorsFromZod, type ActionState } from "@/lib/action-state";
import type { GearItem } from "@/lib/types";

function readGearForm(formData: FormData) {
  return {
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    description: formData.get("description"),
    brand: formData.get("brand"),
    pricePerDay: formData.get("pricePerDay"),
    condition: formData.get("condition") || "GOOD",
    stock: formData.get("stock") || "0",
    availability: formData.get("availability") === "on",
    images: parseImageUrls(formData.get("images") as string | null),
  };
}

export async function createGear(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = gearSchema.safeParse(readGearForm(formData));
  if (!parsed.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  try {
    await apiPost<GearItem>("/provider/gear", parsed.data);
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to add gear.",
    };
  }

  revalidatePath("/dashboard/provider/gear");
  redirect("/dashboard/provider/gear");
}

export async function updateGear(
  gearId: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = gearSchema.safeParse(readGearForm(formData));
  if (!parsed.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  try {
    await apiPut<GearItem>(`/provider/gear/${gearId}`, parsed.data);
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to update gear.",
    };
  }

  revalidatePath("/dashboard/provider/gear");
  redirect("/dashboard/provider/gear");
}

export async function deleteGear(gearId: string): Promise<ActionState> {
  try {
    await apiDelete(`/provider/gear/${gearId}`);
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to delete gear.",
    };
  }

  revalidatePath("/dashboard/provider/gear");
  return { success: true, message: "Gear deleted." };
}
