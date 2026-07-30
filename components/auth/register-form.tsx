"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { register } from "@/actions/auth.actions";
import { initialActionState } from "@/lib/action-state";
import { useActionToast } from "@/hooks/use-action-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    register,
    initialActionState
  );
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";

  useActionToast(state);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border/60 bg-card/60 p-6 shadow-lg backdrop-blur-xl sm:p-8">
      {/* Form Header */}
      <div className="mb-6 text-center space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="text-xs text-muted-foreground">
          Join us today to rent or list your photography gear
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        {/* Full Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="fullName"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              required
              autoComplete="name"
              className="pl-9 bg-background/80 h-10 border-border/80 focus-visible:ring-1"
            />
          </div>
          {state.fieldErrors?.fullName && (
            <p className="text-xs font-medium text-destructive">
              {state.fieldErrors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
              className="pl-9 bg-background/80 h-10 border-border/80 focus-visible:ring-1"
            />
          </div>
          {state.fieldErrors?.email && (
            <p className="text-xs font-medium text-destructive">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label
            htmlFor="phone"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
              autoComplete="tel"
              className="pl-9 bg-background/80 h-10 border-border/80 focus-visible:ring-1"
            />
          </div>
          {state.fieldErrors?.phone && (
            <p className="text-xs font-medium text-destructive">
              {state.fieldErrors.phone}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              className="pl-9 pr-10 bg-background/80 h-10 border-border/80 focus-visible:ring-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {state.fieldErrors?.password && (
            <p className="text-xs font-medium text-destructive">
              {state.fieldErrors.password}
            </p>
          )}
        </div>

        {/* Role Select */}
        <div className="space-y-1.5">
          <Label
            htmlFor="role"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            I want to
          </Label>
          <div className="relative">
            <Select name="role" defaultValue="CUSTOMER">
              <SelectTrigger
                id="role"
                className="w-full bg-background/80 h-10 border-border/80 focus:ring-1"
              >
                <SelectValue placeholder="Select your account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-primary" />
                    <span>Rent gear as a Customer</span>
                  </div>
                </SelectItem>
                <SelectItem value="PROVIDER">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-primary" />
                    <span>List gear as a Provider</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {state.fieldErrors?.role && (
            <p className="text-xs font-medium text-destructive">
              {state.fieldErrors.role}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 text-sm font-medium shadow-md transition-all gap-2 mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer Link */}
      <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border/40 pt-4">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}