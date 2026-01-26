"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Shield, Camera, Loader2, CheckCircle2 } from "lucide-react";

export default function WaitlistEditorial() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        throw new Error("Transmission failed");
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="w-full bg-[#F9F9F9] text-black py-24 px-6 md:px-12 font-sans selection:bg-[#FFD747]">
      <div className="max-w-7xl mx-auto">
        
        {/* MAIN CONTAINER WITH ROUNDED CORNERS (Inspired by RAWBLOX) */}
        <div className="bg-white rounded-[40px] shadow-sm border border-black/5 overflow-hidden flex flex-col lg:grid lg:grid-cols-12">
          
          {/* --- LEFT SIDE: IMAGE AREA --- */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-auto overflow-hidden">
            <img 
              src="/first.PNG" 
              alt="Aviorè First Silhouette" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
            />
            {/* Visual Tag */}
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-black/5">
                <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Camera size={12} /> Pre_Release_Visual
                </p>
            </div>
          </div>

          {/* --- RIGHT SIDE: FORM AREA --- */}
          <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center bg-white">
            <div className="space-y-8">
              <header className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.1]">
                  Aviorè First Design <br /> 
                  <span className="text-black/30 italic font-medium tracking-tight">Access No.01</span>
                </h2>
                <div className="h-1 w-12 bg-[#FFD747]" /> {/* Accent Line */}
                <p className="text-sm text-black/60 font-medium leading-relaxed max-w-sm">
                  We are opening the archive for a limited group. Register below to receive 24-hour priority access before the public release.
                </p>
              </header>

              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form 
                    key="form"
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleWaitlist}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 ml-1">Email Address</label>
                        <div className="flex items-center gap-4 bg-[#F4F4F4] px-6 py-5 rounded-2xl border border-transparent focus-within:border-black/10 transition-all">
                        <Mail className="text-black/30" size={18} />
                        <input 
                            type="email" 
                            required
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-black/20"
                        />
                        </div>
                    </div>

                    {/* BOLD YELLOW BUTTON (Inspired by Interior Designer Poster) */}
                    <button 
                      disabled={status === "loading"}
                      className="w-full py-5 bg-[#FFD747] text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_20px_-10px_rgba(255,215,71,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(255,215,71,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : "Update Me"}
                      {status !== "loading" && <ArrowRight size={18} />}
                    </button>

                    <div className="flex items-center justify-center gap-2 opacity-30">
                        <Shield size={10} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">
                           {status === "error" ? "Transmission Failed" : "Secure Archive Protocol"}
                        </span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-[#FFD747] text-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-extrabold tracking-tight italic">Identity Verified</h4>
                    <p className="text-xs text-black/50 font-bold uppercase tracking-widest leading-relaxed">
                        You have been added <br /> to the Genesis list.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* FOOTER SUB-TEXT */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Aviorè // 2026</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                <span className="cursor-help underline underline-offset-4">Privacy</span>
                <span className="cursor-help underline underline-offset-4">Terms</span>
                <span className="cursor-help underline underline-offset-4">Instagram</span>
            </div>
        </div>
      </div>
    </section>
  );
}