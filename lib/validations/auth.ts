import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
  password: z.string().min(1, { error: "Password is required." }),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, { error: "Full name must be at least 2 characters." }),
  email: z.email({ error: "Enter a valid email address." }),
  phone: z.string().min(6, { error: "Enter a valid phone number." }),
  password: z.string().min(8, { error: "Password must be at least 8 characters." }),
  role: z.enum(["CUSTOMER", "PROVIDER"], { error: "Select a role." }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
