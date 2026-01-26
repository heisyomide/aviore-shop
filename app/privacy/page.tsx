"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-5xl mx-auto relative overflow-hidden">
        {/* DESIGN LAYER: Blueprint Grid & Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* HEADER */}
        <header className="mb-24 space-y-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD747] animate-pulse" />
              <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em]">Protocol_00-X</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-[calc(-0.06em)] uppercase italic leading-[0.8] text-black">
              Privacy <br /> <span className="ml-12 md:ml-24 text-black/10">Statement.</span>
            </h1>
            <p className="text-[10px] text-black/30 font-black uppercase tracking-[0.3em] pt-8 border-t border-black/5 mt-8">
              Last_Updated: Jan_2026 // Revision: 1.0.4
            </p>
          </motion.div>
        </header>

        {/* CONTENT SECTIONS */}
        <div className="space-y-12 relative z-10">
          <PrivacySection 
            number="01" 
            title="Intel_Collection" 
            content="We collect necessary identification data to facilitate the transition of archival pieces. This includes identity (Name), destination (Shipping Address), and communication channels (Email/Phone)." 
          />

          <PrivacySection 
            number="02" 
            title="Transaction_Security" 
            content="Financial data is never stored on AVIORÈ servers. All transmissions are routed through encrypted payment gateways to ensure the integrity of the acquisition process." 
          />

          <PrivacySection 
            number="03" 
            title="Tracking_Cookies" 
            content="Our system utilizes minimal cookies to maintain your session within the archive and remember items committed to your bag. No third-party data-mining protocols are active." 
          />

          <PrivacySection 
            number="04" 
            title="Data_Rights" 
            content="Holders have the right to request a total wipe of their data from our registry. To initiate a data purge, contact the Inquiry Portal." 
          />
        </div>

        {/* DISCLAIMER BOX */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-10 rounded-[40px] bg-[#F9F9F9] border border-black/5 relative z-10 shadow-2xl shadow-black/5"
        >
          <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.3em] leading-relaxed text-center italic">
            By accessing the AVIORÈ archive, you acknowledge and agree to these operational data protocols.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

function PrivacySection({ number, title, content }: { number: string; title: string; content: string }) {
  return (
    <section className="group bg-[#F9F9F9] hover:bg-black p-8 md:p-12 rounded-[35px] border border-black/5 transition-all duration-500">
      <div className="flex flex-col md:flex-row gap-6 md:gap-16">
        <div className="text-[11px] font-black text-[#FFD747] uppercase tracking-[0.4em]">
          [{number}]
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl text-black font-black uppercase italic tracking-tighter group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-[11px] md:text-[12px] text-black/40 font-bold uppercase tracking-tight leading-relaxed max-w-2xl group-hover:text-white/40 transition-colors">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}