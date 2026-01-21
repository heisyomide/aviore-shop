"use server";
import { transporter } from "@/lib/mailer";

export async function sendInquiry(formData: FormData) {
  const subject = (formData.get("subject") as string) || "General_Inquiry";
  const name = (formData.get("name") as string) || "Anonymous_Holder";
  const email = (formData.get("email") as string) || "";
  const message = (formData.get("message") as string) || "";

  const isOrderSupport = subject === "Order_Support";
  const subjectLabel = subject.replace(/_/g, ' ');

  // 1. Admin Notification (The email YOU receive)
  const adminMailOptions = {
    from: `"AVIORÉ SYSTEM" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `${isOrderSupport ? '⚠️ [PRIORITY] ' : ''}[AVIORÉ ${subject}] - ${name}`,
    html: `
      <div style="background: #050505; color: #ffffff; padding: 40px; font-family: monospace; border: 1px solid #222;">
        <h2 style="text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 10px;">Inquiry_Portal // ${subjectLabel}</h2>
        <p><strong>Identity:</strong> ${name}</p>
        <p><strong>Channel:</strong> ${email}</p>
        <div style="margin-top: 20px; padding: 20px; background: #0a0a0a; border: 1px solid #111;">
          <p style="color: #555;">// MESSAGE_START</p>
          <p>${message}</p>
          <p style="color: #555;">// MESSAGE_END</p>
        </div>
      </div>
    `,
  };

  // 2. Client Auto-Reply (The acknowledgment the USER receives)
  const clientMailOptions = {
    from: `"AVIORÉ ARCHIVE" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `RE: [TRANSMISSION_RECEIVED] - ${subjectLabel}`,
    html: `
      <div style="background: #000; color: #fff; padding: 50px; font-family: monospace; text-align: center;">
        <div style="max-width: 500px; margin: 0 auto; border: 1px solid #333; padding: 40px;">
          <h1 style="font-style: italic; letter-spacing: -2px;">AVIORÉ</h1>
          <div style="height: 1px; background: #222; margin: 30px 0;"></div>
          <p style="font-size: 10px; tracking: 0.2em; color: #888; text-transform: uppercase;">Acknowledge_Receipt</p>
          <p style="font-size: 13px; line-height: 1.8; margin: 20px 0;">
            Your inquiry regarding <strong>${subjectLabel}</strong> has been logged into the AVIORÉ Archive System. 
            An operative will review the data and establish contact within 24-48 hours.
          </p>
          <div style="height: 1px; background: #222; margin: 30px 0;"></div>
          <p style="font-size: 9px; color: #444; text-transform: uppercase;">Ref_ID: ${Math.random().toString(36).toUpperCase().substring(7)} // Secure_Connection_Active</p>
        </div>
      </div>
    `,
  };

  try {
    // Execute both mailings
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);
    
    return { success: true, status: "COMMUNICATION_ESTABLISHED" };
  } catch (error) {
    console.error("SYSTEM_TRANSMISSION_ERROR:", error);
    return { success: false, status: "OFFLINE" };
  }
}