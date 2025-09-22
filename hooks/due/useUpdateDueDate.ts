"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { dueFormInput} from "@/schemas/formSchemas"
import { queryKeys } from "@/lib/querykeys"
import { DueDateWithClient} from "@/schemas/apiSchemas/dueDateSchema"
// Define args clearly
type UpdateDueDateArgs = {
  dueId: string
  data: dueFormInput
}

export function useUpdateDueDate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ dueId, data }: UpdateDueDateArgs) => {
      const res = await fetch(`/api/duedate/${dueId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to update due date")
        const da = await res.json()
      return da as Partial<DueDateWithClient>
    },
    onSuccess: (_,{dueId}) => {
      // ✅ refresh due dates cache
      queryClient.invalidateQueries({ queryKey: [queryKeys.dues.all] })
      // we used _id because we are access _id from database , no need to use _id u can acess variables passed to mutation fn also , learn more on onSuccess
      queryClient.invalidateQueries({queryKey: [queryKeys.dues.detail(dueId)]})
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.counts })
    },
  })
}