import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth.actions";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          GearUp
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={
              <Link href="/gear" className="text-muted-foreground hover:text-foreground">
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
                render={<Link href={`/dashboard/${user.role.toLowerCase()}`}>Dashboard</Link>}
              />
              <form action={logout}>
                <Button variant="outline" size="sm" type="submit">
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
                render={<Link href="/auth/login">Log in</Link>}
              />
              <Button size="sm" nativeButton={false} render={<Link href="/auth/register">Sign up</Link>} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
