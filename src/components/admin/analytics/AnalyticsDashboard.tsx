"use client";

import * as React from "react";
import { useAdminDb } from "@/lib/data/useAdminDb";
import { AdminLineChart } from "@/components/admin/overview/ViewsChart";

export function AnalyticsDashboard() {
  const { db } = useAdminDb();

  const topPosts = React.useMemo(
    () => [...db.posts].sort((a, b) => b.views - a.views).slice(0, 6),
    [db.posts],
  );

  const categories = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const p of db.posts) {
      map.set(p.category, (map.get(p.category) ?? 0) + p.views);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [db.posts]);

  const traffic = [12400, 13100, 11900, 14200, 15500, 14900, 16800, 17100, 18000, 17600, 19100, 20400];

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
          <div className="text-sm font-semibold tracking-tight">Traffic overview</div>
          <div className="mt-1 text-sm text-muted-foreground">Monthly dummy traffic trend.</div>
          <div className="mt-4">
            <AdminLineChart points={traffic} />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
          <div className="text-sm font-semibold tracking-tight">Most viewed categories</div>
          <div className="mt-4 space-y-3">
            {categories.map(([name, views]) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{name}</span>
                  <span className="text-muted-foreground">{views.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-muted/60">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${Math.max(8, Math.round((views / categories[0]![1]) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
        <div className="text-sm font-semibold tracking-tight">Top posts</div>
        <div className="mt-1 text-sm text-muted-foreground">Most viewed content in mock dataset.</div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="px-3 py-2 font-medium">Post</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((p) => (
                <tr key={p.id} className="border-b border-border/40">
                  <td className="px-3 py-3">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-3 py-3 text-muted-foreground">{p.status}</td>
                  <td className="px-3 py-3 font-medium">{p.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

