"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-[#F9F9F9] pt-32 pb-10 px-6 md:px-12 border-t border-gray-200 overflow-hidden">
      
      {/* DESIGN LAYERS: Noise & Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP SECTION: Massive Branding with Ghost Text */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
             {/* Ghost Text Overlay */}
            <span className="absolute -top-12 -left-4 text-[20vw] font-black text-black/[0.02] select-none uppercase italic leading-none">
              AVIORÈ
            </span>
            <h2 className="relative text-[15vw] md:text-[8vw] font-black tracking-tighter text-black uppercase italic leading-none">
              AVIORÈ
            </h2>
          </motion.div>
          
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
            <p className="text-[10px] tracking-[0.4em] text-black/40 uppercase mb-4">Newsletter_Join</p>
            <div className="flex border-b border-black/20 pb-2 w-full md:w-64 focus-within:border-black transition-colors">
              <input 
                type="email" 
                placeholder="EMAIL@ADDRESS.COM" 
                className="bg-transparent border-none text-[10px] text-black focus:outline-none w-full placeholder:text-black/20 tracking-widest font-bold"
              />
              <button className="text-black hover:opacity-50 transition-opacity tracking-tighter text-xs">→</button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16 mb-24">
          <FooterColumn 
            title="Navigation" 
            links={[
              { name: "Shop", href: "/shop" },
              { name: "Editorial", href: "/editorial" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" }
            ]} 
          />
          <FooterColumn 
            title="Social" 
            links={[
              { name: "Instagram", href: "https://www.instagram.com/shopaviore?" },
              { name: "TikTok", href: "https://www.tiktok.com/@shopaviore" },
              { name: "Facebook", href: "https://www.facebook.com/share/1T8Ss6Hvq1" },
              { name: "X / Twitter", href: "https://x.com/shopaviore" }
            ]} 
          />
          <FooterColumn 
            title="Legal" 
            links={[
              { name: "Terms", href: "/terms" },
              { name: "Privacy", href: "/privacy" },
              { name: "Shipping", href: "/shipping" }
            ]} 
          />
          <div className="flex flex-col justify-end">
            <span className="text-[9px] font-mono text-black/30 uppercase tracking-[0.5em] leading-loose">
              ©️ 2026 <br /> AVIORÈ_SYSTEMS_INC
            </span>
          </div>
        </div>

        {/* BOTTOM SECTION: Status Bar */}
        <div className="flex justify-between items-center pt-8 border-t border-black/5">
          <div className="flex gap-8">
            
            {/* SECRET LINK STARTS HERE */}
            <Link 
              href="/admin-gate" 
              className="flex items-center gap-2 cursor-default select-none group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD747] animate-pulse" />
              <span className="text-[9px] font-mono text-black/40 group-hover:text-black transition-colors uppercase">
                Server_01_Online
              </span>
            </Link>
            {/* SECRET LINK ENDS HERE */}

          </div>
          <span className="text-[9px] font-mono text-black/40 uppercase tracking-widest">
            Built with Precision.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[10px] font-mono text-black/40 uppercase tracking-[0.5em] border-l-2 border-[#FFD747] pl-3">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href}
              className="text-xs text-black/60 hover:text-black transition-all duration-300 font-bold uppercase tracking-tighter block"
            >
              <motion.span 
                className="inline-block"
                whileHover={{ x: 4 }}
              >
                {link.name}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}