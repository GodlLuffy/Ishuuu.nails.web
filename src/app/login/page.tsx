'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, Phone, ArrowRight, AlertCircle, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quick autofill for Admin
  const handleAutofillAdmin = () => {
    setEmail('admin@sleekpolishbyish.com');
    setPassword('Admin@123');
    setTab('login');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        // If admin email, redirect to admin, else home
        if (email.toLowerCase().includes('admin')) {
          router.push('/admin');
        } else {
          router.push('/');
        }
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred during sign-in.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (res.ok) {
        setSuccessMsg('Account created successfully! Signing you in...');
        // Auto login
        const loginRes = await signIn('credentials', {
          email: email.trim().toLowerCase(),
          password,
          redirect: false,
        });
        if (!loginRes?.error) {
          router.push('/');
          router.refresh();
        }
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to register account');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6] py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DDD7] shadow-xl space-y-6">
        
        {/* Brand / Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sleek Polish Club</span>
          </div>
          <h1 className="font-serif text-3xl text-[#1F1A18] font-normal">
            {tab === 'login' ? 'Sign In to Your Account' : 'Create an Account'}
          </h1>
          <p className="text-xs text-[#8A7F7A] mt-1 font-light">
            Track orders, save favorite sets, and unlock custom sizing history.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-[#FAF8F6] rounded-2xl border border-[#E8DDD7]">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(null); }}
            className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              tab === 'login' ? 'bg-[#1F1A18] text-white shadow-sm' : 'text-[#8A7F7A]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(null); }}
            className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              tab === 'register' ? 'bg-[#1F1A18] text-white shadow-sm' : 'text-[#8A7F7A]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@sleekpolishbyish.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 pl-10 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                />
                <Mail className="w-4 h-4 text-[#8A7F7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 pl-10 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                />
                <Lock className="w-4 h-4 text-[#8A7F7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 pl-10 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                />
                <User className="w-4 h-4 text-[#8A7F7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 pl-10 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                />
                <Mail className="w-4 h-4 text-[#8A7F7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Phone / WhatsApp</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 pl-10 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                />
                <Phone className="w-4 h-4 text-[#8A7F7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 pl-10 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                />
                <Lock className="w-4 h-4 text-[#8A7F7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Demo Quick Admin Credential Button */}
        <div className="pt-4 border-t border-[#E8DDD7] text-center">
          <button
            type="button"
            onClick={handleAutofillAdmin}
            className="text-[11px] text-[#C5A059] hover:underline font-semibold"
          >
            Click here to Auto-Fill Admin Login (`admin@sleekpolishbyish.com`)
          </button>
        </div>

      </div>
    </div>
  );
}
