import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateConfirmationId } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookingType,
      name,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      notes,
      referenceImageUrl,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    const confirmationId = generateConfirmationId();

    const booking = await prisma.booking.create({
      data: {
        bookingType: bookingType || 'STUDIO',
        name,
        email,
        phone,
        service: service || 'Nail Art',
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        notes: notes || null,
        referenceImageUrl: referenceImageUrl || null,
        status: 'PENDING',
        confirmationId,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
