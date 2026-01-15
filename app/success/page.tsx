"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useArchive } from "@/context/ArchiveContext";
import { verifyPayment } from "@/app/actions/verify";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { archive, clearArchive } = useArchive();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const hasVerified = useRef(false);

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    
    if (transactionId && !hasVerified.current) {
      hasVerified.current = true;
      
      // Mark as sold in DB
      verifyPayment(transactionId, archive).then((res) => {
        if (res && res.success) {
          setStatus("success");
          clearArchive(); // Empty the cart
          
          // Redirect back to shop after 5 seconds
          setTimeout(() => {
            router.push("/shop");
          }, 5000);
        } else {
          setStatus("error");
        }
      });
    }
  }, [searchParams, archive, router, clearArchive]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-mono">
      {status === "verifying" && (
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto" size={40} />
          <p className="uppercase tracking-[0.4em] text-[10px]">Verifying_Acquisition...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center space-y-6">
          <CheckCircle className="mx-auto" size={48} />
          <h1 className="text-4xl italic uppercase tracking-tighter">Payment_Successful</h1>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Redirecting to shop in 5 seconds...</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center space-y-6">
          <XCircle className="mx-auto text-red-500" size={48} />
          <h1 className="text-4xl italic uppercase text-red-500 tracking-tighter">Verification_Failed</h1>
          <button onClick={() => router.push("/shop")} className="border border-white/20 px-8 py-3 text-[10px] uppercase tracking-widest">Return_to_Shop</button>
        </div>
      )}
    </div>
  );
}