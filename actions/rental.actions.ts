"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiPost, apiPatch, ApiError } from "@/lib/server-api";
import { rentalSchema } from "@/lib/validations/rental";
import { fieldErrorsFromZod, type ActionState } from "@/lib/action-state";
import type { RentalOrder } from "@/lib/types";

export async function placeRental(
  gearId: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = rentalSchema.safeParse({
    gearId,
    rentalStartDate: formData.get("rentalStartDate"),
    rentalEndDate: formData.get("rentalEndDate"),
    quantity: formData.get("quantity") || "1",
  });
  if (!parsed.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  try {
    await apiPost<RentalOrder>("/rentals", {
      gearId: parsed.data.gearId,
      rentalStartDate: new Date(parsed.data.rentalStartDate).toISOString(),
      rentalEndDate: new Date(parsed.data.rentalEndDate).toISOString(),
      quantity: parsed.data.quantity,
    });
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to place rental order.",
    };
  }

  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer");
}

type ProviderStatusAction = "CONFIRMED" | "CANCELLED" | "PICKED_UP" | "RETURNED";

export async function updateOrderStatus(
  orderId: string,
  status: ProviderStatusAction
): Promise<ActionState> {
  try {
    await apiPatch(`/provider/orders/${orderId}`, { status });
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to update order status.",
    };
  }

  revalidatePath("/dashboard/provider/orders");
  return { success: true, message: `Order marked ${status.replace("_", " ").toLowerCase()}.` };
}
