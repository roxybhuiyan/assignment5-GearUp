import { requireRole } from "@/lib/session";
import { apiGetList } from "@/lib/server-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationNav } from "@/components/common/pagination-nav";
import { UserStatusBadge } from "@/components/dashboard/status-badge";
import { UserStatusAction } from "@/components/dashboard/user-status-action";
import { StatusFilter } from "@/components/dashboard/status-filter";
import { roleLabels } from "@/lib/status";
import { formatDate } from "@/lib/utils";
import type { User } from "@/lib/types";

interface AdminUsersPageProps {
  searchParams: Promise<{ page?: string; role?: string; status?: string }>;
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  await requireRole("ADMIN");
  const { page, role, status } = await searchParams;

  const { items: users, meta } = await apiGetList<User>("/admin/users", {
    searchParams: { page: page ?? "1", limit: 10, role, status },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">User Management</h1>
        <p className="text-sm text-muted-foreground">View and moderate all platform users.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <StatusFilter
          paramKey="role"
          placeholder="Role"
          allLabel="All roles"
          options={[
            { value: "CUSTOMER", label: "Customer" },
            { value: "PROVIDER", label: "Provider" },
            { value: "ADMIN", label: "Admin" },
          ]}
        />
        <StatusFilter
          paramKey="status"
          placeholder="Status"
          allLabel="All statuses"
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "SUSPENDED", label: "Suspended" },
          ]}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                <TableCell>{roleLabels[user.role]}</TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  {user.role === "ADMIN" ? (
                    <span className="text-sm text-muted-foreground">—</span>
                  ) : (
                    <UserStatusAction userId={user.id} status={user.status} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationNav meta={meta} basePath="/dashboard/admin/users" searchParams={{ role, status }} />
    </div>
  );
}
