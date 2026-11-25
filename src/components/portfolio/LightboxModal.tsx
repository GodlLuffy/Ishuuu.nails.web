'use client';

import React from 'react';
import Link from 'next/link';
import { X, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  shape?: string | null;
  length?: string | null;
  description?: string | null;
  linkedProductId?: string | null;
  linkedProduct?: {
    id: string;
    name: string;
    slug: string;
    price: number;
  } | null;
}

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function LightboxModal({ item, onClose }: LightboxModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1F1A18]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF8F6] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8DDD7] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1F1A18] flex items-center justify-center shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: High-Res Image */}
          <div className="relative aspect-[4/5] md:aspect-auto bg-[#F3E8E2]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Lookbook Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{item.category} Lookbook</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1A18] font-normal leading-tight">
                {item.title}
              </h3>

              {/* Specs Badge */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.shape && (
                  <span className="text-xs bg-white border border-[#E8DDD7] px-3 py-1 rounded-full text-[#1F1A18] font-medium">
                    Shape: {item.shape}
                  </span>
                )}
                {item.length && (
                  <span className="text-xs bg-white border border-[#E8DDD7] px-3 py-1 rounded-full text-[#1F1A18] font-medium">
                    Length: {item.length}
                  </span>
                )}
                <span className="text-xs bg-[#C5A059]/15 text-[#C5A059] px-3 py-1 rounded-full font-semibold">
                  Handcrafted by Ish
                </span>
              </div>

              {/* Description */}
              <div className="mt-5 text-xs sm:text-sm text-[#1F1A18]/80 font-light leading-relaxed space-y-2">
                <p>{item.description || 'Custom crafted press-on nail look designed with salon-quality gel finishes.'}</p>
                <p className="text-[#8A7F7A]">
                  Every set can be replicated to fit your exact nail sizes or customized in your preferred shape and length.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t border-[#E8DDD7]">
              
              {/* Action 1: Request Custom Set */}
              <Link
                href={`/book?design=${encodeURIComponent(item.title)}&type=consultation`}
                className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Request This Custom Set</span>
              </Link>

              {/* Action 2: Shop Matching / Similar Product */}
              {item.linkedProduct ? (
                <Link
                  href={`/shop/${item.linkedProduct.slug}`}
                  className="w-full bg-white hover:bg-[#FAF8F6] border border-[#1F1A18] text-[#1F1A18] py-3 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Matching Set ({item.linkedProduct.name})</span>
                </Link>
              ) : (
                <a
                  href={`https://wa.me/919322118970?text=Hi%20Ish!%20I%20love%20the%20"${encodeURIComponent(item.title)}"%20portfolio%20design%20and%20want%20to%20order%20it.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#1F1A18] hover:text-white py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
