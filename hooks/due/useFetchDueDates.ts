"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import {GroupedDue } from "@/schemas/apiSchemas/dueDateSchema"

export function useFetchDueDates() {
  return useQuery({
    queryKey: queryKeys.dues.all,
    queryFn: async () => {
      const res = await fetch("/api/duedate", { credentials: "include" })
      const payload = await res.json().catch(() => null)
      if (!res.ok) {
        const err = new Error(payload?.message ?? `Request failed: ${res.status}`)
        ;(err as any).data = payload
        ;(err as any).status = res.status
        throw err
      }

      return payload as GroupedDue[]
    },
    staleTime:1000*60*5,
  })
}
