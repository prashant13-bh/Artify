"use client";

import Link from "next/link";
import { Sparkles, Instagram, Twitter, Youtube, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">MakeMyWear</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              India&apos;s first AI-powered fashion customization marketplace. Design it, wear it.
            </p>
            <div className="flex gap-3 mt-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-surface hover:bg-accent/10 hover:text-accent transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {["T-Shirts", "Hoodies", "Jackets", "Caps", "Tote Bags"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="text-sm text-muted hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Create</h4>
            <ul className="space-y-2.5">
              {["AI Design Studio", "DTF Printing", "Embroidery", "Send Your Garment", "Inspiration"].map((item) => (
                <li key={item}>
                  <Link href="/studio" className="text-sm text-muted hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About Us", "Become a Seller", "Help Center", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href={item === "Become a Seller" ? "/become-a-seller" : "#"} className="text-sm text-muted hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © 2026 MakeMyWear. All rights reserved.
          </p>
          <p className="text-xs text-muted flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
