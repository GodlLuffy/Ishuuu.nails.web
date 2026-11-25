import React from 'react';
import { prisma } from '@/lib/prisma';
import { AdminProductsClient } from '@/components/admin/AdminProductsClient';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <AdminProductsClient initialProducts={products} />;
}
