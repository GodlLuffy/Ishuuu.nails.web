import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Props {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { orderStatus, trackingNumber, estimatedDelivery, paymentStatus } = body;

    const updated = await prisma.order.update({
      where: { id },
      data: {
        orderStatus: orderStatus || undefined,
        trackingNumber: trackingNumber !== undefined ? trackingNumber : undefined,
        estimatedDelivery: estimatedDelivery !== undefined ? estimatedDelivery : undefined,
        paymentStatus: paymentStatus || undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
