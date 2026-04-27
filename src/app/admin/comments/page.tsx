import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CommentsTable } from "@/components/admin/comments/CommentsTable";

export default function AdminCommentsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Comments"
        subtitle="Approve, reject, and moderate discussion."
      />
      <CommentsTable />
    </div>
  );
}

