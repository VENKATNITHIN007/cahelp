// app/app/dashboard/work/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteDueDate } from "@/hooks/due/useDeleteDueDate";
import { useUpdateDueStatus } from "@/hooks/due/useUpdateDueStatus";
import { useFetchOtherDueDates } from "@/hooks/dashboard/other";
import { toast } from "sonner";
import { DueType } from "@/schemas/apiSchemas/dueDateSchema";

type FilterKey = "urgent" | "passed" | "completed";
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "urgent", label: "Urgent" },
  { key: "passed", label: "Overdue" },
  { key: "completed", label: "Completed" },
];

export default function WorkPage() {
  // purely local filter (no URL, no Suspense required)
  const [filter, setFilter] = useState<FilterKey>("urgent");

  const { data, isLoading, isError, refetch } = useFetchOtherDueDates(filter);
  const items = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : data.data ?? [];
  }, [data]);

  const deleteDue = useDeleteDueDate();
  const updateStatus = useUpdateDueStatus();

  const onStatusChange = (id: string, status: string) => {
    updateStatus.mutate({ dueId: id, status }, { onSuccess: () => refetch?.() });
  };

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggleExpand = (id: string) => setExpandedId(prev => (prev === id ? null : id));

  const generateMessage = (d: DueType) => {
    const name = d.clientName ?? "Client";
    const title = d.title ?? "task";
    const dateStr = d.date ? new Date(d.date).toLocaleDateString() : "the due date";
    return `Hello ${name},\n\nThis is a reminder that the due date for "${title}" is on ${dateStr}. Please share the required details at the earliest so we can proceed.\n\nThank you.`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">DueDates</h1>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p>Loading {filter} items…</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load items</p>
      ) : items.length === 0 ? (
        <p>No {filter} due dates found.</p>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {items.map((d: any) => (
              <Card key={d._id} className="rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg truncate">{d.title}</p>
                      <p className="text-sm text-gray-600 truncate">Client: {d.clientName ?? "—"}</p>
                    </div>
                    <div className="text-sm text-gray-500 flex-shrink-0">
                      {d.date ? new Date(d.date).toLocaleDateString() : "—"}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link href={`/app/duedates/${d._id}`}>
                        <Button size="sm" variant="outline">View</Button>
                      </Link>
                      {d.status === "pending" && (
                        <Button size="sm" variant="secondary" onClick={() => toggleExpand(d._id)}>
                          Contact
                        </Button>
                      )}
                      {d.status === "completed" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete {d.title}?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  deleteDue.mutate(d._id, {
                                    onSuccess: () => refetch?.(),
                                    onError: (e: any) => toast.error(e?.error ?? "Delete failed"),
                                  })
                                }
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>

                    <div className="w-full sm:w-auto">
                      <select
                        value={d.status ?? "pending"}
                        onChange={(e) => onStatusChange(d._id, e.target.value)}
                        className="rounded border px-2 py-1 text-sm text-green-600 w-full sm:w-auto"
                      >
                        <option value="pending">pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {expandedId === d._id && (
                    <div className="mt-3 space-y-2 border-t pt-3">
                      <textarea
                        readOnly
                        rows={4}
                        className="w-full border rounded p-2 text-sm"
                        value={generateMessage(d)}
                      />
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => navigator.clipboard.writeText(generateMessage(d))}>Copy</Button>
                        {d.email && (
                          <a
                            href={`mailto:${d.email}?subject=Required Details&body=${encodeURIComponent(generateMessage(d))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="outline">Email</Button>
                          </a>
                        )}
                        {d.phoneNumber && (
                          <a
                            href={`https://wa.me/${d.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(generateMessage(d))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="outline">WhatsApp</Button>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto rounded-2xl shadow-md border">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left text-sm text-gray-600">Title</th>
                    <th className="p-3 text-left text-sm text-gray-600">Client</th>
                    <th className="p-3 text-left text-sm text-gray-600">Date</th>
                    <th className="p-3 text-left text-sm text-gray-600">Status</th>
                    <th className="p-3 text-left text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((d: any) => (
                    <tr key={d._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 align-top">{d.title}</td>
                      <td className="p-3 align-top">{d.clientName ?? "—"}</td>
                      <td className="p-3 align-top">
                        {d.date ? new Date(d.date).toLocaleDateString() : "—"}
                      </td>
                      <td className="p-3 align-top">
                        <select
                          value={d.status ?? "pending"}
                          onChange={(e) => onStatusChange(d._id, e.target.value)}
                          className="rounded border px-2 py-1 text-sm text-green-600"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-3 align-top">
                        <div className="flex items-center gap-2">
                          <Link href={`/app/duedates/${d._id}`}>
                            <Button size="sm" variant="outline">View</Button>
                          </Link>
                          {d.status === "pending" && (
                            <Button size="sm" variant="secondary" onClick={() => toggleExpand(d._id)}>
                              Contact
                            </Button>
                          )}
                          {d.status === "completed" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">Delete</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete {d.title}?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      deleteDue.mutate(d._id, {
                                        onSuccess: () => refetch?.(),
                                        onError: (e: any) => toast.error(e?.error ?? "Delete failed"),
                                      })
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>

                        {expandedId === d._id && (
                          <div className="mt-3 space-y-2 border-t pt-3">
                            <textarea
                              readOnly
                              rows={4}
                              className="w-full border rounded p-2 text-sm"
                              value={generateMessage(d)}
                            />
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" onClick={() => navigator.clipboard.writeText(generateMessage(d))}>Copy</Button>
                              {d.email && (
                                <a
                                  href={`mailto:${d.email}?subject=Required Details&body=${encodeURIComponent(generateMessage(d))}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button size="sm" variant="outline">Email</Button>
                                </a>
                              )}
                              {d.phoneNumber && (
                                <a
                                  href={`https://wa.me/${d.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(generateMessage(d))}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button size="sm" variant="outline">WhatsApp</Button>
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="pt-3">
        <Link href="/app/dashboard">
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}