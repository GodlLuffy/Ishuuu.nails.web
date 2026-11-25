import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.portfolioItem.findMany({
      include: { linkedProduct: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, imageUrl, category, shape, length, description, linkedProductId } = body;

    const item = await prisma.portfolioItem.create({
      data: {
        title,
        imageUrl,
        category: category || 'Bridal',
        shape: shape || 'Almond',
        length: length || 'Long',
        description: description || null,
        linkedProductId: linkedProductId || null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
  }
}
