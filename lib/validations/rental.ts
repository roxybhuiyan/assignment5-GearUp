import { z } from "zod";

export const rentalSchema = z
  .object({
    gearId: z.string().min(1, { error: "Gear is required." }),
    rentalStartDate: z.string().min(1, { error: "Start date is required." }),
    rentalEndDate: z.string().min(1, { error: "End date is required." }),
    quantity: z.coerce
      .number({ error: "Quantity must be a number." })
      .int({ error: "Quantity must be a whole number." })
      .positive({ error: "Quantity must be at least 1." }),
  })
  .refine((data) => new Date(data.rentalEndDate) > new Date(data.rentalStartDate), {
    error: "End date must be after the start date.",
    path: ["rentalEndDate"],
  })
  .refine((data) => new Date(data.rentalStartDate).getTime() >= Date.now() - 1000 * 60 * 60 * 24, {
    error: "Start date cannot be in the past.",
    path: ["rentalStartDate"],
  });

export type RentalInput = z.infer<typeof rentalSchema>;
