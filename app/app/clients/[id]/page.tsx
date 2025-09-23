"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useDeleteClient } from "@/hooks/client/useDeleteClient"
import Link from "next/link"
import { ClientFormDialog } from "@/components/dialogs/ClientFormDialog"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useFetchClientById } from "@/hooks/client/useFetchClientById"


export default function ClientDetailPage() {
  const { id } = useParams()
  const deleteClientMutation = useDeleteClient()
  const { data: client, isLoading } = useFetchClientById(id as string)

  if (isLoading) return <p>Loading...</p>
  if (!client) return <p>No client found</p>

  return (
    <div className="p-6 space-y-8">
      {/* Client Info */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg">{client.name}</CardTitle>
            <div className="flex gap-2">
    {/* Edit button */}
    <ClientFormDialog client={client} />
            {/* Delete button with AlertDialog */}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {client.name}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteClientMutation.mutate(client._id, {
                onSuccess: () => {
                  toast("Client deleted ✅")
                },
              })
            }
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</CardHeader>
        <CardContent className="space-y-2 text-sm">
          {client.phoneNumber && <p>📞 {client.phoneNumber}</p>}
          {client.email && <p>✉ {client.email}</p>}
          {client.type && <p>🏷 {client.type}</p>}
        </CardContent>
      </Card>

      {/* Due Dates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Due Dates</h2>
        {client.dueDates.length === 0 ? (
          <p className="text-muted-foreground">No due dates yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {client.dueDates.map((due) => (
              <Card key={due._id} className="shadow-sm">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-base font-medium truncate">
                    {due.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-1">
                  <p>📅 {new Date(due.date).toLocaleDateString()}</p>
                  <p>Status: {due.status}</p>
                  {due.description && (
                    <p className="text-muted-foreground">{due.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Back link */}
      <Link href="/clients">
        <Button variant="outline">← Back to Clients</Button>
      </Link>
    </div>
  )
}