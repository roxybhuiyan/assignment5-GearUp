import { z } from "zod";

export const reviewSchema = z.object({
  rentalOrderId: z.string().min(1, { error: "Rental order is required." }),
  rating: z.coerce
    .number({ error: "Rating must be a number." })
    .int({ error: "Rating must be a whole number." })
    .min(1, { error: "Rating must be at least 1." })
    .max(5, { error: "Rating cannot be more than 5." }),
  reviewText: z.string().min(5, { error: "Review must be at least 5 characters." }),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
