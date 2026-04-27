import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { MediaLibrary } from "@/components/admin/media/MediaLibrary";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Media Library"
        subtitle="Upload (mock), browse, and select images for posts."
      />
      <MediaLibrary />
    </div>
  );
}

