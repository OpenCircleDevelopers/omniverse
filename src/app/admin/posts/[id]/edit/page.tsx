import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostEditor } from "@/components/admin/posts/PostEditor";

export default function AdminEditPostPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit post"
        subtitle="Update content, status, tags, and metadata."
      />
      <PostEditor key={params.id} mode="edit" postId={params.id} />
    </div>
  );
}

