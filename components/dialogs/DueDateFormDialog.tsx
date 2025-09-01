"use client"

import { useCreateDueDate } from "@/hooks/duedate/useCreateDueDate"
import { useUpdateDueDate } from "@/hooks/duedate/useUpdateDueDate"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import DueDateForm from "../forms/DueDateForm"

export function DueDateFormDialog({ clientId, due }: { clientId: string; due?: any }) {
  const createMutation = useCreateDueDate()
  const updateMutation = useUpdateDueDate()

  const handleSubmit = (data: any) => {
    if (due) {
      updateMutation.mutate({ id: due._id, ...data })
    } else {
      createMutation.mutate({ clientId, ...data })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={due ? "secondary" : "default"}>
          {due ? "Edit Due Date" : "Add Due Date"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{due ? "Edit Due Date" : "Add New Due Date"}</DialogTitle>
        </DialogHeader>
        <DueDateForm due={due} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
