import { Package, ClipboardList, Activity } from "lucide-react";
import { requireRole } from "@/lib/session";
import { apiGetList } from "@/lib/server-api";
import { getProviderGear } from "@/lib/provider-gear";
import { StatCard } from "@/components/dashboard/stat-card";
import type { RentalOrder } from "@/lib/types";

export default async function ProviderDashboardPage() {
  const user = await requireRole("PROVIDER");

  const [{ meta: gearMeta }, { items: orders, meta: ordersMeta }] = await Promise.all([
    getProviderGear(user.id, { page: 1, limit: 1 }),
    apiGetList<RentalOrder>("/provider/orders", { searchParams: { page: 1, limit: 100 } }),
  ]);

  const pendingOrders = orders.filter((o) => o.status === "PLACED").length;
  const activeRentals = orders.filter((o) =>
    ["CONFIRMED", "PAID", "PICKED_UP"].includes(o.status)
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Provider Overview</h1>
        <p className="text-sm text-muted-foreground">Snapshot of your listings and orders.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Gear Listed" value={gearMeta.total} icon={Package} />
        <StatCard label="Active Rentals" value={activeRentals} icon={Activity} />
        <StatCard label="Pending Orders" value={pendingOrders} icon={ClipboardList} />
      </div>
      <p className="text-sm text-muted-foreground">
        Counts based on your {ordersMeta.total} most recent orders.
      </p>
    </div>
  );
}
