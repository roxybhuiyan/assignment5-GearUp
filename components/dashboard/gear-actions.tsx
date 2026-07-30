"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteGear } from "@/actions/gear.actions";

export function GearActions({ gearId }: { gearId: string }) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon-sm"
        nativeButton={false}
        render={
          <Link href={`/dashboard/provider/gear/${gearId}/edit`} aria-label="Edit gear">
            <Pencil />
          </Link>
        }
      />
      <ConfirmDialog
        title="Delete this gear?"
        description="This cannot be undone. Gear with existing rental orders cannot be deleted."
        confirmLabel="Delete"
        trigger={
          <Button variant="outline" size="icon-sm" aria-label="Delete gear">
            <Trash2 />
          </Button>
        }
        onConfirm={async () => {
          const result = await deleteGear(gearId);
          if (result.success) toast.success(result.message);
          else toast.error(result.message);
        }}
      />
    </div>
  );
}
