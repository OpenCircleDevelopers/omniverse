import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AnalyticsDashboard } from "@/components/admin/analytics/AnalyticsDashboard";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Analytics"
        subtitle="Views, traffic overview, and content performance."
      />
      <AnalyticsDashboard />
    </div>
  );
}

