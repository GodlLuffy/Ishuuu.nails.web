'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Heart, ArrowUpRight, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { YouTubeIcon } from '@/components/icons/YouTubeIcon';

export function Footer() {
  return (
    <footer className="bg-[#1F1A18] text-white/80 py-16 border-t border-[#3D3533] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#3D3533]">
          
          {/* Column 1: Brand & Bio */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Sleek & Polish Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-white.png"
                alt="Sleek & Polish by Ish"
                className="h-10 w-auto max-w-[190px] object-contain brightness-100 hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-xs text-white/70 leading-relaxed mb-4 font-light">
              Luxury salon-finish press-on nails, custom bridal sets, and nourishing nail care handcrafted with precision by Ish. Wearable art tailored to your fingertips.
            </p>
            <div className="mb-5 space-y-1.5 text-xs text-white/80">
              <a
                href="tel:+919322118970"
                className="flex items-center gap-2 hover:text-[#C5A059] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-medium">+91 93221 18970</span>
              </a>
              <a
                href="https://wa.me/919322118970?text=Hi%20Ish!%20I%20am%20interested%20in%20custom%20press-on%20nails%20from%20Sleek%20Polish."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp: 93221 18970</span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://www.instagram.com/sleekpolishbyish?utm_source=ig_web_button_share_sheet&bqrl=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919322118970?text=Hi%20Ish!%20I%20am%20interested%20in%20custom%20press-on%20nails%20from%20Sleek%20Polish."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@Sleekpolish29"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
                title="Sleek & Polish By Ish on YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@sleekpolishbyish.com"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] text-white flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop All Nails
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bridal+%26+Festive+Nails" className="hover:text-white transition-colors">
                  Bridal & Festive Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Minimalist+%26+Everyday+Sets" className="hover:text-white transition-colors">
                  Minimalist & Everyday
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Combo+Kits" className="hover:text-white transition-colors">
                  Combos & Care Bundles
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Nail Artist Lookbook
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  Book Studio / Video Consult
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Size Guide & How to Measure
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <span>Admin Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <span className="text-white/50">Shipping: Fast Pan-India (3-5 Days)</span>
              </li>
              <li>
                <span className="text-white/50">Returns: Hygiene Assured</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Exclusive Perks */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              The Sleek Club
            </h4>
            <p className="text-xs text-white/70 mb-4 leading-relaxed font-light">
              Subscribe for VIP access to limited edition drops, custom sizing consultations, and 10% off your first order.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Sleek Polish by Ish!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A059] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#C5A059] hover:bg-[#D4B87A] text-[#1F1A18] px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>100% Handcrafted Salon Gel Formula</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Sleek Polish by Ish (@sleekpolishbyish). All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Prepaid UPI / Cards (5% OFF)</span>
            <span>•</span>
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Pan-India Shipping</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button with Authentic WhatsApp Logo */}
      <a
        href="https://wa.me/919322118970?text=Hi%20Ish!%20I'd%20love%20to%20order%20or%20inquire%20about%20custom%20press-on%20nails."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50 cursor-pointer"
        aria-label="Chat with Ish on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </footer>
  );
}
