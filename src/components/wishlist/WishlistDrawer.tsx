'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export function WishlistDrawer() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlistStore();
  const { openCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F1A18]/60 backdrop-blur-sm transition-opacity"
        onClick={closeWishlist}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F6] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DDD7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]" />
              <h2 className="font-serif text-xl text-[#1F1A18]">
                Your Wishlist ({items.length})
              </h2>
            </div>
            <button
              onClick={closeWishlist}
              className="p-1.5 text-[#8A7F7A] hover:text-[#1F1A18] rounded-full hover:bg-[#FAF8F6]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F3E8E2] flex items-center justify-center text-[#C5A059] mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-[#1F1A18] mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-[#8A7F7A] max-w-xs mb-6">
                  Save your favorite handcrafted sets so you never lose track of them.
                </p>
                <button
                  onClick={closeWishlist}
                  className="bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
                >
                  <Link href="/shop">Discover Nails</Link>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-[#8A7F7A]">
                  You have saved {items.length} item{items.length > 1 ? 's' : ''}. Browse the shop to customize and add them directly to your bag.
                </p>
                <div className="p-4 bg-white rounded-xl border border-[#E8DDD7] text-center space-y-3">
                  <p className="text-sm text-[#1F1A18] font-medium">Ready to treat your nails?</p>
                  <Link
                    href="/shop"
                    onClick={closeWishlist}
                    className="inline-flex items-center gap-2 bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
                  >
                    <span>View In Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
