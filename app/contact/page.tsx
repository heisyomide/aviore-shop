"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, MapPin, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sendInquiry } from "@/app/actions/contact"; // Import the action

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    
    const formData = new FormData(e.currentTarget);
    const result = await sendInquiry(formData);
    
    if (result.success) {
      setStatus("success");
      // Resets the form after a delay
      setTimeout(() => setStatus("idle"), 6000);
    } else {
      alert("SYSTEM_ERROR: Transmission failed. Please try again.");
      setStatus("idle");
    }
  }

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
                  value="+234 813 378 1307" 
                  href="https://wa.me/2348133781307" 
                />
                <ContactLink 
                  icon={<Mail size={16} />} 
                  label="Email_System" 
                  value="ARCHIVE@AVIORE.COM" 
                  href="mailto:orderaviore@gmail.com" 
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
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 relative overflow-hidden">
            
            {/* Success Overlay */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-8"
                >
                  <CheckCircle className="text-white mb-6" size={48} strokeWidth={1} />
                  <h3 className="text-2xl font-light italic uppercase tracking-tighter mb-4">Transmission_Received</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] leading-relaxed max-w-62.5">
                    Your data has been logged. An automated confirmation was sent to your return channel.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 ml-1">Subject_Matter</label>
                <select 
                  name="subject"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                >
                  <option value="Order_Support" className="bg-black">Order_Support</option>
                  <option value="Archival_Inquiry" className="bg-black">Archival_Inquiry</option>
                  <option value="Press_&_Editorial" className="bg-black">Press_&_Editorial</option>
                  <option value="Other" className="bg-black">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 ml-1">Holder_Identity</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="FULL NAME"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                />
              </div>

              {/* Added Email Input for Return Channel */}
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 ml-1">Return_Channel</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="EMAIL_ADDRESS"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 ml-1">Brief_Transmission</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="MESSAGE"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/10 resize-none"
                />
              </div>

              <button 
                disabled={status === "sending"}
                type="submit"
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.6em] text-white pt-4 disabled:opacity-50"
              >
                {status === "sending" ? (
                  <>
                    <span>Encrypting...</span>
                    <Loader2 size={12} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Send_Message</span>
                    <div className="w-10 h-px bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
                    <ArrowRight size={12} />
                  </>
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