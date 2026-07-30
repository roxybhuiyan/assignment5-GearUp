"use server";

import { revalidatePath } from "next/cache";
import { apiPost, ApiError } from "@/lib/server-api";
import { reviewSchema } from "@/lib/validations/review";
import { fieldErrorsFromZod, type ActionState } from "@/lib/action-state";
import type { Review } from "@/lib/types";

export async function createReview(
  rentalOrderId: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = reviewSchema.safeParse({
    rentalOrderId,
    rating: formData.get("rating"),
    reviewText: formData.get("reviewText"),
  });
  if (!parsed.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  try {
    await apiPost<Review>("/reviews", parsed.data);
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to submit review.",
    };
  }

  revalidatePath("/dashboard/customer");
  return { success: true, message: "Review submitted. Thanks!" };
}
