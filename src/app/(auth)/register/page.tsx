"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate register
    setTimeout(() => {
      window.location.href = "/account";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-row-reverse">
      {/* Right Panel - Image/Brand (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574&auto=format&fit=crop" 
          alt="Abstract Neon Fashion" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 h-full w-full">
          <Link href="/" className="flex items-center justify-end gap-2 group w-full">
            <span className="text-2xl font-bold gradient-text tracking-tight">MakeMyWear</span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center shadow-lg shadow-accent-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </Link>
          <div className="max-w-md ml-auto text-right">
            <h2 className="text-4xl font-black mb-4 leading-tight">Join the fashion<br/>revolution.</h2>
            <p className="text-lg text-muted">A single account to shop the best designs, create your own with AI, and track hyperlocal deliveries.</p>
          </div>
        </div>
      </div>

      {/* Left Panel - Register Form */}
      <div className="flex-[1.2] xl:flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-32 relative">
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-neon flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text tracking-tight">MakeMyWear</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-accent-light">
              <UserPlus className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wider uppercase">Create Account</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Join MakeMyWear</h1>
            <p className="text-muted text-sm border-l-2 border-accent pl-3">Are you a print shop looking to receive orders? <Link href="/become-a-seller" className="text-foreground font-semibold hover:text-accent transition-colors">Register as a Seller instead.</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">First Name</label>
                <input required type="text" placeholder="John" className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                <input required type="text" placeholder="Doe" className="input-field" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email Address</label>
              <input required type="email" placeholder="you@example.com" className="input-field" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a strong password" 
                  className="input-field pr-10" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-muted mt-1.5">Must be at least 8 characters long.</p>
            </div>

            <button type="submit" disabled={isLoading} className="btn-glow w-full mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Sign Up <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
            <p className="text-center text-[10px] text-muted mt-3">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <div className="mt-8 flex items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 px-4 text-xs text-muted font-medium uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-2.5 border border-border rounded-xl hover:bg-surface transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-2.5 border border-border rounded-xl hover:bg-surface transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.72 1.58.07 2.65.65 3.3 1.58-2.61 1.68-2.21 5.33.6 6.34-1.06 2.22-1.8 3.59-2.57 4.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm font-semibold">Apple</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm gap-1 flex justify-center text-muted">
            Already have an account? 
            <Link href="/login" className="text-foreground font-bold hover:text-accent transition-colors">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
