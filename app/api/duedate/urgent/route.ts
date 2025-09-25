import { authOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import DueDate from "@/models/DueDate";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Get urgent due dates (next 3 days, status ignored)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectionToDatabase();

    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);

    const urgent = await DueDate.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(session.user.id),
          date: { $gte: today, $lte: threeDaysLater },
          status: "pending"
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      { $unwind: "$client" },
      {
        $project: {
          title: 1,
          date: 1,
          status: 1,
          clientName:"$client.name",
          phoneNumber:"$client.phoneNumber",
          email:"$client.email"
          
        },
      },
      { $sort: { date: 1 } },
    ]);

    return NextResponse.json(urgent);
  } catch (err) {
    console.error("GET urgent error:", err);
    return NextResponse.json({ error: "Failed to fetch urgent dates" }, { status: 500 });
  }
}
