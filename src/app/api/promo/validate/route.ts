import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Please enter a promo code' }, { status: 400 });
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json(
        { valid: false, message: 'Invalid or expired promo code' },
        { status: 404 }
      );
    }

    if (subtotal < promo.minOrderAmount) {
      return NextResponse.json(
        {
          valid: false,
          message: `Minimum order amount for code ${promo.code} is ₹${promo.minOrderAmount}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: promo.code,
      discountPercent: promo.discountPercent,
      message: `Success! ${promo.discountPercent}% discount applied.`,
    });
  } catch (error) {
    console.error('Error validating promo:', error);
    return NextResponse.json({ valid: false, message: 'Validation failed' }, { status: 500 });
  }
}
