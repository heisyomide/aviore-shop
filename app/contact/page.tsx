"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-20 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Communications_Open</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter uppercase italic leading-none">
            Inquiry <br /> <span className="ml-12 md:ml-24">Portal</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* LEFT: Direct Channels */}
          <div className="space-y-16">
            <section className="space-y-8">
              <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                For order inquiries, authentication requests, or archival submissions, connect via the channels below.
              </p>

              <div className="space-y-4">
                <ContactLink 
                  icon={<MessageCircle size={16} />} 
                  label="WhatsApp_Direct" 
                  value="+234 XXX XXX XXXX" 
                  href="https://wa.me/234XXXXXXXXX" 
                />
                <ContactLink 
                  icon={<Mail size={16} />} 
                  label="Email_System" 
                  value="ARCHIVE@AVIORE.COM" 
                  href="mailto:archive@aviore.com" 
                />
                <ContactLink 
                  icon={<MapPin size={16} />} 
                  label="Base_Operations" 
                  value="Lagos, Nigeria" 
                  href="#" 
                />
              </div>
            </section>

            <section className="pt-12 border-t border-white/5">
              <h3 className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] mb-6">Response_Time</h3>
              <p className="text-2xl font-light italic text-white/80 tracking-tight">24-48 Hours_Standard</p>
            </section>
          </div>

          {/* RIGHT: Secure Form */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12">
            <form className="space-y-10">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 ml-1">Subject_Matter</label>
                <select className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors">
                  <option className="bg-black">Order_Support</option>
                  <option className="bg-black">Archival_Inquiry</option>
                  <option className="bg-black">Press_&_Editorial</option>
                  <option className="bg-black">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 ml-1">Holder_Identity</label>
                <input 
                  type="text" 
                  placeholder="FULL NAME"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 ml-1">Brief_Transmission</label>
                <textarea 
                  rows={4}
                  placeholder="MESSAGE"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/10 resize-none"
                />
              </div>

              <button className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.6em] text-white pt-4">
                <span>Send_Message</span>
                <div className="w-10 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
                <ArrowRight size={12} />
              </button>
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContactLink({ icon, label, value, href }: { icon: any; label: string; value: string; href: string }) {
  return (
    <a 
      href={href} 
      className="flex items-center gap-6 p-6 border border-white/5 hover:bg-white hover:text-black transition-all duration-500 group"
    >
      <div className="text-white group-hover:text-black transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] group-hover:text-black/40">
          {label}
        </p>
        <p className="text-xs uppercase tracking-widest font-medium">
          {value}
        </p>
      </div>
    </a>
  );
}