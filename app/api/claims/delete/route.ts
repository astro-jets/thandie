// pages/api/claims.ts
import dbConnect from "@/lib/db";
import Claim from "@/models/Claim";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const claimId = searchParams.get("claim");

    const operation = await Claim.findOneAndDelete({ _id: claimId });

    if (!operation) {
      return NextResponse.json(
        {
          status: false,
          message: "No claims found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Claim deleted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
