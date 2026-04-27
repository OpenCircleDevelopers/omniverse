import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { UsersTable } from "@/components/admin/users/UsersTable";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Users"
        subtitle="Manage roles, block/unblock users, and view activity stats."
      />
      <UsersTable />
    </div>
  );
}

