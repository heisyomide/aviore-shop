"use server"
import {connectDB} from "@/lib/db";
import Product from "@/lib/models/Product";
import { revalidatePath } from "next/cache";

export async function verifyPayment(transactionId: string, items: any[]) {
  try {
    await connectDB();

    // 1. Get the IDs from the items in the cart
    const productIds = items.map(item => item.id || item._id);

    // 2. Flip the switch to SOLD
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { isSold: true } }
    );

    // 3. Refresh the shop so the item shows as Sold Out
    revalidatePath("/shop");
    
    return { success: true };
  } catch (error) {
    console.error("Verification failed:", error);
    return { success: false };
  }
}