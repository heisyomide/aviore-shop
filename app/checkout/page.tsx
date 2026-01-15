"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";
import { ArrowLeft, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const { archive, archiveTotal } = useArchive();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePaymentRedirect = async () => {
    // 1. Basic Identity Validation
    if (!email || !firstName || !lastName || !phoneNumber) {
      return alert("IDENTITY_REQUIRED: Please provide name, email, and contact number.");
    }
    
    setLoading(true);

    try {
      // 2. CRITICAL: PRE-PAYMENT AVAILABILITY CHECK
      // We check the DB one last time before taking money
      const checkRes = await fetch("/api/checkout/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: archive.map(i => i.id) }),
      });

      const checkData = await checkRes.json();

      if (!checkData.available) {
        setLoading(false);
        return alert(`ARCHIVE_CONFLICT: The item "${checkData.unavailableItem}" was just acquired by someone else. Your vault has been updated.`);
      }

      // 3. INITIALIZE ACQUISITION (PAYMENT)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: archiveTotal,
          email: email,
          name: `${firstName} ${lastName}`,
          phone: phoneNumber,
          // Send IDs so the backend knows which items to mark as SOLD later
          itemIds: archive.map(i => i.id) 
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
    <div className="bg-[#0a0a0a] min-h-screen text-white font-mono selection:bg-white selection:text-black">
      <main className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* LEFT SIDE: Identity Form */}
        <div className="p-8 md:p-16 border-r border-white/5">
          <Link href="/shop" className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all mb-20">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Return to Catalogue
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl font-light tracking-tighter uppercase italic mb-2">Acquisition</h1>
            <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Identity & Contact</p>
          </header>

          <div className="space-y-12">
            <section className="space-y-6">
              <CheckoutInput label="Email Address" value={email} onChange={setEmail} type="email" />
              
              <div className="grid grid-cols-2 gap-8">
                <CheckoutInput label="First Name" value={firstName} onChange={setFirstName} />
                <CheckoutInput label="Last Name" value={lastName} onChange={setLastName} />
              </div>

              <CheckoutInput label="Contact Number" value={phoneNumber} onChange={setPhoneNumber} type="tel" placeholder="+234..." />
              
              <div className="pt-4">
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-4 italic">Note: Verification required for delivery logistics.</p>
              </div>
            </section>

            <button 
              type="button" 
              onClick={handlePaymentRedirect}
              disabled={loading || archive.length === 0}
              className="w-full bg-white text-black py-6 text-[10px] uppercase tracking-[0.8em] font-bold hover:invert transition-all flex justify-center items-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Initialize_Acquisition"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Vault Summary */}
        <div className="bg-[#0d0d0d] p-8 md:p-16">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-12">Vault_Summary</h2>
          
          <div className="space-y-8 mb-12 max-h-[50vh] overflow-y-auto scrollbar-hide">
            {archive.length === 0 ? (
              <p className="text-[10px] uppercase tracking-widest text-white/20">Archive_Empty</p>
            ) : (
              archive.map((item) => (
                <div key={item.id} className="flex gap-6 items-center border-b border-white/5 pb-6">
                  <div className="w-20 h-24 bg-[#1a1a1a] shrink-0 grayscale">
                    <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{item.brand}</p>
                    <h3 className="text-[11px] uppercase tracking-[0.2em] text-white">{item.name}</h3>
                    <p className="text-[9px] text-green-500/50 mt-1 uppercase">Ready for Transfer</p>
                  </div>
                  <span className="text-sm font-serif italic text-white/80 font-bold">₦{item.price.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-white/5 pt-8">
            <div className="flex justify-between items-baseline mb-12">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono">Total Valuation</span>
              <span className="text-3xl font-serif italic text-white font-bold">₦{archiveTotal.toLocaleString()}</span>
            </div>

            <div className="p-6 border border-white/5 flex items-center gap-4 bg-white/2">
              <ShieldCheck size={20} className="text-white/20" />
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/20 leading-relaxed font-mono">
                Acquisition verified via encrypted gateway. Contact +234 for delivery status.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Input Component for cleaner refactoring
function CheckoutInput({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  placeholder = "" 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
  type?: string; 
  placeholder?: string; 
}) {
  return (
    <div className="space-y-2">
      <label className="text-[8px] uppercase tracking-widest text-white/20">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder || label.toUpperCase()} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.5em] outline-none focus:border-white transition-colors uppercase placeholder:text-white/5" 
      />
    </div>
  );
}