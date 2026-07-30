import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth.actions";
import { 
  Dumbbell, 
  LayoutDashboard, 
  LogIn, 
  LogOut, 
  ShoppingBag 
} from "lucide-react";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <Dumbbell className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Gear
            </span>
            Up
          </span>
        </Link>


        {/* Navigation */}
        <nav className="flex items-center gap-2">

          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={
              <Link
                href="/gear"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ShoppingBag className="h-4 w-4" />
                Browse Gear
              </Link>
            }
          />


          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={
                  <Link
                    href={`/dashboard/${user.role.toLowerCase()}`}
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                }
              />

              <form action={logout}>
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="group transition-all hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Log in
                  </Link>
                }
              />

              <Button
                size="sm"
                nativeButton={false}
                className="shadow-sm transition-all hover:scale-[1.03]"
                render={
                  <Link href="/auth/register">
                    Sign up
                  </Link>
                }
              />
            </>
          )}

        </nav>

      </div>
    </header>
  );
}