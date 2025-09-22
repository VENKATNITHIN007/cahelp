import { authOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import { clientFormSchema } from "@/schemas/formSchemas";
import { zodToFieldErrors } from "@/lib/zodError";
import mongoose from "mongoose";
import Client from "@/models/Client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectionToDatabase();

    const clients = await Client.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(session.user.id),
        },
      },
      {
        $lookup: {
          from: "duedates", // 👈 must be the actual MongoDB collection name (lowercase, plural by default)
          localField: "_id",
          foreignField: "clientId",
          as: "dueDates",
        },
      },
      {
        $addFields: {
          pendingDues: {
            $size: {
              $filter: {
                input: "$dueDates",
                as: "due",
                cond: { $ne: ["$$due.status", "completed"] }, // ✅ only count not completed
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          phoneNumber: 1,
          type: 1,
          email: 1,
          pendingDues: 1,
        },
      },
    ]);

    return NextResponse.json(clients,{status:200});
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = clientFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(zodToFieldErrors(parsed.error), { status: 400 });
    }

    await connectionToDatabase();

    const newClient = await Client.create({
      userId: session.user.id,
      firmId: session.user.firmId || null,
      name: parsed.data.name.trim(),
      email: parsed.data.email,
      phoneNumber: parsed.data.phoneNumber,
      type: parsed.data.type || "Individual",
    })

    return NextResponse.json(newClient, { status: 201 });
  } catch (err) {
    console.error("POST client error:", err);
    return NextResponse.json({ error: "Failed to add client" }, { status: 500 });
  }
}