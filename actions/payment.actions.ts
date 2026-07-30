"use server";

import { revalidatePath } from "next/cache";
import { apiPost, ApiError } from "@/lib/server-api";
import type { Payment } from "@/lib/types";

interface CreateCheckoutResult {
  paymentId: string;
  checkoutUrl: string;
}

interface CheckoutState {
  success: boolean;
  checkoutUrl?: string;
  message?: string;
}

export async function createCheckoutSession(rentalOrderId: string): Promise<CheckoutState> {
  try {
    const result = await apiPost<CreateCheckoutResult>("/payments/create", { rentalOrderId });
    return { success: true, checkoutUrl: result.checkoutUrl };
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to start checkout.",
    };
  }
}

interface ConfirmState {
  success: boolean;
  payment?: Payment;
  message?: string;
}

export async function confirmPayment(rentalOrderId: string): Promise<ConfirmState> {
  try {
    const payment = await apiPost<Payment>("/payments/confirm", { rentalOrderId });
    revalidatePath("/dashboard/customer");
    revalidatePath("/dashboard/customer/payments");
    return { success: true, payment };
  } catch (err) {
    return {
      success: false,
      message: err instanceof ApiError ? err.message : "Failed to confirm payment.",
    };
  }
}
