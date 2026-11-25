'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, X, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { YouTubeIcon } from '@/components/icons/YouTubeIcon';

const YOUTUBE_VIDEOS = [
  {
    id: 'fQqA7wtAtdU',
    title: 'Navratri & Festive Handcrafted Nails',
    category: 'Festive Couture',
    slug: 'royal-peacock-silver-set',
    poster: '/images/products/nails1.1.jpg',
  },
  {
    id: '2opAvj1bMRE',
    title: 'Glam Press-On Nail Art Showcase',
    category: 'Signature Sets',
    slug: 'rose-quartz-chunky-gold-cuffs-set',
    poster: '/images/products/nails11.1.jpg',
  },
  {
    id: '4e9M_xGXBe4',
    title: 'Hand-Painted Salon Nail Details',
    category: '3D Nail Art',
    slug: 'champagne-cat-eye-flower-set',
    poster: '/images/products/nails3.1.jpg',
  },
  {
    id: 'SIM2zFX0WjI',
    title: 'Custom Press-On Nails Behind The Scenes',
    category: 'Studio Reels',
    slug: 'sunlit-lemon-french-star-flower-set',
    poster: '/images/products/nails9.1.jpg',
  },
];

export function ReelShowcase() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F6] border-y border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-1.5">
              <YouTubeIcon className="w-4 h-4 text-[#FF0000]" />
              <span>Sleek &amp; Polish By Ish • YouTube</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal">
              Shoppable Video Showcase
            </h2>
            <p className="text-xs sm:text-sm text-[#8A7F7A] mt-1 font-light">
              Watch our real YouTube Shorts from @Sleekpolish29 before you shop your custom set.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@Sleekpolish29"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1F1A18] text-xs font-semibold uppercase tracking-[0.14em] text-[#1F1A18] hover:bg-[#1F1A18] hover:text-white transition-all duration-300 self-start sm:self-auto"
          >
            <YouTubeIcon className="w-4 h-4 text-[#FF0000]" />
            <span>Visit YouTube Channel</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 9:16 Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {YOUTUBE_VIDEOS.map((video) => {
            const isPlaying = playingId === video.id;
            return (
              <div
                key={video.id}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-[#1F1A18] shadow-lg border border-[#E8DFD8] flex flex-col justify-between p-4 sm:p-5"
              >
                {isPlaying ? (
                  <>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full z-20 border-0"
                    />
                    <button
                      onClick={() => setPlayingId(null)}
                      className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#C5A059] transition-colors cursor-pointer"
                      aria-label="Close Video"
                      title="Close Video"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    {/* Background Poster Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark Gradient Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

                    {/* Top Controls: Category Badge & YouTube Link */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full uppercase tracking-wider">
                        {video.category}
                      </span>
                      <a
                        href={`https://www.youtube.com/shorts/${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                        aria-label="Open on YouTube"
                        title="Watch on YouTube"
                      >
                        <YouTubeIcon className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Center Play Button */}
                    <button
                      onClick={() => setPlayingId(video.id)}
                      className="relative z-10 self-center opacity-85 group-hover:opacity-100 transition-all group-hover:scale-110 cursor-pointer"
                      aria-label={`Play ${video.title}`}
                    >
                      <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-xl">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </button>

                    {/* Bottom Shoppable Card Info */}
                    <div className="relative z-10 space-y-3">
                      <div>
                        <h3 className="font-serif text-base text-white font-medium line-clamp-2 leading-snug">
                          {video.title}
                        </h3>
                        <div className="text-[11px] text-white/75 mt-0.5 flex items-center gap-1.5">
                          <YouTubeIcon className="w-3 h-3 text-[#FF0000]" />
                          <span>@Sleekpolish29</span>
                        </div>
                      </div>
                      
                      {/* Shop This Set Button */}
                      <Link
                        href={`/shop/${video.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white text-[#1F1A18] hover:bg-[#C5A059] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md backdrop-blur-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shop This Set</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
