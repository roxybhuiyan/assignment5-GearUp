import { Users, Package, ClipboardList } from "lucide-react";
import { requireRole } from "@/lib/session";
import { apiGetList } from "@/lib/server-api";
import { StatCard } from "@/components/dashboard/stat-card";
import type { User, GearItem, RentalOrder } from "@/lib/types";

export default async function AdminDashboardPage() {
  await requireRole("ADMIN");

  const [{ meta: usersMeta }, { meta: gearMeta }, { meta: rentalsMeta }] = await Promise.all([
    apiGetList<User>("/admin/users", { searchParams: { page: 1, limit: 1 } }),
    apiGetList<GearItem>("/admin/gear", { searchParams: { page: 1, limit: 1 } }),
    apiGetList<RentalOrder>("/admin/rentals", { searchParams: { page: 1, limit: 1 } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Overview</h1>
        <p className="text-sm text-muted-foreground">Platform-wide statistics.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Users" value={usersMeta.total} icon={Users} />
        <StatCard label="Total Gear Listings" value={gearMeta.total} icon={Package} />
        <StatCard label="Total Rentals" value={rentalsMeta.total} icon={ClipboardList} />
      </div>
    </div>
  );
}
