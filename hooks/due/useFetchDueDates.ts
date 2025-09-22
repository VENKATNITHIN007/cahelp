"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import {GroupedDue } from "@/schemas/apiSchemas/dueDateSchema"

export function useFetchDueDates() {
  return useQuery({
    queryKey: queryKeys.dues.all,
    queryFn: async () => {
      const res = await fetch("/api/duedate", { credentials: "include" })
      const data = await res.json()
      if (!res.ok) throw await data
      return data as GroupedDue[]
    },
    staleTime:1000*60*5,
  })
}
