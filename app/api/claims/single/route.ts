// pages/api/claims.ts
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import Claim from "@/models/Claim";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type claimProps = {
  _id: string;
  user: string;
  status: string;
  title: string;
  description: string;
  subscription: string;
  path: string;
}[];

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const claimId = searchParams.get("claim");

    const claims: claimProps = await Claim.find({ _id: claimId }).sort({
      createdAt: -1,
    });

    if (!claims) {
      return NextResponse.json(
        {
          status: false,
          message: "No claims found.",
        },
        { status: 500 }
      );
    }

    const claimsData: any = [];
    for (let i = 0; i < claims.length; i++) {
      const claim = claims[i];
      const service = await Service.findById(claim.subscription);
      const user = await User.findById(claim.user);
      claimsData.push({
        _id: claim._id,
        status: claim.status,
        path: claim.path,
        user: {
          id: user._id as string,
          name: user.name as string,
          email: user.email as string,
        },
        title: claim.title,
        description: claim.description,
        service: service,
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
