import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  shape?: string | null;
  length?: string | null;
  description?: string | null;
}

export function PortfolioPreview({ items }: { items: PortfolioItem[] }) {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artist Lookbook</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal">
              Nail Artistry Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-[#8A7F7A] mt-1 font-light">
              From bridal couture to chrome glaze and 3D miniature art created by Ish.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1F1A18] hover:text-[#C5A059] transition-colors group"
          >
            <span>View All Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Balanced 3-Column Full-Width Grid - Zero Trailing Whitespace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group relative rounded-2xl overflow-hidden bg-[#F3E8E2] border border-[#E8DFD8] shadow-sm hover:shadow-xl transition-all duration-500 block aspect-[4/5]"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                  {item.category}
                </span>
                <h4 className="font-serif text-xl text-white font-medium">
                  {item.title}
                </h4>
                {item.shape && (
                  <p className="text-xs text-white/80 mt-1">
                    {item.shape} • {item.length}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner with generous mt-12 breathing room */}
        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="secondary">
            <span>Explore Complete Lookbook</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </section>
  );
}
