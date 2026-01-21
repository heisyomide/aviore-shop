"use server";

import jsPDF from "jspdf";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { Order } from "@/lib/models/Orders";
import { transporter } from "@/lib/mailer"; // Your Nodemailer transporter
import { generateReceiptHTML } from "@/lib/email-templates"; // The receipt template built earlier

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
  price: number; // Added price for receipt calculations
  lotNumber?: string;
}

export async function verifyPayment(
  transactionId: string,
  flutterwaveData: FlutterwaveData,
  archiveItems: ArchiveItem[]
) {
  try {
    await connectDB();

    // 1. Validate and Convert IDs
    const itemIds = archiveItems.map((item) => {
      const id = item._id || item.id;
      if (!id) throw new Error("CRITICAL_ERROR: Missing_Item_Identity");
      return new mongoose.Types.ObjectId(id);
    });

    if (itemIds.length === 0) throw new Error("ERROR: Empty_Payload");

    // 2. Database Operations: Mark as Sold & Create Order
    const updateResult = await Product.updateMany(
      { _id: { $in: itemIds }, isSold: false },
      { $set: { isSold: true } }
    );

    const order = await Order.create({
      items: itemIds,
      amount: flutterwaveData.amount,
      customerName: flutterwaveData.customer.name,
      customerEmail: flutterwaveData.customer.email,
      customerPhone: flutterwaveData.customer.phone_number,
      status: "SUCCESS",
      tx_ref: flutterwaveData.tx_ref,
      flw_id: transactionId,
    });

    // 3. Generate Official PDF Manifest
    const doc = new jsPDF();
    doc.setFont("courier", "bold");
    doc.text("AVIORÉ_ARCHIVE_COMMAND // OFFICIAL_MANIFEST", 10, 20);
    
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text(`TRANSACTION_REF: ${flutterwaveData.tx_ref}`, 10, 30);
    doc.text(`HOLDER: ${flutterwaveData.customer.name.toUpperCase()}`, 10, 35);
    doc.text(`DATE: ${new Date().toISOString()}`, 10, 40);
    
    doc.text("--------------------------------------------------", 10, 50);
    
    let yPos = 60;
    archiveItems.forEach((item, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${index + 1}. [${item.brand}] ${item.name}`, 15, yPos);
      yPos += 10;
    });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // 4. Generate & Send Email via Nodemailer
    const receiptHtml = generateReceiptHTML({
      customerName: flutterwaveData.customer.name,
      orderId: flutterwaveData.tx_ref,
      items: archiveItems,
      total: flutterwaveData.amount,
      shippingAddress: "Contact Holder for Dispatch Details" // Or pull from meta if available
    });

    await transporter.sendMail({
      from: `"AVIORÉ ARCHIVE" <${process.env.EMAIL_USER}>`,
      to: [process.env.ADMIN_EMAIL!, flutterwaveData.customer.email],
      subject: `[MANIFEST] ACQUISITION_CONFIRMED: ${flutterwaveData.tx_ref}`,
      html: receiptHtml,
      attachments: [
        {
          filename: `AVR_MANIFEST_${flutterwaveData.tx_ref}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return { success: true, orderId: order._id };

  } catch (error) {
    console.error("VERIFICATION_SYSTEM_FAILURE:", error);
    return { 
      success: false, 
      error: (error as Error).message || "Internal_Archive_Error" 
    };
  }
}