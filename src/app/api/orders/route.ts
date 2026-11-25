import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      promoCode,
      paymentMethod, // "PREPAID" or "COD"
      notes,
    } = body;

    if (!customerName || !email || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order fields or bag is empty' },
        { status: 400 }
      );
    }

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum: number, it: any) => sum + (it.price || 0) * (it.quantity || 1),
      0
    );

    // Validate promo discount if any
    let discount = 0;
    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({
        where: { code: promoCode.trim().toUpperCase() },
      });
      if (promo && promo.isActive && subtotal >= promo.minOrderAmount) {
        discount = Math.round((subtotal * promo.discountPercent) / 100);
      }
    }

    // Auto 5% Prepaid discount
    let prepaidDiscount = 0;
    if (paymentMethod === 'PREPAID') {
      prepaidDiscount = Math.round((subtotal - discount) * 0.05);
    }

    const total = Math.max(0, subtotal - discount - prepaidDiscount);
    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        email: email.trim().toLowerCase(),
        phone,
        address,
        city: city || '',
        state: state || '',
        pincode: pincode || '',
        itemsJson: JSON.stringify(items),
        subtotal,
        discount,
        prepaidDiscount,
        promoCode: promoCode || null,
        total,
        paymentMethod: paymentMethod || 'PREPAID',
        paymentStatus: paymentMethod === 'PREPAID' ? 'PAID' : 'PENDING',
        orderStatus: 'PLACED',
        notes: notes || null,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
