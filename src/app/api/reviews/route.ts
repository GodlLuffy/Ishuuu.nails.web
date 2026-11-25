import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { productId, userName, rating, comment } = await req.json();

    if (!productId || !userName || !rating) {
      return NextResponse.json(
        { error: 'Product ID, user name, and rating are required' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userName,
        rating: Number(rating),
        comment: comment || null,
      },
    });

    // Recalculate average rating for product
    const allReviews = await prisma.review.findMany({
      where: { productId },
    });

    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        ratingCount: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
