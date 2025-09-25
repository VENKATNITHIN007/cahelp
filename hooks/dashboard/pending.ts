"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys";
import { GroupedDue } from "@/schemas/apiSchemas/dueDateSchema";

export function useFetchNotReady() {
  return useQuery({
    queryKey: queryKeys.dashboard.pending, // ["notReady"]
    queryFn: async (): Promise<GroupedDue[]> => {
      const res = await fetch("/api/duedate/pending", { credentials: "include" });
     const payload = await res.json().catch(() => null)
      if (!res.ok) {
        const err = new Error(payload?.message ?? `Request failed: ${res.status}`)
        ;(err as any).data = payload
        ;(err as any).status = res.status
        throw err
      }

      return payload as GroupedDue[]
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}