// app/settings/page.tsx
"use client";

import React from "react";

 // optional, fallback CSS included below
import { User, Users, CalendarDays, Mail, LogOut } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  

  const items: { id: string; title: string; desc?: string; href?: string; action?: () => void; Icon: any }[] = [
    { id: "profile", title: "Profile", desc: "Edit your name, email & password", href: "/settings/profile", Icon: User },
    { id: "clients", title: "Clients", desc: "View & manage clients", href: "/clients", Icon: Users },
    { id: "duedates", title: "Due Dates", desc: "View & manage due dates", href: "/duedates", Icon: CalendarDays },
    { id: "contact", title: "Contact & Support", desc: "Get help or send feedback", href: "/settings/contact", Icon: Mail },
    { id: "logout", title: "Logout", desc: "Sign out of your account", action: () => (location.href = "/api/auth/signout"), Icon: LogOut },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <p className="text-sm text-gray-600 mb-6">Choose what you want to manage.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it) => {
          const Icon = it.Icon;
          // If it's an href, use Link for client nav; otherwise a button for action
          return it.href ? (
            <Link key={it.id} href={it.href}>
              <a className=" p-4 rounded-lg border hover:shadow-md transition flex gap-3 items-start">
                <div className="p-2 rounded bg-slate-50">
                  <Icon className="h-6 w-6 text-slate-700" />
                </div>
                <div>
                  <div className="font-medium">{it.title}</div>
                  {it.desc && <div className="text-xs text-gray-500">{it.desc}</div>}
                </div>
              </a>
            </Link>
          ) : (
            <button
              key={it.id}
              onClick={it.action}
              className="w-full text-left p-4 rounded-lg border hover:shadow-md transition flex gap-3 items-start"
              type="button"
            >
              <div className="p-2 rounded bg-slate-50">
                <Icon className="h-6 w-6 text-slate-700" />
              </div>
              <div>
                <div className="font-medium">{it.title}</div>
                {it.desc && <div className="text-xs text-gray-500">{it.desc}</div>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}