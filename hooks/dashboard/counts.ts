"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys";

type DashboardCounts = {
  totalClients: number;
  totalDueDates: number;
  urgent: number;
  passed: number;
  pending: number;
  completed: number;
};

export function useFetchDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard?.counts ?? ["dashboard-counts"],
    queryFn: async (): Promise<DashboardCounts> => {
      const res = await fetch("/api/dashboard", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw data;
      return data as DashboardCounts;
    },
    staleTime: 1000 * 60 * 2,
  });
}
