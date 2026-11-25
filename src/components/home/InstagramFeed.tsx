import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { Button } from '@/components/ui/Button';

const INSTA_POSTS = [
  {
    id: 1,
    image: '/images/products/nails2.1.jpg',
    likes: '1.8k',
  },
  {
    id: 2,
    image: '/images/products/nails1.1.jpg',
    likes: '2.4k',
  },
  {
    id: 3,
    image: '/images/products/nails11.1.jpg',
    likes: '2.1k',
  },
  {
    id: 4,
    image: '/images/products/nails8.1.jpg',
    likes: '1.9k',
  },
  {
    id: 5,
    image: '/images/products/nails4.1.jpg',
    likes: '1.5k',
  },
  {
    id: 6,
    image: '/images/products/nails7.1.jpg',
    likes: '2.8k',
  },
];

export function InstagramFeed() {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F6] border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-2">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Join Our Nail Community</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal">
            Follow @sleekpolishbyish
          </h2>
          <p className="text-xs sm:text-sm text-[#8A7F7A] mt-2 font-light">
            Tag us in your nail selfies with #SleekPolishByIsh to be featured on our page.
          </p>
        </div>

        {/* 6-Photo Grid - 6 Unique Distinct Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/sleekpolishbyish?utm_source=ig_web_button_share_sheet&bqrl=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F3E8E2] block shadow-sm border border-[#E8DFD8]"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt="Sleek Polish Instagram"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#1F1A18]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2">
                <InstagramIcon className="w-6 h-6 mb-1 text-[#C5A059]" />
                <span className="text-[11px] font-semibold">View Post</span>
                <span className="text-[10px] text-white/70 mt-1">{post.likes} likes</span>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA Button */}
        <div className="mt-12 text-center">
          <Button
            href="https://www.instagram.com/sleekpolishbyish?utm_source=ig_web_button_share_sheet&bqrl=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
