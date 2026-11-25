import React from 'react';
import { prisma } from '@/lib/prisma';
import { AdminPromosClient } from '@/components/admin/AdminPromosClient';

export const revalidate = 0;

export default async function AdminPromosPage() {
  const promos = await prisma.promoCode.findMany({
    orderBy: { code: 'asc' },
  });

  return <AdminPromosClient initialPromos={promos} />;
}
