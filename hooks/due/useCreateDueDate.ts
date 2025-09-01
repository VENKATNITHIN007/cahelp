"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { dueFormInput } from "@/lib/schemas"
import { DueType } from "@/lib/databaseSchemas"
import { queryKeys } from "@/lib/querykeys"

export function useCreateDueDate() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (data: dueFormInput) => {
      const res = await fetch("/api/duedate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
      if (!res.ok) throw await res.json()
      return res.json() as Promise<DueType>
    },
    onSuccess: (newDue) => {
      qc.invalidateQueries({ queryKey: queryKeys.dues.all })
      if (newDue?.clientId) {
        qc.invalidateQueries({ queryKey: queryKeys.clients.detail(newDue.clientId) })
      }
    },
    retry: 0,
  })
}
