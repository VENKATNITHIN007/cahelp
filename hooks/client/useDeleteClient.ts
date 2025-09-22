"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"

export function useDeleteClient() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw await res.json()
      return res.json()
    },
    onSuccess: (_, id ) => {
      qc.invalidateQueries({ queryKey: queryKeys.clients.all })
      qc.invalidateQueries({ queryKey: queryKeys.clients.detail(id) })
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.counts })
    },
    retry: 0,
  })
}
