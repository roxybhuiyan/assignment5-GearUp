import { z } from "zod";

export const updateUserStatusSchema = z.object({
  userId: z.string().min(1),
  status: z.enum(["ACTIVE", "SUSPENDED"], { error: "Select a status." }),
});

export const categorySchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters." }),
  description: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["CONFIRMED", "CANCELLED", "PICKED_UP", "RETURNED"], {
    error: "Select a valid status.",
  }),
});

export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
