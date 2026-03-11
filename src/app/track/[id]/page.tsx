"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package, MapPin, Truck, CheckCircle2, Copy, Sparkles, Building2, Store, Calendar, ArrowLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn, formatCurrency } from "@/lib/utils";

// Mock Data for tracking
const mockOrder = {
  id: "ORD_782914",
  date: "11 Mar 2026, 14:30 PM",
  status: "in-production", // 'placed', 'assigned', 'in-production', 'out-for-delivery', 'delivered'
  productName: "Premium Heavyweight Hoodie",
  type: "Custom AI Design",
  amount: 1349,
  image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
  customer: {
    address: "Apt 4B, MG Road",
    city: "Bangalore",
    pincode: "560001"
  },
  seller: {
    name: "PrintHub Studio",
    pincode: "560005",
    phone: "+91 91234 56789"
  }
};

const stages = [
  { id: "placed", label: "Order Placed", desc: "We have received your order.", icon: Package },
  { id: "assigned", label: "Partner Assigned", desc: "Matched with a local print shop.", icon: Building2 },
  { id: "in-production", label: "In Production", desc: "Your custom garment is being printed.", icon: Sparkles },
  { id: "out-for-delivery", label: "Out for Delivery", desc: "Order is on the way to you.", icon: Truck },
  { id: "delivered", label: "Delivered", desc: "Order delivered successfully.", icon: CheckCircle2 },
];

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false);
  const currentStageIndex = 2; // 'in-production'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(params.id || mockOrder.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6">
            <Link href="/account" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Orders
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  Track Order
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent-light border border-accent/20">
                    Active
                  </span>
                </h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted">
                  <span className="flex items-center gap-1.5 font-mono">
                    {params.id || mockOrder.id}
                    <button onClick={copyToClipboard} className="p-1 hover:text-foreground transition-colors" title="Copy ID">
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {mockOrder.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Left Col: Timeline (2/3 width) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Timeline Card */}
              <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-neon" />
                
                <h2 className="text-lg font-bold mb-8">Order Status</h2>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-border/50 ml-4 sm:ml-6 space-y-10">
                  {stages.map((stage, index) => {
                    const isCompleted = index <= currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const Icon = stage.icon;

                    return (
                      <div key={stage.id} className="relative">
                        {/* Timeline Node */}
                        <div className={cn(
                          "absolute -left-[35px] sm:-left-[43px] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-4 border-background transition-all duration-500",
                          isCompleted ? "bg-accent shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "bg-surface text-muted"
                        )}>
                          <Icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", isCompleted ? "text-white" : "text-muted")} />
                        </div>

                        {/* Content */}
                        <div className={cn("transition-all duration-300", !isCompleted && "opacity-50")}>
                          <h3 className={cn("font-bold text-base sm:text-lg mb-1", isCurrent ? "text-accent-light" : "")}>
                            {stage.label}
                          </h3>
                          <p className="text-sm text-muted">{stage.desc}</p>

                          {/* Extra info for specific stages */}
                          {stage.id === "assigned" && isCompleted && (
                            <div className="mt-3 p-3 rounded-lg bg-surface/50 border border-border inline-flex items-center gap-3">
                              <Store className="w-4 h-4 text-accent" />
                              <div className="text-xs">
                                <span className="text-muted">Assigned Hub:</span> <span className="font-semibold text-foreground">{mockOrder.seller.name}</span>
                              </div>
                            </div>
                          )}

                          {stage.id === "in-production" && isCurrent && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/20"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-accent-light uppercase tracking-wider">Printing Progress</span>
                                <span className="text-xs font-bold font-mono">65%</span>
                              </div>
                              <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-accent to-accent-neon rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: "65%" }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                              <p className="text-[10px] text-muted mt-2">The seller is currently applying the DTF print to your garment.</p>
                            </motion.div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Col: Details (1/3 width) */}
            <div className="space-y-6">
              
              {/* Product Summary */}
              <div className="glass-card p-5">
                <h3 className="font-bold text-sm mb-4">Item Details</h3>
                <div className="flex gap-4">
                  <div className="w-16 h-20 rounded-lg bg-surface shrink-0 overflow-hidden">
                    <img src={mockOrder.image} alt={mockOrder.productName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="font-bold text-sm leading-tight line-clamp-2">{mockOrder.productName}</h4>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-surface border border-border">
                      {mockOrder.type}
                    </span>
                    <p className="text-sm font-bold mt-2 text-accent-light">{formatCurrency(mockOrder.amount)}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="glass-card p-5">
                <h3 className="font-bold text-sm mb-4">Delivery Address</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Rajesh Kumar</p>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      {mockOrder.customer.address}<br />
                      {mockOrder.customer.city}, Karnataka - {mockOrder.customer.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hyperlocal Badge (If applicable) */}
              <div className="glass-card p-4 border-green-500/20 bg-green-500/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-green-500">Hyperlocal Delivery</h4>
                  <p className="text-xs text-muted mt-0.5">Assigned to a partner in your city.</p>
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
