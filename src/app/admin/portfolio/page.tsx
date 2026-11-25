import React from 'react';
import { prisma } from '@/lib/prisma';
import { AdminPortfolioClient } from '@/components/admin/AdminPortfolioClient';

export const revalidate = 0;

export default async function AdminPortfolioPage() {
  const [items, products] = await Promise.all([
    prisma.portfolioItem.findMany({
      include: { linkedProduct: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  return <AdminPortfolioClient initialItems={items} products={products} />;
}
