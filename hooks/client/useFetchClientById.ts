"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import {clientWithDueDate } from "@/schemas/apiSchemas/clientSchema"

export function useFetchClientById(id: string) {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/clients/${id}`, { credentials: "include" })
      const payload = await res.json().catch(() => null)
      if (!res.ok) {
        const err = new Error(payload?.message ?? `Request failed: ${res.status}`)
        ;(err as any).data = payload
        ;(err as any).status = res.status
        throw err
      }

      return payload as clientWithDueDate
    },
    enabled: !!id,
    staleTime:1000*60*5,
  })
}
