"use client"

import { useFetchClients } from "@/hooks/client/useFetchClients"
import { useDeleteClient } from "@/hooks/client/useDeleteClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClientFormDialog } from "@/components/dialogs/ClientFormDialog"
import Link from "next/link"
import { useState } from "react"
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
import type { ClientType } from "@/schemas/apiSchemas/clientSchema"

export default function ClientsPage() {
  const { data: clients, isLoading } = useFetchClients()
  const deleteClient = useDeleteClient()
  const [selected, setSelected] = useState<ClientType | null>(null)

  if (isLoading) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Clients</h1>
        <ClientFormDialog />
      </div>

      {/* Mobile: Cards */}
      <div className="grid gap-4 md:hidden">
        {clients?.map((c) => (
          <Card key={c._id} className="rounded-2xl shadow-md">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-lg">{c.name}</p>
              <p className="text-sm text-gray-600">
                {c.phoneNumber || "No phone"}
              </p>
              <p className="text-sm text-gray-600">{c.email || "No email"}</p>
              <p className="text-sm font-medium text-red-600">
                Pending Dues: {c.pendingDues}
              </p>

              <div className="flex gap-2 pt-2">
                <Link href={`/clients/${c._id}`}>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </Link>

                <ClientFormDialog client={c} />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setSelected(c)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                         Are you Sure you want to Delete {selected?.name}? , all due dates associated with client will also be deleted
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          selected &&
                          deleteClient.mutate(selected._id, {
                            onSuccess: () => setSelected(null),
                          })
                        }
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Pending Dues</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients?.map((c) => (
                <tr key={c._id} className="border-b">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.phoneNumber || "—"}</td>
                  <td className="p-3">{c.email || "—"}</td>
                  <td className="p-3 text-red-600 font-medium">
                    {c.pendingDues ?? 0}
                  </td>
                  <td className="p-3 space-x-2">
                    <Link href={`/clients/${c._id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>

                    <ClientFormDialog client={c} />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setSelected(c)}
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you Sure you want to Delete {selected?.name}? , all due dates associated with client will also be deleted
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              selected &&
                              deleteClient.mutate(selected._id, {
                                onSuccess: () => setSelected(null),
                              })
                            }
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}