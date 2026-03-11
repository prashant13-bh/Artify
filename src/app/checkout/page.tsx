"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, CreditCard, MapPin, Truck, ChevronRight,
  ShieldCheck, Lock, Smartphone, Sparkles, Building2,
  Wallet, Search
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn, formatCurrency } from "@/lib/utils";

// Mock Cart Item (would come from global state/context normally)
const cartItem = {
  id: "C_123",
  garmentName: "Premium Heavyweight Hoodie",
  color: "Stealth Black",
  size: "L",
  type: "DTF Print",
  designPrompt: "Cyberpunk dragon wrapping around neon city",
  basePrice: 999,
  customizationPrice: 350,
  image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
};

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [pincode, setPincode] = useState("560001");
  const [isCheckingHyperlocal, setIsCheckingHyperlocal] = useState(false);
  const [hyperlocalMatch, setHyperlocalMatch] = useState<boolean | null>(true); // Pre-matched for demo
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItem.basePrice + cartItem.customizationPrice;
  const platformFee = 50; // Flat platform fee
  const shipping = hyperlocalMatch ? 40 : 120; // Cheaper if hyperlocal matched
  const total = subtotal + platformFee + shipping;

  const handleVerifyPincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPincode(val);
    if (val.length === 6) {
      setIsCheckingHyperlocal(true);
      setHyperlocalMatch(null);
      // Simulate API check
      setTimeout(() => {
        setIsCheckingHyperlocal(false);
        // Fake logic: if it starts with 5, it's a match
        setHyperlocalMatch(val.startsWith("5"));
      }, 1000);
    } else {
      setHyperlocalMatch(null);
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-24">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-card p-8 sm:p-10 text-center relative overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent-neon/20 rounded-full blur-[100px]" />

            <div className="relative z-10 w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-surface border border-green-500/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted mb-2">Order ID: #{Math.floor(Math.random() * 900000) + 100000}</p>
            
            <div className="bg-surface/50 p-4 rounded-xl mt-6 mb-8 text-sm">
              <p className="font-semibold mb-1 text-foreground">Next Steps:</p>
              {hyperlocalMatch ? (
                <p className="text-muted">Your order has been assigned to a local PrintPartner in your area (<span className="text-accent">{pincode}</span>). They will begin production shortly. Expected delivery: <strong>Tomorrow</strong>.</p>
              ) : (
                <p className="text-muted">Your custom garment is being processed. Expected delivery in <strong>3-5 business days</strong>.</p>
              )}
            </div>

            <Link href="/shop" className="btn-primary w-full">Continue Shopping</Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
            
            {/* Left Column: Form Steps */}
            <div className="flex-[1.5] space-y-6">
              <h1 className="text-3xl font-bold mb-6">Checkout</h1>

              {/* Step 1: Delivery Address */}
              <div className={cn("glass-card overflow-hidden transition-all", step !== 1 && "opacity-60")}>
                <div 
                  className="bg-surface/50 p-4 sm:p-5 flex items-center justify-between cursor-pointer border-b border-border"
                  onClick={() => setStep(1)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors", step === 1 ? "bg-accent text-white shadow-lg shadow-accent/50" : "bg-surface-elevated text-muted")}>
                      1
                    </div>
                    <h2 className="text-lg font-bold">Delivery Details</h2>
                  </div>
                  {step === 2 && <span className="text-xs font-semibold text-accent-light flex items-center gap-1">Edit <ChevronRight className="w-4 h-4" /></span>}
                </div>

                <AnimatePresence>
                  {step === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-5 sm:p-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                          <input type="text" className="input-field" placeholder="John Doe" defaultValue="Rajesh Kumar" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium mb-1.5 block">Address (House No, Building, Street)</label>
                          <input type="text" className="input-field" placeholder="123 Fashion Blvd..." defaultValue="Apt 4B, MG Road" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">City</label>
                          <input type="text" className="input-field" placeholder="City" defaultValue="Bangalore" />
                        </div>
                        <div className="relative">
                          <label className="text-sm font-medium mb-1.5 block flex items-center justify-between">
                            PIN Code
                            {isCheckingHyperlocal && <span className="text-[10px] text-accent animate-pulse">Checking area...</span>}
                          </label>
                          <input 
                            type="text" 
                            className={cn("input-field font-mono transition-all", 
                              hyperlocalMatch === true && "border-green-500/50 focus:border-green-500 ring-1 ring-green-500/20",
                              hyperlocalMatch === false && "border-amber-500/50"
                            )}
                            placeholder="6 digits" 
                            maxLength={6} 
                            value={pincode}
                            onChange={handleVerifyPincode}
                          />
                          {hyperlocalMatch === true && (
                            <CheckCircle2 className="w-4 h-4 text-green-500 absolute right-3 top-[34px]" />
                          )}
                        </div>
                      </div>

                      {/* Hyperlocal Match Alert */}
                      <AnimatePresence>
                        {hyperlocalMatch === true && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                            <div className="flex gap-3">
                              <Building2 className="w-5 h-5 text-green-500 shrink-0" />
                              <div>
                                <h4 className="font-bold text-sm text-green-500 mb-1 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Hyperlocal Seller Found!
                                </h4>
                                <p className="text-xs text-muted leading-relaxed">
                                  Great news! A registered MakeMyWear seller is located near <strong>{pincode}</strong>. Your custom order will be routed to them for ultra-fast production and delivery.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        {hyperlocalMatch === false && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 rounded-xl bg-surface border border-border">
                            <div className="flex gap-3">
                              <Truck className="w-5 h-5 text-amber-500 shrink-0" />
                              <div>
                                <h4 className="font-bold text-sm text-amber-500 mb-1">Standard Delivery</h4>
                                <p className="text-xs text-muted leading-relaxed">
                                  No local sellers found for {pincode}. Your order will be fulfilled by our central hub. Delivery in 3-5 days.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button onClick={() => setStep(2)} className="btn-primary w-full sm:w-auto">
                        Continue to Payment
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 2: Payment */}
              <div className={cn("glass-card overflow-hidden transition-all", step !== 2 && "opacity-50")}>
                 <div className="bg-surface/50 p-4 sm:p-5 flex items-center gap-3 border-b border-border">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors", step === 2 ? "bg-accent text-white shadow-lg shadow-accent/50" : "bg-surface-elevated text-muted")}>
                      2
                    </div>
                    <h2 className="text-lg font-bold">Payment Method</h2>
                  </div>

                  <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-5 sm:p-6"
                    >
                      <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-green-500">
                        <Lock className="w-3.5 h-3.5" /> Secured by 256-bit encryption
                      </div>

                      <div className="space-y-3 mb-6">
                        {/* UPI */}
                        <div 
                          className={cn("p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4", paymentMethod === "upi" ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-accent/30")}
                          onClick={() => setPaymentMethod("upi")}
                        >
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === "upi" ? "border-accent" : "border-muted")}>
                            {paymentMethod === "upi" && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                          </div>
                          <Smartphone className={cn("w-5 h-5", paymentMethod === "upi" ? "text-accent-light" : "text-muted")} />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">UPI (GPay, PhonePe, Paytm)</h4>
                          </div>
                        </div>

                        {/* Credit Card */}
                        <div 
                          className={cn("p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4", paymentMethod === "card" ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-accent/30")}
                          onClick={() => setPaymentMethod("card")}
                        >
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === "card" ? "border-accent" : "border-muted")}>
                            {paymentMethod === "card" && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                          </div>
                          <CreditCard className={cn("w-5 h-5", paymentMethod === "card" ? "text-accent-light" : "text-muted")} />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">Debit / Credit Card</h4>
                          </div>
                        </div>

                        {/* COD */}
                        <div 
                          className={cn("p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4", paymentMethod === "cod" ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-accent/30")}
                          onClick={() => setPaymentMethod("cod")}
                        >
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === "cod" ? "border-accent" : "border-muted")}>
                            {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                          </div>
                          <Wallet className={cn("w-5 h-5", paymentMethod === "cod" ? "text-accent-light" : "text-muted")} />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">Cash on Delivery</h4>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={handlePayment} 
                        disabled={isProcessing}
                        className="btn-glow w-full flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>Pay {formatCurrency(total)}</>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-muted mt-3">
                        By clicking pay, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </motion.div>
                  )}
                  </AnimatePresence>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="flex-1">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-6">Order Summary</h3>

                {/* Cart Item Detail */}
                <div className="flex gap-4 mb-6 border-b border-border pb-6">
                  <div className="w-20 h-24 rounded-lg bg-surface shrink-0 relative overflow-hidden group">
                    <img src={cartItem.image} alt={cartItem.garmentName} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-bold text-sm leading-tight truncate">{cartItem.garmentName}</h4>
                      <div className="mt-1 flex flex-wrap gap-1.5 list-none m-0 p-0 text-[10px] text-muted">
                        <span className="bg-surface px-1.5 py-0.5 rounded">{cartItem.color}</span>
                        <span className="bg-surface px-1.5 py-0.5 rounded border border-border">Size: {cartItem.size}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-accent-light">{cartItem.type}</p>
                    </div>
                  </div>
                  <div className="font-bold text-sm py-1 whitespace-nowrap">
                    {formatCurrency(subtotal)}
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-sm text-foreground/80 mb-6 border-b border-border pb-6">
                  <div className="flex justify-between">
                    <span>Base Garment</span>
                    <span>{formatCurrency(cartItem.basePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent" /> AI Generation & Print
                    </span>
                    <span>{formatCurrency(cartItem.customizationPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>{formatCurrency(platformFee)}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="flex items-center gap-1">
                      Shipping
                      {hyperlocalMatch === true && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-green-500/10 text-green-500">Hyperlocal Area</span>}
                    </span>
                    <span className={hyperlocalMatch === true ? "text-green-500" : ""}>{formatCurrency(shipping)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="block text-sm font-medium text-muted">Total Amount</span>
                    <span className="text-[10px] text-muted">Includes GST</span>
                  </div>
                  <span className="text-2xl font-black gradient-text tracking-tight">{formatCurrency(total)}</span>
                </div>

                {/* Trust Badges */}
                <div className="bg-surface/50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-medium">
                    <ShieldCheck className="w-5 h-5 text-accent-light shrink-0" />
                    100% Quality Guarantee
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-muted">
                    <Truck className="w-5 h-5 shrink-0" />
                    Cash on Delivery Available
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
