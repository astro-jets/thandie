// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import Subscription from "@/models/Subscription";
import Claim from "@/models/Claim";
import { NextResponse } from "next/server";
import Service from "@/models/Service";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const claimsCount = await Claim.countDocuments();
    const subscriptionsCount = await Subscription.countDocuments();
    const subscriptions = await Subscription.find();
    let paymentsCount = 0;
    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      const service = await Service.findById(subscription.service);
      paymentsCount += parseInt(service.price as string);
    }
    const stats = {
      claims: claimsCount,
      subscriptions: subscriptionsCount,
      payments: paymentsCount,
    };

    return NextResponse.json({ stats }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
