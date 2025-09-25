"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { dueFormInput } from "@/schemas/formSchemas"
import { queryKeys } from "@/lib/querykeys"
import { DueType } from "@/schemas/apiSchemas/dueDateSchema"

export function useCreateDueDate() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (data: dueFormInput ) => {
      const res = await fetch("/api/duedate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
      const payload = await res.json().catch(() => null)
      if (!res.ok) {
        const err = new Error(payload?.message ?? `Request failed: ${res.status}`)
        ;(err as any).data = payload
        ;(err as any).status = res.status
        throw err
      }

      return payload as DueType[]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.dues.all })
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.counts })
    },
    retry: 0,
  })
}


