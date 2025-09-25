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
      
      const payload = await res.json().catch(() => null)
      if (!res.ok) {
        const err = new Error(payload?.message ?? `Request failed: ${res.status}`)
        ;(err as any).data = payload
        ;(err as any).status = res.status
        throw err
      }

      return payload 
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}