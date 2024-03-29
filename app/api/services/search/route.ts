import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request, res: Response) {
  try {
    await dbConnect();
    await Service.createIndexes({ name: "text" });

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("query");
    const results = await Service.find({
      $text: { $search: searchQuery ? searchQuery : "" },
    });

    // Return the result
    return NextResponse.json(results);
  } catch (e) {
    console.log("Failed to fetch Data => ", e);
    return NextResponse.json({ error: "Failed to fetch data" + e });
  }
}
