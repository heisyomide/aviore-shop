"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Scale, FileText, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black font-mono">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-24 border-b border-white/5 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic mb-6">
              Archive_Protocols
            </h1>
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase italic">
              Terms of Engagement // Last Updated: Jan 2026
            </p>
          </motion.div>
        </header>

        {/* Legal Grid */}
        <div className="space-y-20 text-white/60">
          
          {/* Section 01: The Nature of the Archive */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3 text-white">
              <FileText size={16} strokeWidth={1.5} />
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold">01. Inventory</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-[12px] leading-relaxed uppercase tracking-wider">
              <p>
                All pieces listed within the AVIORÈ archive are <span className="text-white">1-of-1 vintage or pre-owned artifacts</span>. Due to the nature of thrifted goods, items may exhibit "Archival Character" (natural wear, distressing, or aging). 
              </p>
              <p>
                By acquiring a piece, the user acknowledges they have reviewed all visual assets and descriptions provided.
              </p>
            </div>
          </section>

          {/* Section 02: Acquisition & Payment */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3 text-white">
              <Lock size={16} strokeWidth={1.5} />
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold">02. Acquisition</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-[12px] leading-relaxed uppercase tracking-wider">
              <p>
                Payments are processed in <span className="text-white">Naira (₦)</span> via our secure gateway (Flutterwave). An item is only removed from the live archive once a successful transaction is confirmed.
              </p>
              <p>
                AVIORÈ reserves the right to cancel any order in the event of technical discrepancies or inventory synchronization errors.
              </p>
            </div>
          </section>

          {/* Section 03: Refund & Exchange Policy */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border border-white/10 bg-white/2">
            <div className="flex items-center gap-3 text-red-500">
              <ShieldAlert size={16} strokeWidth={1.5} />
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold">03. Final_Sale</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-[12px] leading-relaxed uppercase tracking-wider">
              <p className="text-white">
                ALL ACQUISITIONS ARE FINAL. 
              </p>
              <p>
                Because our inventory consists of unique, one-off pieces, we cannot offer exchanges or refunds for change of mind or fit issues. Detailed measurements are provided for every "lot" to ensure accuracy prior to commitment.
              </p>
            </div>
          </section>

          {/* Section 04: Logistics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3 text-white">
              <Scale size={16} strokeWidth={1.5} />
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold">04. Logistics</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-[12px] leading-relaxed uppercase tracking-wider">
              <p>
                Standard delivery times apply across Nigeria. AVIORÈ is not responsible for delays caused by third-party couriers or incorrect delivery coordinates provided by the user. 
              </p>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <footer className="mt-32 pt-12 border-t border-white/5 text-center">
          <p className="text-[8px] tracking-[0.6em] text-white/20 uppercase">
            By accessing the vault, you agree to these protocols.
          </p>
        </footer>
      </main>

      <Footer />
    </div>
  );
}