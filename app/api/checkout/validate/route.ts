import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Product from "@/lib/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { items } = await req.json(); // These are the IDs from the cart

    // Look for any item in the cart that is already marked as isSold: true
    const soldItems = await Product.find({
      _id: { $in: items },
      isSold: true,
    });

    if (soldItems.length > 0) {
      // If we find even one sold item, stop the checkout
      return NextResponse.json({
        available: false,
        unavailableItem: soldItems[0].name,
      });
    }

    // Everything is available
    return NextResponse.json({ available: true });
  } catch (err) {
    console.error("VALIDATION_ERROR:", err);
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}