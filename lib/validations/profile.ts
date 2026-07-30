import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, { error: "Full name must be at least 2 characters." }),
  phone: z.string().min(6, { error: "Enter a valid phone number." }),
  address: z.string().optional(),
  profilePicture: z
    .union([z.url({ error: "Enter a valid image URL." }), z.literal("")])
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
