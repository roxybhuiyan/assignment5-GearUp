"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createGear, updateGear } from "@/actions/gear.actions";
import { initialActionState } from "@/lib/action-state";
import { useActionToast } from "@/hooks/use-action-toast";
import type { Category, GearItem } from "@/lib/types";

interface GearFormProps {
  categories: Category[];
  gear?: GearItem;
}

export function GearForm({ categories, gear }: GearFormProps) {
  const action = gear ? updateGear.bind(null, gear.id) : createGear;
  const [state, formAction, isPending] = useActionState(action, initialActionState);
  useActionToast(state);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={gear?.name} required />
        {state.fieldErrors?.name && <p className="text-sm text-destructive">{state.fieldErrors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="brand">Brand</Label>
        <Input id="brand" name="brand" defaultValue={gear?.brand} required />
        {state.fieldErrors?.brand && <p className="text-sm text-destructive">{state.fieldErrors.brand}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="categoryId">Category</Label>
        <Select name="categoryId" defaultValue={gear?.categoryId}>
          <SelectTrigger id="categoryId" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.fieldErrors?.categoryId && (
          <p className="text-sm text-destructive">{state.fieldErrors.categoryId}</p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={gear?.description} required rows={4} />
        {state.fieldErrors?.description && (
          <p className="text-sm text-destructive">{state.fieldErrors.description}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pricePerDay">Price per day (USD)</Label>
        <Input
          id="pricePerDay"
          name="pricePerDay"
          type="number"
          min={0}
          step="0.01"
          defaultValue={gear ? String(gear.pricePerDay) : undefined}
          required
        />
        {state.fieldErrors?.pricePerDay && (
          <p className="text-sm text-destructive">{state.fieldErrors.pricePerDay}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="condition">Condition</Label>
        <Select name="condition" defaultValue={gear?.condition ?? "GOOD"}>
          <SelectTrigger id="condition" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="GOOD">Good</SelectItem>
            <SelectItem value="FAIR">Fair</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" name="stock" type="number" min={0} step="1" defaultValue={gear?.stock ?? 0} required />
        {state.fieldErrors?.stock && <p className="text-sm text-destructive">{state.fieldErrors.stock}</p>}
      </div>

      <div className="flex items-center gap-2 pt-6">
        <input
          id="availability"
          name="availability"
          type="checkbox"
          defaultChecked={gear?.availability ?? true}
          className="size-4 rounded border-input"
        />
        <Label htmlFor="availability">Available for rent</Label>
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="images">Image URLs (one per line)</Label>
        <Textarea
          id="images"
          name="images"
          rows={3}
          defaultValue={gear?.images?.join("\n")}
          placeholder="https://example.com/photo1.jpg"
        />
        {state.fieldErrors?.images && (
          <p className="text-sm text-destructive">{state.fieldErrors.images}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="sm:col-span-2">
        {isPending ? "Saving..." : gear ? "Save changes" : "Add gear"}
      </Button>
    </form>
  );
}
