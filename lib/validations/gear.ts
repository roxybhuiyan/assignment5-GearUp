import { z } from "zod";

export const gearSchema = z.object({
  categoryId: z.string().min(1, { error: "Select a category." }),
  name: z.string().min(2, { error: "Name must be at least 2 characters." }),
  description: z.string().min(10, { error: "Description must be at least 10 characters." }),
  brand: z.string().min(1, { error: "Brand is required." }),
  pricePerDay: z.coerce
    .number({ error: "Price must be a number." })
    .positive({ error: "Price must be greater than 0." }),
  condition: z.enum(["NEW", "GOOD", "FAIR"], { error: "Select a condition." }),
  stock: z.coerce
    .number({ error: "Stock must be a number." })
    .int({ error: "Stock must be a whole number." })
    .min(0, { error: "Stock cannot be negative." }),
  availability: z.boolean(),
  images: z.array(z.url({ error: "Each image must be a valid URL." })).default([]),
});

export type GearInput = z.infer<typeof gearSchema>;

export function parseImageUrls(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}
