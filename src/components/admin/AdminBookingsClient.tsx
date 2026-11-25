'use client';

import React, { useState } from 'react';
import { Calendar, Video, CheckCircle2, XCircle, Clock, MessageCircle, Phone, Mail } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export function AdminBookingsClient({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setBookings(bookings.map((b) => (b.id === id ? updated : b)));
      }
    } catch {
      alert('Failed to update booking status');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DDD7] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">Schedule</span>
          <h1 className="font-serif text-3xl text-[#1F1A18] font-normal mt-0.5">
            Bookings & Consultations ({bookings.length})
          </h1>
        </div>
      </div>

      {/* Bookings Table / Cards */}
      <div className="space-y-4">
        {bookings.map((b) => {
          const isStudio = b.bookingType === 'STUDIO';

          return (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-[#E8DDD7] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isStudio ? 'bg-[#C5A059]/15 text-[#C5A059]' : 'bg-[#1F1A18]/10 text-[#1F1A18]'
                  }`}
                >
                  {isStudio ? <Calendar className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-semibold text-[#1F1A18]">{b.name}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#FAF8F6] text-[#C5A059] border border-[#E8DDD7]">
                      {b.confirmationId}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#1F1A18] text-white">
                      {isStudio ? 'Studio Session' : 'Virtual Call'}
                    </span>
                  </div>

                  <p className="text-xs text-[#1F1A18] font-medium mt-1">
                    Service: <span className="text-[#C5A059]">{b.service || 'Nail Art Consultation'}</span>
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-[#8A7F7A] mt-2">
                    {b.preferredDate && (
                      <span className="flex items-center gap-1 text-[#1F1A18] font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        {b.preferredDate} at {b.preferredTime}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {b.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {b.email}
                    </span>
                  </div>

                  {b.notes && (
                    <p className="text-xs text-[#1F1A18]/70 mt-2 bg-[#FAF8F6] p-2.5 rounded-xl border border-[#E8DDD7]">
                      <strong>Client Note:</strong> {b.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Update & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                  className={`text-xs font-bold uppercase rounded-xl px-4 py-2.5 border outline-none ${
                    b.status === 'COMPLETED'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : b.status === 'CONFIRMED'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30'
                  }`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>

                <a
                  href={getWhatsAppLink(
                    `Hi ${b.name}! This is Ish from Sleek Polish regarding your ${isStudio ? 'Studio Appointment' : 'Video Consultation'} (${b.confirmationId}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-2.5 rounded-xl flex items-center justify-center transition-colors"
                  aria-label="Message Client on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
