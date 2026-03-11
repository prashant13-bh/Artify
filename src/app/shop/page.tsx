"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Star, Filter, Search, SlidersHorizontal, Heart, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProducts, Product } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";

const categories = ["All", "T-Shirts", "Hoodies", "Jackets", "Caps", "Totes"];
const categoryMap: Record<string, string> = {
  "T-Shirts": "t-shirt",
  "Hoodies": "hoodie",
  "Jackets": "jacket",
  "Caps": "cap",
  "Totes": "tote",
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const filteredProducts = mockProducts.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === categoryMap[selectedCategory];
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="mb-8" {...fadeUp}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Shop <span className="gradient-text">Ready-Made</span>
            </h1>
            <p className="text-muted">Premium blanks & printed fashion, ready to customize</p>
          </motion.div>

          {/* Filters */}
          <motion.div className="flex flex-col sm:flex-row gap-4 mb-8" {...fadeUp} transition={{ delay: 0.1 }}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    selectedCategory === cat
                      ? "bg-accent text-white shadow-lg shadow-accent-glow"
                      : "bg-surface text-muted hover:text-foreground border border-border"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <p className="text-sm text-muted mb-6">{filteredProducts.length} products found</p>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group hover:border-accent/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-accent text-white">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-all"
                  >
                    <Heart className={cn("w-4 h-4 text-white", wishlist.includes(product.id) && "fill-red-500 text-red-500")} />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      <button
                        onClick={() => { setQuickView(product); setSelectedSize(""); setSelectedColor(""); }}
                        className="btn-primary flex-1 text-xs py-2"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-xs sm:text-sm mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="font-bold text-sm sm:text-base">{formatCurrency(product.price)}</span>
                    <span className="text-[10px] sm:text-xs text-muted line-through">{formatCurrency(product.originalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] sm:text-xs font-medium">{product.rating}</span>
                      <span className="text-[10px] sm:text-xs text-muted">({product.reviews})</span>
                    </div>
                    <div className="flex -space-x-1">
                      {product.colors.slice(0, 3).map((c, ci) => (
                        <div
                          key={ci}
                          className="w-3.5 h-3.5 rounded-full border-2 border-background"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setQuickView(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card-strong max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={quickView.image} alt={quickView.name} className="w-full aspect-[4/5] object-cover rounded-t-2xl" />
              <button
                onClick={() => setQuickView(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50"
              >
                <X className="w-5 h-5" />
              </button>
              {quickView.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white">{quickView.badge}</span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{quickView.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold gradient-text">{formatCurrency(quickView.price)}</span>
                <span className="text-sm text-muted line-through">{formatCurrency(quickView.originalPrice)}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-500">
                  {Math.round((1 - quickView.price / quickView.originalPrice) * 100)}% off
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{quickView.rating}</span>
                <span className="text-sm text-muted">({quickView.reviews} reviews)</span>
              </div>

              {/* Colors */}
              <div className="mb-5">
                <p className="text-sm font-medium mb-2.5">Color</p>
                <div className="flex gap-2">
                  {quickView.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={cn(
                        "w-8 h-8 rounded-full transition-all",
                        selectedColor === c ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-110" : "border-2 border-border"
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-2.5">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {quickView.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                        selectedSize === s
                          ? "bg-accent text-white shadow-lg"
                          : "bg-surface border border-border text-muted hover:text-foreground hover:border-accent"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/checkout" className="btn-primary flex-1 gap-2 py-4">
                  <ShoppingBag className="w-5 h-5" />
                  Buy Now
                </Link>
                <button
                  onClick={() => toggleWishlist(quickView.id)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all",
                    wishlist.includes(quickView.id)
                      ? "border-red-500 bg-red-500/10 text-red-500"
                      : "border-border text-muted hover:border-accent hover:text-accent"
                  )}
                >
                  <Heart className={cn("w-5 h-5", wishlist.includes(quickView.id) && "fill-current")} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
