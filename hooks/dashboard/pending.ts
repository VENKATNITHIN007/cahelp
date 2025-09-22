"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys";
import { GroupedDue } from "@/schemas/apiSchemas/dueDateSchema";

export function useFetchNotReady() {
  return useQuery({
    queryKey: queryKeys.dashboard.pending, // ["notReady"]
    queryFn: async (): Promise<GroupedDue[]> => {
      const res = await fetch("/api/duedate/pending", { credentials: "include" });
      const json = await res.json();
      if (!res.ok) throw json;
      return json as GroupedDue[];
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}