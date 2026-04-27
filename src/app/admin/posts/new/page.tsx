import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostEditor } from "@/components/admin/posts/PostEditor";

export default function AdminNewPostPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="New post"
        subtitle="Draft and publish a new article."
      />
      <PostEditor mode="create" />
    </div>
  );
}

