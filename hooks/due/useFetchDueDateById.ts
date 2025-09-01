"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import { DueType } from "@/lib/databaseSchemas"

export function useFetchDueDateById(id: string) {
  return useQuery({
    queryKey: queryKeys.dues.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/duedate/${id}`, { credentials: "include" })
      if (!res.ok) throw await res.json()
      return res.json() as Promise<DueType>
    },
    enabled: !!id,
  })
}
