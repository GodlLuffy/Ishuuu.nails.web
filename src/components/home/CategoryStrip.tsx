import React from 'react';
import Link from 'next/link';
import { Sparkles, Crown, Gem, Droplet, Gift, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Press-On Nails',
    slug: 'Press-On+Nail+Sets',
    icon: Gem,
    image: '/images/products/nails2.1.jpg',
    description: 'Everyday to Glam'
  },
  {
    name: 'Bridal & Festive',
    slug: 'Bridal+%26+Festive+Nails',
    icon: Crown,
    image: '/images/products/nails1.1.jpg',
    description: 'Pearls & 3D Charms'
  },
  {
    name: 'Minimalist & Nude',
    slug: 'Minimalist+%26+Everyday+Sets',
    icon: Sparkles,
    image: '/images/products/nails3.1.jpg',
    description: 'Clean French & Nude'
  },
  {
    name: 'Nail Care & Oils',
    slug: 'Nail+Care+%26+Cuticle+Oils',
    icon: Droplet,
    image: '/images/products/nails10.1.jpg',
    description: 'Cuticle Care & Gloss'
  },
  {
    name: 'Combo Kits',
    slug: 'Combo+Kits',
    icon: Gift,
    image: '/images/products/nails11.1.jpg',
    description: 'Signature Bundles'
  },
];

export function CategoryStrip() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#C5A059] mb-1.5">
            Explore Handcrafted Art
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal">
            Shop By Collection
          </h2>
        </div>

        {/* 5 Evenly Spaced Circular Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => {
            return (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-[#FAF8F6] transition-all duration-300"
              >
                {/* Circular Image Container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-[#E8DDD7] group-hover:border-[#C5A059] p-1 transition-all duration-300 shadow-sm group-hover:shadow-md mb-3 bg-white">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#1F1A18]/15 group-hover:bg-transparent transition-colors" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-base sm:text-lg text-[#1F1A18] group-hover:text-[#C5A059] transition-colors font-medium">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#8A7F7A] mt-0.5">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
