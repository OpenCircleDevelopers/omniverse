import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TaxonomyManager } from "@/components/admin/taxonomy/TaxonomyManager";

export default function AdminTaxonomyPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Categories & Tags"
        subtitle="Manage taxonomy used across your posts."
      />
      <TaxonomyManager />
    </div>
  );
}

