import React from 'react';
import { Calendar, Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BookingBanner() {
  return (
    <section className="py-20 bg-[#1F1A18] text-white relative overflow-hidden">
      {/* Subtle Gold Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Studio Nail Appointment */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 hover:border-[#C5A059]/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059] block mb-2">
                In-Studio Experience
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Book a Studio Nail Appointment
              </h3>
              <p className="text-sm text-white/75 font-light leading-relaxed mb-8">
                Get pampered with gel extensions, bespoke bridal nail art, refills, or acrylic overlays crafted directly in our private nail studio.
              </p>
            </div>

            <div>
              <Button href="/book?type=studio" variant="light">
                <span>Select Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Card 2: Online Video Consultation & Custom Press-On Sizing */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 hover:border-[#C5A059]/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
                <Video className="w-6 h-6" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059] block mb-2">
                Virtual Consultation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Custom Bridal & Sizing Video Call
              </h3>
              <p className="text-sm text-white/75 font-light leading-relaxed mb-8">
                Planning your wedding, shoot, or custom set? Schedule a 1-on-1 video consultation with Ish to measure sizing and customize your dream nails.
              </p>
            </div>

            <div>
              <Button href="/book?type=consultation" variant="light">
                <span>Book Online Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
