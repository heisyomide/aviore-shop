// app/api/payment/verify/route.ts
import { NextResponse } from "next/server";
import { verifyPayment } from "@/app/actions/verify";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transaction_id");
  const txRef = searchParams.get("tx_ref");
  const status = searchParams.get("status"); // From Flutterwave redirect

  // FIX: Flutterwave v3/payments uses "completed" on successful redirect
  // Older flows use "successful". Accept both.
  if (
    (status !== "completed" && status !== "successful") ||
    !transactionId ||
    !txRef
  ) {
    return NextResponse.redirect(
      new URL("/shop?payment=failed", process.env.NEXT_PUBLIC_URL!)
    );
  }

  try {
    await connectDB();

    // Verify the transaction directly with Flutterwave (most reliable source of truth)
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Flutterwave API error: ${response.statusText}`);
    }

    const verifyResponse = await response.json();
    const flutterData = verifyResponse.data;

    // The verify endpoint uses "successful" for paid transactions
    if (flutterData.status !== "successful") {
      return NextResponse.redirect(
        new URL("/shop?payment=failed", process.env.NEXT_PUBLIC_URL!)
      );
    }

    // Extract cart items from meta
    const cartItemsStr = flutterData.meta?.cart_items;
    if (!cartItemsStr) {
      throw new Error("No cart items found in transaction meta");
    }

    const itemIds = cartItemsStr
      .split(",")
      .map((id: string) => new mongoose.Types.ObjectId(id.trim()));

    // Fetch the full product details needed for PDF & email
    const archiveItems = await Product.find({ _id: { $in: itemIds } })
      .select("name brand _id")
      .lean();

    if (archiveItems.length === 0) {
      throw new Error("No matching products found for the purchased items");
    }

    // Perform all side effects: mark sold, create order, generate PDF, send email
    const result = await verifyPayment(transactionId, flutterData, archiveItems);

    if (!result.success) {
      console.error("verifyPayment failed:", result.error);
      return NextResponse.redirect(
        new URL(
          `/shop?payment=error&msg=${encodeURIComponent(result.error || "Processing error")}`,
          process.env.NEXT_PUBLIC_URL!
        )
      );
    }

    // All good → redirect to success page
    return NextResponse.redirect(
      new URL(`/success?payment=success&tx_ref=${txRef}`, process.env.NEXT_PUBLIC_URL!)
    );
  } catch (err) {
    console.error("Payment verify route error:", err);
    return NextResponse.redirect(
      new URL("/shop?payment=error", process.env.NEXT_PUBLIC_URL!)
    );
  }
}