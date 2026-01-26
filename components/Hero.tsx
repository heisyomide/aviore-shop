"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-white px-4 md:px-8 py-2">
      {/* THE CONTAINER: Ash-black, scaled to fit the viewport comfortably */}
      <div className="relative w-full h-[70vh] md:h-[80vh] bg-[#1a1a1a] rounded-[35px] md:rounded-[45px] overflow-hidden shadow-xl">
        
        {/* BACKGROUND IMAGE */}
        <img 
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-45 grayscale"
        />

        {/* CONTENT OVERLAY */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14">
          
          {/* TEXT AREA: Compact editorial scaling */}
          <div className="max-w-xl mt-6 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95]">
              Community-Driven <br /> Culture
            </h2>
            
            <p className="text-white/40 text-[10px] md:text-xs max-w-xs font-medium leading-relaxed uppercase tracking-tight">
              More than just a brand we're a movement—connecting creatives, 
              skaters, and trendsetters who define the streets.
            </p>
            
            {/* REDIRECTING SHOP NOW BUTTON: Wrapped in Link */}
            <Link href="/shop" className="inline-block">
              <button className="bg-white text-black pl-5 pr-1.5 py-1.5 rounded-full flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.15em] hover:scale-105 transition-all mt-2 group">
                Shop Now 
                <div className="bg-black text-white rounded-full p-2 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={12} strokeWidth={3} />
                </div>
              </button>
            </Link>
          </div>

          {/* THE 01-05 STATUS BAR: Exact fit from sample */}
          <div className="w-full border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: "01", text: "Limited Drops", sub: "Maximum impact" },
              { id: "02", text: "Limited Drops", sub: "Maximum impact" },
              { id: "03", text: "Limited Drops", sub: "Maximum impact" },
              { id: "04", text: "Limited Drops", sub: "Maximum impact" },
              { id: "05", text: "Limited Drops", sub: "Maximum impact" }
            ].map((item) => (
              <div key={item.id} className="flex flex-col gap-1">
                <span className="text-white text-[10px] font-black italic">{item.id}</span>
                <p className="text-white/30 text-[8px] uppercase font-bold tracking-[0.1em] leading-none">
                  {item.text} <span className="block mt-0.5 font-normal opacity-40 lowercase italic">{item.sub}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}