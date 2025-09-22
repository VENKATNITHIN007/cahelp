"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { clientFormInput } from "@/schemas/formSchemas"


import { queryKeys } from "@/lib/querykeys"
import {ClientType } from "@/schemas/apiSchemas/clientSchema"

export function useCreateClient() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (data: clientFormInput) => {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
      if (!res.ok) throw await res.json()
      return res.json() as Promise<ClientType[]>
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.clients.all })
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.counts })
    },
    retry: 0,
  })
}
