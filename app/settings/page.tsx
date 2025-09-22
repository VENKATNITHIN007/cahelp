// app/settings/page.tsx
"use client";

import Link from "next/link";
import { User, Mail, LogOut } from "lucide-react";
import LogoutButton from "@/components/auth/logout"; // create below

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Link
        href="/settings/profile"
        className="flex items-center gap-3 p-4 rounded-lg border hover:shadow-sm transition"
      >
        <User className="h-6 w-6 text-slate-700" />
        <div>
          <div className="font-medium">Profile</div>
          <div className="text-xs text-gray-500">Edit your account details</div>
        </div>
      </Link>

      <Link
        href="/settings/contact"
        className="flex items-center gap-3 p-4 rounded-lg border hover:shadow-sm transition"
      >
        <Mail className="h-6 w-6 text-slate-700" />
        <div>
          <div className="font-medium">Contact Us</div>
          <div className="text-xs text-gray-500">Send feedback or get help</div>
        </div>
      </Link>

      <div className="flex items-center gap-3 p-4 rounded-lg border">
        <LogOut className="h-6 w-6 text-slate-700" />
        <div className="flex-1">
          <div className="font-medium">Logout</div>
          <div className="text-xs text-gray-500">Sign out of your account</div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}