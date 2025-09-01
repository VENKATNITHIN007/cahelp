"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import { ClientType } from "@/lib/databaseSchemas"

export function useFetchClientById(id: string) {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/clients/${id}`, { credentials: "include" })
      if (!res.ok) throw await res.json()
      return res.json() as Promise<ClientType>
    },
    enabled: !!id,
  })
}
