"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Eye, Trash2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn, formatCurrency } from "@/lib/utils";
import { mockProducts } from "@/lib/mock-data";

export default function WishlistPage() {
  // Use a subset of mock products to simulate a wishlist
  const [wishlist, setWishlist] = useState(
    mockProducts.filter(p => ["p2", "p5", "p8"].includes(p.id))
  );
  const [removedItem, setRemovedItem] = useState<string | null>(null);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to PDP
    setRemovedItem(id);
    setTimeout(() => {
      setWishlist(prev => prev.filter(item => item.id !== id));
      setRemovedItem(null);
    }, 500);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to PDP
    // Logic to add to cart would go here
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                Your Wishlist
              </h1>
              <p className="text-muted">Save your favorite premium blanks and designs for later.</p>
            </div>
            {wishlist.length > 0 && (
              <p className="text-sm font-medium px-4 py-2 rounded-xl bg-surface border border-border">
                {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
              </p>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className={cn(
                      "group glass-card overflow-hidden hover:border-accent/40 transition-colors relative flex flex-col h-full",
                      removedItem === product.id ? "pointer-events-none filter blur-sm grayscale opacity-50" : ""
                    )}
                  >
                    <Link href={`/shop/${product.id}`} className="absolute inset-0 z-0" aria-label={`View ${product.name}`} />
                    
                    {/* Image Area */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Removing overlay */}
                      {removedItem === product.id && (
                         <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-20">
                           <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                         </div>
                      )}

                      {/* Top Action */}
                      <div className="absolute top-3 right-3 z-10">
                        <button 
                          onClick={(e) => handleRemove(product.id, e)}
                          className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick Add Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
                        <button 
                          onClick={handleAddToCart}
                          className="flex-1 btn-primary py-2.5 text-xs shadow-lg"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1.5 inline" /> Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Details Area */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-bold text-base leading-tight group-hover:text-accent-light transition-colors line-clamp-2 pb-1 relative z-10 pointer-events-none">
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-lg gradient-text">{formatCurrency(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted line-through">{formatCurrency(product.originalPrice)}</span>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-border flex gap-2 text-xs text-muted">
                        {product.colors && product.colors.length > 0 && (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full border border-border" style={{ backgroundColor: product.colors[0] }} />
                            +{product.colors.length - 1}
                          </span>
                        )}
                        {product.colors && product.sizes && <span className="w-px h-3 bg-border self-center" />}
                        {product.sizes && product.sizes.length > 0 && (
                          <span>{product.sizes.length} Sizes</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center glass-card"
              >
                <div className="w-24 h-24 rounded-full bg-surface mb-6 flex items-center justify-center border border-border">
                  <Heart className="w-10 h-10 text-muted" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Your wishlist is empty</h3>
                <p className="text-muted mb-8 max-w-md">Browse our premium ready-made collection or create your own custom AI garanemts to save them here.</p>
                
                <div className="flex gap-4">
                  <Link href="/shop" className="btn-primary flex items-center gap-2">
                    Shop Ready-Made <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/studio" className="btn-secondary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Go to AI Studio
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
