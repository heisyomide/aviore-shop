// app/actions/products.ts
"use server";
import { connectDB } from "@/lib/db";
import  Product  from "@/lib/models/Product";

export async function getLiveArchive() {
  await connectDB();
  // Fetch products that are NOT sold and NOT hidden
  const products = await Product.find({ isSold: false, isArchived: false }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(products));
}

export async function getSoldArchive() {
  await connectDB();
  // This feeds your "Archives" (Museum) page
  const products = await Product.find({ isSold: true }).sort({ updatedAt: -1 });
  return JSON.parse(JSON.stringify(products));
}