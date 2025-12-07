"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Auto-recurring due dates",
      description:
        "Set how often a task repeats (monthly, quarterly, yearly or none). When you complete today’s due date, Dueclock automatically creates the next one so you never re-enter it.",
      skeleton: <SkeletonRecurrence />,
    },
    {
      title: "Filters built for real work",
      description:
        "Slice your work by label (GST, TDS, IT, fees, etc.), period (week, month, quarter) and client. Quickly focus on just today’s urgency instead of scanning long lists.",
      skeleton: <SkeletonFilters />,
    },
    {
      title: "One-click client communication",
      description:
        "From the same screen, open WhatsApp or email with a ready-made reminder linked to that due date. No copy-paste, no typing the same text again and again.",
      skeleton: <SkeletonCommunication />,
    },
    {
      title: "Web app that works everywhere",
      description:
        "Dueclock runs in the browser, adapts to mobile and desktop, and can be added to your home screen or desktop like an app. One tool that works across your devices.",
      skeleton: <SkeletonDevices />,
    },
  ];

  return (
    <section
      id="features"
      className="relative z-10 py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="text-center max-w-3xl mx-auto">
        <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-[11px] font-medium text-blue-700 mb-3">
          ✨ Built for recurring work, clear views and quick action
        </p>
        <h2 className="text-3xl lg:text-4xl tracking-tight font-semibold text-slate-900">
          What{" "}
          <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
            Dueclock
          </span>{" "}
          helps you with
        </h2>
        <p className="text-sm lg:text-base max-w-2xl mt-3 mx-auto text-slate-600">
          Instead of being “just another to-do list”, Dueclock is built around
          recurring dates, filters that match how you think, and fast client
          communication — on both mobile and desktop.
        </p>
      </div>

      <div className="mt-10 lg:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="mt-4">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-2xl bg-slate-900 text-slate-50 border border-slate-800 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-left tracking-tight text-slate-50 text-lg md:text-xl font-semibold">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-[15px] text-slate-300 text-left max-w-sm mt-2">
      {children}
    </p>
  );
};

/* SKELETONS – text/shape only, no screenshots */

const SkeletonRecurrence = () => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 p-4 border border-slate-700">
      <div className="flex items-center justify-between text-[11px] text-slate-300 mb-3">
        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700">
          GST filing – Client A
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/60">
          Monthly
        </span>
      </div>
      <div className="space-y-2 text-[11px] text-slate-200">
        <div className="flex items-center justify-between">
          <span>10 Dec — GST filing</span>
          <span className="rounded-md px-2 py-0.5 bg-slate-900 border border-slate-700">
            Pending
          </span>
        </div>
        <div className="flex items-center gap-2 text-emerald-300 mt-1">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          <span>You click “Complete”</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>10 Jan — GST filing</span>
          <span className="rounded-md px-2 py-0.5 bg-emerald-900/40 border border-emerald-700/60">
            Next due date created
          </span>
        </div>
      </div>
    </div>
  );
};

const SkeletonFilters = () => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 p-4 border border-slate-700 space-y-3">
      <div className="flex flex-wrap gap-2 text-[11px]">
        <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
          Label: GST
        </span>
        <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
          Period: This month
        </span>
        <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
          Status: Urgent
        </span>
      </div>
      <div className="space-y-1.5 text-[11px] text-slate-100">
        <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-1.5">
          <span>Client A — 10 Dec</span>
          <span className="text-red-300 text-[10px]">Overdue</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-1.5">
          <span>Client C — 12 Dec</span>
          <span className="text-amber-300 text-[10px]">Urgent</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-1.5">
          <span>Client E — 18 Dec</span>
          <span className="text-emerald-300 text-[10px]">Upcoming</span>
        </div>
      </div>
    </div>
  );
};

const SkeletonCommunication = () => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 p-4 border border-slate-700 space-y-3">
      <div className="flex gap-2 text-[11px]">
        <button className="px-3 py-1 rounded-full bg-emerald-600 text-slate-50 font-medium">
          WhatsApp
        </button>
        <button className="px-3 py-1 rounded-full bg-sky-600 text-slate-50 font-medium">
          Email
        </button>
      </div>
      <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-3 text-[11px] text-slate-100 space-y-1.5">
        <p className="text-slate-400 text-[10px]">Preview:</p>
        <p>
          Hi [Client], your GST filing is due on{" "}
          <span className="font-semibold">10 Dec</span>. Please share documents
          before <span className="font-semibold">7 Dec</span> so we can file on
          time.
        </p>
        <p className="text-[10px] text-slate-400">
          Generated from the due date and client you selected.
        </p>
      </div>
    </div>
  );
};

const SkeletonDevices = () => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 p-4 border border-slate-700 flex items-center justify-center gap-4">
      {/* Desktop frame */}
      <div className=" sm:block w-32 h-20 rounded-lg bg-slate-900 border border-slate-700 flex flex-col justify-between p-2">
        <div className="h-2 w-16 rounded-full bg-slate-700" />
        <div className="space-y-1">
          <div className="h-2 w-full rounded bg-slate-800" />
          <div className="h-2 w-3/4 rounded bg-slate-800" />
          <div className="h-2 w-2/3 rounded bg-slate-800" />
        </div>
      </div>

      {/* Mobile frame */}
      <div className="w-20 h-32 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col justify-between p-2">
        <div className="h-2 w-10 rounded-full bg-slate-700 self-center" />
        <div className="space-y-1">
          <div className="h-2 w-full rounded bg-slate-800" />
          <div className="h-2 w-4/5 rounded bg-slate-800" />
          <div className="h-2 w-3/4 rounded bg-slate-800" />
        </div>
        <div className="h-1.5 w-8 rounded-full bg-slate-700 self-center" />
      </div>
    </div>
  );
};
