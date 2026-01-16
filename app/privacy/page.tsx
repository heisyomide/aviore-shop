"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        {/* HEADER */}
        <header className="mb-24 space-y-4 border-b border-white/5 pb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Protocol_00-X</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic leading-none">
            Privacy <br /> <span className="ml-12 md:ml-24">Statement</span>
          </h1>
          <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest pt-4">
            Last_Updated: Jan_2026 // Revision: 1.0.4
          </p>
        </header>

        {/* CONTENT SECTIONS */}
        <div className="space-y-20">
          
          <PrivacySection 
            number="01" 
            title="Intel_Collection" 
            content="We collect necessary identification data to facilitate the transition of archival pieces. This includes identity (Name), destination (Shipping Address), and communication channels (Email/Phone)." 
          />

          <PrivacySection 
            number="02" 
            title="Transaction_Security" 
            content="Financial data is never stored on AVIORÉ servers. All transmissions are routed through encrypted payment gateways (Flutterwave) to ensure the integrity of the acquisition process." 
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
        <div className="mt-32 p-8 border border-white/10 bg-[#0a0a0a]">
          <p className="text-[9px] text-white/40 uppercase tracking-[0.3em] leading-loose text-center">
            By accessing the AVIORÉ archive, you acknowledge and agree to these operational data protocols.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PrivacySection({ number, title, content }: { number: string; title: string; content: string }) {
  return (
    <section className="group flex flex-col md:flex-row gap-8 md:gap-16">
      <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] pt-1">
        [{number}]
      </div>
      <div className="space-y-4">
        <h3 className="text-xl md:text-2xl text-white uppercase italic tracking-tighter font-light group-hover:text-green-500 transition-colors">
          {title}
        </h3>
        <p className="text-[11px] md:text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-2xl">
          {content}
        </p>
      </div>
    </section>
  );
}