import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Data Extraction & Validation
    const { amount, email, name, phone, itemIds } = await req.json();

    if (!amount || amount <= 0 || !email || !name || !phone || !Array.isArray(itemIds) || itemIds.length === 0) {
      return NextResponse.json(
        { error: "VALIDATION_FAILURE: Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // 2. Initialize Flutterwave Transmission
    // We use the FLW_SECRET_KEY from your .env
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Generate a unique Archival Reference
        tx_ref: `AVR-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        amount: amount,
        currency: "NGN",
        
        // Ensure this URL is set in your .env (e.g., https://aviore.shop)
        redirect_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/verify`, 
        
        customer: {
          email: email,
          name: name,
          phone_number: phone,
        },

        // Meta data is critical for the Webhook to reconstruct the order
        meta: {
          customer_phone: phone,
          cart_items: itemIds.join(","), // Standardizing for the verify action
          system_origin: "AVIORÉ_ARCHIVE_PORTAL"
        },

        customizations: {
          title: "Pay Linkmart Flw",
          description: "AUTHENTICATED_ACQUISITION // LOT_TRANSFER",
          // Suggestion: Add your logo URL here for a professional payment page
          logo: "https://aviore.com/logo.png", 
        },
      }),
    });

    const data = await response.json();

    // 3. Handle Gateway Response
    if (data.status === "success" && data.data?.link) {
      // Return the payment link to the frontend for redirection
      return NextResponse.json({ url: data.data.link });
    } else {
      console.error("FLW_INIT_ERROR:", data.message);
      return NextResponse.json(
        { error: data.message || "GATEWAY_INITIALIZATION_FAILED" },
        { status: 400 }
      );
    }

  } catch (err) {
    console.error("CRITICAL_CHECKOUT_ERROR:", err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR: Communication link broken" }, 
      { status: 500 }
    );
  }
}