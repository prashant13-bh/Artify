"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Palette, Printer, Scissors,
  Star, ShoppingBag, Zap, Shield, Truck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProducts, mockAIDesigns } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-neon/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent-light border border-accent/20">
                <Sparkles className="w-3.5 h-3.5" />
                India&apos;s First AI Fashion Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Wear Your{" "}
              <span className="gradient-text">Imagination</span>
              <span className="text-accent-light">.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Design with AI. Print with DTF. Embroider with precision.
              Send your own garment or buy blank — your creativity, your fashion.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/shop" className="btn-primary text-base px-10 py-4 gap-2 w-full sm:w-auto">
                <ShoppingBag className="w-5 h-5" />
                Shop Ready-Made
              </Link>
              <Link href="/studio" className="btn-glow text-base px-10 py-4 gap-2 w-full sm:w-auto">
                <Palette className="w-5 h-5" />
                Create with AI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-8 sm:gap-16 mt-14 text-center"
            >
              {[
                { label: "Happy Customers", value: "8,450+" },
                { label: "AI Designs Created", value: "25,000+" },
                { label: "Local Sellers", value: "200+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">Three simple steps to your custom fashion piece</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Palette, title: "Design", desc: "Type a prompt and let AI generate stunning artwork, or upload your own design.", step: "01", color: "from-violet-500 to-purple-600" },
              { icon: Printer, title: "Print or Embroider", desc: "Choose DTF printing for vibrant graphics or auto-digitized embroidery for texture.", step: "02", color: "from-blue-500 to-cyan-500" },
              { icon: Truck, title: "Deliver", desc: "Our hyperlocal sellers handle production. Your custom piece arrives at your door.", step: "03", color: "from-emerald-500 to-green-500" },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="glass-card p-6 sm:p-8 text-center group hover:border-accent/30 transition-all duration-300"
              >
                <div className="relative inline-flex mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="flex items-center justify-between mb-10" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Trending Now</h2>
              <p className="text-muted">Ready to customize or buy as-is</p>
            </div>
            <Link href="/shop" className="btn-secondary text-sm gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {mockProducts.slice(0, 4).map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className="group glass-card overflow-hidden hover:border-accent/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 left-3 right-3">
                      <button className="btn-primary w-full text-xs py-2.5">
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1.5 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-base">{formatCurrency(product.price)}</span>
                    <span className="text-xs text-muted line-through">{formatCurrency(product.originalPrice)}</span>
                    <span className="text-xs font-semibold text-green-500">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-muted">({product.reviews})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Design Preview */}
      <section className="py-16 sm:py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Community Creations</h2>
            <p className="text-muted text-base sm:text-lg">See what our creators are designing with AI</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {mockAIDesigns.slice(0, 6).map((design) => (
              <motion.div
                key={design.id}
                variants={fadeUp}
                className="glass-card overflow-hidden group hover:border-accent/30 transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={design.imageUrl}
                    alt={design.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">&ldquo;{design.prompt}&rdquo;</p>
                      <div className="flex items-center gap-2 mt-2">
                        <img src={design.creator.avatar} alt="" className="w-5 h-5 rounded-full" />
                        <span className="text-white/80 text-xs">{design.creator.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/inspiration" className="btn-secondary gap-2">
              Explore All Designs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why MakeMyWear?</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            {[
              { icon: Zap, title: "AI-Powered Design", desc: "Generate print-ready art in seconds with just a text prompt" },
              { icon: Scissors, title: "SYOG Feature", desc: "Send your own garment — we'll customize & return it" },
              { icon: Shield, title: "Quality Guaranteed", desc: "Every print checked by local sellers before shipping" },
              { icon: Truck, title: "Hyperlocal Delivery", desc: "Orders routed to nearest sellers for fastest delivery" },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card p-6 text-center hover:border-accent/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <f.icon className="w-6 h-6 text-accent-light" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="glass-card-strong p-8 sm:p-16 relative overflow-hidden"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-neon/5" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Create?</h2>
              <p className="text-muted text-base sm:text-lg mb-8 max-w-lg mx-auto">
                Join thousands of creators who are designing their own fashion with AI
              </p>
              <Link href="/studio" className="btn-glow text-base px-12 py-4 gap-2">
                <Sparkles className="w-5 h-5" />
                Start Designing Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
