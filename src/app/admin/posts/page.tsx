import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostsTable } from "@/components/admin/posts/PostsTable";
import Link from "next/link";

export default function AdminPostsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Posts"
        subtitle="Create, edit, publish, and manage your content."
        right={
          <Link
            href="/admin/posts/new"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5"
          >
            New post
          </Link>
        }
      />
      <PostsTable />
    </div>
  );
}

