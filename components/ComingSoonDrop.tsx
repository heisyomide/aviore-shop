"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Shield, Camera, Loader2 } from "lucide-react";

export default function WaitlistNoir() {
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
      setTimeout(() => setStatus("idle"), 3000); // Reset after 3s on error
    }
  };

  return (
    <section className="w-full bg-black text-white py-32 px-6 md:px-12 border-t border-white/5 font-mono overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center">
        
        {/* --- PRODUCT VISUAL --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-7 w-full aspect-[4/5] bg-zinc-900 relative overflow-hidden group border border-white/10"
        >
          <img 
            src="/first.PNG" 
            alt="Avioré First Silhouette" 
            className="w-full h-full object-cover grayscale transition-all duration-[1500ms] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 flex items-center gap-3">
             <Camera size={14} className="text-zinc-500" />
             <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-400">Archive_Visual_001</span>
          </div>
        </motion.div>

        {/* --- CONTENT & REGISTRATION --- */}
        <div className="lg:col-span-5 w-full space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Priority_Access</span>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Aviorè Genesis <br /> <span className="text-zinc-600">No.01</span>
            </h2>
            
            <p className="text-[12px] text-zinc-400 uppercase leading-relaxed max-w-sm font-bold tracking-wide italic">
              Built with precision in Nigeria. Registration grants a 24-hour private shopping window before global release.
            </p>
          </div>

          <div className="bg-[#0A0A0A] p-8 md:p-12 border border-white/10 relative shadow-2xl">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form 
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleWaitlist} 
                  className="space-y-10"
                >
                  <div className="group relative">
                    <div className="flex items-center gap-4 border-b border-white/20 pb-4 group-focus-within:border-white transition-all">
                      <Mail className="text-zinc-600" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="ACCESS@DOMAIN.COM"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent text-[13px] uppercase font-black outline-none placeholder:text-zinc-800"
                      />
                    </div>
                  </div>
                  
                  <button 
                    disabled={status === "loading"}
                    className="w-full py-6 bg-white text-black text-[11px] uppercase tracking-[0.8em] font-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                  >
                    {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : "Update Me"}
                    {status !== "loading" && <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />}
                  </button>

                  <p className="text-[8px] text-zinc-600 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                    <Shield size={10} /> {status === "error" ? "Transmission_Failed" : "Data_Encrypted_By_Archive"}
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight size={20} className="-rotate-45" />
                  </div>
                  <h4 className="text-[14px] font-black uppercase tracking-[0.4em]">Index_Complete</h4>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                    Identity verified. Awaiting <br /> launch instructions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}