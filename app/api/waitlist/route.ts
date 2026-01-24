import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Create reusable transporter
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Simple email validator
 */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Admin Notification Template
 */
function adminTemplate(email: string) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background:#f8f8f8; padding:40px;">
      <div style="max-width:600px;margin:auto;background:#fff;padding:40px;border:1px solid #eee;">

        <h2 style="letter-spacing:2px;font-weight:500;">
          AVIORÈ WAITLIST UPDATE
        </h2>

        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />

        <p style="font-size:14px;color:#333;">
          A new customer has joined your waitlist.
        </p>

        <table style="width:100%;margin-top:20px;font-size:13px;">
          <tr>
            <td style="padding:8px 0;color:#777;">Email</td>
            <td style="padding:8px 0;font-weight:bold;">${email}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;color:#777;">Collection</td>
            <td style="padding:8px 0;">Genesis No.01</td>
          </tr>

          <tr>
            <td style="padding:8px 0;color:#777;">Status</td>
            <td style="padding:8px 0;">Confirmed</td>
          </tr>
        </table>

        <p style="font-size:11px;color:#999;margin-top:40px;">
          Aviorè Internal System
        </p>

      </div>
    </div>
  `;
}

/**
 * Customer Confirmation Template
 */
function customerTemplate() {
  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#fafafa;padding:40px;">
      <div style="max-width:600px;margin:auto;background:#fff;padding:50px;border:1px solid #eee;text-align:center;">

        <h1 style="font-weight:300;letter-spacing:8px;margin:0;">
          AVIORÈ
        </h1>

        <p style="font-size:10px;letter-spacing:3px;color:#999;margin-top:5px;">
          EST. LAGOS
        </p>

        <div style="width:40px;height:2px;background:#000;margin:30px auto;"></div>

        <h2 style="font-weight:400;letter-spacing:2px;">
          Priority Access Confirmed
        </h2>

        <p style="font-size:14px;color:#555;line-height:1.8;max-width:420px;margin:20px auto;">
          Thank you for joining the Aviorè inner circle.
          <br /><br />
          You are now registered for early access to
          <strong>Genesis No.01</strong>.
        </p>

        <p style="font-size:13px;color:#777;line-height:1.6;max-width:420px;margin:20px auto;">
          You will receive a private purchase link
          24 hours before public release.
        </p>

        <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-top:30px;">
          Launch Access Coming Soon
        </p>

        <p style="font-size:10px;color:#aaa;margin-top:50px;">
          Lagos · Spain · Portugal · Archive Systems
        </p>

        <p style="font-size:9px;color:#ccc;margin-top:10px;">
          © ${new Date().getFullYear()} Aviorè. All rights reserved.
        </p>

      </div>
    </div>
  `;
}

/**
 * API Handler
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email?.trim();

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare mails
    const adminMail = {
      from: `"AVIORÈ" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Waitlist Registration",
      html: adminTemplate(email),
    };

    const customerMail = {
      from: `"AVIORÈ" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Aviorè — Priority Access Confirmed",
      html: customerTemplate(),
    };

    // Send mails
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(customerMail),
    ]);

    return NextResponse.json({
      success: true,
      message: "Waitlist registration successful",
    });

  } catch (error: any) {
    console.error("WAITLIST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}