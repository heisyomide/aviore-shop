"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  { q: "Dispatch_Protocol", a: "All orders are processed within 24 hours. Lagos delivery: 1-2 days. Nationwide: 3-5 days." },
  { q: "Condition_Standards", a: "Every piece is a vintage relic. Expect natural aging, sun-fades, and unique character as detailed in descriptions." },
  { q: "Return_Policy", a: "Due to the 1-of-1 nature of the archive, all sales are final. Measurements are provided for precision fitting." },
];

export function CommandFAQ() {
  return (
    <section className="bg-[#050505] py-32 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl text-white uppercase tracking-[0.4em] italic font-light">Operational_Intel</h2>
          <p className="text-[9px] text-white/30 uppercase tracking-widest">General_Inquiries & Logistics</p>
        </div>

        <div className="border-t border-white/10">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-white/10 py-8 group">
              <div className="flex justify-between items-center cursor-pointer">
                <h4 className="text-[11px] text-white uppercase tracking-[0.3em] font-bold group-hover:text-green-500 transition-colors">
                  {faq.q}
                </h4>
                <Plus size={14} className="text-white/20" />
              </div>
              <p className="mt-4 text-[10px] text-white/40 uppercase tracking-widest leading-relaxed max-w-xl">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}