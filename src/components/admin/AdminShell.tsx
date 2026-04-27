"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ToastProvider } from "@/components/admin/feedback/Toast";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide public navbar/footer in admin by rendering our own chrome.
  // Root layout still wraps the app; admin chrome visually overrides it.
  return (
    <ToastProvider>
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative flex">
            <AdminSidebar />
            <div className="min-w-0 flex-1">
              <AdminTopbar key={pathname} />
              <div className={cn("px-4 py-6 md:px-8", "lg:ml-72")}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

