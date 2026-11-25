import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get('orderNumber')?.trim();
    const email = searchParams.get('email')?.trim().toLowerCase();

    if (!orderNumber || !email) {
      return NextResponse.json(
        { error: 'Order Number and Billing Email are required' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        orderNumber: {
          equals: orderNumber,
        },
        email: {
          equals: email,
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'No matching order found with provided Order ID and Email' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { error: 'Failed to look up order' },
      { status: 500 }
    );
  }
}
