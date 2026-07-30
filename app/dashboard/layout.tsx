import { requireUser } from "@/lib/session";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { logout } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { roleLabels } from "@/lib/status";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-lg border p-4">
          <p className="font-medium">{user.fullName}</p>
          <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
        </div>
        <DashboardSidebar role={user.role} />
        <form action={logout}>
          <Button variant="outline" size="sm" type="submit" className="w-full">
            Log out
          </Button>
        </form>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
