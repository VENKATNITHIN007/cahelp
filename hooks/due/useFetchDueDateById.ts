"use client"

import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"
import {DueDateWithClient } from "@/schemas/apiSchemas/dueDateSchema"


export function useFetchDueDateById(id: string) {
  return useQuery({
    queryKey: queryKeys.dues.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/duedate/${id}`, { credentials: "include" })
      const data = await res.json()
    
      if (!res.ok) throw data
      return data as DueDateWithClient
    },
    enabled: !!id,
    staleTime:1000*60*5,
  })
}
