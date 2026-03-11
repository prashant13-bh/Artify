"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ClipboardList, Camera, Settings,
  TrendingUp, DollarSign, Clock, CheckCircle2, Truck,
  Download, MapPin, Eye, ArrowRight, ChevronRight,
  FileImage, FileType, Upload, X, Star, AlertCircle,
  Menu, ArrowLeft, Sparkles
} from "lucide-react";
import { mockOrders, Order } from "@/lib/mock-data";
import { cn, formatCurrency, getRelativeTime } from "@/lib/utils";

type SellerTab = "overview" | "orders" | "syog" | "settings";

const statusColors = {
  todo: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", label: "To Do", icon: Clock },
  "in-production": { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20", label: "In Production", icon: Package },
  ready: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20", label: "Ready for Courier", icon: Truck },
};

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<SellerTab>("overview");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [syogPhotos, setSyogPhotos] = useState<string[]>([]);

  const stats = [
    { label: "Total Orders", value: mockOrders.length.toString(), icon: ClipboardList, color: "from-violet-500 to-purple-600", change: "+12%" },
    { label: "In Production", value: mockOrders.filter((o) => o.status === "in-production").length.toString(), icon: Package, color: "from-blue-500 to-cyan-500", change: "2 active" },
    { label: "Revenue (Today)", value: formatCurrency(12450), icon: DollarSign, color: "from-emerald-500 to-green-500", change: "+18%" },
    { label: "Avg Rating", value: "4.9", icon: Star, color: "from-amber-500 to-orange-500", change: "⭐ Excellent" },
  ];

  const sidebarItems: { id: SellerTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ClipboardList },
    { id: "syog", label: "SYOG Intake", icon: Camera },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const todoOrders = mockOrders.filter((o) => o.status === "todo");
  const inProdOrders = mockOrders.filter((o) => o.status === "in-production");
  const readyOrders = mockOrders.filter((o) => o.status === "ready");

  const handleSYOGUpload = () => {
    setSyogPhotos((prev) => [...prev, `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&r=${Math.random()}`]);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-surface/50 fixed inset-y-0 left-0 z-30">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">MakeMyWear</span>
          </Link>
          <p className="text-xs text-muted mt-2">Seller Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id
                  ? "bg-accent/10 text-accent-light"
                  : "text-muted hover:text-foreground hover:bg-surface"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <img src="https://i.pravatar.cc/40?img=20" alt="" className="w-9 h-9 rounded-full" />
            <div>
              <p className="text-sm font-medium">PrintHub Studio</p>
              <p className="text-xs text-muted">Bangalore, 560001</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-card-strong" style={{ borderRadius: 0 }}>
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => setMobileSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-sm gradient-text">Seller Dashboard</span>
          <img src="https://i.pravatar.cc/40?img=20" alt="" className="w-8 h-8 rounded-full" />
        </div>
        {/* Mobile tab bar */}
        <div className="flex border-t border-border">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-all",
                activeTab === item.id ? "text-accent-light" : "text-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="w-64 h-full bg-background border-r border-border p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold gradient-text">MakeMyWear Seller</span>
                <button onClick={() => setMobileSidebarOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileSidebarOpen(false); }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1",
                    activeTab === item.id ? "bg-accent/10 text-accent-light" : "text-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-[108px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, Rajesh 👋</h1>
              <p className="text-muted mb-8">Here&apos;s your shop performance today</p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 sm:p-5 hover:border-accent/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-green-500">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Orders */}
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {mockOrders.slice(0, 4).map((order) => {
                  const s = statusColors[order.status];
                  return (
                    <div
                      key={order.id}
                      onClick={() => { setSelectedOrder(order); setActiveTab("orders"); }}
                      className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:border-accent/30 transition-all group"
                    >
                      <img src={order.designPreview} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm truncate">{order.id}</p>
                          {order.isSYOG && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-orange-500/10 text-orange-500">SYOG</span>
                          )}
                        </div>
                        <p className="text-xs text-muted">{order.customerName} • {order.city}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${s.bg} ${s.text}`}>
                          {s.label}
                        </span>
                        <p className="text-xs text-muted mt-1">{formatCurrency(order.amount)}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ORDERS (Kanban + Detail) */}
          {activeTab === "orders" && !selectedOrder && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Orders</h1>
              <p className="text-muted mb-8">Manage incoming orders with drag & drop</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { title: "To Do", orders: todoOrders, status: "todo" as const },
                  { title: "In Production", orders: inProdOrders, status: "in-production" as const },
                  { title: "Ready for Courier", orders: readyOrders, status: "ready" as const },
                ].map((col) => {
                  const s = statusColors[col.status];
                  return (
                    <div key={col.status} className="glass-card p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-2.5 h-2.5 rounded-full ${s.bg} ${s.text}`} style={{ backgroundColor: "currentColor" }} />
                        <h3 className="font-semibold text-sm">{col.title}</h3>
                        <span className="ml-auto text-xs text-muted bg-surface px-2 py-0.5 rounded-full">{col.orders.length}</span>
                      </div>
                      <div className="space-y-3">
                        {col.orders.map((order) => (
                          <motion.div
                            key={order.id}
                            layout
                            className={`p-3 rounded-xl border-2 ${s.border} ${s.bg} cursor-pointer hover:shadow-md transition-all`}
                            onClick={() => setSelectedOrder(order)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <img src={order.designPreview} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-xs">{order.id}</p>
                                <p className="text-[10px] text-muted truncate">{order.customerName}</p>
                              </div>
                              {order.isSYOG && (
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-orange-500/20 text-orange-500">SYOG</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-muted flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {order.city}
                              </span>
                              <span className="font-semibold">{formatCurrency(order.amount)}</span>
                            </div>
                          </motion.div>
                        ))}
                        {col.orders.length === 0 && (
                          <div className="text-center py-8 text-muted">
                            <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="text-xs">No orders</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ORDER DETAIL */}
          {activeTab === "orders" && selectedOrder && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Orders
              </button>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left - Order Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="glass-card p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold">{selectedOrder.id}</h2>
                        <p className="text-sm text-muted">{getRelativeTime(selectedOrder.createdAt)}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[selectedOrder.status].bg} ${statusColors[selectedOrder.status].text}`}>
                        {statusColors[selectedOrder.status].label}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-surface">
                      <img src={selectedOrder.customerAvatar} alt="" className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-semibold">{selectedOrder.customerName}</p>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <MapPin className="w-3.5 h-3.5" />
                          {selectedOrder.city} — {selectedOrder.pincode}
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="font-bold text-lg">{formatCurrency(selectedOrder.amount)}</p>
                        <p className="text-xs text-muted">{selectedOrder.designType}</p>
                      </div>
                    </div>

                    {/* Hyperlocal Match */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20 mb-6">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Hyperlocal Match</p>
                        <p className="text-xs text-muted">Customer is within your delivery zone (PIN: {selectedOrder.pincode})</p>
                      </div>
                    </div>

                    {selectedOrder.isSYOG && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 mb-6">
                        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">SYOG Order</p>
                          <p className="text-xs text-muted">Customer is sending their own garment. Please photograph on receipt.</p>
                        </div>
                      </div>
                    )}

                    {/* Product */}
                    <h3 className="font-semibold text-sm mb-3">Product Details</h3>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
                      <img src={selectedOrder.designPreview} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <p className="font-semibold text-sm">{selectedOrder.product}</p>
                        <p className="text-xs text-muted">{selectedOrder.designType} • Size: L • Color: Black</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Actions */}
                <div className="space-y-6">
                  {/* Download Files */}
                  <div className="glass-card p-5">
                    <h3 className="font-semibold text-sm mb-4">Download Files</h3>
                    <div className="space-y-3">
                      <button className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-all group">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <FileImage className="w-5 h-5 text-accent-light" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">Print-Ready PNG</p>
                          <p className="text-[10px] text-muted">Background removed, 300 DPI</p>
                        </div>
                        <Download className="w-4 h-4 text-accent-light opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                      <button className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10 transition-all group">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <FileType className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">Embroidery File (.DST)</p>
                          <p className="text-[10px] text-muted">Auto-digitized stitch file</p>
                        </div>
                        <Download className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>

                  {/* Update Status */}
                  <div className="glass-card p-5">
                    <h3 className="font-semibold text-sm mb-4">Update Status</h3>
                    <div className="space-y-2">
                      {(["todo", "in-production", "ready"] as const).map((status) => {
                        const s = statusColors[status];
                        return (
                          <button
                            key={status}
                            className={cn(
                              "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all",
                              selectedOrder.status === status
                                ? `${s.bg} ${s.text} border-2 ${s.border}`
                                : "text-muted hover:text-foreground border-2 border-transparent hover:border-border"
                            )}
                          >
                            <s.icon className="w-4 h-4" />
                            {s.label}
                            {selectedOrder.status === status && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SYOG INTAKE */}
          {activeTab === "syog" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">SYOG Intake</h1>
              <p className="text-muted mb-8">Photograph customer garments when they arrive for quality check</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Pending SYOG Orders */}
                <div className="glass-card p-5">
                  <h3 className="font-semibold mb-4">Pending Garment Arrivals</h3>
                  <div className="space-y-3">
                    {mockOrders.filter((o) => o.isSYOG).map((order) => (
                      <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent/30 transition-all">
                        <img src={order.customerAvatar} alt="" className="w-10 h-10 rounded-full" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{order.customerName}</p>
                          <p className="text-xs text-muted">{order.product} • {order.city}</p>
                        </div>
                        <button
                          onClick={handleSYOGUpload}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-accent/10 text-accent-light hover:bg-accent/20 transition-all flex items-center gap-1.5"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Photo
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="glass-card p-5">
                  <h3 className="font-semibold mb-4">Upload Garment Photo</h3>
                  <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-accent/30 transition-all cursor-pointer" onClick={handleSYOGUpload}>
                    <Upload className="w-12 h-12 text-muted mx-auto mb-3" />
                    <p className="text-sm font-medium mb-1">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted">Take a photo of the received garment for quality check</p>
                  </div>

                  {/* Uploaded Photos */}
                  {syogPhotos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs text-muted mb-2">Uploaded ({syogPhotos.length})</p>
                      <div className="grid grid-cols-3 gap-2">
                        {syogPhotos.map((photo, i) => (
                          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <CheckCircle2 className="w-6 h-6 text-green-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted mb-8">Manage your shop profile and preferences</p>
              <div className="glass-card p-6 max-w-lg">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Shop Name</label>
                    <input type="text" defaultValue="PrintHub Studio" className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">City</label>
                    <input type="text" defaultValue="Bangalore" className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">PIN Code</label>
                    <input type="text" defaultValue="560001" className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Capabilities</label>
                    <div className="flex flex-wrap gap-2">
                      {["DTF Printing", "Embroidery", "Screen Print", "UV Printing"].map((cap) => (
                        <span key={cap} className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent-light border border-accent/20">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="btn-primary w-full">Save Changes</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
