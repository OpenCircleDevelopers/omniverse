"use client";

import * as React from "react";
import { Eye, FileText, TrendingUp, Users } from "lucide-react";
import { AdminStatCard } from "@/components/admin/overview/StatCard";
import { AdminLineChart } from "@/components/admin/overview/ViewsChart";
import { AdminActivityFeed } from "@/components/admin/overview/ActivityFeed";
import { getAdminOverviewMock } from "@/lib/data/admin-mock";
import { useAdminDb } from "@/lib/data/useAdminDb";

export function OverviewDashboard() {
  const { db } = useAdminDb();
  const data = React.useMemo(
    () => getAdminOverviewMock({ postsCount: db.posts.length, usersCount: db.users.length }),
    [db.posts.length, db.users.length],
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total posts"
          value={data.totalPosts.toLocaleString()}
          delta="+8%"
          icon={<FileText className="h-4 w-4" />}
        />
        <AdminStatCard
          title="Total users"
          value={data.totalUsers.toLocaleString()}
          delta="+2%"
          icon={<Users className="h-4 w-4" />}
        />
        <AdminStatCard
          title="Total views"
          value={data.totalViews.toLocaleString()}
          delta="+14%"
          icon={<Eye className="h-4 w-4" />}
        />
        <AdminStatCard
          title="Avg. engagement"
          value={`${data.engagement}%`}
          delta="+1.2%"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold tracking-tight">
                Views over time
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Dummy analytics for UI and layout.
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Last 14 days</div>
          </div>
          <div className="mt-4">
            <AdminLineChart points={data.viewsSeries} />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
          <div className="text-sm font-semibold tracking-tight">
            Recent activity
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Publishing and moderation events.
          </div>
          <div className="mt-4">
            <AdminActivityFeed items={data.activity} />
          </div>
        </div>
      </div>
    </div>
  );
}

