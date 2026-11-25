import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const promos = await prisma.promoCode.findMany({
      orderBy: { code: 'asc' },
    });
    return NextResponse.json(promos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { code, discountPercent, minOrderAmount, maxUses } = await req.json();

    const promo = await prisma.promoCode.create({
      data: {
        code: code.trim().toUpperCase(),
        discountPercent: Number(discountPercent) || 10,
        minOrderAmount: Number(minOrderAmount) || 0,
        maxUses: Number(maxUses) || 1000,
        isActive: true,
      },
    });

    return NextResponse.json(promo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promo code' }, { status: 500 });
  }
}
