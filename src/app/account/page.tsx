"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Package, Settings, MapPin,
  LogOut, ChevronRight, Edit2, ShieldCheck, Mail, Phone,
  Camera, Shirt
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn, formatCurrency } from "@/lib/utils";
import { mockOrders, mockAIDesigns } from "@/lib/mock-data";

type Tab = "orders" | "designs" | "settings";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  // Filter orders assigned to "customer"
  const myOrders = mockOrders.slice(0, 3);
  const myDesigns = mockAIDesigns.slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "bg-slate-500/10 text-slate-500 border-slate-500/20";
      case "In Production": return "bg-accent/10 text-accent border-accent/20";
      case "Ready for Courier": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Delivered": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-surface text-muted border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">My Account</h1>
              <p className="text-muted">Welcome back, <span className="text-foreground font-semibold">Rajesh Kumar</span></p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors w-full md:w-auto justify-center font-medium text-sm">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-64 shrink-0">
              <div className="glass-card p-4 sticky top-24">
                
                {/* Profile Widget */}
                <div className="flex items-center gap-4 p-4 mb-6 bg-surface/50 rounded-xl border border-border">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center text-white text-xl font-bold">
                      RK
                    </div>
                    <button className="absolute -bottom-1 -right-1 p-1.5 bg-background rounded-full border border-border shadow-sm text-muted hover:text-foreground">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">Rajesh Kumar</h3>
                    <p className="text-xs text-muted">Joined Mar 2026</p>
                  </div>
                </div>

                <nav className="space-y-1.5">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      activeTab === "orders" ? "bg-accent/10 text-accent-light" : "text-muted hover:text-foreground hover:bg-surface"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5" /> My Orders
                    </div>
                    {activeTab === "orders" && <ChevronRight className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setActiveTab("designs")}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      activeTab === "designs" ? "bg-accent/10 text-accent-light" : "text-muted hover:text-foreground hover:bg-surface"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Wand2Icon className="w-5 h-5" /> Saved Designs
                    </div>
                    {activeTab === "designs" && <ChevronRight className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      activeTab === "settings" ? "bg-accent/10 text-accent-light" : "text-muted hover:text-foreground hover:bg-surface"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5" /> Account Settings
                    </div>
                    {activeTab === "settings" && <ChevronRight className="w-4 h-4" />}
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                
                {/* ORDERS TAB */}
                {activeTab === "orders" && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Package className="w-5 h-5 text-accent-light" />
                        Order History
                      </h2>
                    </div>

                    {myOrders.map((order) => (
                      <div key={order.id} className="glass-card hover:border-accent/30 transition-colors overflow-hidden">
                        <div className="bg-surface/50 p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <p className="text-muted text-xs">Order ID</p>
                              <p className="font-semibold">{order.id}</p>
                            </div>
                            <div className="h-8 w-px bg-border hidden sm:block"></div>
                            <div>
                              <p className="text-muted text-xs">Date Placed</p>
                              <p className="font-semibold">Mar 10, 2026</p>
                            </div>
                            <div className="h-8 w-px bg-border hidden sm:block"></div>
                            <div>
                              <p className="text-muted text-xs">Total Amount</p>
                              <p className="font-semibold">{formatCurrency(order.amount)}</p>
                            </div>
                          </div>
                          <Link 
                            href={`/track/${order.id}`}
                            className="btn-primary py-2 px-4 text-xs shrink-0 self-start sm:self-auto w-full sm:w-auto text-center"
                          >
                            Track Order Layout
                          </Link>
                        </div>
                        
                        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
                           <div className="w-24 h-28 shrink-0 bg-surface rounded-lg overflow-hidden border border-border">
                             <img src={order.designPreview} alt={order.product} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                             <div className="flex justify-between items-start mb-2">
                               <h3 className="font-bold text-lg">{order.product}</h3>
                               <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", getStatusColor(order.status))}>
                                  {order.status}
                               </span>
                             </div>
                             
                             <div className="flex flex-wrap gap-2 text-xs text-muted mb-4">
                               {order.isSYOG && (
                                 <span className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded border border-orange-500/20 font-medium">
                                   <Shirt className="w-3 h-3" /> SYOG Input
                                 </span>
                               )}
                               <span className="flex items-center gap-1 bg-surface px-2 py-0.5 rounded border border-border">
                                 Size: M
                               </span>
                               <span className="flex items-center gap-1 bg-surface px-2 py-0.5 rounded border border-border">
                                 {order.designType === "Ready-Made" ? "Ready Made" : "Custom AI"}
                               </span>
                             </div>
                             
                             <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
                               Delivering to: {order.city} ({order.pincode})
                             </p>

                           </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* DESIGNS TAB */}
                {activeTab === "designs" && (
                  <motion.div
                    key="designs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Wand2Icon className="w-5 h-5 text-accent-light" />
                        Saved Designs
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      {myDesigns.map((design) => (
                        <div key={design.id} className="glass-card overflow-hidden group">
                          <div className="relative aspect-square">
                            <img src={design.imageUrl} alt={design.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                              <p className="text-xs text-white line-clamp-2 mb-3">{design.prompt}</p>
                              <Link href="/studio" className="btn-primary text-xs w-full py-2">
                                Apply to Garment
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 max-w-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Settings className="w-5 h-5 text-accent-light" />
                        Account Settings
                      </h2>
                    </div>

                    {/* Personal Info */}
                    <div className="glass-card p-6">
                       <div className="flex items-center justify-between mb-6">
                         <h3 className="font-bold text-lg flex items-center gap-2"><User className="w-4 h-4 text-muted" /> Personal Information</h3>
                         <button className="text-xs text-accent hover:underline font-medium flex items-center gap-1"><Edit2 className="w-3 h-3"/> Edit</button>
                       </div>
                       <div className="grid sm:grid-cols-2 gap-6">
                         <div>
                           <p className="text-xs text-muted mb-1 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email Address</p>
                           <p className="text-sm font-medium">rajesh@makemywear.in</p>
                         </div>
                         <div>
                           <p className="text-xs text-muted mb-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Phone Number</p>
                           <p className="text-sm font-medium">+91 98765 43210</p>
                         </div>
                       </div>
                    </div>

                    {/* Saved Addresses */}
                    <div className="glass-card p-6">
                       <div className="flex items-center justify-between mb-6">
                         <h3 className="font-bold text-lg flex items-center gap-2"><MapPin className="w-4 h-4 text-muted" /> Saved Addresses</h3>
                         <button className="text-xs text-accent hover:underline font-medium flex items-center gap-1">Add New</button>
                       </div>
                       <div className="space-y-4">
                         <div className="p-4 rounded-xl border-2 border-accent bg-accent/5 relative">
                           <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Default</div>
                           <h4 className="font-bold text-sm mb-1">Home</h4>
                           <p className="text-sm text-foreground/80 mb-2">Apt 4B, MG Road, Residency Area<br/>Bangalore, Karnataka - 560001</p>
                           <div className="flex gap-4 text-xs font-semibold">
                             <button className="text-accent hover:underline">Edit</button>
                             <button className="text-muted hover:text-red-500">Remove</button>
                           </div>
                         </div>
                       </div>
                    </div>

                    {/* Security */}
                    <div className="glass-card p-6">
                       <div className="flex items-center justify-between mb-6">
                         <h3 className="font-bold text-lg flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-muted" /> Security</h3>
                       </div>
                       <div className="flex items-center justify-between py-2 border-b border-border">
                         <div>
                           <p className="text-sm font-medium">Password</p>
                           <p className="text-xs text-muted">Last changed 3 months ago</p>
                         </div>
                         <button className="btn-secondary text-xs px-3 py-1.5">Change</button>
                       </div>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// Quick extracted matching icon due to import collision
function Wand2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </svg>
  );
}
