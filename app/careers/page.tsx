"use client";
import React, { useState } from "react";

export default function StandaloneIntake() {
  const [role, setRole] = useState(""); // designer, vendor, partner, etc.

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <div className="max-w-xl mx-auto border border-white/10 p-10">
        <h1 className="text-3xl italic mb-10">AVIORÉ_INTAKE_SYSTEM</h1>

        {/* STEP 1: IDENTITY SELECTION */}
        <div className="mb-12">
          <label className="text-[10px] text-white/40 block mb-4">IDENTIFY_YOUR_ROLE</label>
          <select 
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-white uppercase text-xs"
          >
            <option value="">Select_Role...</option>
            <option value="designer">Fashion_Designer</option>
            <option value="vendor">Fabric_Vendor</option>
            <option value="partner">Production_Partner</option>
          </select>
        </div>

        {/* STEP 2: CONDITIONAL QUESTIONS */}
        <form className="space-y-8">
          
          {/* COMMON FIELDS FOR EVERYONE */}
          {role && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <input type="text" placeholder="FULL_NAME" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
              <input type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
            </div>
          )}

          {/* DESIGNER SPECIFIC */}
          {role === "designer" && (
            <div className="space-y-8 pt-4 border-t border-white/5">
              <input type="text" placeholder="PORTFOLIO_LINK (BEHANCE/ADOBE)" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
              <input type="text" placeholder="PRIMARY_SPECIALIZATION (E.G., DENIM, JERSEY)" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
              <textarea placeholder="DESCRIBE_YOUR_CREATIVE_PROCESS" className="w-full bg-transparent border border-white/20 p-4 h-32 outline-none" />
            </div>
          )}

          {/* VENDOR SPECIFIC */}
          {role === "vendor" && (
            <div className="space-y-8 pt-4 border-t border-white/5">
              <input type="text" placeholder="COMPANY_NAME" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
              <input type="text" placeholder="FABRIC_TYPES_AVAILABLE" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
              <input type="text" placeholder="MINIMUM_ORDER_QUANTITY (MOQ)" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
            </div>
          )}

          {/* PARTNER SPECIFIC */}
          {role === "partner" && (
            <div className="space-y-8 pt-4 border-t border-white/5">
              <input type="text" placeholder="FACTORY_LOCATION" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
              <input type="text" placeholder="DAILY_PRODUCTION_CAPACITY" className="w-full bg-transparent border-b border-white/20 py-2 outline-none" />
            </div>
          )}

          {role && (
            <button className="w-full bg-white text-black py-4 uppercase text-[10px] tracking-[0.4em] font-bold hover:invert transition-all">
              Submit_Manifest
            </button>
          )}
        </form>
      </div>
    </div>
  );
}