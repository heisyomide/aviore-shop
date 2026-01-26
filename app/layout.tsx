import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // Required for Flutterwave
import "./globals.css";
import { ArchiveProvider } from "@/context/ArchiveContext";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVIORÈ // QUALITY DENIM",
  description: "Independent archival fashion platform. Curating 1-of-1 artifacts and high-quality denim specimens.",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Flutterwave Standard Checkout Script */}
        <Script
          src="https://checkout.flutterwave.com/v3.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white selection:bg-white selection:text-black overflow-x-hidden`}
      >
        <ArchiveProvider>
          {/* Globally available UI components */}
          <CartDrawer />
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>

          {/* Optional: Subtle global background noise/texture for the Archive aesthetic */}
          <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </ArchiveProvider>
      </body>
    </html>
  );
}