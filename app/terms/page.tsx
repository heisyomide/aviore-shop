"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Scale, FileText, Lock, ArrowDownRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-6xl mx-auto relative overflow-hidden">
        {/* DESIGN LAYER: Blueprint Grid & Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Header Section */}
        <header className="mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-2.5 h-2.5 rounded-full bg-[#FFD747] animate-pulse" />
               <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em]">Protocol_Registry_V1.1</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
              Archive <br /> <span className="ml-12 md:ml-24 text-black/10">Protocols.</span>
            </h1>
            <p className="text-[11px] font-black tracking-[0.5em] text-black/30 uppercase italic">
              Terms of Engagement // Last Updated: Jan 2026
            </p>
          </motion.div>
        </header>

        {/* Legal Grid */}
        <div className="space-y-12 relative z-10">
          
          <TermsSection 
            number="01" 
            title="Inventory" 
            icon={<FileText size={20} />}
            content={
              <>
                All pieces listed within the AVIORÈ archive are <span className="text-black font-black italic">1-of-1 vintage or pre-owned artifacts</span>. Due to the nature of thrifted goods, items may exhibit "Archival Character" (natural wear, distressing, or aging). 
                <br /><br />
                By acquiring a piece, the user acknowledges they have reviewed all visual assets and descriptions provided.
              </>
            } 
          />

          <TermsSection 
            number="02" 
            title="Acquisition" 
            icon={<Lock size={20} />}
            content={
              <>
                Payments are processed in <span className="text-black font-black italic">Naira (₦)</span> via our secure gateway. An item is only removed from the live archive once a successful transaction is confirmed.
                <br /><br />
                AVIORÈ reserves the right to cancel any order in the event of technical discrepancies or inventory synchronization errors.
              </>
            } 
          />

          {/* CRITICAL ALERT SECTION: Refund Policy */}
          <section className="group bg-red-50 p-10 md:p-16 rounded-[40px] border border-red-100 transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <div className="flex items-center gap-4 text-red-500">
                <ShieldAlert size={28} strokeWidth={2.5} />
                <span className="text-[11px] font-black uppercase tracking-[0.5em]">03. Final_Sale</span>
              </div>
              <div className="md:col-span-2 space-y-6">
                <h3 className="text-4xl md:text-6xl text-red-600 font-black uppercase italic tracking-tighter leading-none">
                  All acquisitions are final.
                </h3>
                <p className="text-[12px] md:text-[14px] font-bold text-red-900/60 uppercase tracking-tight leading-relaxed max-w-2xl">
                  Because our inventory consists of unique, one-off pieces, we cannot offer exchanges or refunds for change of mind or fit issues. Detailed measurements are provided for every lot to ensure accuracy prior to commitment.
                </p>
              </div>
            </div>
          </section>

          <TermsSection 
            number="04" 
            title="Logistics" 
            icon={<Scale size={20} />}
            content="Standard delivery times apply across Nigeria. AVIORÈ is not responsible for delays caused by third-party couriers or incorrect delivery coordinates provided by the user." 
          />

        </div>

        {/* Footer Note */}
        <footer className="mt-32 pt-12 border-t border-black/5 text-center">
          <p className="text-[10px] font-black tracking-[0.6em] text-black/20 uppercase italic">
            By accessing the vault, you agree to these operational protocols.
          </p>
        </footer>
      </main>

      <Footer />
    </div>
  );
}

function TermsSection({ number, title, icon, content }: { number: string; title: string; icon: any; content: React.ReactNode }) {
  return (
    <section className="group bg-[#F9F9F9] hover:bg-black p-10 md:p-16 rounded-[40px] border border-black/5 transition-all duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        <div className="flex items-center gap-4 text-[#FFD747]">
          <div className="group-hover:scale-110 transition-transform">{icon}</div>
          <span className="text-[11px] font-black uppercase tracking-[0.5em]">
            {number}. {title}
          </span>
        </div>
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-4xl md:text-6xl text-black font-black uppercase italic tracking-tighter group-hover:text-white transition-colors leading-none">
            {title}_Study
          </h3>
          <div className="text-[12px] md:text-[13px] text-black/40 font-bold uppercase tracking-tight leading-relaxed max-w-2xl group-hover:text-white/50 transition-colors">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
}