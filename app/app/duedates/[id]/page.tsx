"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useFetchDueDateById } from "@/hooks/due/useFetchDueDateById";
import { useDeleteDueDate } from "@/hooks/due/useDeleteDueDate";
import { DueDateFormDialog } from "@/components/dialogs/DueDateFormDialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  Trash2,
  Copy as CopyIcon,
  MessageCircle,
} from "lucide-react";

function formatFriendly(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function sanitizePhoneForWa(raw?: string) {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 7 ? digits : null;
}

export default function DueDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: due, isLoading } = useFetchDueDateById(id as string);
  const deleteMutation = useDeleteDueDate();

  const [contactOpen, setContactOpen] = useState(false);

  if (isLoading) return <div className="p-4 sm:p-6">Loading…</div>;
  if (!due) return <div className="p-4 sm:p-6 text-red-600">Due date not found</div>;

  const isPending = due.status === "pending";
  const statusPillClass = isPending
    ? "bg-amber-50 text-amber-800 ring-1 ring-amber-100"
    : "bg-green-50 text-green-800 ring-1 ring-green-100";
  const statusIcon = isPending ? (
    <Clock className="text-amber-500" size={18} />
  ) : (
    <CheckCircle2 className="text-green-500" size={18} />
  );

  const client = due.client ?? {};
  const whatsappNumber = sanitizePhoneForWa(client.phoneNumber);

  const message = `Hello ${client.name ?? "Client"},\n\nPlease share the details for "${due.title}" which is due on ${formatFriendly(
    due.date
  )}.\n\nThank you.`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(due._id, {
      onSuccess: () => {
        toast.success("Due deleted");
        router.push("/app/duedates");
      },
      onError: (e: any) => toast.error(e?.error ?? "Delete failed"),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Back button - Mobile first */}
        

        {/* Header section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Due details</h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DueDateFormDialog due={due} />
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 sm:flex-initial flex items-center gap-2 border-rose-400 text-rose-900 hover:bg-rose-50"
                >
                  <Trash2 size={16} />
                  <span className="sm:hidden">Delete</span>
                  <span className="hidden sm:inline">Delete Due</span>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg sm:text-xl">
                    Delete {due.title}?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                  <AlertDialogCancel className="m-0 sm:m-0">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-rose-600 text-white hover:bg-rose-700 m-0 sm:m-0"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Main card */}
        <Card className="shadow-sm border border-slate-200">
          <CardContent className="p-0">
            {/* Due info section */}
            <div className="p-4 sm:p-6 bg-white sm:bg-gray-50 rounded-t-lg">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl text-amber-700 font-semibold leading-tight break-words">
                    {due.title}
                  </h2>
                  <p className="mt-2 sm:mt-3 text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">
                    {due.description ?? (
                      <span className="text-muted-foreground italic">
                        No description provided
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex-shrink-0 flex flex-row sm:flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusPillClass}`}
                    role="status"
                    aria-label={`status ${due.status ?? "pending"}`}
                  >
                    <span className="mr-2">{statusIcon}</span>
                    <span className="capitalize">
                      {due.status ?? "pending"}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground text-right ml-auto sm:ml-0">
                    <div className="text-xs">Due Date</div>
                    <div className="font-medium text-base">{formatFriendly(due.date)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200" />

            {/* Client info section */}
            <div className="p-4 sm:p-6 bg-white">
              <div className="flex flex-col xl:flex-row xl:items-start gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Client Information</h3>
                    <div className="text-base font-medium truncate">
                      {client.name ?? "—"}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {client.type ?? "—"}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex items-center gap-3">
                      <Phone className="text-sky-500 flex-shrink-0" size={16} />
                      <span className="truncate">{client.phoneNumber || "No phone number"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-rose-500 flex-shrink-0" size={16} />
                      <span className="truncate">{client.email || "No email"}</span>
                    </div>
                  </div>

                  {/* Contact button */}
                  <div className="mt-4 sm:mt-6">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setContactOpen(!contactOpen)}
                      className="flex items-center gap-2 text-sky-700 border-sky-300 hover:bg-sky-50 w-full sm:w-auto"
                      aria-expanded={contactOpen}
                      aria-controls="contact-panel"
                    >
                      <MessageCircle size={16} /> 
                      <span>{contactOpen ? "Hide Contact" : "Contact Client"}</span>
                    </Button>
                  </div>
                </div>

                {/* Contact panel */}
                <div className="xl:w-96 w-full">
                  {contactOpen && (
                    <div
                      id="contact-panel"
                      className="mt-4 border rounded-lg p-3 sm:p-4 space-y-3 bg-white shadow-sm"
                      role="region"
                    >
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Message Template
                        </label>
                        <textarea
                          readOnly
                          rows={5}
                          className="w-full rounded-md border p-3 text-sm whitespace-pre-wrap resize-none focus:outline-none focus:ring-2 focus:ring-sky-200"
                          value={message}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          onClick={copyToClipboard}
                          className="flex items-center gap-2 flex-1 sm:flex-initial"
                        >
                          <CopyIcon size={16} /> Copy Text
                        </Button>
                        {client.email && (
                          <Link
                            href={`mailto:${client.email}?subject=${encodeURIComponent(
                              `Regarding: ${due.title}`
                            )}&body=${encodeURIComponent(message)}`}
                            className="flex-1 sm:flex-initial"
                          >
                            <Button size="sm" variant="outline" className="w-full">
                              Send Email
                            </Button>
                          </Link>
                        )}
                        {whatsappNumber && (
                          <Link
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                              message
                            )}`}
                            className="flex-1 sm:flex-initial"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="outline" className="w-full">
                              WhatsApp
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom back button for mobile */}
        
      </div>
      <div className="mt-6 ">
          <Link href="/app/duedates" className="inline-block w-full">
            <Button variant="outline" >
              ← Back to duedates
            </Button>
          </Link>
        </div>
    </div>
    
  );
}