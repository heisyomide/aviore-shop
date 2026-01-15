import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Destructure phone and itemIds (from the frontend)
    const { amount, email, name, phone, itemIds } = await req.json();

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
        redirect_url: `${process.env.NEXT_PUBLIC_URL}/success`, // Point to a verification route
        customer: {
          email: email,
          name: name,
          phone_number: phone, 
        },
        // CRITICAL: We pass the IDs here so we can find them after payment
        meta: {
          customer_phone: phone,
          cart_items: itemIds.join(','), // "ID1,ID2,ID3"
        },
        customizations: {
          title: "Pay Linkmart FLW",
          description: "Unique Archival Acquisition",
        },
      }),
    });

    const data = await response.json();

    if (data.status === "success" && data.data.link) {
      return NextResponse.json({ url: data.data.link });
    } else {
      return NextResponse.json(
        { error: data.message || "Flutterwave failed" }, 
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}