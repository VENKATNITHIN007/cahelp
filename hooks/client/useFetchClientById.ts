"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import {clientWithDueDate } from "@/schemas/apiSchemas/clientSchema"

export function useFetchClientById(id: string) {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/clients/${id}`, { credentials: "include" })
      const data = await res.json()
      console.log(data)
      if (!res.ok) throw data
      return data as clientWithDueDate
    },
    enabled: !!id,
    staleTime:1000*60*5,
  })
}
