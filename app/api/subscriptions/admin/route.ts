// pages/api/service.ts
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

type serviceProps = {
  _id: string;
  name: string;
  price: string;
  description: string;
  list: string[];
}[];

export async function GET(req: Request) {
  try {
    await dbConnect();

    const services: serviceProps = await Service.find();
    if (!services) {
      return NextResponse.json(
        {
          status: false,
          message: "No service found.",
        },
        { status: 500 }
      );
    }

    const data: any = [];
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      const subscriptions = await Subscription.find({ service: service._id });
      data.push({
        name: service.name,
        subscriptions: subscriptions.length,
        payments: parseInt(service.price) * subscriptions.length,
      });
    }
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching subscription ${error}`,
    });
  }
}
