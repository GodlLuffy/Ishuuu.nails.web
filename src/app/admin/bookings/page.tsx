import React from 'react';
import { prisma } from '@/lib/prisma';
import { AdminBookingsClient } from '@/components/admin/AdminBookingsClient';

export const revalidate = 0;

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <AdminBookingsClient initialBookings={bookings} />;
}
