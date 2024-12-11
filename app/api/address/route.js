import connectDB from "@/Database/connectDB";
import Address from "@/models/Address";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { house, apartment, landmark, saveAs } = await req.json();
    console.log("Request body:", { house, apartment, landmark, saveAs });

    if (!house || !apartment || !landmark || !saveAs) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newAddress = new Address({ house, apartment, landmark, saveAs });
    await newAddress.save();

    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { error: "Failed to save address", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const addresses = await Address.find();
    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch addresses", details: error.message },
      { status: 500 }
    );
  }
}
