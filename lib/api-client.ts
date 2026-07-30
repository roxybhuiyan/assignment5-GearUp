import type { ApiEnvelope } from "./types";

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;

  constructor(message: string, status: number, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export function buildQuery(
  params?: Record<string, string | number | boolean | undefined>
): string {
  if (!params) return "";
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") usp.set(key, String(value));
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

export async function parseEnvelope<T>(res: Response): Promise<ApiEnvelope<T>> {
  let body: ApiEnvelope<T> | null = null;
  try {
    body = await res.json();
  } catch {
    // no/invalid JSON body
  }

  if (!res.ok || !body || !body.success) {
    const fieldErrors: Record<string, string> = {};
    body?.errorDetails?.forEach((e) => {
      fieldErrors[String(e.path)] = e.message;
    });
    throw new ApiError(
      body?.message ?? `Request failed with status ${res.status}`,
      res.status,
      fieldErrors
    );
  }

  return body;
}
