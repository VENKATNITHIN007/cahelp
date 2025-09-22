"use client";

import React from "react";
import Link from "next/link";
import { useFetchDashboard } from "@/hooks/dashboard/counts"; // adjust path if needed

export default function DashboardCountsPage() {
  const { data: counts, isLoading, isError } = useFetchDashboard();

  const cards = [
    { key: "totalClients", label: "Total Clients", href: "/clients" },
    { key: "totalDueDates", label: "Total Due Dates", href: "/duedates" },
    { key: "urgent", label: "Urgent (3 days)", href: "/dashboard/work?filter=urgent" },
    { key: "passed", label: "Overdue", href: "/dashboard/work?filter=passed" },
    { key: "pending", label: "pending", href: "/dashboard/pending" },
    { key: "completed", label: "Completed", href: "/dashboard/work?filter=completed" },
  ] as const;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Dashboard</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: cards.length }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
            ))
          : isError || !counts
          ? (
            <div className="col-span-full p-4 rounded-lg border text-red-600">
              Failed to load counts
            </div>
          )
          : (
            cards.map((c) => (
              <Link key={c.key} href={c.href}>
                <div
                  className="
                    rounded-xl border p-4 h-24 flex flex-col justify-between
                    bg-white
                    transition
                    hover:bg-gray-50 hover:shadow-md hover:-translate-y-1
                    active:scale-95
                  "
                >
                  <div className="text-sm text-gray-500">{c.label}</div>
                  <div className="text-2xl font-semibold">{(counts as any)[c.key] ?? 0}</div>
                </div>
              </Link>
            ))
          )}
      </section>
    </div>
  );
}