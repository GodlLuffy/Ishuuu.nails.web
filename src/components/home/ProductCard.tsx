'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice, calculateDiscount } from '@/lib/utils';

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  images: string; // JSON array of string URLs
  shapes?: string;
  lengths?: string;
  finish?: string;
  stock?: number;
  isNewLaunch?: boolean;
  isFeatured?: boolean;
  rating?: number;
  ratingCount?: number;
}

export function ProductCard({ product }: { product: ProductData }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  let parsedImages: string[] = [];
  try {
    parsedImages = JSON.parse(product.images);
  } catch {
    parsedImages = ['/images/products/nails2.1.jpg'];
  }

  const primaryImage = parsedImages[0] || '/images/products/nails2.1.jpg';
  const secondaryImage = parsedImages[1] || primaryImage;

  const discount = calculateDiscount(product.originalPrice, product.price);
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let defaultShape = 'Almond';
    let defaultLength = 'Medium';
    try {
      if (product.shapes) {
        const shapes = JSON.parse(product.shapes);
        if (shapes.length > 0) defaultShape = shapes[0];
      }
      if (product.lengths) {
        const lengths = JSON.parse(product.lengths);
        if (lengths.length > 0) defaultLength = lengths[0];
      }
    } catch {}

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: primaryImage,
      quantity: 1,
      shape: defaultShape,
      length: defaultLength,
      size: 'M',
    });
    openCart();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8DDD7]/70 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Swap */}
      <Link href={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#F3E8E2] block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges Container - Stacked cleanly with zero overlap */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1 z-10 pointer-events-none max-w-[70%]">
          {discount > 0 && (
            <span className="bg-[#E53935] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-sm">
              -{discount}%
            </span>
          )}
          {product.isNewLaunch && (
            <span className="bg-[#C5A059] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-sm flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              New
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            inWishlist
              ? 'bg-[#C5A059] text-white'
              : 'bg-white/80 hover:bg-white text-[#1F1A18] backdrop-blur-sm shadow-sm'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-300 shadow-xl"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>+ Quick Add</span>
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#C5A059] block mb-1 truncate">
            {product.category}
          </span>

          {/* Product Title */}
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-serif text-base sm:text-lg text-[#1F1A18] font-medium leading-snug line-clamp-1 group-hover:text-[#C5A059] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-[#C5A059]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5) ? 'fill-[#C5A059]' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#8A7F7A] font-medium">
              {product.rating?.toFixed(1) || '5.0'} ({product.ratingCount || 120})
            </span>
          </div>

          {/* Price Hierarchy */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base sm:text-lg font-bold text-[#1F1A18]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#8A7F7A] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Full-Width Add to Cart Button */}
        <div className="mt-4 pt-3 border-t border-[#FAF8F6]">
          <button
            onClick={handleQuickAdd}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1F1A18] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] transition-colors duration-300 shadow-sm cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
