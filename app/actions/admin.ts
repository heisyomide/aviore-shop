"use server";

import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { Order } from "@/lib/models/Orders"; // Ensure this import matches your Order model file
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

const maxDuration = 60; 

/**
 * 1. COMMIT NEW PIECE
 */
export async function uploadPiece(formData: FormData) {
  try {
    await connectDB();

    const file = formData.get("image") as File;
    if (!file || file.size === 0) throw new Error("Missing image file");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: "aviore",
          resource_type: "auto" 
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    await Product.create({
      name: formData.get("name"),
      brand: formData.get("brand"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      description: formData.get("description"),
      images: [uploadResponse.secure_url],
      lotNumber: `AVR-${Math.floor(Math.random() * 9000 + 1000)}`,
      isSold: false,
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/shop");
    return { success: true };

  } catch (error) {
    console.error("ADMIN_UPLOAD_ERROR:", error);
    return { success: false, error: "Upload failed" };
  }
}

/**
 * 2. FETCH ORDERS (Sales Tab)
 */
export async function getOrders() {
  try {
    await connectDB();
    const orders = await Order.find()
      .populate("items")
      .sort({ createdAt: -1 })
      .lean(); 

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("FETCH_ORDERS_ERROR:", error);
    return [];
  }
}

/**
 * 3. SYNCED INVENTORY (Inventory Tab)
 * This logic ensures Inventory matches the Sales tab exactly.
 */
export async function getInventory() {
  try {
    await connectDB();

    // 1. Fetch all pieces from the manifest
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    // 2. Fetch all successful transfers from the Sales log
    const successfulOrders = await Order.find({ status: "SUCCESS" }).select("items").lean();
    
    // 3. Extract all product IDs that exist in successful orders
    const soldItemIds = successfulOrders.flatMap((order: any) => 
      order.items.map((id: any) => id.toString())
    );

    // 4. Auditor Logic: If the ID is in the sales log, force status to SOLD
    const verifiedInventory = products.map((product: any) => {
      const productId = product._id.toString();
      
      // Check if ID is in the list of items already paid for
      const isActuallySold = soldItemIds.includes(productId) || product.isSold;

      return {
        ...product,
        _id: productId,
        isSold: isActuallySold, // Force the boolean to match reality
        status: isActuallySold ? "SOLD" : "AVAILABLE" // Helper for your UI
      };
    });

    return JSON.parse(JSON.stringify(verifiedInventory));
  } catch (error) {
    console.error("INVENTORY_AUDIT_ERROR:", error);
    return [];
  }
}

/**
 * 4. UPDATE ORDER STATUS & MARK PRODUCT SOLD
 */
export async function updateOrderStatus(orderId: string) {
  try {
    await connectDB();

    const order = await Order.findById(orderId);
    if (!order) return { success: false };

    const productIds = order.items.map((i: any) =>
      typeof i === "string" ? i : i._id
    );

    // Update both Order and Product models simultaneously
    await Promise.all([
      Order.findByIdAndUpdate(orderId, { status: "SUCCESS" }),
      Product.updateMany(
        { _id: { $in: productIds } },
        { $set: { isSold: true } }
      ),
    ]);

    revalidatePath("/shop");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deletePiece(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}