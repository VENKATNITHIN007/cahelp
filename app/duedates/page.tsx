// // display all duedates with status and delete optimistically
// "use client"

// import { useFetchDueDates } from "@/hooks/due/useFetchDueDates"
// import { useDeleteDueDate } from "@/hooks/due/useDeleteDueDate"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { toast } from "sonner"
// import { useUpdateDueDateStatus } from "@/hooks/due/useUpdateDueDateStatus"

// export default function DueDatesPage() {
//   const { data: dueDates, isLoading, error } = useFetchDueDates()
//   const updateStatus = useUpdateDueDateStatus()
//   const deleteDueDate = useDeleteDueDate()

//   if (isLoading) return <p>Loading due dates...</p>
//   if (error) return <p>Failed to load due dates ❌</p>

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">All Due Dates</h1>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {dueDates?.map((d: any) => (
//           <Card key={d._id} className="shadow">
//             <CardHeader>
//               <CardTitle>{d.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p><b>Client:</b> {d.client?.name || "N/A"}</p>
//               <p><b>Status:</b> {d.status}</p>
//               <p><b>Date:</b> {new Date(d.dueDate).toLocaleDateString()}</p>

//               <div className="flex gap-2 mt-4 flex-wrap">
//                 <Button onClick={() =>
//                   updateStatus.mutate({ id: d._id, status: "Ready" },
//                     { onSuccess: () => toast("Status updated ✅") })
//                 }>
//                   Ready
//                 </Button>
//                 <Button onClick={() =>
//                   updateStatus.mutate({ id: d._id, status: "NotReady" },
//                     { onSuccess: () => toast("Status updated ✅") })
//                 }>
//                   Not Ready
//                 </Button>
//                 <Button onClick={() =>
//                   updateStatus.mutate({ id: d._id, status: "Completed" },
//                     { onSuccess: () => toast("Status updated ✅") })
//                 }>
//                   Completed
//                 </Button>

//                 <Link href={`/duedates/${d._id}`}>
//                   <Button variant="secondary">View</Button>
//                 </Link>

//                 <Button variant="destructive"
//                   onClick={() =>
//                     deleteDueDate.mutate(d._id, {
//                       onSuccess: () => toast("Due date deleted ✅"),
//                       onError: () => toast("Delete failed ❌"),
//                     })
//                   }>
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

