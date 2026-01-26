"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  { q: "Dispatch_Protocol", a: "All orders are processed within 24 hours. Lagos delivery: 1-2 days. Nationwide: 3-5 days." },
  { q: "Condition_Standards", a: "Every piece is a vintage relic. Expect natural aging, sun-fades, and unique character as detailed in descriptions." },
  { q: "Return_Policy", a: "Due to the 1-of-1 nature of the archive, all sales are final. Measurements are provided for precision fitting." },
];

export function CommandFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER: Clean & Minimal */}
        <div className="mb-16 space-y-2">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-black">
            Support_Intel
          </h3>
          <p className="text-[10px] text-black/40 font-bold uppercase tracking-[0.2em]">
            Logistics & General Inquiries
          </p>
        </div>

        {/* ACCORDION: Using the Ash-Grey card style */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className="bg-[#F3F3F3] rounded-[25px] md:rounded-[35px] overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 md:p-8 text-left outline-none"
              >
                <h4 className="text-[11px] md:text-[13px] text-black font-black uppercase tracking-[0.2em]">
                  {faq.q}
                </h4>
                <div className="bg-white rounded-full p-2 shadow-sm text-black">
                  {openIndex === i ? <Minus size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-0">
                      <p className="text-[10px] md:text-[11px] text-black/50 font-bold uppercase tracking-widest leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}