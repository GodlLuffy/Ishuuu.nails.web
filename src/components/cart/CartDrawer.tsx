'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const prepaidDiscount = Math.round(subtotal * 0.05);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F1A18]/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F6] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DDD7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h2 className="font-serif text-xl text-[#1F1A18]">
                Your Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#8A7F7A] hover:text-[#1F1A18] rounded-full hover:bg-[#FAF8F6]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prepaid Perk Notice */}
          <div className="bg-[#F3E8E2] px-5 py-2.5 text-xs text-[#1F1A18] flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              Extra 5% OFF applied at checkout on Prepaid!
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F3E8E2] flex items-center justify-center text-[#C5A059] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-[#1F1A18] mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#8A7F7A] max-w-xs mb-6">
                  Explore our handcrafted press-on sets and discover your signature look.
                </p>
                <button
                  onClick={closeCart}
                  className="bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
                >
                  <Link href="/shop">Start Shopping</Link>
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  className="bg-white rounded-xl p-3.5 border border-[#E8DDD7] flex gap-3.5 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F3E8E2] flex-shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm text-[#1F1A18] font-medium line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-[#8A7F7A] hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8A7F7A] mt-0.5 space-x-2">
                        {item.shape && <span>Shape: {item.shape}</span>}
                        {item.length && <span>• {item.length}</span>}
                        {item.size && <span>• Size: {item.size}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF8F6]">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#E8DDD7] rounded-md overflow-hidden bg-[#FAF8F6]">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-xs hover:bg-[#E8DDD7] text-[#1F1A18]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#1F1A18]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-xs hover:bg-[#E8DDD7] text-[#1F1A18]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#1F1A18]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8DDD7] space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8A7F7A]">
                  <span>Subtotal</span>
                  <span className="text-[#1F1A18] font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#C5A059]">
                  <span>Prepaid Benefit (5% OFF)</span>
                  <span>- {formatPrice(prepaidDiscount)}</span>
                </div>
                <div className="flex justify-between text-[#8A7F7A]">
                  <span>Shipping</span>
                  <span className="text-[#4CAF50] font-semibold">FREE (Prepaid)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1F1A18] pt-2 border-t border-[#E8DDD7]">
                  <span>Est. Total</span>
                  <span className="font-serif text-lg">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
