import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { OverviewDashboard } from "@/components/admin/overview/OverviewDashboard";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Overview"
        subtitle="Quick stats, recent activity, and views trend."
      />
      <OverviewDashboard />
    </div>
  );
}

