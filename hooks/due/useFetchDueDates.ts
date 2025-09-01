"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import { DueType } from "@/lib/databaseSchemas"

export function useFetchDueDates() {
  return useQuery({
    queryKey: queryKeys.dues.all,
    queryFn: async () => {
      const res = await fetch("/api/duedate", { credentials: "include" })
      if (!res.ok) throw await res.json()
      return res.json() as Promise<DueType[]>
    },
  })
}
