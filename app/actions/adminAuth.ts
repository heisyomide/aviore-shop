"use server";

import { cookies } from "next/headers";

export async function adminLogin(password: string) {
  if (password !== process.env.ADMIN_PASSWORD) {
    return { success: false };
  }

  (await cookies()).set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });

  return { success: true };
}