// import { authOptions } from "@/lib/auth";
// import { connectionToDatabase } from "@/lib/db";
// import DueDate from "@/models/DueDate";
// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectionToDatabase();

//     const grouped = await DueDate.aggregate([
//       { $match: { userId: new mongoose.Types.ObjectId(session.user.id), status: "pending" } },
//       {
//         $lookup: {
//           from: "clients",
//           localField: "clientId",
//           foreignField: "_id",
//           as: "client",
//         },
//       },
//       { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
//       { $sort: { date: -1 } },
//       {
//         $group: {
//           _id: { year: { $year: "$date" }, month: { $month: "$date" } },
//           dues: {
//             $push: {
//               _id: "$_id",
//               title: "$title",
//               date: "$date",
//               status: "$status",
//               clientName: "$client.name",
//               phoneNumber:"$client.phoneNumber",
//               email:"$client.email"
//             },
//           },
//         },
//       },
//       { $sort: { "_id.year": -1, "_id.month": -1 } },
//       { $project: { _id: 0, year: "$_id.year", month: "$_id.month", dues: 1 } },
//     ]);

//     return NextResponse.json(grouped, { status: 200 });
//   } catch (err) {
//     console.error("GET completed error:", err);
//     return NextResponse.json({ error: "Failed to fetch completed dates" }, { status: 500 });
//   }
// }