"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, Wand2, Download, RotateCw, Shirt,
  Palette, ChevronDown, Package, MapPin, Calendar,
  Truck, ArrowRight, Zap, ImagePlus, ShoppingBag
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn, funLoadingTexts, formatCurrency } from "@/lib/utils";

const mockPrompts = [
  "A fierce dragon breathing fire in watercolor style",
  "Retro 80s neon sunset with palm trees",
  "Minimalist Japanese wave with sacred geometry",
  "Cyberpunk samurai warrior portrait",
  "Abstract galaxy wolf constellation art",
];

const garmentTypes = [
  { id: "tshirt", label: "T-Shirt", icon: "👕" },
  { id: "hoodie", label: "Hoodie", icon: "🧥" },
  { id: "jacket", label: "Jacket", icon: "🧤" },
  { id: "tote", label: "Tote Bag", icon: "👜" },
  { id: "cap", label: "Cap", icon: "🧢" },
];

const garmentColors = [
  { id: "black", hex: "#0f0f0f", label: "Black" },
  { id: "white", hex: "#ffffff", label: "White" },
  { id: "navy", hex: "#1e3a5f", label: "Navy" },
  { id: "gray", hex: "#4b5563", label: "Charcoal" },
  { id: "maroon", hex: "#7f1d1d", label: "Maroon" },
];

export default function StudioPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [printType, setPrintType] = useState<"dtf" | "embroidery">("dtf");
  const [garmentType, setGarmentType] = useState("tshirt");
  const [garmentColor, setGarmentColor] = useState("black");
  const [isSYOG, setIsSYOG] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  // Rotate loading text during generation
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % funLoadingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGenerated(false);
    setLoadingTextIndex(0);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      setShowOptions(true);
    }, 5000);
  }, [prompt]);

  const handleRandomPrompt = () => {
    const random = mockPrompts[Math.floor(Math.random() * mockPrompts.length)];
    setPrompt(random);
  };

  const selectedGarment = garmentTypes.find((g) => g.id === garmentType);
  const selectedColorObj = garmentColors.find((c) => c.id === garmentColor);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent-light border border-accent/20 mb-4">
              <Wand2 className="w-3.5 h-3.5" />
              AI Design Studio
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
              Describe it. <span className="gradient-text">We&apos;ll design it.</span>
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
              Type any idea and watch AI turn it into print-ready art in seconds
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Prompt Input */}
              <div className="glass-card p-5 sm:p-6 mb-6">
                <label className="text-sm font-semibold mb-3 block">Describe your design</label>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A fierce dragon breathing fire in watercolor style..."
                    className="input-field min-h-[120px] resize-none pr-12"
                    rows={4}
                  />
                  <button
                    onClick={handleRandomPrompt}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-accent/10 text-accent-light hover:bg-accent/20 transition-all"
                    title="Random prompt"
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick prompts */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {mockPrompts.slice(0, 3).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrompt(p)}
                      className="px-3 py-1.5 rounded-full text-xs bg-surface border border-border text-muted hover:text-foreground hover:border-accent/30 transition-all truncate max-w-[200px]"
                    >
                      &ldquo;{p}&rdquo;
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className={cn(
                    "btn-glow w-full mt-5 gap-2 text-base py-4",
                    (isGenerating || !prompt.trim()) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate AI Art
                    </>
                  )}
                </button>
              </div>

              {/* Garment Selection */}
              <div className="glass-card p-5 sm:p-6 mb-6">
                <h3 className="text-sm font-semibold mb-4">Choose Garment</h3>
                <div className="grid grid-cols-5 gap-2">
                  {garmentTypes.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGarmentType(g.id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all",
                        garmentType === g.id
                          ? "bg-accent/10 border-2 border-accent text-accent-light"
                          : "bg-surface border-2 border-transparent hover:border-border"
                      )}
                    >
                      <span className="text-xl sm:text-2xl">{g.icon}</span>
                      <span className="text-[10px] sm:text-xs font-medium">{g.label}</span>
                    </button>
                  ))}
                </div>

                {/* Garment Color */}
                <div className="mt-4">
                  <p className="text-xs text-muted mb-2">Garment Color</p>
                  <div className="flex gap-2">
                    {garmentColors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setGarmentColor(c.id)}
                        className={cn(
                          "w-8 h-8 rounded-full transition-all",
                          garmentColor === c.id
                            ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-110"
                            : "border-2 border-border hover:scale-105"
                        )}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Print Type */}
              <div className="glass-card p-5 sm:p-6 mb-6">
                <h3 className="text-sm font-semibold mb-4">Print Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPrintType("dtf")}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all text-left",
                      printType === "dtf"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    )}
                  >
                    <Palette className="w-6 h-6 text-accent-light mb-2" />
                    <p className="font-semibold text-sm">DTF Print</p>
                    <p className="text-xs text-muted mt-1">Vibrant, full-color graphics</p>
                  </button>
                  <button
                    onClick={() => setPrintType("embroidery")}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all text-left",
                      printType === "embroidery"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    )}
                  >
                    <ImagePlus className="w-6 h-6 text-accent-light mb-2" />
                    <p className="font-semibold text-sm">Embroidery</p>
                    <p className="text-xs text-muted mt-1">Premium thread texture</p>
                  </button>
                </div>
              </div>

              {/* SYOG Toggle */}
              <div className="glass-card p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold">Send Your Own Garment</h3>
                    <p className="text-xs text-muted mt-1">Already have a jacket or tee? We&apos;ll customize it!</p>
                  </div>
                  <button
                    onClick={() => setIsSYOG(!isSYOG)}
                    className={cn(
                      "w-12 h-7 rounded-full transition-all duration-300 relative",
                      isSYOG ? "bg-accent" : "bg-surface-elevated border border-border"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-all duration-300",
                        isSYOG ? "left-6" : "left-1"
                      )}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {isSYOG && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border space-y-4">
                        <div>
                          <label className="text-xs font-medium text-muted mb-1.5 block">
                            <MapPin className="w-3.5 h-3.5 inline mr-1" />
                            Pickup Pincode
                          </label>
                          <input type="text" placeholder="Enter your PIN code" className="input-field" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted mb-1.5 block">
                            <Calendar className="w-3.5 h-3.5 inline mr-1" />
                            Pickup Date
                          </label>
                          <input type="date" className="input-field" />
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/5 border border-accent/20">
                          <Truck className="w-4 h-4 text-accent-light flex-shrink-0" />
                          <p className="text-xs text-accent-light">Our courier will pick up your garment within 2 business days</p>
                        </div>
                        <button className="btn-secondary w-full gap-2">
                          <Package className="w-4 h-4" />
                          Schedule Pickup
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col"
            >
              <div className="glass-card-strong p-6 sm:p-8 flex-1 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] relative overflow-hidden">
                {/* Loading State */}
                <AnimatePresence mode="wait">
                  {isGenerating && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-6 text-center"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                        <Sparkles className="w-8 h-8 text-accent-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                      </div>
                      <motion.p
                        key={loadingTextIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-lg font-medium text-accent-light"
                      >
                        {funLoadingTexts[loadingTextIndex]}
                      </motion.p>
                      <div className="w-48 h-1.5 rounded-full bg-surface overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-neon"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {!isGenerating && !generated && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <Wand2 className="w-10 h-10 text-accent/40" />
                      </div>
                      <p className="text-muted text-sm">Enter a prompt and click Generate to see your design here</p>
                    </motion.div>
                  )}

                  {!isGenerating && generated && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full flex flex-col items-center"
                    >
                      {/* 3D Mockup Preview */}
                      <div
                        className="relative w-full max-w-sm mx-auto"
                        style={{
                          perspective: "800px",
                        }}
                      >
                        <motion.div
                          className="relative"
                          animate={{ rotateY: rotationAngle }}
                          transition={{ type: "spring", stiffness: 100, damping: 20 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Garment Base */}
                          <div
                            className="aspect-[3/4] rounded-3xl relative overflow-hidden shadow-2xl"
                            style={{ backgroundColor: selectedColorObj?.hex || "#0f0f0f" }}
                          >
                            {/* Garment shadow/texture lines */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-[15%] left-[30%] right-[30%] h-px bg-white/30" />
                              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-16 h-8 border-b-2 border-white/20 rounded-b-full" />
                              {garmentType === "hoodie" && (
                                <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-20 h-12 border-2 border-white/15 rounded-full" />
                              )}
                            </div>

                            {/* AI Generated Design on garment */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
                              <div className={cn(
                                "relative w-full aspect-square rounded-2xl overflow-hidden",
                                printType === "embroidery" && "border-2 border-white/10"
                              )}>
                                <img
                                  src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&h=400&fit=crop"
                                  alt="AI Generated Design"
                                  className={cn(
                                    "w-full h-full object-cover",
                                    printType === "embroidery" && "brightness-90 contrast-110"
                                  )}
                                />
                                {printType === "embroidery" && (
                                  <div className="absolute inset-0 opacity-30"
                                    style={{
                                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)`,
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* 360 Rotation Controls */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                          <button
                            onClick={() => setRotationAngle((prev) => prev - 30)}
                            className="p-2.5 rounded-full bg-surface border border-border hover:border-accent transition-all"
                          >
                            <RotateCw className="w-4 h-4 scale-x-[-1]" />
                          </button>
                          <span className="text-xs text-muted font-medium px-3">Rotate Preview</span>
                          <button
                            onClick={() => setRotationAngle((prev) => prev + 30)}
                            className="p-2.5 rounded-full bg-surface border border-border hover:border-accent transition-all"
                          >
                            <RotateCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Info badges */}
                      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent-light">
                          {selectedGarment?.icon} {selectedGarment?.label}
                        </span>
                        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent-light">
                          {printType === "dtf" ? "🖨️ DTF Print" : "🧵 Embroidery"}
                        </span>
                        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          ✅ Print-Ready (BG Removed, Upscaled)
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-6">
                        <Link href="/checkout" className="btn-primary flex-1 gap-2 text-center justify-center">
                          <ShoppingBag className="w-4 h-4" />
                          Buy Now — {formatCurrency(1299)}
                        </Link>
                        <button className="btn-secondary gap-2">
                          <Download className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
