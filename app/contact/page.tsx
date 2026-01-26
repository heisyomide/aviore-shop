"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, MapPin, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sendInquiry } from "@/app/actions/contact";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    
    const formData = new FormData(e.currentTarget);
    const result = await sendInquiry(formData);
    
    if (result.success) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 6000);
    } else {
      alert("SYSTEM_ERROR: Transmission failed.");
      setStatus("idle");
    }
  }

  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
        {/* DESIGN LAYER: Blueprint Grid & Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <header className="mb-24 space-y-4 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#FFD747] animate-pulse" />
            <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em]">Communications_Live</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] text-black">
            Inquiry <br /> <span className="ml-12 md:ml-24">Portal</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
          
          {/* LEFT: Direct Channels */}
          <div className="lg:col-span-5 space-y-16">
            <section className="space-y-10">
              <p className="text-[12px] font-bold text-black/50 uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                For order inquiries, authentication requests, or archival submissions, connect via the channels below.
              </p>

              <div className="space-y-4">
                <ContactLink 
                  icon={<MessageCircle size={18} />} 
                  label="WhatsApp_Direct" 
                  value="+234 813 378 1307" 
                  href="https://wa.me/2348133781307" 
                />
                <ContactLink 
                  icon={<Mail size={18} />} 
                  label="Email_System" 
                  value="ARCHIVE@AVIORE.COM" 
                  href="mailto:orderaviore@gmail.com" 
                />
                <ContactLink 
                  icon={<MapPin size={18} />} 
                  label="Base_Operations" 
                  value="Lagos, Nigeria" 
                  href="#" 
                />
              </div>
            </section>

            <section className="pt-12 border-t border-black/5">
              <h3 className="text-[10px] font-black text-black/20 uppercase tracking-[0.5em] mb-4">Response_Time</h3>
              <p className="text-3xl font-black italic text-black/80 tracking-tighter">24-48 HOURS_EST</p>
            </section>
          </div>

          {/* RIGHT: Secure Form (The Ash-Grey Card) */}
          <div className="lg:col-span-7 bg-[#F9F9F9] rounded-[40px] p-8 md:p-16 relative overflow-hidden border border-black/5 shadow-2xl shadow-black/5">
            
            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-[#F9F9F9] flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 bg-[#FFD747] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-black" size={32} strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Logged</h3>
                  <p className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] leading-relaxed max-w-xs">
                    Your transmission has been received by the Atelier.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-1">01_Subject</label>
                <select 
                  name="subject" required
                  className="w-full bg-[#F3F3F3] rounded-2xl py-5 px-6 text-[11px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#FFD747] transition-all"
                >
                  <option value="Order_Support">Order_Support</option>
                  <option value="Archival_Inquiry">Archival_Inquiry</option>
                  <option value="Editorial">Press_&_Editorial</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-1">02_Identity</label>
                  <input name="name" type="text" required placeholder="FULL NAME"
                    className="w-full bg-[#F3F3F3] rounded-2xl py-5 px-6 text-[11px] font-black uppercase tracking-widest outline-none placeholder:text-black/10 focus:ring-2 focus:ring-[#FFD747] transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-1">03_Channel</label>
                  <input name="email" type="email" required placeholder="EMAIL_ADDRESS"
                    className="w-full bg-[#F3F3F3] rounded-2xl py-5 px-6 text-[11px] font-black uppercase tracking-widest outline-none placeholder:text-black/10 focus:ring-2 focus:ring-[#FFD747] transition-all" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-1">04_Brief</label>
                <textarea name="message" required rows={4} placeholder="MESSAGE_DETAILS"
                  className="w-full bg-[#F3F3F3] rounded-3xl py-5 px-6 text-[11px] font-black uppercase tracking-widest outline-none placeholder:text-black/10 focus:ring-2 focus:ring-[#FFD747] transition-all resize-none" />
              </div>

              <button 
                disabled={status === "sending"} type="submit"
                className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.6em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/5"
              >
                {status === "sending" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>Send_Transmission <ArrowRight size={16} strokeWidth={3} /></>
                )}
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
    <a href={href} className="flex items-center gap-6 p-6 rounded-[30px] bg-[#F9F9F9] border border-black/5 hover:bg-black hover:text-white transition-all duration-500 group">
      <div className="bg-white p-4 rounded-2xl shadow-sm text-black group-hover:bg-[#FFD747] transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.3em] group-hover:text-white/40">{label}</p>
        <p className="text-[13px] font-black uppercase tracking-tighter italic">{value}</p>
      </div>
    </a>
  );
}