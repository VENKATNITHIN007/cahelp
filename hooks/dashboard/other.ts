"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys";

type RouteKey = "urgent" | "passed"  | "completed";

/**
 * Fetch list for the given dashboard route.
 * - route must match your backend endpoints: /api/duedate/{route}
 */
export function useFetchOtherDueDates(route: RouteKey) {
  // map route -> query key already defined in queryKeys.dashboard
  const queryKey = (() => {
    switch (route) {
      case "urgent": return queryKeys.dashboard.urgent;
      case "passed": return queryKeys.dashboard.passed;
      case "completed": return queryKeys.dashboard.completed;
    }
  })();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/duedate/${route}`, { credentials: "include" });
      const json = await res.json();
      if (!res.ok) throw json;
      return json;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}