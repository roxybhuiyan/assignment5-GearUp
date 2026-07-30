"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/actions/admin.actions";
import type { UserStatus } from "@/lib/types";

export function UserStatusAction({ userId, status }: { userId: string; status: UserStatus }) {
  const [isPending, startTransition] = useTransition();
  const nextStatus: UserStatus = status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

  function handle() {
    startTransition(async () => {
      const result = await updateUserStatus(userId, nextStatus);
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <Button
      size="sm"
      variant={status === "ACTIVE" ? "destructive" : "outline"}
      disabled={isPending}
      onClick={handle}
    >
      {isPending ? "Working..." : status === "ACTIVE" ? "Suspend" : "Activate"}
    </Button>
  );
}
