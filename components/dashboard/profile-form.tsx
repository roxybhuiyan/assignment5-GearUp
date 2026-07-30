"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/actions/user.actions";
import { initialActionState } from "@/lib/action-state";
import { useActionToast } from "@/hooks/use-action-toast";
import type { User } from "@/lib/types";

export function ProfileForm({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(updateProfile, initialActionState);
  useActionToast(state);

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input value={user.email} disabled />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" name="fullName" defaultValue={user.fullName} required />
        {state.fieldErrors?.fullName && (
          <p className="text-sm text-destructive">{state.fieldErrors.fullName}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" defaultValue={user.phone} required />
        {state.fieldErrors?.phone && <p className="text-sm text-destructive">{state.fieldErrors.phone}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" defaultValue={user.address ?? ""} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="profilePicture">Profile picture URL</Label>
        <Input id="profilePicture" name="profilePicture" defaultValue={user.profilePicture ?? ""} />
        {state.fieldErrors?.profilePicture && (
          <p className="text-sm text-destructive">{state.fieldErrors.profilePicture}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
