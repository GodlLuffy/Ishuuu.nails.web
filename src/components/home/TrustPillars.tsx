import React from 'react';
import { Award, Truck, MessageCircle, Ruler } from 'lucide-react';

const PILLARS = [
  {
    icon: Award,
    title: 'Handcrafted Salon Gel',
    description: 'Every nail is individually painted with multi-layer gel for genuine salon gloss and strength.',
  },
  {
    icon: Truck,
    title: 'Fast Pan-India Delivery',
    description: 'Trackable express shipping to your doorstep, plus worldwide delivery options.',
  },
  {
    icon: Ruler,
    title: 'Custom Sizing Guarantee',
    description: 'Order standard XS-L or enter your exact millimeter thumb-to-pinky measurements.',
  },
  {
    icon: MessageCircle,
    title: 'Direct WhatsApp Support',
    description: 'Chat 1-on-1 with Ish (+91 93221 18970) for styling, sizing advice, and custom sets.',
  },
];

export function TrustPillars() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FAF8F6] border border-[#E8DFD8] hover:border-[#C5A059]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg text-[#1F1A18] font-medium mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#8A7F7A] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
