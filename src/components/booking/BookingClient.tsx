'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar, 
  Video, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Upload, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SERVICES, getWhatsAppLink } from '@/lib/utils';

export function BookingClient() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'consultation' ? 'CONSULTATION' : 'STUDIO';
  const initialDesign = searchParams.get('design') || '';

  const [bookingType, setBookingType] = useState<'STUDIO' | 'CONSULTATION'>(initialType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICES[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [notes, setNotes] = useState(initialDesign ? `Inquiring about design: ${initialDesign}` : '');
  const [referenceImageUrl, setReferenceImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    confirmationId: string;
    bookingType: string;
    name: string;
    service?: string;
    preferredDate?: string;
    preferredTime?: string;
    notes?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingType,
          name,
          email,
          phone,
          service: bookingType === 'STUDIO' ? service : 'Virtual Sizing / Bridal Consult',
          preferredDate,
          preferredTime,
          notes,
          referenceImageUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setConfirmedBooking(data);
      } else {
        alert('Could not submit booking. Please check details or message us on WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Studio & Online Consults</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1F1A18] font-light">
            Book With Ish
          </h1>
          <p className="text-xs sm:text-sm text-[#8A7F7A] mt-2 font-light leading-relaxed">
            Reserve your chair session for bespoke gel extensions or schedule a 1-on-1 video call to measure sizing for your custom press-on order.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation State with WhatsApp confirmation button */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DDD7] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#4CAF50]/15 text-[#4CAF50] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
                Booking Request Received
              </span>
              <h2 className="font-serif text-3xl text-[#1F1A18] font-medium mt-1">
                Thank You, {confirmedBooking.name}!
              </h2>
              <p className="text-sm text-[#8A7F7A] mt-1 font-light">
                Booking ID: <strong className="text-[#1F1A18] font-mono">{confirmedBooking.confirmationId}</strong>
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="p-5 bg-[#FAF8F6] rounded-2xl border border-[#E8DDD7] max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8A7F7A]">Type:</span>
                <span className="font-bold text-[#1F1A18]">
                  {confirmedBooking.bookingType === 'STUDIO' ? 'In-Studio Appointment' : 'Virtual Video Consultation'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7F7A]">Service / Purpose:</span>
                <span className="font-semibold text-[#1F1A18]">{confirmedBooking.service}</span>
              </div>
              {confirmedBooking.preferredDate && (
                <div className="flex justify-between">
                  <span className="text-[#8A7F7A]">Date & Time:</span>
                  <span className="font-semibold text-[#1F1A18]">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="max-w-md mx-auto space-y-3 pt-2">
              <a
                href={getWhatsAppLink(
                  `Hi Ish! I just booked a ${confirmedBooking.bookingType === 'STUDIO' ? 'Studio Appointment' : 'Video Consultation'}.\nBooking ID: ${confirmedBooking.confirmationId}\nName: ${confirmedBooking.name}\nDate: ${confirmedBooking.preferredDate || 'N/A'}\nTime: ${confirmedBooking.preferredTime || 'N/A'}\nNotes: ${confirmedBooking.notes || 'None'}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly On WhatsApp</span>
              </a>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="text-xs text-[#8A7F7A] hover:underline"
              >
                Book Another Session
              </button>
            </div>
          </div>
        ) : (
          /* Form Container */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DDD7] shadow-xl">
            
            {/* Tab Selection */}
            <div className="grid grid-cols-2 p-1.5 bg-[#FAF8F6] rounded-2xl mb-8 border border-[#E8DDD7]">
              <button
                type="button"
                onClick={() => setBookingType('STUDIO')}
                className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  bookingType === 'STUDIO'
                    ? 'bg-[#1F1A18] text-white shadow-md'
                    : 'text-[#8A7F7A] hover:text-[#1F1A18]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>1. Studio Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('CONSULTATION')}
                className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  bookingType === 'CONSULTATION'
                    ? 'bg-[#1F1A18] text-white shadow-md'
                    : 'text-[#8A7F7A] hover:text-[#1F1A18]'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>2. Online Video Consult</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Common Details: Name, Email, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                </div>
              </div>

              {/* Studio-Specific Fields */}
              {bookingType === 'STUDIO' && (
                <div className="space-y-4 pt-4 border-t border-[#E8DDD7]">
                  <h4 className="font-serif text-base text-[#1F1A18] font-medium">
                    Studio Service Selection
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                        Service Required *
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                        Time Slot *
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                      >
                        <option value="11:00 AM">11:00 AM (Morning)</option>
                        <option value="01:30 PM">01:30 PM (Afternoon)</option>
                        <option value="04:00 PM">04:00 PM (Evening)</option>
                        <option value="06:30 PM">06:30 PM (Late Slot)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Consultation-Specific Fields */}
              {bookingType === 'CONSULTATION' && (
                <div className="space-y-4 pt-4 border-t border-[#E8DDD7]">
                  <h4 className="font-serif text-base text-[#1F1A18] font-medium">
                    Virtual Sizing & Design Consultation Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                        Preferred Date For Video Call
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                      >
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="05:30 PM">05:30 PM</option>
                        <option value="07:30 PM">07:30 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Reference Image Link & Notes */}
              <div className="space-y-4 pt-4 border-t border-[#E8DDD7]">
                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                    Reference Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="Paste Pinterest, Instagram, or Google Drive link"
                    value={referenceImageUrl}
                    onChange={(e) => setReferenceImageUrl(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                  <p className="text-[10px] text-[#8A7F7A] mt-1">
                    Or you can directly send your photo on WhatsApp once the booking is created.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                    Special Requests, Nails Details & Occasion Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your wedding date, outfit colors, favorite nail shape, or any allergy concerns..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl p-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-4 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>{loading ? 'Confirming Your Slot...' : 'Submit Booking Request'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
