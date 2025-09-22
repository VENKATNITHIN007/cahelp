"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar/sidebar";
import Topbar from "./topbar/topbar";
import BottomBar from "./bottombar/bottombar";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  // collapsed sidebar (desktop only)
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sidebarCollapsed");
      if (raw) setCollapsed(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    } catch {}
  }, [collapsed]);

  // Settings always navigates to /settings (no sheet)
  const onOpenSettings = () => {
    router.push("/settings");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:block transition-all duration-150 border-r bg-white",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <Sidebar
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((v) => !v)}
          onOpenSettings={onOpenSettings}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Desktop topbar (no collapse props required by Topbar) */}
        <div className="hidden md:block">
          <Topbar />
        </div>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Mobile bottom bar */}
      <div className="md:hidden">
        <BottomBar onOpenSettings={onOpenSettings} />
      </div>
    </div>
  );
}