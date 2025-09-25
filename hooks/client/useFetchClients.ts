"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import {ClientType } from "@/schemas/apiSchemas/clientSchema"

export function useFetchClients() {
  return useQuery({
    queryKey: queryKeys.clients.all,
    queryFn: async () => {
      const res = await fetch("/api/clients", { credentials: "include" })
     const payload = await res.json().catch(() => null)
      if (!res.ok) {
        const err = new Error(payload?.message ?? `Request failed: ${res.status}`)
        ;(err as any).data = payload
        ;(err as any).status = res.status
        throw err
      }

      return payload as ClientType[]
    },
    staleTime:1000*60*5,
  })
}
