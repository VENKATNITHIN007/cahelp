// components/layout/topbar/topbar.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { User, } from "lucide-react";
import LogoutConfirmButton from "@/components/auth/logout";




export default function Topbar() {
  const router = useRouter();
  const userName = "Venkat Nithin"; // replace with actual session

  return (
    <header className="hidden md:flex items-center justify-between px-4 py-3 border-b bg-white">
      <div className="text-lg font-semibold">
        Welcome, <span className="font-medium">{userName}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/settings/profile")}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md border hover:bg-gray-50"
          type="button"
        >
          <User className="h-4 w-4" /> Profile
        </button>

       < LogoutConfirmButton/>
      </div>
    </header>
  );
}