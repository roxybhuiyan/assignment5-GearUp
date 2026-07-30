"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { ActionState } from "@/lib/action-state";

/** Shows a toast whenever a useActionState result changes and carries a message. */
export function useActionToast(state: ActionState, onSuccess?: () => void) {
  const lastHandled = useRef<ActionState | null>(null);

  useEffect(() => {
    if (state === lastHandled.current) return;
    lastHandled.current = state;

    if (state.message) {
      if (state.success) toast.success(state.message);
      else toast.error(state.message);
    }
    if (state.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
}
