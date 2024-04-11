import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(
    "/",
    "projects",
    "insurance",
    "public",
    "uploads",
    file.name
  );
  await writeFile(path, buffer);

  console.log(`Open ${path} to view image`);

  return NextResponse.json({ success: true });
}
