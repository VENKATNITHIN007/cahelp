import { authOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import DueDate from "@/models/DueDate";
import Client from "@/models/Client";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectionToDatabase();

    const userId = new mongoose.Types.ObjectId(session.user.id);
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);

    // Count total clients for user
    const totalClientsPromise = Client.countDocuments({ userId });

    // Dashboard counts for due dates
    const dashboardCountsPromise = await DueDate.aggregate([
      { $match: { userId } },
      {
        $facet: {
          pendingDues: [{ $match: { status: "pending" } }, { $count: "count" }],
          urgent: [{ $match: { date: { $gte: today, $lte: threeDaysLater },status: "pending" }, }, { $count: "count" }],
          passed: [{ $match: { date: { $lt: today },status: "pending" } }, { $count: "count" }],
          completed: [{ $match: { status: "completed" } }, { $count: "count" }]
        }
      }
    ]);

    const [totalClients, dashboardCounts] = await Promise.all([totalClientsPromise, dashboardCountsPromise]);

    const counts = dashboardCounts[0];

    return NextResponse.json({
      totalClients: totalClients || 0,
      pendingDues: counts.pendingDues[0]?.count || 0,
      urgent: counts.urgent[0]?.count || 0,
      passed: counts.passed[0]?.count || 0,
      completed: counts.completed[0]?.count || 0
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}