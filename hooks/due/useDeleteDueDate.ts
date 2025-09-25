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
      const payload = await res.json().catch(() => null)
      if (!res.ok) {
        const err = new Error(payload?.message ?? `Request failed: ${res.status}`)
        ;(err as any).data = payload
        ;(err as any).status = res.status
        throw err
      }

      return payload 
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
