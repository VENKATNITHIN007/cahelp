"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { dueFormInput } from "@/lib/schemas"
import { DueType } from "@/lib/databaseSchemas"
import { queryKeys } from "@/lib/querykeys"

export function useUpdateDueDate() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: dueFormInput }) => {
      const res = await fetch(`/api/duedate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
      if (!res.ok) throw await res.json()
      return res.json() as Promise<DueType>
    },
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: queryKeys.dues.all })
      if (updated?.clientId) {
        qc.invalidateQueries({ queryKey: queryKeys.clients.detail(updated.clientId) })
      }
    },
    retry: 0,
  })
}
