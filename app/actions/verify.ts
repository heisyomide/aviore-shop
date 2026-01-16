// app/actions/verify.ts (assuming this is the "use server" file path based on your correction)
"use server";

import { Resend } from "resend";
import jsPDF from "jspdf";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { Order } from "@/lib/models/Orders";
import { getAcquisitionTemplate } from "@/lib/email-templates";
import mongoose from "mongoose";

const resend = new Resend(process.env.RESEND_API_KEY);

interface FlutterwaveData {
  status: string;
  amount: number;
  tx_ref: string;
  customer: {
    name: string;
    email: string;
    phone_number: string;
  };
  meta: {
    cart_items: string;
  };
}

interface ArchiveItem {
  _id?: string;
  id?: string;
  name: string;
  brand: string;
}

export async function verifyPayment(
  transactionId: string,
  flutterwaveData: FlutterwaveData,
  archiveItems: ArchiveItem[]
) {
  try {
    await connectDB();

    const itemIds = archiveItems.map((item) => {
      const id = item._id || item.id;
      if (!id) throw new Error("Missing item ID");
      return new mongoose.Types.ObjectId(id);
    });

    if (itemIds.length === 0) {
      throw new Error("No items to process");
    }

    // Update products
    const updateResult = await Product.updateMany(
      { _id: { $in: itemIds }, isSold: false },
      { $set: { isSold: true } }
    );

    console.log(`Updated ${updateResult.modifiedCount} products to sold`);

    // Create Order
    await Order.create({
      items: itemIds,
      amount: flutterwaveData.amount,
      customerName: flutterwaveData.customer.name,
      customerEmail: flutterwaveData.customer.email,
      customerPhone: flutterwaveData.customer.phone_number,
      status: "SUCCESS",
      tx_ref: flutterwaveData.tx_ref,
      flw_id: transactionId,
    });

    // Generate PDF
    const doc = new jsPDF();
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text("AVIORÉ_ARCHIVE_COMMAND // OFFICIAL_MANIFEST", 10, 20);
    doc.text(`TRANSACTION_ID: ${transactionId}`, 10, 35);

    // Handle potential overflow with multiple pages
    let yPos = 75;
    archiveItems.forEach((item) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`> ${item.name} [${item.brand}]`, 15, yPos);
      yPos += 10;
    });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // Send Email
    await resend.emails.send({
      from: "Avioré Archive <onboarding@resend.dev>",
      to: [process.env.MY_ADMIN_EMAIL!, flutterwaveData.customer.email],
      subject: `ACQUISITION_CONFIRMED: ${transactionId}`,
      html: getAcquisitionTemplate(
        flutterwaveData.customer.name,
        archiveItems,
        flutterwaveData.amount,
        transactionId
      ),
      attachments: [{ filename: `AVR_MANIFEST_${transactionId}.pdf`, content: pdfBuffer }],
    });

    return { success: true };
  } catch (error) {
    console.error("Verification error:", error);
    return { success: false, error: (error as Error).message || "System error during verification." };
  }
}