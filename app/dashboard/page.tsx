"use client"

import { useFetchClients } from "@/hooks/client/useFetchClients"
import { useFetchDueDates } from "@/hooks/duedate/useFetchDueDates"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  const { data: clients } = useFetchClients()
  const { data: dueDates } = useFetchDueDates()

  const totalClients = clients?.length || 0
  const totalDueDates = dueDates?.length || 0
  const urgentDueDates = dueDates?.filter((d: any) => d.status === "Urgent").length || 0
  const notReady = dueDates?.filter((d: any) => d.status === "NotReady").length || 0

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Total Clients</CardTitle></CardHeader>
          <CardContent><p className="text-xl font-bold">{totalClients}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Due Dates</CardTitle></CardHeader>
          <CardContent><p className="text-xl font-bold">{totalDueDates}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Urgent</CardTitle></CardHeader>
          <CardContent><p className="text-xl font-bold text-red-600">{urgentDueDates}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Not Ready</CardTitle></CardHeader>
          <CardContent><p className="text-xl font-bold text-yellow-600">{notReady}</p></CardContent>
        </Card>
      </div>
    </div>
  )
}
