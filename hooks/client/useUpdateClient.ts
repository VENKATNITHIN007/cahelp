"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { clientFormInput } from "@/schemas/formSchemas"
import { queryKeys } from "@/lib/querykeys"
import {ClientType } from "@/schemas/apiSchemas/clientSchema"

export function useUpdateClient() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: clientFormInput }) => {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
      const da = await res.json()
      if (!res.ok) throw da
      return da as ClientType
    },
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: queryKeys.clients.all })
      qc.invalidateQueries({ queryKey: queryKeys.clients.detail(updated._id) })
    },
    retry: 0,
  })
}
