"use server";

import { Resend } from "resend";
import { jsPDF } from "jspdf";
import { connectDB } from "@/lib/db";
import  Product  from "@/lib/models/Product";
import { Order } from "@/lib/models/Orders";
import { getAcquisitionTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Updated Interface to include tx_ref from Flutterwave
interface FlutterwaveResponse {
  status: string;
  message: string;
  data: {
    status: string;
    amount: number;
    tx_ref: string; // The reference you generated (e.g., AVR-1768...)
    customer: {
      name: string;
      email: string;
      phone_number: string;
    };
  };
}

export async function verifyPayment(transactionId: string, archiveItems: any[]) {
  try {
    // 2. Validate Transaction with Flutterwave
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data: FlutterwaveResponse = await response.json();

    if (data.status !== "success" || data.data.status !== "successful") {
      console.error("FLW_VERIFICATION_FAILED:", data.message);
      return { success: false, error: "Payment verification failed." };
    }

    // 3. Database Operations
    await connectDB();

    const itemIds = archiveItems.map((item) => item.id || item._id);

    // 4. Atomic Update: Mark as sold and Create Order
    // FIXED: Using 'tx_ref' instead of 'flw_ref' to satisfy Mongoose validation
    await Promise.all([
      Product.updateMany({ _id: { $in: itemIds } }, { $set: { isSold: true } }),
      Order.create({
        items: itemIds,
        amount: data.data.amount,
        customerName: data.data.customer.name,
        customerEmail: data.data.customer.email,
        customerPhone: data.data.customer.phone_number,
        status: "SUCCESS",
        tx_ref: data.data.tx_ref, // This fixes the 'Path tx_ref is required' error
        flw_id: transactionId,    // Storing the numeric ID as a backup
      }),
    ]);

    // 5. Document Generation (PDF)
    const doc = new jsPDF();
    doc.setFont("courier");
    doc.setFontSize(10);
    
    doc.text("AVIORÉ_ARCHIVE_COMMAND // OFFICIAL_MANIFEST", 10, 20);
    doc.text("------------------------------------------", 10, 25);
    doc.text(`TRANSACTION_ID: ${transactionId}`, 10, 35);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 10, 42);
    doc.text(`HOLDER: ${data.data.customer.name}`, 10, 49);
    
    doc.text("ACQUIRED_SPECIMENS:", 10, 65);
    archiveItems.forEach((item, index) => {
      doc.text(`> ${item.name} [${item.brand}]`, 15, 75 + (index * 10));
      doc.text(`  VALUATION: NGN ${item.price.toLocaleString()}`, 15, 80 + (index * 10));
    });

    const yPos = 85 + (archiveItems.length * 10);
    doc.text("------------------------------------------", 10, yPos);
    doc.text(`TOTAL_VALUATION: NGN ${data.data.amount.toLocaleString()}`, 10, yPos + 10);
    doc.text("STATUS: AUTHENTICATED & COMMITTED", 10, yPos + 20);

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // 6. Dispatch Branded Email
    await resend.emails.send({
      from: "Avioré Archive <onboarding@resend.dev>",
      to: [process.env.MY_ADMIN_EMAIL!, data.data.customer.email],
      subject: `ACQUISITION_CONFIRMED: ${transactionId}`,
      html: getAcquisitionTemplate(
        data.data.customer.name,
        archiveItems,
        data.data.amount,
        transactionId
      ),
      attachments: [
        {
          filename: `AVR_MANIFEST_${transactionId}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return { success: true };

  } catch (error) {
    console.error("CRITICAL_VERIFICATION_ERROR:", error);
    return { success: false, error: "System error during verification process." };
  }
}