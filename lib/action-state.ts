import type { ZodError } from "zod";

export interface ActionState {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
}

export const initialActionState: ActionState = { success: false };

export function fieldErrorsFromZod(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
