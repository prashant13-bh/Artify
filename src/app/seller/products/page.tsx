"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Plus, Search, Filter, MoreVertical,
  Edit2, Trash2, Eye, LayoutDashboard, Store, Settings, Menu, X, Check, ArrowRight
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  type: "blank" | "ready-made";
  category: string;
  basePrice: number;
  stock: number;
  status: "active" | "draft" | "out-of-stock";
  image: string;
};

// Mock data for seller's products
const mockProducts: Product[] = [
  { id: "P001", name: "Premium Heavyweight Hoodie", type: "blank", category: "Hoodies", basePrice: 999, stock: 150, status: "active", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" },
  { id: "P002", name: "Cyberpunk Dragon Tee (DTF)", type: "ready-made", category: "T-Shirts", basePrice: 899, stock: 45, status: "active", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80" },
  { id: "P003", name: "Classic Cotton T-Shirt", type: "blank", category: "T-Shirts", basePrice: 399, stock: 500, status: "active", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
  { id: "P004", name: "Vintage Denim Jacket", type: "blank", category: "Jackets", basePrice: 1499, stock: 0, status: "out-of-stock", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80" },
  { id: "P005", name: "Neon Vibes Dad Hat", type: "ready-made", category: "Accessories", basePrice: 499, stock: 12, status: "draft", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80" },
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/seller" },
  { id: "orders", label: "Orders", icon: Package, href: "/seller" },
  { id: "products", label: "Products", icon: Store, href: "/seller/products" },
  { id: "syog", label: "SYOG Intake", icon: Eye, href: "/seller" },
  { id: "settings", label: "Settings", icon: Settings, href: "/seller" },
];

export default function SellerProducts() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "blank" | "ready-made">("all");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filter products
  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || p.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusConfig = (status: Product["status"]) => {
    switch (status) {
      case "active": return { bg: "bg-green-500/10", text: "text-green-500", label: "Active" };
      case "draft": return { bg: "bg-amber-500/10", text: "text-amber-500", label: "Draft" };
      case "out-of-stock": return { bg: "bg-red-500/10", text: "text-red-500", label: "Out of Stock" };
    }
  };

  const getTypeStyle = (type: Product["type"]) => {
    if (type === "blank") return "bg-blue-500/10 text-blue-500 border border-blue-500/20";
    return "bg-purple-500/10 text-purple-500 border border-purple-500/20";
  };

  return (
    <div className="min-h-screen bg-background flex pb-20 lg:pb-0">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-surface/50 fixed inset-y-0 left-0 z-30">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-lg font-bold gradient-text">PrintHub</span>
          </Link>
          <p className="text-xs text-muted">Seller Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all",
                item.id === "products"
                  ? "bg-accent/10 text-accent-light"
                  : "text-muted hover:text-foreground hover:bg-surface"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-card-strong h-14 border-b border-border" style={{ borderRadius: 0 }}>
        <div className="flex items-center justify-between px-4 h-full">
          <button onClick={() => setMobileSidebarOpen(true)} className="p-2 -ml-2 text-muted">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-sm gradient-text">Products</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center text-white text-xs font-bold">
            PH
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 flex items-center gap-2">
                <Store className="w-6 h-6 text-accent-light" />
                Product Management
              </h1>
              <p className="text-muted text-sm sm:text-base">List blanks for AI generation or sell your ready-made designs.</p>
            </div>
            <button 
              onClick={() => setIsAddDrawerOpen(true)}
              className="btn-glow gap-2 w-full sm:w-auto shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {/* Filters & Search */}
          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-accent"></div>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 sm:border-l border-border sm:pl-4">
              <Filter className="w-4 h-4 text-muted" />
              <div className="flex bg-background rounded-lg p-1 border border-border overflow-x-auto hide-scrollbar w-full sm:w-auto">
                {(["all", "blank", "ready-made"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all whitespace-nowrap flex-1 sm:flex-none",
                      filterType === type ? "bg-accent text-white" : "text-muted hover:text-foreground hover:bg-surface"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Table (Desktop) */}
          <div className="hidden sm:block glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface/50 text-xs text-muted uppercase border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product) => {
                    const statusConfig = getStatusConfig(product.status);
                    return (
                      <tr key={product.id} className="hover:bg-surface/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{product.name}</p>
                              <p className="text-xs text-muted">{product.category} • {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTypeStyle(product.type)}`}>
                            {product.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {formatCurrency(product.basePrice)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn("font-medium", product.stock < 20 ? "text-amber-500" : "")}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.text}`}>
                            <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-muted hover:text-accent bg-surface rounded-lg transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-muted hover:text-red-500 bg-surface rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="p-8 text-center text-muted">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Products List (Mobile) */}
          <div className="sm:hidden space-y-4">
            {filteredProducts.map((product) => {
              const statusConfig = getStatusConfig(product.status);
              return (
                <div key={product.id} className="glass-card p-4 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rotate-45 ${product.type === 'blank' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}></div>
                  
                  <div className="flex gap-4">
                    <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-surface relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                       <span className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${getTypeStyle(product.type)} backdrop-blur-md`}>
                        {product.type}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm leading-tight pr-2">{product.name}</h3>
                        <button className="text-muted p-1 -mr-2 -mt-1"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                      <p className="text-[10px] text-muted mb-2">{product.category}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="font-bold text-sm text-accent-light">{formatCurrency(product.basePrice)}</span>
                        <div className="flex flex-col items-end gap-1">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                            {statusConfig.label}
                          </span>
                          <span className={cn("text-[10px]", product.stock < 20 ? "text-amber-500" : "text-muted")}>
                            {product.stock} left
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="glass-card p-8 text-center text-muted">
                <p className="text-sm">No products found.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Add Product Drawer/Modal */}
      <AnimatePresence>
        {isAddDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsAddDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Package className="w-5 h-5 text-accent" />
                  Add New Product
                </h2>
                <button onClick={() => setIsAddDrawerOpen(false)} className="p-2 hover:bg-surface rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 space-y-6">
                
                {/* Image Upload Mock */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Images</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-muted group-hover:text-accent" />
                    </div>
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                </div>

                {/* Basics */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Product Name</label>
                    <input type="text" className="input-field" placeholder="e.g. Heavyweight Cotton Hoodie" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Product Type</label>
                      <select className="input-field">
                        <option>Blank Garment</option>
                        <option>Ready-made Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Category</label>
                      <select className="input-field">
                        <option>T-Shirts</option>
                        <option>Hoodies</option>
                        <option>Jackets</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border my-2" />

                {/* Pricing & Inventory */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted">Pricing & Inventory</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Base Price (₹)</label>
                      <input type="number" className="input-field" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Initial Stock</label>
                      <input type="number" className="input-field" placeholder="0" />
                    </div>
                  </div>

                  {/* Variants Mock */}
                  <div className="bg-surface p-4 rounded-xl border border-border">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium block">Variants (Sizes/Colors)</label>
                      <button className="text-xs text-accent hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/> Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {['S', 'M', 'L', 'XL'].map(size => (
                         <div key={size} className="px-2 py-1 bg-background border border-border rounded text-xs flex items-center gap-1">
                           <span>Size: {size}</span>
                           <X className="w-3 h-3 text-muted hover:text-red-500 cursor-pointer"/>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-border bg-background sticky bottom-0">
                <div className="flex gap-3">
                  <button onClick={() => setIsAddDrawerOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-surface transition-all flex-1">
                    Cancel
                  </button>
                  <button className="btn-primary flex-1 gap-2" onClick={() => setIsAddDrawerOpen(false)}>
                    Save Product <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card-strong border-t border-border/50 lg:hidden z-40 pb-safe pb-2 sm:pb-0" style={{ borderRadius: 0, borderBottom: "none", borderLeft: "none", borderRight: "none" }}>
        <div className="flex items-center justify-around h-16 px-2">
          {sidebarItems.slice(0, 4).map((item) => {
            const isActive = item.id === "products";
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 transition-all",
                  isActive ? "text-accent-light" : "text-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "animate-pulse-slow")} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.div layoutId="bottomNavIndicator" className="absolute bottom-0 w-8 h-1 bg-accent rounded-t-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
