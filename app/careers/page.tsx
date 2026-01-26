"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StandaloneIntake() {
  const [role, setRole] = useState(""); // designer, vendor, partner, etc.

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black font-sans p-6 md:p-12 relative overflow-hidden flex items-center justify-center">
      
      {/* DESIGN LAYERS: Noise & Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-[40px] shadow-2xl shadow-black/5 p-10 md:p-16 border border-white relative z-10"
      >
        {/* HEADER */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#FFD747] animate-pulse" />
             <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em]">Application_Terminal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
            AVIORÉ_INTAKE
          </h1>
        </div>

        {/* STEP 1: IDENTITY SELECTION */}
        <div className="mb-12">
          <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] block mb-4 border-l-2 border-[#FFD747] pl-3">
            01_Identify_Role
          </label>
          <select 
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-[#F3F3F3] border-none rounded-2xl py-4 px-6 outline-none appearance-none font-bold uppercase text-[11px] tracking-widest cursor-pointer focus:ring-2 focus:ring-[#FFD747] transition-all"
          >
            <option value="">Select_Role...</option>
            <option value="designer">Fashion_Designer</option>
            <option value="vendor">Fabric_Vendor</option>
            <option value="partner">Production_Partner</option>
          </select>
        </div>

        {/* STEP 2: CONDITIONAL QUESTIONS */}
        <form className="space-y-6">
          <AnimatePresence mode="wait">
            {role && (
              <motion.div 
                key={role}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] block mb-2 border-l-2 border-[#FFD747] pl-3">
                  02_Submission_Manifest
                </label>
                
                {/* COMMON FIELDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="FULL_NAME" className="bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20 w-full" />
                  <input type="email" placeholder="EMAIL_ADDRESS" className="bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20 w-full" />
                </div>

                {/* DESIGNER SPECIFIC */}
                {role === "designer" && (
                  <div className="space-y-4 pt-4 border-t border-black/5">
                    <input type="text" placeholder="PORTFOLIO_LINK" className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                    <input type="text" placeholder="PRIMARY_SPECIALIZATION" className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                    <textarea placeholder="DESCRIBE_YOUR_CREATIVE_PROCESS" className="w-full bg-[#F3F3F3] rounded-3xl p-6 h-32 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                  </div>
                )}

                {/* VENDOR SPECIFIC */}
                {role === "vendor" && (
                  <div className="space-y-4 pt-4 border-t border-black/5">
                    <input type="text" placeholder="COMPANY_NAME" className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                    <input type="text" placeholder="FABRIC_TYPES_AVAILABLE" className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                    <input type="text" placeholder="MOQ (MINIMUM ORDER)" className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                  </div>
                )}

                {/* PARTNER SPECIFIC */}
                {role === "partner" && (
                  <div className="space-y-4 pt-4 border-t border-black/5">
                    <input type="text" placeholder="FACTORY_LOCATION" className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                    <input type="text" placeholder="DAILY_PRODUCTION_CAPACITY" className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 outline-none text-[11px] font-bold uppercase placeholder:text-black/20" />
                  </div>
                )}

                <button className="w-full bg-black text-white py-6 rounded-full uppercase text-[11px] tracking-[0.4em] font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 mt-6">
                  Submit_Manifest —&gt;
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}