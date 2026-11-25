'use client';

import React from 'react';
import { X, Ruler, Check, Info } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1F1A18]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F6] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8DDD7] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8A7F7A] hover:text-[#1F1A18] p-1.5 rounded-full hover:bg-[#F3E8E2] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-[#C5A059] mb-1">
          <Ruler className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Sizing Mastery</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1A18] font-medium mb-3">
          How to Measure Your Nails
        </h3>
        <p className="text-xs text-[#8A7F7A] leading-relaxed mb-6 font-light">
          Follow these 3 easy steps using a piece of tape and a ruler to find your perfect fit, or select &ldquo;Custom&rdquo; to input millimeter measurements.
        </p>

        {/* 3-Step Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-[#E8DDD7]">
            <div className="w-7 h-7 rounded-full bg-[#C5A059]/20 text-[#C5A059] font-bold text-xs flex items-center justify-center mb-2">
              1
            </div>
            <h4 className="font-serif text-sm text-[#1F1A18] font-medium mb-1">Place Tape</h4>
            <p className="text-[11px] text-[#8A7F7A] leading-relaxed">
              Place a piece of clear scotch tape across the widest curve of your natural nail bed.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E8DDD7]">
            <div className="w-7 h-7 rounded-full bg-[#C5A059]/20 text-[#C5A059] font-bold text-xs flex items-center justify-center mb-2">
              2
            </div>
            <h4 className="font-serif text-sm text-[#1F1A18] font-medium mb-1">Mark Edges</h4>
            <p className="text-[11px] text-[#8A7F7A] leading-relaxed">
              Use a fine pen to mark both sides where the nail meets the skin on the widest part.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E8DDD7]">
            <div className="w-7 h-7 rounded-full bg-[#C5A059]/20 text-[#C5A059] font-bold text-xs flex items-center justify-center mb-2">
              3
            </div>
            <h4 className="font-serif text-sm text-[#1F1A18] font-medium mb-1">Measure with Ruler</h4>
            <p className="text-[11px] text-[#8A7F7A] leading-relaxed">
              Remove the tape and place it against a millimeter (mm) ruler to note your finger widths.
            </p>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="bg-white rounded-2xl border border-[#E8DDD7] overflow-hidden mb-6">
          <div className="p-3.5 bg-[#F3E8E2] border-b border-[#E8DDD7] flex items-center justify-between">
            <span className="font-serif text-xs font-semibold uppercase tracking-wider text-[#1F1A18]">
              Standard Nail Size Guide (Thumb → Pinky in mm)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F6] text-[#8A7F7A] border-b border-[#E8DDD7]">
                <tr>
                  <th className="p-3 font-semibold">Size</th>
                  <th className="p-3 font-semibold">Thumb</th>
                  <th className="p-3 font-semibold">Index</th>
                  <th className="p-3 font-semibold">Middle</th>
                  <th className="p-3 font-semibold">Ring</th>
                  <th className="p-3 font-semibold">Pinky</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD7] text-[#1F1A18]">
                <tr>
                  <td className="p-3 font-bold text-[#C5A059]">XS (Petite)</td>
                  <td className="p-3">14mm</td>
                  <td className="p-3">11mm</td>
                  <td className="p-3">12mm</td>
                  <td className="p-3">10mm</td>
                  <td className="p-3">8mm</td>
                </tr>
                <tr className="bg-[#FAF8F6]/50">
                  <td className="p-3 font-bold text-[#C5A059]">S (Small)</td>
                  <td className="p-3">15mm</td>
                  <td className="p-3">12mm</td>
                  <td className="p-3">13mm</td>
                  <td className="p-3">11mm</td>
                  <td className="p-3">8.5mm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#C5A059]">M (Standard)</td>
                  <td className="p-3">16mm</td>
                  <td className="p-3">13mm</td>
                  <td className="p-3">14mm</td>
                  <td className="p-3">12mm</td>
                  <td className="p-3">9mm</td>
                </tr>
                <tr className="bg-[#FAF8F6]/50">
                  <td className="p-3 font-bold text-[#C5A059]">L (Wide)</td>
                  <td className="p-3">18mm</td>
                  <td className="p-3">14mm</td>
                  <td className="p-3">15mm</td>
                  <td className="p-3">13mm</td>
                  <td className="p-3">10mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="flex items-start gap-3 p-3.5 bg-[#C5A059]/10 rounded-2xl text-xs text-[#1F1A18]">
          <Info className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
          <p className="font-light">
            <strong>In-Between Sizes?</strong> We recommend sizing up! You can always gently file the sides of a slightly larger press-on nail with the mini buffer included in your box.
          </p>
        </div>

        {/* Got It Button */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors"
          >
            Got It, Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
