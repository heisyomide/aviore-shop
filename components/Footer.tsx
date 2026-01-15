"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-32 pb-10 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: Massive Branding */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter text-white uppercase italic leading-none">
              AVIORÈ
            </h2>
          </motion.div>
          
          <div className="flex flex-col items-end text-right">
            <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4">Newsletter_Join</p>
            <div className="flex border-b border-white/20 pb-2 w-full md:w-64">
              <input 
                type="email" 
                placeholder="EMAIL@ADDRESS.COM" 
                className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full placeholder:text-white/20 tracking-widest"
              />
              <button className="text-white hover:text-white/50 transition-colors tracking-tighter text-xs">→</button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <FooterColumn 
            title="Navigation" 
            links={["Archive", "Editorial", "About", "Contact"]} 
          />
          <FooterColumn 
            title="Social" 
            links={["Instagram", "Discord", "X / Twitter"]} 
          />
          <FooterColumn 
            title="Legal" 
            links={["Terms", "Privacy", "Shipping"]} 
          />
          <div className="flex flex-col justify-end">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">
              ©️ 2026 AVIORÉ_SYSTEMS_INC
            </span>
          </div>
        </div>

        {/* BOTTOM SECTION: Status Bar */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          <div className="flex gap-8">
            
            {/* SECRET LINK STARTS HERE */}
            <Link 
              href="/admin-gate" 
              className="flex items-center gap-2 cursor-default select-none"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono text-white/40 uppercase">
                Server_01_Online
              </span>
            </Link>
            {/* SECRET LINK ENDS HERE */}

          </div>
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
            Built with Precision.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <motion.a 
              href="#" 
              whileHover={{ x: 5, color: "#fff" }}
              className="text-xs text-white/50 hover:text-white transition-all duration-300 font-light"
            >
              {link}
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  );
}