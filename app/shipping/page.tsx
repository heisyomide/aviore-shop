"use client";
import React from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, PackageOpen, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black font-mono">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        {/* Page Header */}
        <header className="mb-24 border-b border-white/5 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic mb-6">
              Logistics_Protocol
            </h1>
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase italic">
              Transit & Handling // Domestic & International
            </p>
          </motion.div>
        </header>

        {/* Shipping Zones Table */}
        <section className="mb-32">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-8 flex items-center gap-2">
            <MapPin size={14} /> Transit_Zones
          </h2>
          <div className="border border-white/10 bg-white/[0.02] overflow-hidden">
            <table className="w-full text-left text-[11px] uppercase tracking-widest">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="p-6 font-normal">Region</th>
                  <th className="p-6 font-normal">Timeline</th>
                  <th className="p-6 font-normal text-right">Flat_Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-6 text-white">Lagos Central</td>
                  <td className="p-6">24 - 48 Hours</td>
                  <td className="p-6 text-right">₦3,500</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 text-white">Major Cities (Abuja, PH, etc)</td>
                  <td className="p-6">3 - 5 Days</td>
                  <td className="p-6 text-right">₦5,500</td>
                </tr>
                <tr>
                  <td className="p-6 text-white">Remote Regions</td>
                  <td className="p-6">5 - 7 Days</td>
                  <td className="p-6 text-right">₦7,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <PackageOpen size={18} strokeWidth={1} />
                <h3 className="text-xs uppercase tracking-[0.4em]">Archival_Packaging</h3>
              </div>
              <p className="text-[11px] leading-relaxed text-white/40 uppercase tracking-wider">
                Every piece is sanitized, steam-pressed, and encased in eco-friendly protective layering before being boxed. We treat every 1-of-1 acquisition as a museum asset.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <Clock size={18} strokeWidth={1} />
                <h3 className="text-xs uppercase tracking-[0.4em]">Dispatch_Window</h3>
              </div>
              <p className="text-[11px] leading-relaxed text-white/40 uppercase tracking-wider">
                Orders are processed Monday through Friday. Acquisitions made during the weekend are queued for Monday morning dispatch.
              </p>
            </div>
          </div>

          <div className="space-y-12">
             <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <Truck size={18} strokeWidth={1} />
                <h3 className="text-xs uppercase tracking-[0.4em]">Tracking_Verification</h3>
              </div>
              <p className="text-[11px] leading-relaxed text-white/40 uppercase tracking-wider">
                Once your piece enters the logistics network, a tracking ID is transmitted via email. You can monitor the status of your acquisition in real-time.
              </p>
            </div>
            
            <div className="p-8 border border-dashed border-white/20 bg-white/[0.01]">
              <h4 className="text-[10px] uppercase tracking-[0.4em] mb-4">International_Orders</h4>
              <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-widest">
                We ship worldwide via DHL Express. International rates are calculated at checkout based on weight and destination. Custom duties remain the responsibility of the acquirer.
              </p>
            </div>
          </div>
        </div>

        {/* Assistance Note */}
        <section className="text-center py-20 border-t border-white/5">
          <p className="text-[9px] uppercase tracking-[0.6em] text-white/20">
            Logistics inquiries: logistics@aviore.archive
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}