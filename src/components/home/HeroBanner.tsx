'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3E8E2]/60 via-[#FAF8F6] to-[#FAF8F6] py-16 lg:py-24 border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean 2-column grid: 7 cols copy, 5 cols visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols): Editorial Headline, Copy, Standardized Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 bg-[#C5A059]/15 text-[#8F6F2E] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Couture Salon Gel Finish • Reusable 3x</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#1F1A18] leading-[1.08] tracking-tight">
              Wearable Luxury, <br />
              <span className="italic font-light text-[#C5A059]">Artfully Handcrafted</span> <br />
              for Your Nails.
            </h1>

            {/* Sub-copy with generous breathing room */}
            <p className="text-sm sm:text-base md:text-lg text-[#1F1A18]/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Experience the unmatched luxury of salon-quality gel nails at home in minutes. Hand-painted with multi-layer builder gel, custom-sized to your exact millimeter fit, and reusable up to 3x by nail artist <strong>Ish (@sleekpolishbyish)</strong>.
            </p>

            {/* Cleanly Aligned Hero CTAs with gap-4 flex-wrap */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button href="/shop" variant="primary">
                <span>Shop Press-On Nails</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button href="/portfolio" variant="secondary">
                <span>View Full Portfolio</span>
              </Button>

              <a
                href="https://wa.me/919322118970?text=Hi%20Ish!%20I%20am%20inquiring%20about%20custom%20press-on%20nails."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#20ba59] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                title="Chat with Ish on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mini Trust Row */}
            <div className="pt-6 border-t border-[#E8DFD8] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#8A7F7A] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>100% Hand-Painted Gel</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Custom Sizing in mm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Pan-India & Worldwide Fast Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Well-padded floating caption card on hero image */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative w-full">
              
              {/* Main Luxury Hero Image Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F3E8E2] h-[480px] sm:h-[540px] w-full relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/products/leopard-rose-gold-2.jpg"
                  alt="Sleek & Polish Wild Glamour Leopard Handcrafted Press-On Nails by Ish"
                  className="w-full h-full object-cover object-center"
                />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-md border border-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
                  <span className="text-[11px] font-bold text-[#1F1A18] tracking-wider uppercase">Handcrafted by Ish</span>
                </div>
                
                {/* Well-padded floating caption card at bottom */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/80">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">Signature Launch</span>
                        <div className="flex text-[#C5A059]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-[#C5A059]" />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg text-[#1F1A18] font-medium leading-tight">
                        Wild Glamour Leopard & 3D Gold Cuffs
                      </h4>
                      <p className="text-xs sm:text-sm font-bold text-[#1F1A18] mt-1">
                        ₹1,499 <span className="text-[11px] font-normal text-gray-400 line-through ml-1">₹2,099</span>
                        <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">-28%</span>
                      </p>
                    </div>
                    
                    <Link
                      href="/shop/leopard-rose-gold-cuff-set"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#1F1A18] text-white text-[11px] font-semibold tracking-wider uppercase hover:bg-[#C5A059] transition-colors flex-shrink-0 shadow-sm cursor-pointer"
                    >
                      Shop Set
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Background Accents */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#C5A059]/15 rounded-full -z-10 blur-2xl hidden sm:block" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-[#F3E8E2] rounded-full -z-10 blur-xl hidden sm:block" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
