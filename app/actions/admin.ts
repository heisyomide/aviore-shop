"use server";

import  {connectDB}  from "@/lib/db";
import  Product  from "@/lib/models/Product";
import  {Order}  from "@/lib/models/Orders";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

// REMOVED 'export' - Internal configuration is allowed, 
// but it cannot be exported from a "use server" file.
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

    revalidatePath("/admin");
    revalidatePath("/shop");
    return { success: true };

  } catch (error) {
    console.error("ADMIN_UPLOAD_ERROR:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown server error" 
    };
  }
}

/**
 * 2. FETCH ORDERS
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
 * 3. UPDATE ORDER STATUS
 */




export async function updateOrderStatus(orderId: string) {
  try {
    await connectDB();

    const order = await Order.findById(orderId);
    if (!order) return { success: false, error: "ORDER_NOT_FOUND" };

    // ✅ FIX: Extract IDs safely whether they are strings or objects
    const productIds = order.items.map((item: any) =>
      typeof item === "string" ? item : (item._id || item.productId)
    );

    // Run updates in parallel for speed
    await Promise.all([
      // 1. Mark Order as Success
      Order.findByIdAndUpdate(orderId, { $set: { status: "SUCCESS" } }),

      // 2. Mark Products as Sold (This is what removes them from the Shop)
      Product.updateMany(
        { _id: { $in: productIds } },
        { $set: { isSold: true } }
      ),
    ]);

    // ✅ REVALIDATE: Force Next.js to clear the cache for all affected pages
    revalidatePath("/", "layout"); // Clears everything (safest)
    revalidatePath("/shop");       // Updates the shop listing
    revalidatePath("/admin/dashboard"); // Updates the admin view

    return { success: true };
  } catch (error) {
    console.error("SYNC_ERROR:", error);
    return { success: false, error: "DATABASE_UPDATE_FAILED" };
  }
}
// Add this to your existing server actions file
export async function getInventory() {
  try {
    await connectDB();
    // Using .lean() and no-cache ensures you get the latest true/false status
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
}
;

// Existing actions...

export async function deletePiece(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("DELETE_ERROR:", error);
    return { success: false, error: "Failed to delete piece" };
  }
}