"use server";

import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { Order } from "@/lib/models/Orders"; // Corrected path and named import

export async function getShopItems() {
  try {
    await connectDB();

    // 1. Fetch all products from your collection
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .lean();

    // 2. Fetch all successful transaction IDs from your Dashboard
    // We only care about SUCCESS orders
    const successfulOrders = await Order.find({ status: "SUCCESS" })
      .select("items")
      .lean();

    // 3. Flatten the IDs of every sold item into one list of strings
    const soldItemIds = successfulOrders.flatMap((order: any) => 
      order.items.map((id: any) => id.toString())
    );

    // 4. Synchronize: If the ID is in the Dashboard orders, it is sold out.
    const synchronizedProducts = products.map((product: any) => {
      const productId = product._id.toString();
      
      return {
        ...product,
        _id: productId,
        // LOGIC: Check manual flag OR Dashboard presence
        isSold: product.isSold || soldItemIds.includes(productId)
      };
    });

    return JSON.parse(JSON.stringify(synchronizedProducts));
  } catch (error) {
    console.error("SHOP_SYNC_ERROR:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    await connectDB();
    
    const product: any = await Product.findById(id).lean();
    if (!product) return null;

    // Direct check: Does this specific ID exist in any successful dashboard order?
    const isSoldInOrders = await Order.findOne({ 
      status: "SUCCESS", 
      items: id // MongoDB handles searching within the array automatically here
    }).lean();

    const synchronizedProduct = {
      ...product,
      _id: product._id.toString(),
      isSold: product.isSold || !!isSoldInOrders
    };

    return JSON.parse(JSON.stringify(synchronizedProduct));
  } catch (error) {
    console.error("PRODUCT_FETCH_ERROR:", error);
    return null;
  }
}