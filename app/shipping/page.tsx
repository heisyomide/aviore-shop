"use client";
import React from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, PackageOpen, Clock, ArrowDownRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-6xl mx-auto relative overflow-hidden">
        {/* DESIGN LAYER: Blueprint Grid & Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Page Header */}
        <header className="mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-2.5 h-2.5 rounded-full bg-[#FFD747] animate-pulse" />
               <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em]">Logistics_Manifest_V1.1</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
              Logistics <br /> <span className="ml-12 md:ml-24 text-black/10">Protocol.</span>
            </h1>
            <p className="text-[11px] font-black tracking-[0.5em] text-black/30 uppercase italic">
              Transit & Handling // Global Fulfillment
            </p>
          </motion.div>
        </header>

        {/* Shipping Zones Table */}
        <section className="mb-32 relative z-10">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40 flex items-center gap-3">
              <MapPin size={14} className="text-[#FFD747]" /> Transit_Zones
            </h2>
            <ArrowDownRight size={20} className="text-black/10" />
          </div>
          
          <div className="bg-[#F9F9F9] rounded-[40px] border border-black/5 overflow-hidden shadow-2xl shadow-black/5">
            <table className="w-full text-left text-[11px] font-black uppercase tracking-widest">
              <thead>
                <tr className="border-b border-black/5 text-black/30">
                  <th className="p-8 font-black">Region</th>
                  <th className="p-8 font-black">Timeline</th>
                  <th className="p-8 font-black text-right">Flat_Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5 hover:bg-[#F3F3F3] transition-colors group">
                  <td className="p-8 text-black italic">Lagos Central</td>
                  <td className="p-8 text-black/40 group-hover:text-black">24 - 48 Hours</td>
                  <td className="p-8 text-right font-black italic">₦3,500</td>
                </tr>
                <tr className="border-b border-black/5 hover:bg-[#F3F3F3] transition-colors group">
                  <td className="p-8 text-black italic">Major Cities (Abuja, PH)</td>
                  <td className="p-8 text-black/40 group-hover:text-black">3 - 5 Days</td>
                  <td className="p-8 text-right font-black italic">₦5,500</td>
                </tr>
                <tr className="hover:bg-[#F3F3F3] transition-colors group">
                  <td className="p-8 text-black italic">Remote Regions</td>
                  <td className="p-8 text-black/40 group-hover:text-black">5 - 7 Days</td>
                  <td className="p-8 text-right font-black italic">₦7,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40 relative z-10">
          <div className="space-y-8">
            <LogisticsBlock 
              icon={<PackageOpen size={24} />}
              title="Archival_Packaging"
              desc="Every piece is sanitized, steam-pressed, and encased in eco-friendly protective layering before being boxed. We treat every 1-of-1 acquisition as a museum asset."
            />
            <LogisticsBlock 
              icon={<Clock size={24} />}
              title="Dispatch_Window"
              desc="Orders are processed Monday through Friday. Acquisitions made during the weekend are queued for Monday morning dispatch."
            />
          </div>

          <div className="space-y-8">
             <LogisticsBlock 
              icon={<Truck size={24} />}
              title="Tracking_Verification"
              desc="Once your piece enters the logistics network, a tracking ID is transmitted via email. You can monitor the status of your acquisition in real-time."
            />
            
            <div className="p-10 rounded-[40px] bg-black text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD747]" />
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">International_Orders</h4>
              </div>
              <p className="text-[10px] leading-relaxed text-white/50 uppercase tracking-widest font-bold">
                We ship worldwide via DHL Express. International rates are calculated at checkout based on weight and destination. Custom duties remain the responsibility of the acquirer.
              </p>
            </div>
          </div>
        </div>

        {/* Assistance Note */}
        <section className="text-center py-20 border-t border-black/5">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-black/20">
            Logistics inquiries: logistics@aviore.archive
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function LogisticsBlock({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="p-10 rounded-[40px] bg-[#F9F9F9] border border-black/5 group hover:border-[#FFD747] transition-all">
      <div className="text-black mb-6 bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-4 text-black">{title}</h3>
      <p className="text-[11px] leading-relaxed text-black/40 uppercase tracking-tight font-bold">
        {desc}
      </p>
    </div>
  );
}