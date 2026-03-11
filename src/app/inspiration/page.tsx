"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Repeat, Search, Sparkles, TrendingUp, Clock, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockAIDesigns } from "@/lib/mock-data";
import { cn, getRelativeTime, formatNumber } from "@/lib/utils";

const tabs = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "newest", label: "Newest", icon: Clock },
  { id: "popular", label: "Most Loved", icon: Flame },
];

export default function InspirationPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [likedDesigns, setLikedDesigns] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLike = (id: string) => {
    setLikedDesigns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredDesigns = mockAIDesigns.filter((d) =>
    d.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent-light border border-accent/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Inspiration Wall
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
              Community <span className="gradient-text">Creations</span>
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
              Get inspired by AI designs from our creative community. Like, remix, and make them your own.
            </p>
          </motion.div>

          {/* Search + Tabs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11"
              />
            </div>
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-accent text-white shadow-lg shadow-accent-glow"
                      : "bg-surface text-muted border border-border hover:text-foreground"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {filteredDesigns.map((design, i) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card overflow-hidden break-inside-avoid group hover:border-accent/30 transition-all"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={design.imageUrl}
                    alt={design.prompt}
                    className={cn(
                      "w-full object-cover group-hover:scale-105 transition-transform duration-500",
                      i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Hover overlay actions */}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    <button
                      onClick={() => toggleLike(design.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all",
                        likedDesigns.includes(design.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white hover:bg-white/30"
                      )}
                    >
                      <Heart className={cn("w-3.5 h-3.5", likedDesigns.includes(design.id) && "fill-current")} />
                      {likedDesigns.includes(design.id) ? "Liked" : "Like"}
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-accent/80 text-white backdrop-blur-md hover:bg-accent transition-all">
                      <Repeat className="w-3.5 h-3.5" />
                      Remix
                    </button>
                  </div>

                  {/* Product type badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/40 text-white backdrop-blur-sm">
                    {design.productType}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium line-clamp-2 mb-3">&ldquo;{design.prompt}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={design.creator.avatar} alt="" className="w-6 h-6 rounded-full" />
                      <span className="text-xs text-muted">{design.creator.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Heart className="w-3 h-3" /> {formatNumber(design.likes)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Repeat className="w-3 h-3" /> {formatNumber(design.remixes)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Creator Incentive Banner */}
          <motion.div
            className="glass-card-strong p-6 sm:p-8 mt-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent-neon/5" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Create & Earn Rewards 🎉</h3>
              <p className="text-muted text-sm sm:text-base max-w-lg mx-auto mb-5">
                Share your AI designs. When someone buys your creation, you get a <strong className="text-accent-light">5% discount</strong> on your next order!
              </p>
              <a href="/studio" className="btn-primary gap-2">
                <Sparkles className="w-4 h-4" />
                Start Creating
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
