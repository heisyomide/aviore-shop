"use server";

import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Orders";

export async function getOrders() {
  try {
    await connectDB();
    // Fetch orders, populate item details, and sort by newest first
    const orders = await Order.find({})
      .populate("items")
      .sort({ createdAt: -1 })
      .lean();
      
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("FETCH_ORDERS_ERROR:", error);
    return [];
  }
}