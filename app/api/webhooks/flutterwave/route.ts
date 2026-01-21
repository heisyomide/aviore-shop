import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Orders";
import Product from "@/lib/models/Product";
import { verifyPayment } from "@/app/actions/verify";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    // 1. Security Check
    const signature = req.headers.get("verif-hash");
    if (!signature || signature !== process.env.FLW_WEBHOOK_HASH) {
      return new Response("UNAUTHORIZED_SIGNATURE", { status: 401 });
    }

    const payload = await req.json();

    // 2. Only process successful events
    if (payload.event === "charge.completed" || payload.status === "successful") {
      await connectDB();

      // 3. Idempotency: Check if the Redirect Route already handled this
      const existingOrder = await Order.findOne({ flw_id: payload.id.toString() });
      if (existingOrder) {
        console.log(`[WEBHOOK] Order ${payload.tx_ref} already processed by redirect.`);
        return NextResponse.json({ status: "ALREADY_PROCESSED" });
      }

      // 4. Data Preparation
      // Extract IDs from meta (sent from your checkout route)
      const cartItemsStr = payload.meta?.cart_items || "";
      const itemIds = cartItemsStr
        .split(",")
        .filter(Boolean)
        .map((id: string) => new mongoose.Types.ObjectId(id.trim()));

      if (itemIds.length === 0) {
        console.error("[WEBHOOK] No item IDs found in meta");
        return new Response("META_DATA_MISSING", { status: 400 });
      }

      // Fetch products for the PDF/Email
      const archiveItems = await Product.find({ _id: { $in: itemIds } })
        .select("name brand _id price")
        .lean();

      // 5. Execute Core Logic (Mark Sold, Send Email, Generate PDF)
      // We pass the payload through as 'flutterData'
      const result = await verifyPayment(payload.id.toString(), payload, archiveItems);

      if (result.success) {
        console.log(`[WEBHOOK] Order ${payload.tx_ref} successfully finalized.`);
      } else {
        throw new Error(result.error || "Action_Execution_Failed");
      }
    }

    return NextResponse.json({ status: "ACKNOWLEDGED" });

  } catch (error) {
    console.error("CRITICAL_WEBHOOK_FAILURE:", error);
    return new Response("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}