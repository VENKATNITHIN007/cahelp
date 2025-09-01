"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { clientFormInput } from "@/lib/schemas"
import { ClientType } from "@/lib/databaseSchemas"
import { queryKeys } from "@/lib/querykeys"

export function useUpdateClient() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: clientFormInput }) => {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
      if (!res.ok) throw await res.json()
      return res.json() as Promise<ClientType>
    },
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: queryKeys.clients.all })
      qc.invalidateQueries({ queryKey: queryKeys.clients.detail(updated._id) })
    },
    retry: 0,
  })
}
