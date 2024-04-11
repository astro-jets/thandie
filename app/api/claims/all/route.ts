// pages/api/claims.ts
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import Claim from "@/models/Claim";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type claimProps = {
  _id: string;
  user: string;
  title: string;
  status: string;
  description: string;
  subscription: string;
  path: string;
}[];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");

    await dbConnect();

    const claims: claimProps = await Claim.find({
      user: userId,
    }).sort({ createdAt: -1 });

    if (!claims) {
      return NextResponse.json(
        {
          status: false,
          message: "No claims found.",
        },
        { status: 500 }
      );
    }

    const trimPassage = async (story: String) => {
      const words = story.split(" ");
      const trimmedWords = words.slice(0, 8);
      const trimmedParagraph = trimmedWords.join(" ");
      return trimmedParagraph;
    };
    const claimsData: any = [];
    for (let i = 0; i < claims.length; i++) {
      const claim = claims[i];
      const service = await Service.findById(claim.subscription);
      claimsData.push({
        _id: claim._id,
        title: claim.title,
        description: await trimPassage(claim.description),
        status: claim.status,
        service: service,
        path: claim.path,
      });
    }
    return NextResponse.json({ claimsData }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
