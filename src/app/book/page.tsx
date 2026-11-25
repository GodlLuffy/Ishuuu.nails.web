import React, { Suspense } from 'react';
import { BookingClient } from '@/components/booking/BookingClient';

export const metadata = {
  title: 'Book Studio Nail Appointment & Custom Sizing Consultation | Sleek Polish by Ish',
  description: 'Book your in-studio nail session or schedule a 1-on-1 virtual nail sizing and bridal consultation with artist Ish.',
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F6] p-12 text-center text-xs">Loading Booking Portal...</div>}>
      <BookingClient />
    </Suspense>
  );
}
