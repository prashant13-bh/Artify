"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store, MapPin, Printer, CheckCircle2,
  ArrowRight, ArrowLeft, Shirt, Eye, Star,
  ShieldCheck, UploadCloud, Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type RegistrationData = {
  fullName: string;
  shopName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  capabilities: string[];
  acceptsSYOG: boolean;
};

const initialData: RegistrationData = {
  fullName: "",
  shopName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  capabilities: [],
  acceptsSYOG: false,
};

export default function BecomeASellerPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const updateData = (fields: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 2000);
  };

  const toggleCapability = (cap: string) => {
    const caps = data.capabilities.includes(cap)
      ? data.capabilities.filter((c) => c !== cap)
      : [...data.capabilities, cap];
    updateData({ capabilities: caps });
  };

  const capabilitiesList = [
    { id: "dtf", label: "DTF Printing", desc: "Direct-to-Film vibrant prints", icon: Printer },
    { id: "embroidery", label: "Embroidery", desc: "Premium thread stitching", icon: Shirt },
    { id: "screen", label: "Screen Printing", desc: "Bulk vector graphics", icon: Eye },
    { id: "uv", label: "UV Printing", desc: "High-durability accessories", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Header */}
          {!isSuccess && (
            <div className="text-center mb-10 w-full max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent-light border border-accent/20 mb-4">
                <Store className="w-4 h-4" />
                Seller Partner Program
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
                Turn your print shop into a <span className="gradient-text">hyperlocal powerhouse</span>
              </h1>
              <p className="text-muted text-sm sm:text-base">
                Join MakeMyWear to receive daily print and embroidery orders directly from customers in your city.
              </p>
            </div>
          )}

          {/* Form Card */}
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card-strong p-8 sm:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">Application Received! 🎉</h2>
                  <p className="text-muted mb-8 max-w-md mx-auto">
                    Thanks for applying, {data.fullName.split(' ')[0]}! Our vendor onboarding team will review your application for {data.shopName} and contact you within 24-48 hours.
                  </p>
                  <Link href="/" className="btn-primary inline-flex gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                </motion.div>
              ) : (
                /* Wizard Steps */
                <motion.div
                  key="wizard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 sm:p-8"
                >
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      {[1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          className={cn(
                            "text-[10px] sm:text-xs font-semibold px-2 transition-colors",
                            step >= s ? "text-accent-light" : "text-muted"
                          )}
                        >
                          Step {s}
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-accent-neon"
                        initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                    
                    {/* STEP 1: Basic Info */}
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <Store className="w-5 h-5 text-accent-light" />
                          Business Details
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Your Full Name</label>
                            <input required type="text" value={data.fullName} onChange={e => updateData({ fullName: e.target.value })} className="input-field" placeholder="Rajesh Kumar" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Shop/Business Name</label>
                            <input required type="text" value={data.shopName} onChange={e => updateData({ shopName: e.target.value })} className="input-field" placeholder="PrintHub Studio" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                            <input required type="email" value={data.email} onChange={e => updateData({ email: e.target.value })} className="input-field" placeholder="rajesh@printhub.in" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                            <input required type="tel" value={data.phone} onChange={e => updateData({ phone: e.target.value })} className="input-field" placeholder="+91 98765 43210" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Location */}
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-accent-light" />
                          Location & Hyperlocal Reach
                        </h2>
                        <p className="text-xs text-muted mb-4">We use your PIN code to match you with customers in your immediate vicinity for ultra-fast delivery options.</p>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Complete Address</label>
                          <textarea required value={data.address} onChange={e => updateData({ address: e.target.value })} className="input-field resize-none h-20" placeholder="Shop No. 12, Main Market Road..." />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">City</label>
                            <input required type="text" value={data.city} onChange={e => updateData({ city: e.target.value })} className="input-field" placeholder="Bangalore" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Primary PIN Code</label>
                            <input required type="text" value={data.pincode} onChange={e => updateData({ pincode: e.target.value })} className="input-field font-mono" placeholder="560001" maxLength={6} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Capabilities */}
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <Printer className="w-5 h-5 text-accent-light" />
                          Printing Capabilities
                        </h2>
                        <p className="text-xs text-muted mb-4">Select all the services you can confidently provide for MakeMyWear customers.</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {capabilitiesList.map((cap) => {
                            const isSelected = data.capabilities.includes(cap.id);
                            return (
                              <div
                                key={cap.id}
                                onClick={() => toggleCapability(cap.id)}
                                className={cn(
                                  "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3",
                                  isSelected ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-accent/30"
                                )}
                              >
                                <div className={cn("p-2 rounded-lg", isSelected ? "bg-accent/20 text-accent-light" : "bg-background text-muted")}>
                                  <cap.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">{cap.label}</p>
                                  <p className="text-[10px] text-muted mt-0.5">{cap.desc}</p>
                                </div>
                                {isSelected && <CheckCircle2 className="w-4 h-4 text-accent ml-auto shrink-0 mt-1" />}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: SYOG & Final */}
                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-accent-light" />
                          Send Your Own Garment (SYOG)
                        </h2>
                        
                        <div className={cn(
                          "p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 sm:items-center",
                          data.acceptsSYOG ? "border-orange-500 bg-orange-500/5 text-orange-50" : "border-border bg-surface"
                        )}
                        onClick={() => updateData({ acceptsSYOG: !data.acceptsSYOG })}
                        >
                          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", data.acceptsSYOG ? "bg-orange-500/20" : "bg-background")}>
                            <UploadCloud className={cn("w-6 h-6", data.acceptsSYOG ? "text-orange-500" : "text-muted")} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-sm">Accept SYOG Orders</h3>
                            <p className="text-xs text-muted mt-1">Customers will courier their own blank jackets, tees, or hoodies to your shop for custom printing/embroidery.</p>
                          </div>
                          <div className={cn(
                            "w-12 h-6 rounded-full transition-all relative shrink-0",
                            data.acceptsSYOG ? "bg-orange-500" : "bg-border"
                          )}>
                            <div className={cn("w-4 h-4 rounded-full bg-white absolute top-1 transition-all", data.acceptsSYOG ? "left-7" : "left-1")} />
                          </div>
                        </div>

                        {data.acceptsSYOG && (
                          <div className="bg-surface-elevated p-4 rounded-lg border border-border text-xs text-muted">
                            <strong className="text-foreground block mb-1">SYOG Quality Agreement:</strong>
                            By opting in, you agree to photograph all customer garments upon arrival to document their initial condition before processing. MakeMyWear handles logistics tracking.
                          </div>
                        )}

                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex gap-3 text-sm">
                          <Sparkles className="w-5 h-5 text-accent-light shrink-0" />
                          <p>
                            Upon approval, you'll get access to the MakeMyWear Seller Dashboard where you can list blank products, set your custom pricing, and manage incoming orders.
                          </p>
                        </div>

                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={step === 1 || isSubmitting}
                        className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2", 
                          step === 1 ? "opacity-0 pointer-events-none" : "text-muted hover:text-foreground hover:bg-surface"
                        )}
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>

                      {step < totalSteps ? (
                        <button type="submit" className="btn-primary gap-2">
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button type="submit" disabled={isSubmitting} className="btn-glow gap-2 w-full sm:w-auto">
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting Application...
                            </>
                          ) : (
                            <>Submit Application <CheckCircle2 className="w-4 h-4" /></>
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
