// components/layout/sidebar/sidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, CalendarDays, Settings as Cog, User as UserIcon, Mail as MailIcon, LogOut as LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar({
  collapsed,
  onToggleCollapsed,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onOpenSettings: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // when in /settings route, auto-show sub-menu
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  useEffect(() => {
    if (pathname?.startsWith("/settings")) setShowSettingsMenu(true);
  }, [pathname]);

  const links = [
    { href: "/dashboard", label: "Dashboard", Icon: Home },
    { href: "/clients", label: "Clients", Icon: Users },
    { href: "/duedates", label: "Due Dates", Icon: CalendarDays },
  ];

  const activeFor = (href: string) => pathname?.startsWith(href);

  const handleNav = (href: string) => {
    setShowSettingsMenu(false);
    router.push(href);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-3 py-4 border-b flex items-center justify-between">
        <Link href="/" className={cn("font-semibold", collapsed ? "text-sm" : "")}>
          {collapsed ? "YA" : "YourApp"}
        </Link>

        <button
          onClick={onToggleCollapsed}
          className="hidden md:inline-flex p-1 rounded hover:bg-gray-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          type="button"
        >
          <svg className={cn("h-4 w-4 transform", collapsed ? "rotate-180" : "")} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((l) => {
          const active = activeFor(l.href);
          const Icon = l.Icon;
          return (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={cn(
                "flex items-center gap-3 w-full text-left rounded-md px-3 py-2 text-sm",
                active ? "bg-sky-100 text-sky-800" : "text-slate-700 hover:bg-slate-100"
              )}
              type="button"
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{l.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        {/* Settings toggle */}
        <div>
          <button
            onClick={() => setShowSettingsMenu((s) => !s)}
            className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            type="button"
            aria-expanded={showSettingsMenu}
          >
            <Cog className="h-4 w-4" />
            {!collapsed && <span>Settings</span>}
          </button>
        </div>

        {showSettingsMenu && (
          <div className="mt-3 space-y-2">
            <button
              onClick={() => handleNav("/settings/profile")}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              type="button"
            >
              <UserIcon className="h-4 w-4" />
              {!collapsed && <span>Profile</span>}
            </button>

            <button
              onClick={() => handleNav("/settings/contact")}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              type="button"
            >
              <MailIcon className="h-4 w-4" />
              {!collapsed && <span>Contact</span>}
            </button>

            <button
              onClick={() => (location.href = "/api/auth/signout")}
              className="w-full text-left flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              type="button"
            >
              <LogOutIcon className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}