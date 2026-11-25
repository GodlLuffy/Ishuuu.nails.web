import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      description,
      category,
      price,
      originalPrice,
      images,
      shapes,
      lengths,
      finish,
      stock,
      isNewLaunch,
      isFeatured,
    } = body;

    const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product = await prisma.product.create({
      data: {
        name,
        slug: productSlug,
        description: description || '',
        category: category || 'Press-On Nail Sets',
        price: Number(price) || 999,
        originalPrice: Number(originalPrice) || Number(price) || 1499,
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        shapes: typeof shapes === 'string' ? shapes : JSON.stringify(shapes || ['Almond', 'Coffin']),
        lengths: typeof lengths === 'string' ? lengths : JSON.stringify(lengths || ['Medium', 'Long']),
        finish: finish || 'Glossy',
        stock: Number(stock) || 50,
        isNewLaunch: Boolean(isNewLaunch),
        isFeatured: Boolean(isFeatured),
        rating: 5.0,
        ratingCount: 1,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
