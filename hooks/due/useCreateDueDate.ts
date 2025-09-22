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
      if (!res.ok) throw await res.json()
      return res.json() as Promise<DueType[]>
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.dues.all })
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.counts })
    },
    retry: 0,
  })
}


