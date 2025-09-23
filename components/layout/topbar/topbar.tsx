// components/layout/Topbar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import LogoutConfirmButton from "@/components/auth/logout";
import { User, Mail, Menu, } from "lucide-react";

type TopbarProps = {
  onOpenContact?: () => void;
  onToggleSidebar?: () => void; // toggle handler (desktop)
  sidebarVisible?: boolean;     // current state (for icon/label)
};

export default function Topbar({
  onOpenContact,
  onToggleSidebar,
  sidebarVisible = true,
}: TopbarProps) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const goProfile = () => router.push("/app/user");

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target;
      if (!menuRef.current) return;
      if (target instanceof Node && !menuRef.current.contains(target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      {/* LEFT: app title + sidebar toggle (desktop) */}
      <div className="flex items-center gap-3">
        

        {/* Desktop: toggle placed where "Welcome back" was */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => onToggleSidebar?.()}
            aria-pressed={sidebarVisible}
            aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
            className="ml-2 px-2 py-1 rounded hover:bg-gray-50 flex items-center gap-2"
            type="button"
          >
          <Menu className = "h-5 w-5"/>
          </button>
        </div>
      </div>

      {/* center (kept empty for now) */}
      <div />

      {/* RIGHT: desktop actions */}
      <div className="hidden md:flex items-center gap-3">
        <button onClick={goProfile} className="px-3 py-1 rounded hover:bg-gray-50" type="button" aria-label="Open profile">
          <User className="inline-block h-4 w-4 mr-2" /> Profile
        </button>

        <button onClick={() => onOpenContact?.()} className="px-3 py-1 rounded hover:bg-gray-50" type="button" aria-label="Open contact">
          <Mail className="inline-block h-4 w-4 mr-2" /> Contact
        </button>

        <LogoutConfirmButton />
      </div>

      {/* MOBILE compact actions */}
      <div className="md:hidden relative" ref={menuRef}>
        <button onClick={() => setOpenMenu((s) => !s)} className="p-2 rounded hover:bg-gray-100" aria-label="Open menu" type="button">
          <Menu className="w-6 h-6" />
        </button>

        {openMenu && (
          <div className="absolute right-3 top-12 w-40 bg-white border rounded shadow-lg z-50">
            <button onClick={() => { setOpenMenu(false); goProfile(); }} className="w-full text-left px-4 py-2 hover:bg-slate-50" type="button">Profile</button>
            <button onClick={() => { setOpenMenu(false); onOpenContact?.(); }} className="w-full text-left px-4 py-2 hover:bg-slate-50" type="button">Contact</button>
            <div className="border-t" />
            <div className="p-2"><LogoutConfirmButton /></div>
          </div>
        )}
      </div>
    </header>
  );
}