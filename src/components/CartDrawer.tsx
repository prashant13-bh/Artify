"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency, cn } from "@/lib/utils";
import { mockProducts } from "@/lib/mock-data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock cart items derived from mock products
const cartItems = [
  { ...mockProducts[0], cartQuantity: 1, selectedSize: "M", selectedColor: "#0f0f0f" },
  { ...mockProducts[5], cartQuantity: 2, selectedSize: "One Size", selectedColor: "#f5f5dc" },
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[101] w-full sm:w-[500px] border-l border-border bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-surface/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent-light" /> 
                Your Cart
                <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface text-muted hover:text-foreground transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 group">
                      <div className="w-20 h-24 shrink-0 bg-surface rounded-xl overflow-hidden border border-border">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm line-clamp-2 pr-4">{item.name}</h3>
                          <button className="text-muted hover:text-red-500 transition-colors shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted mt-1.5 mb-2">
                          {item.selectedColor && (
                            <span className="flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded border border-border">
                              Color: <span className="w-2.5 h-2.5 rounded-full border border-border/50 inline-block" style={{ backgroundColor: item.selectedColor }} />
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded border border-border">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <p className="font-bold text-foreground">{formatCurrency(item.price)}</p>
                          <div className="flex items-center bg-surface border border-border rounded-lg h-8">
                            <button className="w-8 h-full flex items-center justify-center hover:bg-background text-muted hover:text-foreground transition-colors rounded-l-lg">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.cartQuantity}</span>
                            <button className="w-8 h-full flex items-center justify-center hover:bg-background text-muted hover:text-foreground transition-colors rounded-r-lg">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Upsell Message */}
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                    <p className="text-xs font-medium text-accent-light">You're {formatCurrency(1999 - subtotal)} away from Free Shipping!</p>
                    <div className="w-full h-1.5 bg-surface rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent-neon rounded-full w-[60%]" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-surface mb-4 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-muted" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-muted mb-6">Looks like you haven't added any premium garments to your cart yet.</p>
                  <button onClick={onClose} className="btn-primary py-3">
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-surface/50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-muted">
                    <p>Subtotal</p>
                    <p className="font-medium text-foreground">{formatCurrency(subtotal)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-muted">
                    <p>Shipping</p>
                    <p>Calculated at checkout</p>
                  </div>
                  <div className="h-px bg-border w-full my-2" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <p>Total</p>
                    <p className="gradient-text">{formatCurrency(subtotal)}</p>
                  </div>
                </div>

                <Link 
                  href="/checkout" 
                  onClick={onClose}
                  className="w-full h-14 btn-primary flex items-center justify-center gap-2 font-bold text-base relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Proceed to Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <p className="text-center text-xs text-muted mt-4 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                  Secure End-to-End Encryption
                </p>
              </div>
            )}
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
