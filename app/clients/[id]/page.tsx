"use client"

import { useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DueDateFormDialog } from "@/components/dialogs/DueDateFormDialog"
import { useFetchClientById } from "@/hooks/client/useFetchClientById"
import Link from "next/link"

export default function ClientDetailsPage() {
  const { id } = useParams()
  const { data: client, isLoading, error } = useFetchClientById(id as string)

  if (isLoading) return <p>Loading client...</p>
  if (error) return <p>Failed to load client ❌</p>
  if (!client) return <p>No client found</p>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{client.name}</h1>
        <DueDateFormDialog clientId={client._id} />
      </div>

      {/* Client Info */}
      <Card>
        <CardHeader><CardTitle>Client Info</CardTitle></CardHeader>
        <CardContent>
          <p><b>Email:</b> {client.email || "N/A"}</p>
          <p><b>Phone:</b> {client.phoneNumber || "N/A"}</p>
          <p><b>Type:</b> {client.type}</p>
        </CardContent>
      </Card>

      {/* Due Dates */}
      <Card>
        <CardHeader><CardTitle>Due Dates</CardTitle></CardHeader>
        <CardContent>
          {client.dueDates?.length ? (
            <ul className="space-y-2">
              {client.dueDates.map((d: any) => (
                <li key={d._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{d.title}</p>
                    <p className="text-sm">{new Date(d.dueDate).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/duedates/${d._id}`}>
                    <Button variant="secondary">View</Button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>No due dates yet</p>}
        </CardContent>
      </Card>
    </div>
  )
}
