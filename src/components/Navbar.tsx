"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Menu, X, Sparkles, ShoppingBag, Palette,
  Heart, Download, Store, LayoutDashboard, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const customerLinks = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/studio", label: "AI Studio", icon: Palette },
  { href: "/inspiration", label: "Inspiration", icon: Heart },
];

const portalLinks = [
  { href: "/become-a-seller", label: "Become a Seller", icon: Store },
  { href: "/seller", label: "Seller Dashboard", icon: Store },
  { href: "/admin", label: "Admin Panel", icon: LayoutDashboard },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card-strong"
        style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center shadow-lg shadow-accent-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold gradient-text tracking-tight">
                MakeMyWear
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {customerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive(link.href)
                      ? "bg-accent/10 text-accent-light"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              {/* Portal Dropdown */}
              <div className="relative ml-1">
                <button
                  onClick={() => setPortalOpen(!portalOpen)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-all"
                >
                  Portals
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", portalOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {portalOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-52 glass-card p-2"
                      onMouseLeave={() => setPortalOpen(false)}
                    >
                      {portalLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setPortalOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                            isActive(link.href)
                              ? "bg-accent/10 text-accent-light"
                              : "text-muted hover:text-foreground hover:bg-surface"
                          )}
                        >
                          <link.icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full hover:bg-surface transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
              </button>

              {/* Install Button */}
              <Link
                href="/download"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-accent to-accent-neon text-white shadow-lg shadow-accent-glow hover:shadow-xl transition-all"
              >
                <Download className="w-4 h-4" />
                Install App
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-full hover:bg-surface transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-16 md:hidden"
            style={{ background: "var(--background)" }}
          >
            <div className="flex flex-col p-6 gap-2">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider px-4 mb-2">
                Shop & Create
              </p>
              {customerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium transition-all",
                    isActive(link.href)
                      ? "bg-accent/10 text-accent-light"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-border my-4" />

              <p className="text-xs font-semibold text-muted uppercase tracking-wider px-4 mb-2">
                Portals
              </p>
              {portalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium transition-all",
                    isActive(link.href)
                      ? "bg-accent/10 text-accent-light"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}

              <div className="mt-6">
                <Link
                  href="/download"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-accent to-accent-neon text-white shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Install App (APK)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
