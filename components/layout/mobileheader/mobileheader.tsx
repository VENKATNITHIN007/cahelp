// components/layout/mobileHeader/mobileHeader.tsx
"use client";
import React from "react";
import { Bell } from "lucide-react";

export default function MobileHeader() {
  return (
    <div className="md:hidden flex items-center justify-between px-3 py-2 border-b bg-white">
      {/* <button
        onClick={() => onMenu?.()}
        aria-label="Open menu"
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
       
      </button> */}

      <div className="text-sm  font-bold pl-2"><span className="text-orange-400">Due</span>clock</div>

      <button
        onClick={() => { /* navigate to profile */ }}
        aria-label="Open profile"
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        <Bell className="h-5 w-5" />
      </button>
    </div>
  );
}