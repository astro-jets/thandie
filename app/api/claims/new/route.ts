// api/claims/new
import dbConnect from "@/lib/db";
import Claim from "@/models/Claim";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.formData();
    const file = data.get("file") as unknown as File;
    const title = data.get("title") as unknown as string;
    const description = data.get("description") as unknown as string;
    const user = data.get("user") as unknown as string;
    const subscription = data.get("subscription") as unknown as string;
    const firstName = data.get("firstName") as unknown as string;
    const lastName = data.get("lastName") as unknown as string;
    const date = data.get("date") as unknown as string;
    const location = data.get("location") as unknown as string;
    const email = data.get("email") as unknown as string;
    const phone = data.get("phone") as unknown as string;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pathToPublic = join(process.cwd(), "public", "uploads");
    const path = join(pathToPublic, file.name);
    await writeFile(path, buffer);

    console.log(`Open ${path} to view image`);
    const newClaim = new Claim({
      title,
      description,
      user,
      subscription,
      date,
      location,
      witnessName: firstName + " " + lastName,
      witnessEmail: email,
      witnessPhone: phone,
      path: file.name,
    });

    const service = await newClaim.save();
    if (service) {
      return NextResponse.json(
        {
          status: true,
          message: `Claim ${service.title} has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating service",
    });
  }
}
