"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Wallet, Settings, TrendingUp,
  DollarSign, ShoppingCart, UserCheck, ArrowUpRight,
  ArrowDownRight, CheckCircle2, XCircle, Clock3,
  Edit3, Search, ChevronRight, Menu, X, Sparkles,
  Banknote, PieChart, BarChart3, AlertCircle
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { mockSellers, mockPayouts, adminStats } from "@/lib/mock-data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

type AdminTab = "analytics" | "vendors" | "payouts" | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchVendor, setSearchVendor] = useState("");
  const [editingCommission, setEditingCommission] = useState<string | null>(null);

  const sidebarItems: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "analytics", label: "Analytics", icon: LayoutDashboard },
    { id: "vendors", label: "Vendors", icon: Users },
    { id: "payouts", label: "Payouts", icon: Wallet },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const kpiCards = [
    { label: "Total Revenue", value: formatCurrency(adminStats.totalRevenue), icon: DollarSign, change: "+23%", up: true, color: "from-violet-500 to-purple-600" },
    { label: "Platform Commission", value: formatCurrency(adminStats.platformCommission), icon: TrendingUp, change: "+18%", up: true, color: "from-blue-500 to-cyan-500" },
    { label: "Total Orders", value: formatNumber(adminStats.totalOrders), icon: ShoppingCart, change: "+34%", up: true, color: "from-emerald-500 to-green-500" },
    { label: "Active Sellers", value: adminStats.activeSellers.toString(), icon: UserCheck, change: "+4", up: true, color: "from-amber-500 to-orange-500" },
  ];

  const filteredSellers = mockSellers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchVendor.toLowerCase()) ||
      s.shopName.toLowerCase().includes(searchVendor.toLowerCase()) ||
      s.city.toLowerCase().includes(searchVendor.toLowerCase())
  );

  const statusConfig = {
    active: { bg: "bg-green-500/10", text: "text-green-500", label: "Active" },
    pending: { bg: "bg-amber-500/10", text: "text-amber-500", label: "Pending" },
    suspended: { bg: "bg-red-500/10", text: "text-red-500", label: "Suspended" },
  };

  const payoutStatusConfig = {
    completed: { bg: "bg-green-500/10", text: "text-green-500", label: "Completed" },
    processing: { bg: "bg-blue-500/10", text: "text-blue-500", label: "Processing" },
    pending: { bg: "bg-amber-500/10", text: "text-amber-500", label: "Pending" },
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
          <p className="text-xs text-muted mt-2">Admin Panel</p>
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
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-muted">admin@makemywear.in</p>
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
          <span className="font-semibold text-sm gradient-text">Admin Panel</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
        </div>
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
      {mobileSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="w-64 h-full bg-background border-r border-border p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold gradient-text">Admin Panel</span>
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

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-[108px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Analytics Overview</h1>
              <p className="text-muted mb-8">Platform performance at a glance</p>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {kpiCards.map((kpi, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 sm:p-5 hover:border-accent/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}>
                        <kpi.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={cn("flex items-center gap-0.5 text-xs font-medium", kpi.up ? "text-green-500" : "text-red-500")}>
                        {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold">{kpi.value}</p>
                    <p className="text-xs text-muted mt-1">{kpi.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Revenue Line Chart */}
                <div className="lg:col-span-2 glass-card p-5">
                  <h3 className="font-semibold mb-4">Revenue & Commission Trend</h3>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={adminStats.monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />
                        <YAxis stroke="var(--muted)" fontSize={12} tickFormatter={(v) => `₹${v / 1000}K`} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--surface)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                          formatter={(value: any) => formatCurrency(Number(value))}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2.5} dot={{ fill: "#8B5CF6", r: 4 }} name="Revenue" />
                        <Line type="monotone" dataKey="commission" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 4 }} name="Commission" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Orders by Category Pie */}
                <div className="glass-card p-5">
                  <h3 className="font-semibold mb-4">Orders by Type</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPie>
                        <Pie
                          data={adminStats.ordersByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {adminStats.ordersByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `${value}%`} />
                      </RechartPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {adminStats.ordersByCategory.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span>{cat.name}</span>
                        </div>
                        <span className="font-semibold">{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* GMV & Extra Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Gross Merchandise Value", value: formatCurrency(adminStats.gmv), icon: Banknote },
                  { label: "Total Customers", value: formatNumber(adminStats.totalCustomers), icon: Users },
                  { label: "Avg Order Value", value: formatCurrency(adminStats.avgOrderValue), icon: ShoppingCart },
                  { label: "Conversion Rate", value: `${adminStats.conversionRate}%`, icon: PieChart },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-4 text-center hover:border-accent/30 transition-all">
                    <stat.icon className="w-6 h-6 text-accent-light mx-auto mb-2" />
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-[10px] text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VENDORS */}
          {activeTab === "vendors" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">Vendor Management</h1>
                  <p className="text-muted text-sm">Approve, manage, and set commission for sellers</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchVendor}
                    onChange={(e) => setSearchVendor(e.target.value)}
                    className="input-field pl-11"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">{mockSellers.filter((s) => s.status === "active").length}</p>
                  <p className="text-xs text-muted">Active</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-amber-500">{mockSellers.filter((s) => s.status === "pending").length}</p>
                  <p className="text-xs text-muted">Pending</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-red-500">{mockSellers.filter((s) => s.status === "suspended").length}</p>
                  <p className="text-xs text-muted">Suspended</p>
                </div>
              </div>

              {/* Vendor Table */}
              <div className="glass-card overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Seller</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Location</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Revenue</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Commission</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Rating</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Status</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSellers.map((seller) => {
                        const sc = statusConfig[seller.status];
                        return (
                          <tr key={seller.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <img src={seller.avatar} alt="" className="w-9 h-9 rounded-full" />
                                <div>
                                  <p className="font-semibold text-sm">{seller.shopName}</p>
                                  <p className="text-xs text-muted">{seller.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <p className="text-sm">{seller.city}</p>
                              <p className="text-xs text-muted">{seller.pincode}</p>
                            </td>
                            <td className="px-5 py-4">
                              <p className="text-sm font-semibold">{formatCurrency(seller.revenue)}</p>
                              <p className="text-xs text-muted">{seller.totalOrders} orders</p>
                            </td>
                            <td className="px-5 py-4">
                              {editingCommission === seller.id ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    defaultValue={seller.commission}
                                    className="w-16 px-2 py-1 rounded-lg text-sm bg-surface border border-accent text-center"
                                    onBlur={() => setEditingCommission(null)}
                                    autoFocus
                                  />
                                  <span className="text-xs text-muted">%</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEditingCommission(seller.id)}
                                  className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors"
                                >
                                  {seller.commission}%
                                  <Edit3 className="w-3 h-3 text-muted" />
                                </button>
                              )}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">{seller.rating}</span>
                                <span className="text-xs">⭐</span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.text}`}>
                                {sc.label}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex gap-1.5">
                                {seller.status === "pending" && (
                                  <>
                                    <button className="p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all" title="Approve">
                                      <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all" title="Reject">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                {seller.status === "active" && (
                                  <button className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all" title="Suspend">
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                                {seller.status === "suspended" && (
                                  <button className="p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all" title="Reactivate">
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-border">
                  {filteredSellers.map((seller) => {
                    const sc = statusConfig[seller.status];
                    return (
                      <div key={seller.id} className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={seller.avatar} alt="" className="w-10 h-10 rounded-full" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{seller.shopName}</p>
                            <p className="text-xs text-muted">{seller.city} • {seller.pincode}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.text}`}>
                            {sc.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <p className="text-sm font-semibold">{formatCurrency(seller.revenue)}</p>
                            <p className="text-[10px] text-muted">Revenue</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{seller.commission}%</p>
                            <p className="text-[10px] text-muted">Commission</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{seller.rating} ⭐</p>
                            <p className="text-[10px] text-muted">Rating</p>
                          </div>
                        </div>
                        {seller.status === "pending" && (
                          <div className="flex gap-2 mt-3">
                            <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-green-500/10 text-green-500">Approve</button>
                            <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-500/10 text-red-500">Reject</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* PAYOUTS */}
          {activeTab === "payouts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Payout Management</h1>
              <p className="text-muted mb-8">Settle payments to sellers after commission deduction</p>

              {/* Payout Summary */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="glass-card-strong p-5 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-neon/5" />
                  <div className="relative">
                    <Banknote className="w-8 h-8 text-accent-light mx-auto mb-2" />
                    <p className="text-2xl sm:text-3xl font-bold">{formatCurrency(adminStats.gmv)}</p>
                    <p className="text-xs text-muted mt-1">Gross Merchandise Value</p>
                  </div>
                </div>
                <div className="glass-card p-5 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-bold">{formatCurrency(adminStats.platformCommission)}</p>
                  <p className="text-xs text-muted mt-1">Your Platform Profit</p>
                </div>
                <div className="glass-card p-5 text-center">
                  <Wallet className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-bold">{formatCurrency(adminStats.totalRevenue - adminStats.platformCommission)}</p>
                  <p className="text-xs text-muted mt-1">Net Seller Payouts</p>
                </div>
              </div>

              {/* Settle All Button */}
              <div className="glass-card-strong p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent" />
                <div className="relative flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="font-semibold text-sm">{mockPayouts.filter((p) => p.status === "pending").length} payouts pending settlement</p>
                    <p className="text-xs text-muted">Total: {formatCurrency(mockPayouts.filter((p) => p.status === "pending").reduce((a, b) => a + b.netPayout, 0))}</p>
                  </div>
                </div>
                <button className="btn-glow gap-2 relative">
                  <Wallet className="w-4 h-4" />
                  Settle All Payouts
                </button>
              </div>

              {/* Payout Table */}
              <div className="glass-card overflow-hidden">
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Seller</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Gross Amount</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Commission</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Net Payout</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Status</th>
                        <th className="text-left text-xs font-semibold text-muted px-5 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPayouts.map((payout) => {
                        const ps = payoutStatusConfig[payout.status];
                        return (
                          <tr key={payout.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                            <td className="px-5 py-4 font-medium text-sm">{payout.sellerName}</td>
                            <td className="px-5 py-4 text-sm">{formatCurrency(payout.amount)}</td>
                            <td className="px-5 py-4 text-sm text-red-400">-{formatCurrency(payout.commission)}</td>
                            <td className="px-5 py-4 text-sm font-semibold">{formatCurrency(payout.netPayout)}</td>
                            <td className="px-5 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${ps.bg} ${ps.text}`}>
                                {ps.label}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {payout.status === "pending" && (
                                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/10 text-accent-light hover:bg-accent/20 transition-all">
                                  Settle Now
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden divide-y divide-border">
                  {mockPayouts.map((payout) => {
                    const ps = payoutStatusConfig[payout.status];
                    return (
                      <div key={payout.id} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-semibold text-sm">{payout.sellerName}</p>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${ps.bg} ${ps.text}`}>
                            {ps.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center mb-3">
                          <div>
                            <p className="text-sm font-semibold">{formatCurrency(payout.amount)}</p>
                            <p className="text-[10px] text-muted">Gross</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-red-400">-{formatCurrency(payout.commission)}</p>
                            <p className="text-[10px] text-muted">Commission</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold">{formatCurrency(payout.netPayout)}</p>
                            <p className="text-[10px] text-muted">Net</p>
                          </div>
                        </div>
                        {payout.status === "pending" && (
                          <button className="w-full py-2 rounded-xl text-xs font-semibold bg-accent/10 text-accent-light">Settle Now</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Platform Settings</h1>
              <p className="text-muted mb-8">Configure global platform settings</p>
              <div className="glass-card p-6 max-w-lg space-y-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Platform Name</label>
                  <input type="text" defaultValue="MakeMyWear" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Default Commission Rate (%)</label>
                  <input type="number" defaultValue={20} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Support Email</label>
                  <input type="email" defaultValue="support@makemywear.in" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Payout Frequency</label>
                  <select className="input-field">
                    <option>Weekly</option>
                    <option>Bi-Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <button className="btn-primary w-full">Save Settings</button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
