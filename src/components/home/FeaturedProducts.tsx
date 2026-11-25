'use client';

import React from 'react';
import Link from 'next/link';
import { ProductCard, ProductData } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FeaturedProducts({ products }: { products: ProductData[] }) {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F6] border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Title on Left, View All on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bestselling Nails</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal">
              Most Loved Signature Sets
            </h2>
          </div>
          
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1F1A18] hover:text-[#C5A059] transition-colors group"
          >
            <span>View All Sets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Balanced 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA with generous mt-10 breathing room */}
        <div className="mt-12 text-center">
          <Button href="/shop" variant="primary">
            <span>Explore All 12 Signature Sets</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </section>
  );
}
