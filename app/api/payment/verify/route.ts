import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { Order } from "@/lib/models/Orders";
import { verifyPayment } from "@/app/actions/verify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transaction_id");
  const txRef = searchParams.get("tx_ref");
  const status = searchParams.get("status");

  // 1. Basic Validation of Redirect Parameters
  const isValidStatus = status === "completed" || status === "successful";
  if (!isValidStatus || !transactionId || !txRef) {
    return NextResponse.redirect(new URL("/shop?payment=failed", process.env.NEXT_PUBLIC_URL!));
  }

  try {
    await connectDB();

    // 2. IDEMPOTENCY CHECK: Ensure we haven't already processed this order via Webhook
    const existingOrder = await Order.findOne({ flw_id: transactionId });
    if (existingOrder) {
      console.log(`[VERIFY_API] Order ${txRef} already processed. Redirecting to success.`);
      return NextResponse.redirect(
        new URL(`/success?payment=success&tx_ref=${txRef}`, process.env.NEXT_PUBLIC_URL!)
      );
    }

    // 3. SECURE VERIFICATION: Fetch source of truth from Flutterwave API
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("GATEWAY_COMMUNICATION_FAILURE");

    const { data: flutterData } = await response.json();

    // Double check status from the API response
    if (flutterData.status !== "successful") {
      return NextResponse.redirect(new URL("/shop?payment=failed", process.env.NEXT_PUBLIC_URL!));
    }

    // 4. DATA EXTRACTION: Parse meta and fetch Archive Items
    const cartItemsStr = flutterData.meta?.cart_items;
    if (!cartItemsStr) throw new Error("META_DATA_MISSING");

    const itemIds = cartItemsStr
      .split(",")
      .map((id: string) => new mongoose.Types.ObjectId(id.trim()));

    // Fetch products (lean for performance)
    const archiveItems = await Product.find({ _id: { $in: itemIds } })
      .select("name brand _id price")
      .lean();

    if (archiveItems.length === 0) throw new Error("ARCHIVE_ITEMS_NOT_FOUND");

    // 5. EXECUTE SIDE EFFECTS: Update DB, PDF Generation, Nodemailer Email
    const result = await verifyPayment(transactionId, flutterData, archiveItems);

    if (!result.success) {
      console.error("[VERIFY_ERROR]:", result.error);
      return NextResponse.redirect(
        new URL(`/shop?payment=error&msg=PROCESSING_FAILURE`, process.env.NEXT_PUBLIC_URL!)
      );
    }

    // 6. FINAL REDIRECT
    return NextResponse.redirect(
      new URL(`/success?payment=success&tx_ref=${txRef}`, process.env.NEXT_PUBLIC_URL!)
    );

  } catch (err) {
    console.error("CRITICAL_VERIFY_ROUTE_ERROR:", err);
    return NextResponse.redirect(
      new URL("/shop?payment=error", process.env.NEXT_PUBLIC_URL!)
    );
  }
}