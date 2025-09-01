"use client"

import { useDeleteClient } from "@/hooks/client/useDeleteClient"
import { useFetchClients } from "@/hooks/client/useFetchClients"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClientFormDialog } from "@/components/dialogs/ClientFormDialog"
import { DueDateFormDialog } from "@/components/dialogs/DueDateFormDialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import Link from "next/link"

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useFetchClients()
  const deleteMutation = useDeleteClient()

  if (isLoading) return <p>Loading clients...</p>
  if (error) return <p>Failed to load clients ❌</p>

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <ClientFormDialog /> {/* Add client button */}
      </div>

      {/* Client cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients?.map((client: any) => (
          <Card key={client._id} className="shadow p-4">
            <CardHeader>
              <CardTitle>{client.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <p>{client.phoneNumber || "No phone"}</p>
              <p>{client.email || "No email"}</p>

              {/* Action buttons */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <Link href={`/clients/${client._id}`}>
                  <Button variant="secondary">View</Button>
                </Link>

                <ClientFormDialog client={client} /> {/* Edit */}

                <DueDateFormDialog clientId={client._id} /> {/* Add Due Date */}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete client?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the client and related due dates.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteMutation.mutate(client._id, {
                            onSuccess: () => toast("Client deleted ✅"),
                            onError: () => toast("Delete failed ❌"),
                          })
                        }
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
