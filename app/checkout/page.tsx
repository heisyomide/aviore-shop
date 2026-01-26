"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";
import { ArrowLeft, ShieldCheck, Loader2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { archive, archiveTotal } = useArchive();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePaymentRedirect = async () => {
    if (!email || !firstName || !lastName || !phoneNumber) {
      return alert("IDENTITY_REQUIRED: Please provide name, email, and contact number.");
    }
    
    setLoading(true);
    try {
      const checkRes = await fetch("/api/checkout/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: archive.map((i: any) => i.id) }),
      });

      const checkData = await checkRes.json();
      if (!checkData.available) {
        setLoading(false);
        return alert(`ARCHIVE_CONFLICT: The item "${checkData.unavailableItem}" was just acquired.`);
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: archiveTotal,
          email: email,
          name: `${firstName} ${lastName}`,
          phone: phoneNumber,
          itemIds: archive.map((i: any) => i.id) 
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "GATEWAY_ERROR");
      }
    } catch (err) {
      console.error("Redirect failed", err);
      alert("SYSTEM_OFFLINE: Could not initialize acquisition.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen gap-0">
        
        {/* LEFT SIDE: Identity Form */}
        <div className="lg:col-span-7 p-6 md:p-16 pt-32">
          <Link href="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-black transition-all mb-16">
            <ArrowLeft size={12} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            Return_to_Catalogue
          </Link>

          <header className="mb-14 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFD747] animate-pulse" />
              <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em]">Logistics_Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Acquisition</h1>
          </header>

          <div className="space-y-12 max-w-2xl">
            <section className="space-y-8">
              <CheckoutInput label="Email_Address" value={email} onChange={setEmail} type="email" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CheckoutInput label="First_Name" value={firstName} onChange={setFirstName} />
                <CheckoutInput label="Last_Name" value={lastName} onChange={setLastName} />
              </div>

              <CheckoutInput label="Contact_Number" value={phoneNumber} onChange={setPhoneNumber} type="tel" placeholder="+234..." />
            </section>

            <button 
              type="button" 
              onClick={handlePaymentRedirect}
              disabled={loading || archive.length === 0}
              className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.01] active:scale-[0.98] shadow-2xl flex justify-center items-center gap-4"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : (
                <>Initialize_Payment <CreditCard size={14} /></>
              )}
            </button>
            
            <p className="text-[9px] text-black/20 uppercase font-black tracking-widest text-center">
              Secured_By_Acquisition_Protocol_V4.0
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Vault Summary (The "Fit" Part) */}
        <div className="lg:col-span-5 bg-[#F9F9F9] p-6 md:p-16 pt-32 border-l border-gray-100 relative">
          {/* Background Design */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative z-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30 mb-12 border-l-2 border-[#FFD747] pl-3">Vault_Summary</h2>
            
            <div className="space-y-6 mb-12 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
              {archive.length === 0 ? (
                <p className="text-[10px] font-black uppercase tracking-widest text-black/20">Archive_Empty</p>
              ) : (
                archive.map((item: any) => (
                  <div key={item.id} className="flex gap-6 items-center bg-white p-4 rounded-[25px] border border-black/5 shadow-sm">
                    <div className="w-20 h-24 bg-[#F3F3F3] rounded-2xl overflow-hidden shrink-0">
                      <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] font-black text-black/30 uppercase tracking-widest">{item.brand}</p>
                      <h3 className="text-[11px] font-black uppercase tracking-tighter italic text-black leading-tight">{item.name}</h3>
                      <p className="text-[9px] text-[#FFD747] font-black mt-1 uppercase tracking-tighter underline underline-offset-2">Verified_Specimen</p>
                    </div>
                    <span className="text-[13px] font-black italic text-black">₦{item.price.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-8 border-t border-black/5">
              <div className="flex justify-between items-baseline mb-12 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Total Valuation</span>
                <span className="text-4xl font-black italic text-black tracking-tighter">₦{archiveTotal.toLocaleString()}</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-black/5 flex items-start gap-4 shadow-sm">
                <ShieldCheck size={20} className="text-[#FFD747] shrink-0" />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40 leading-relaxed">
                  Transactions are encrypted. Acquired items are dispatched within 24 hours of protocol confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CheckoutInput({ label, value, onChange, type = "text", placeholder = "" }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[9px] font-black uppercase tracking-widest text-black/40 ml-1">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder || label.replace("_", " ").toUpperCase()} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#F3F3F3] rounded-2xl py-4 px-6 text-[11px] font-bold tracking-widest outline-none focus:ring-2 focus:ring-[#FFD747] transition-all uppercase placeholder:text-black/10" 
      />
    </div>
  );
}