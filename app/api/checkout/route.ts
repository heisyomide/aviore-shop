import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Parse the request body
    const { amount, email, name, phone, itemIds } = await req.json();

    // Basic validation
    if (!amount || amount <= 0 || !email || !name || !phone || !Array.isArray(itemIds) || itemIds.length === 0) {
      return NextResponse.json({ error: "Invalid or missing required fields" }, { status: 400 });
    }

    // 2. Initialize Flutterwave Payment
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: `AVR-${Date.now()}`,
        amount: amount,
        currency: "NGN",
        redirect_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/verify`, // Changed to server-side verify for security
        customer: {
          email: email,
          name: name,
          phone_number: phone,
        },
        meta: {
          customer_phone: phone,
          cart_items: itemIds.join(","), // "ID1,ID2,ID3"
        },
        customizations: {
          title: "Pay Linkmart FLW",
          description: "Unique Archival Acquisition",
        },
      }),
    });

    const data = await response.json();

    if (data.status === "success" && data.data?.link) {
      return NextResponse.json({ url: data.data.link });
    } else {
      return NextResponse.json(
        { error: data.message || "Flutterwave initialization failed" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}