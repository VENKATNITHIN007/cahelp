"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/querykeys"

export function useDeleteDueDate() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/duedate/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw await res.json()
      return res.json()
    },
    onSuccess: (deleted) => {
      qc.invalidateQueries({ queryKey: queryKeys.dues.all })
      if (deleted?.clientId) {
        qc.invalidateQueries({ queryKey: queryKeys.clients.detail(deleted.clientId) })
      }
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.counts })
    },
    retry: 0,
  })
}
