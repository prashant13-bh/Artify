"use client";

import { motion } from "framer-motion";
import {
  Download, Smartphone, Monitor, Globe, Shield,
  Zap, Bell, Wifi, WifiOff, CheckCircle2, ArrowRight,
  Sparkles, Apple, Chrome
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 sm:pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="text-center mb-12 sm:mb-16" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent-light border border-accent/20 mb-4">
              <Smartphone className="w-3.5 h-3.5" />
              Install MakeMyWear
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              MakeMyWear on <span className="gradient-text">Every Device</span>
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
              Install our app on your phone, tablet, or desktop — works on all devices, no app store needed!
            </p>
          </motion.div>

          {/* Download Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Android APK */}
            <motion.div
              className="glass-card-strong p-6 sm:p-8 text-center hover:border-accent/30 transition-all group"
              {...fadeUp}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Android</h3>
              <p className="text-sm text-muted mb-6">Download the APK directly or install from your browser</p>
              <button className="btn-primary w-full gap-2 py-3.5 mb-3">
                <Download className="w-5 h-5" />
                Download APK
              </button>
              <p className="text-[10px] text-muted">v2.1.0 • 8.4 MB • Android 8.0+</p>
            </motion.div>

            {/* iOS PWA */}
            <motion.div
              className="glass-card-strong p-6 sm:p-8 text-center hover:border-accent/30 transition-all group"
              {...fadeUp}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">iPhone / iPad</h3>
              <p className="text-sm text-muted mb-6">Add to Home Screen from Safari for the best experience</p>
              <button className="btn-secondary w-full gap-2 py-3.5 mb-3">
                <Globe className="w-5 h-5" />
                Open in Safari
              </button>
              <p className="text-[10px] text-muted">Tap Share → Add to Home Screen</p>
            </motion.div>

            {/* Desktop PWA */}
            <motion.div
              className="glass-card-strong p-6 sm:p-8 text-center hover:border-accent/30 transition-all group sm:col-span-2 lg:col-span-1"
              {...fadeUp}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Desktop</h3>
              <p className="text-sm text-muted mb-6">Install as a desktop app from Chrome, Edge, or Brave</p>
              <button className="btn-secondary w-full gap-2 py-3.5 mb-3">
                <Chrome className="w-5 h-5" />
                Install from Browser
              </button>
              <p className="text-[10px] text-muted">Click ⊕ in your address bar to install</p>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div className="text-center mb-10" {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why Install the App?</h2>
            <p className="text-muted">A native-like experience on every device</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Instant loading, smooth animations" },
              { icon: Bell, title: "Push Notifications", desc: "Order updates in real-time" },
              { icon: WifiOff, title: "Works Offline", desc: "Browse products without internet" },
              { icon: Shield, title: "Safe & Secure", desc: "No app store permissions needed" },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="glass-card p-4 sm:p-5 text-center hover:border-accent/30 transition-all"
                {...fadeUp}
                transition={{ delay: 0.1 * i }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-5 h-5 text-accent-light" />
                </div>
                <h4 className="text-sm font-semibold mb-1">{f.title}</h4>
                <p className="text-[10px] sm:text-xs text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Install Instructions */}
          <motion.div className="glass-card-strong p-6 sm:p-10 relative overflow-hidden" {...fadeUp}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-neon/5" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">How to Install</h3>
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { step: "1", title: "Open in Browser", desc: "Visit makemywear.in on your phone or desktop browser" },
                  { step: "2", title: "Tap Install / Add", desc: "Look for the install prompt or tap Share → Add to Home Screen" },
                  { step: "3", title: "Enjoy!", desc: "The app icon appears on your home screen — ready to use instantly!" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-accent text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                      {s.step}
                    </div>
                    <h4 className="font-semibold mb-1">{s.title}</h4>
                    <p className="text-xs text-muted">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
