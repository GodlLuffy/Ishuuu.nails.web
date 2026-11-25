'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PORTFOLIO_CATEGORIES } from '@/lib/utils';
import { LightboxModal } from './LightboxModal';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';

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

export function PortfolioClient({ items }: { items: PortfolioItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F6] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Nail Artistry</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1F1A18] font-light leading-tight">
            Nail Artist Portfolio & Lookbook
          </h1>
          <p className="text-xs sm:text-sm text-[#8A7F7A] mt-3 font-light leading-relaxed">
            Signature sets sculpted, hand-painted, and styled by <strong>Ish (@sleekpolishbyish)</strong>. Click any look to examine artistry details or request custom recreations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${
                selectedCategory === cat
                  ? 'bg-[#C5A059] text-white shadow-md'
                  : 'bg-white text-[#1F1A18] border border-[#E8DDD7] hover:border-[#C5A059]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Column Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E8DDD7]/70 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden bg-[#F3E8E2] ${idx % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1F1A18] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {item.category}
                </span>

                {/* Hover Eye Trigger */}
                <div className="absolute inset-0 bg-[#1F1A18]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#1F1A18] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5 text-[#C5A059]" />
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-5 flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1A18] font-medium group-hover:text-[#C5A059] transition-colors">
                    {item.title}
                  </h3>
                  {item.shape && (
                    <p className="text-xs text-[#8A7F7A] mt-0.5">
                      {item.shape} • {item.length}
                    </p>
                  )}
                </div>
                <span className="text-xs text-[#C5A059] font-semibold uppercase tracking-wider">
                  View Look →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#1F1A18] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-light">
              Have an Inspiration Image in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              We recreate Pinterest and Instagram nail art references with salon-grade builder gel. Book a consultation or share your reference picture.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/book?type=consultation"
                className="bg-[#C5A059] hover:bg-[#D4B87A] text-[#1F1A18] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                Send Reference Photo
              </Link>
              <a
                href="https://www.instagram.com/sleekpolishbyish"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 hover:border-white text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>DM @sleekpolishbyish</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal item={activeModalItem} onClose={() => setActiveModalItem(null)} />
    </div>
  );
}
