import DueDateContent from "@/components/duedatecontent/duedatecontent";
import { Suspense } from "react";

export default function DueDatesPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <DueDateContent />
    </Suspense>
  );
}