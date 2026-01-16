"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  Plus, Package, Upload, User, Archive, 
  ShieldCheck, Mail, Phone, Trash2, Search, TrendingUp, 
  Layers, CreditCard, RefreshCw, Hash, AlignLeft
} from "lucide-react";
import { 
  uploadPiece, getOrders, updateOrderStatus, 
  getInventory, deletePiece 
} from "@/app/actions/admin";

// --- TYPES ---
interface InventoryItem {
  _id: string;
  name: string;
  brand: string;
  price: number;
  img: string;
  category: string;
  description: string; // Added back
  isSold: boolean;
  lotNumber?: string;
}

interface OrderItem {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: string;
  tx_ref: string;
  items: InventoryItem[];
  createdAt: string;
}

const CATEGORIES = ["Denim", "Tops", "Shorts"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const [invData, orderData] = await Promise.all([getInventory(), getOrders()]);
      setInventory(invData || []);
      setOrders(orderData || []);
    } catch (err) {
      console.error("Hydration Error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { refreshData(); }, []);

  const stats = useMemo(() => {
    const totalRevenue = orders.filter(o => o.status === "SUCCESS").reduce((sum, order) => sum + order.amount, 0);
    const liveCount = inventory.filter(i => !i.isSold).length;
    const successfulTransfers = inventory.filter(i => i.isSold).length;
    return { totalRevenue, liveCount, successfulTransfers };
  }, [inventory, orders]);

  const handleCommit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await uploadPiece(formData);
      if (res.success) {
        setSelectedImage(null);
        (e.target as HTMLFormElement).reset(); 
        await refreshData();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string) => {
    setLoading(true);
    try {
      const res = await updateOrderStatus(id);
      if (res.success) await refreshData(); 
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("ARCHIVE_PERMANENT_REMOVAL?")) {
      const res = await deletePiece(id);
      if (res.success) await refreshData();
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.tx_ref.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono p-4 md:p-8 selection:bg-white selection:text-black">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-8 gap-4">
        <div>
          <h1 className="text-xl tracking-[0.4em] uppercase font-bold text-white/90">Avioré_Archive_Command</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-[10px] text-white/30 uppercase tracking-widest italic flex items-center gap-2">
              Status: <span className="text-green-500 underline animate-pulse">ENCRYPTED_LIVE</span>
              {refreshing && <RefreshCw size={10} className="animate-spin text-white/50" />}
            </p>
          </div>
        </div>
        
        <nav className="flex gap-4 bg-white/5 p-1 border border-white/5 rounded-sm">
          {["inventory", "sales"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-[9px] px-6 py-2 uppercase tracking-[0.2em] transition-all ${activeTab === tab ? "bg-white text-black font-bold" : "text-white/40 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* --- STATS --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total_Gross_Revenue" value={`₦${stats.totalRevenue.toLocaleString()}`} icon={<CreditCard size={14}/>} color="text-green-500" />
          <StatCard label="Live_Pieces" value={stats.liveCount.toString()} icon={<Layers size={14}/>} />
          <StatCard label="Successful_Transfers" value={stats.successfulTransfers.toString()} icon={<TrendingUp size={14}/>} />
        </section>

        {activeTab === "inventory" && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-500">
            {/* UPLOAD FORM */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 flex items-center gap-2"><Plus size={14} /> Commit_New_Piece</h2>
              <form onSubmit={handleCommit} className="space-y-4 bg-white/[0.02] border border-white/5 p-6">
                <AdminInput name="name" label="Piece_Identity" placeholder="VINTAGE_DENIM_501" />
                <AdminInput name="brand" label="Entity_Brand" placeholder="LEVIS" />
                <div className="grid grid-cols-2 gap-4">
                  <AdminInput name="price" label="Valuation_NGN" placeholder="55000" type="number" />
                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase tracking-widest text-white/30">Target_Category</label>
                    <select name="category" required className="w-full bg-black border border-white/10 p-3 text-[10px] outline-none text-white uppercase focus:border-white/40">
                      <option value="">Select</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                {/* --- DESCRIPTION FIELD --- */}
                <div className="space-y-1.5">
                  <label className="text-[8px] uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                    <AlignLeft size={10}/> Narrative_Description
                  </label>
                  <textarea 
                    name="description" 
                    required 
                    placeholder="Describe the specimen's history and condition..."
                    rows={4}
                    className="w-full bg-black border border-white/10 p-3 text-[10px] outline-none focus:border-white/40 uppercase tracking-widest transition-all placeholder:text-white/5 resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest text-white/30">Visual_Reference</label>
                  <div onClick={() => fileInputRef.current?.click()} className="border border-dashed border-white/10 h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-white/3 transition-all overflow-hidden relative group">
                    {selectedImage ? (
                      <img src={selectedImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <Upload size={16} className="text-white/20" />
                    )}
                    <input type="file" name="image" ref={fileInputRef} onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedImage(URL.createObjectURL(file));
                    }} className="hidden" accept="image/*" />
                  </div>
                </div>

                <button disabled={loading} className="w-full bg-white text-black py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:invert transition-all">
                  {loading ? "DATA_TRANSMITTING..." : "Push_to_Archive"}
                </button>
              </form>
            </div>

            {/* INVENTORY LOG */}
            <div className="lg:col-span-8 space-y-6">
               <div className="border border-white/5 bg-white/[0.01]">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40">Manifest_Log</h2>
                </div>
                <div className="overflow-x-auto max-h-[600px] scrollbar-hide">
                  <table className="w-full text-left">
                    <thead className="text-[7px] text-white/20 uppercase tracking-[0.3em] border-b border-white/5 sticky top-0 bg-black z-10">
                      <tr>
                        <th className="p-4">Lot_Ref</th>
                        <th className="p-4">Specimen_Name</th>
                        <th className="p-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-[9px] uppercase">
                      {inventory.map((item) => (
                        <tr key={item._id} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${item.isSold ? 'opacity-30' : ''}`}>
                          <td className="p-4 text-white/40 font-mono">{item.lotNumber || '---'}</td>
                          <td className="p-4">
                             <span className="block font-bold tracking-widest">{item.name}</span>
                             <span className="text-[7px] text-white/30 tracking-widest uppercase">{item.brand} // ₦{item.price.toLocaleString()}</span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <span className={`px-2 py-0.5 border text-[7px] tracking-widest font-bold ${item.isSold ? 'border-red-500/20 text-red-500' : 'border-green-500/20 text-green-500'}`}>
                                {item.isSold ? 'SOLD_OUT' : 'AVAILABLE'}
                              </span>
                              <button onClick={() => handleDelete(item._id)} className="text-white/10 hover:text-red-500 transition-colors">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "sales" && (
          <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 flex items-center gap-2"><Package size={14} /> Acquisition_Logs</h2>
              <div className="relative w-64">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="text" 
                  placeholder="SEARCH_LOGS..." 
                  className="w-full bg-white/[0.03] border border-white/10 py-2 pl-9 pr-4 text-[9px] outline-none focus:border-white/30 uppercase"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredOrders.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-white/5 text-[10px] text-white/20 uppercase tracking-widest">No_Records_Found</div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order._id} className="bg-white/[0.01] border border-white/5 p-6 flex flex-col md:flex-row justify-between gap-8 group hover:border-white/20 transition-all relative">
                    <div className="space-y-4 min-w-[220px]">
                      <div className="space-y-2">
                        <p className="text-[8px] text-white/20 uppercase tracking-widest font-bold">Customer_Entity</p>
                        <p className="text-[11px] font-bold uppercase flex items-center gap-2"><User size={12} className="text-white/40"/> {order.customerName}</p>
                        <div className="space-y-1 pt-1 border-t border-white/5">
                          <p className="text-[9px] text-white/40 flex items-center gap-2 font-mono italic">{order.customerEmail}</p>
                          <p className="text-[10px] text-green-500 font-bold flex items-center gap-2"><Phone size={10}/> {order.customerPhone}</p>
                        </div>
                      </div>
                      <div className={`text-[7px] inline-block px-2 py-1 border font-bold tracking-widest ${order.status === 'SUCCESS' ? 'border-green-500/30 text-green-500' : 'border-yellow-500/30 text-yellow-500'}`}>
                        {order.status === 'SUCCESS' ? 'AUTHENTICATED' : 'AWAITING_VERIFICATION'}
                      </div>
                    </div>

                    <div className="flex-1 md:border-x border-white/5 md:px-8 flex flex-col justify-center gap-3">
                      <p className="text-[8px] text-white/20 uppercase tracking-widest font-bold">Acquired_Specimens</p>
                      {order.items.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 bg-white/[0.02] p-2 border border-white/5">
                          <div className="h-10 w-10 bg-zinc-900 border border-white/10 grayscale shrink-0">
                             {item.img && <img src={item.img} alt="" className="h-full w-full object-cover opacity-50" />}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-tight">{item.name}</p>
                            <p className="text-[7px] text-white/20 tracking-widest uppercase">{item.brand}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-right flex flex-col justify-between items-end min-w-[180px]">
                      <div className="space-y-1">
                        <p className="text-2xl italic font-serif text-white">₦{order.amount.toLocaleString()}</p>
                        <p className="text-[8px] text-white/10 font-mono uppercase flex items-center gap-1 justify-end">
                          <Hash size={8}/> {order.tx_ref}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleStatusUpdate(order._id)}
                        disabled={order.status === 'SUCCESS' || loading}
                        className={`mt-4 px-6 py-4 text-[9px] uppercase tracking-[0.4em] border font-bold transition-all ${order.status === 'SUCCESS' ? 'border-green-500/30 text-green-500 opacity-50' : 'border-white/10 hover:bg-white hover:text-black'}`}
                      >
                        {order.status === 'SUCCESS' ? <ShieldCheck size={12} className="inline mr-2"/> : "Confirm_Acquisition"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// --- HELPERS ---
function AdminInput({ label, placeholder, name, type = "text" }: { label: string; placeholder: string; name: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[8px] uppercase tracking-widest text-white/30">{label}</label>
      <input 
        name={name} 
        required 
        type={type} 
        placeholder={placeholder} 
        className="w-full bg-black border border-white/10 p-3 text-[10px] outline-none focus:border-white/40 uppercase tracking-widest transition-all placeholder:text-white/5" 
      />
    </div>
  );
}

function StatCard({ label, value, icon, color = "text-white" }: { label: string; value: string; icon: React.ReactNode; color?: string }) {
  return (
    <div className="p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between hover:bg-white/[0.02] transition-all h-32 group">
      <div className="flex justify-between items-start text-white/20 group-hover:text-white/40 transition-all">
        <span className="text-[8px] uppercase tracking-widest font-bold">{label}</span>
        {icon}
      </div>
      <p className={`text-2xl font-bold italic font-serif ${color}`}>{value}</p>
    </div>
  );
}