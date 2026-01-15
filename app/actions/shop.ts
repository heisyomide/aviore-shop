"use server";

import { connectDB } from "@/lib/db";
import  Product  from "@/lib/models/Product";

export async function getShopItems() {
  try {
    await connectDB();
    // Fetch all products, sorted by newest first
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("SHOP_FETCH_ERROR:", error);
    return [];
  }
}
export async function getProductById(id: string) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch (error) {
    console.error("PRODUCT_FETCH_ERROR:", error);
    return null;
  }
}