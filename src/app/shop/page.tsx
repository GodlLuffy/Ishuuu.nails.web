import React, { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { ShopClient } from '@/components/shop/ShopClient';

export const metadata = {
  title: 'Shop Handcrafted Press-On Nails | Sleek Polish by Ish',
  description: 'Browse luxury press-on nail sets, bridal nail art, cuticle oils, and combo kits handcrafted by Ish. Customizable shapes, lengths, and sizes.',
};

export const revalidate = 60;

export default async function ShopPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching shop products:', error);
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F6] p-12 text-center text-xs">Loading Luxury Nails...</div>}>
      <ShopClient initialProducts={products} />
    </Suspense>
  );
}
