import { NextResponse } from "next/server";
import { AssetModel } from "@/models/Asset";

export async function GET() {
  try {
    const assets = await AssetModel.getAll();
    return NextResponse.json(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAsset = await AssetModel.create(body);
    return NextResponse.json(newAsset, { status: 201 });
  } catch (error) {
    console.error("Error creating asset:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
