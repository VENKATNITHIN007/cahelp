// "use client"

// import { useParams } from "next/navigation"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// import { DueDateFormDialog } from "@/components/dialogs/DueDateFormDialog"
// import { useFetchClientById } from "@/hooks/client/useFetchClientById"

// export default function DueDateDetailsPage() {
//   const { id } = useParams()
//   const { data: dueDate, isLoading, error } = useFetchClientById(id as string)

//   if (isLoading) return <p>Loading due date...</p>
//   if (error) return <p>Failed to load due date ❌</p>
//   if (!dueDate) return <p>No due date found</p>

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">{dueDate.title}</h1>

//       <Card>
//         <CardHeader><CardTitle>Due Date Info</CardTitle></CardHeader>
//         <CardContent>
//           <p><b>Status:</b> {dueDate.status}</p>
//           <p><b>Deadline:</b> {new Date(dueDate.dueDate).toLocaleDateString()}</p>
//           <p><b>Description:</b> {dueDate.description || "N/A"}</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader><CardTitle>Client</CardTitle></CardHeader>
//         <CardContent>
//           <p><b>Name:</b> {dueDate.client?.name}</p>
//           <p><b>Email:</b> {dueDate.client?.email}</p>
//           <p><b>Phone:</b> {dueDate.client?.phoneNumber}</p>
//         </CardContent>
//       </Card>

//  <DueDateFormDialog clientId={dueDate.clientId} due={dueDate} />

//     </div>
//   )
// }
