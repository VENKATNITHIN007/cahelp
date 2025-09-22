"use client"

import { useParams, useRouter } from "next/navigation"
import { useFetchDueDateById } from "@/hooks/due/useFetchDueDateById"
import { useDeleteDueDate } from "@/hooks/due/useDeleteDueDate"
import { DueDateFormDialog } from "@/components/dialogs/DueDateFormDialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

export default function DueDetailPage() {
  const { id } =  useParams()
  const router = useRouter()

  const { data: due, isLoading } = useFetchDueDateById(id as string)
  const deleteMutation = useDeleteDueDate()

  if (isLoading) return <p>Loading...</p>
  if (!due) return <p>Due date not found</p>

  return (
    <div className="p-6 space-y-8">
      {/* Due Info */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg">{due.title}</CardTitle>
          <div className="flex gap-2">
            {/* ✅ Edit form dialog */}
            <DueDateFormDialog due={due} />
            <Button
              variant="destructive"
              onClick={() =>
                confirm("Delete this due date?") &&
                deleteMutation.mutate(due._id, {
                  onSuccess: () => {
                    toast("Due date deleted ✅")
                    router.push("/duedates")
                  },
                })
              }
            >
              Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(due.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Client:</strong>{" "}
            <Link
              href={`/clients/${due.client._id}`}
              className="text-blue-600 underline"
            >
              {due.client.name}
            </Link>
          </p>
          {due.description && (
            <p>
              <strong>Description:</strong> {due.description}
            </p>
          )}

        </CardContent>
      </Card>

      {/* Back link */}
      <Link href="/duedates">
        <Button variant="outline">← Back to Due Dates</Button>
      </Link>
    </div>
  )
}