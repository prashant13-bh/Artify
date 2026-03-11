"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Share2, Star, Truck, ShieldCheck, ArrowLeft, Ruler, 
  Minus, Plus, ShoppingBag, CheckCircle2, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn, formatCurrency } from "@/lib/utils";
import { mockProducts } from "@/lib/mock-data";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the product
  const product = mockProducts.find(p => p.id === params.id) || mockProducts[0]; // Fallback to first if not found

  // Set initial selected values if available and not yet set
  if (product && !selectedColor && product.colors?.length > 0) {
    setSelectedColor(product.colors[0]);
  }
  if (product && !selectedSize && product.sizes?.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
    // In a real app, this would dispatch to a global cart store (e.g., Zustand or Context)
  };

  const increaseQuantity = () => setQuantity(prev => (prev < 10 ? prev + 1 : prev));
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  // Pre-calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium capitalize">{product.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
            
            {/* Left Col: Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:aspect-square bg-surface rounded-2xl md:rounded-3xl overflow-hidden border border-border group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Actions overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:bg-surface transition-colors shadow-sm"
                  >
                    <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "")} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:bg-surface transition-colors shadow-sm">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery (Mocked - reusing main image) */}
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <button key={i} className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    i === 1 ? "border-accent opacity-100" : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
                  )}>
                    <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Col: Product Info */}
            <div className="flex flex-col pt-2 lg:pt-6">
              
              {/* Header Info */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-orange-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={cn("w-4 h-4", s <= Math.floor(product.rating) ? "fill-current" : "fill-transparent border-current")} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted">({product.reviews} reviews)</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">{product.name}</h1>
                
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl sm:text-4xl font-bold gradient-text">{formatCurrency(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg sm:text-xl text-muted line-through mb-1">{formatCurrency(product.originalPrice)}</span>
                  )}
                </div>

                <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                  Premium {product.category} crafted with high-quality materials. Perfect for daily wear or custom AI prints. Designed to fit perfectly and last long. Wash inside out in cold water.
                </p>
              </div>

              <hr className="border-border my-6" />

              {/* Options */}
              <div className="space-y-6 mb-8">
                
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold uppercase tracking-wider text-muted">Color</span>
                      <span className="text-sm font-medium">{product.colors.indexOf(selectedColor!) + 1} Selected</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                            selectedColor === color ? "border-foreground scale-110 shadow-md" : "border-border hover:border-muted hover:scale-105"
                          )}
                          style={{ backgroundColor: color }}
                          aria-label={`Select color ${color}`}
                        >
                          {/* Inner ring for white/light colors */}
                          {color.toLowerCase() === '#ffffff' && <div className="w-8 h-8 rounded-full border border-gray-200" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold uppercase tracking-wider text-muted">Size</span>
                      <button className="text-xs text-accent hover:underline flex items-center gap-1 font-medium">
                        <Ruler className="w-3.5 h-3.5" /> Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "min-w-12 h-12 px-4 rounded-xl border font-bold transition-all",
                            selectedSize === size 
                              ? "border-accent bg-accent/10 text-accent-light shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                              : "border-border bg-surface hover:border-muted hover:bg-surface/80"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-muted mb-3 block">Quantity</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-surface border border-border rounded-xl p-1 w-32">
                      <button 
                        onClick={decreaseQuantity}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-background text-muted hover:text-foreground transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="flex-1 text-center font-bold">{quantity}</span>
                      <button 
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-background text-muted hover:text-foreground transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted">Only <span className="font-bold text-foreground">12</span> items left in stock</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 py-4 sm:py-0 h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition-all relative overflow-hidden",
                    isAddedToCart 
                      ? "bg-green-500 text-white" 
                      : "bg-surface border border-border hover:bg-surface/80 hover:border-muted"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isAddedToCart ? (
                      <motion.div
                        key="added"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Added to Cart
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5" /> Add to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <Link href="/checkout" className="flex-1 h-14 btn-primary flex items-center justify-center gap-2 font-bold text-base">
                  Buy it Now
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-accent-light" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted mb-0.5">Shipping</p>
                    <p className="text-sm font-medium leading-tight">Free delivery over {formatCurrency(1999)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-accent-light" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted mb-0.5">Return Policy</p>
                    <p className="text-sm font-medium leading-tight">7-day easy returns on blanks</p>
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
