"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import {ClientType } from "@/schemas/apiSchemas/clientSchema"

export function useFetchClients() {
  return useQuery({
    queryKey: queryKeys.clients.all,
    queryFn: async () => {
      const res = await fetch("/api/clients", { credentials: "include" })
      const data = await res.json()
      // console.log(data)
      if (!res.ok) throw data
      return data as ClientType[]
    },
    staleTime:1000*60*5,
  })
}
