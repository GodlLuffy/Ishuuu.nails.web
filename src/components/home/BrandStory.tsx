import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BrandStory() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-[#F3E8E2]/50 border-b border-[#E8DFD8] overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Visual Collage with Founder Photo */}
          <div className="relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/products/nails7.1.jpg"
                  alt="Sleek Polish handcrafted salon nail artistry by Ish"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quote Badge */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-[#E8DFD8] max-w-xs mx-auto sm:mx-0">
                <p className="font-serif italic text-xs text-[#1F1A18] leading-relaxed">
                  &ldquo;Press-on nails shouldn&apos;t look like plastic. They should feel like salon couture sculpted specifically for your hands.&rdquo;
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mt-2">
                  — Ish (@sleekpolishbyish)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder & Brand Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Story Behind Sleek Polish</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1F1A18] font-normal leading-tight">
              Salon Artistry Without The 3-Hour Chair Time.
            </h2>

            <div className="space-y-4 text-sm text-[#1F1A18]/80 font-light leading-relaxed">
              <p>
                Founded by professional nail artist <strong>Ish (@sleekpolishbyish)</strong>, Sleek Polish was born out of a desire to provide women with effortless, reusable, salon-quality manicures that protect the natural nail while looking undeniably luxurious.
              </p>
              <p>
                Unlike mass-produced plastic press-ons, each Sleek Polish set is hand-crafted with multiple layers of salon-grade builder gel, hand-painted micro art, and chip-resistant top coats. Whether you choose our viral glazed chrome, classic minimalist French, or custom bridal sets, you receive wearable art built to last weeks.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Salon-Grade Multi-Layer Gel',
                'Reusable Up to 3x with Proper Care',
                'Custom Sizing Tailored in Millimeters',
                'Zero Damage to Natural Nails'
              ].map((point) => (
                <div key={point} className="flex items-center gap-2 text-xs font-medium text-[#1F1A18]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Aligned Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/shop" variant="primary">
                <span>Discover The Collection</span>
              </Button>
              <Button href="/book" variant="secondary">
                <span>Book Consultation</span>
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
