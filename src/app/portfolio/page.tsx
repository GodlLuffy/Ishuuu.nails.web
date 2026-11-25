import React from 'react';
import { prisma } from '@/lib/prisma';
import { PortfolioClient } from '@/components/portfolio/PortfolioClient';

export const metadata = {
  title: 'Nail Art Portfolio & Lookbook | Sleek Polish by Ish',
  description: 'Explore signature press-on and gel nail designs handcrafted by Ish (@sleekpolishbyish). Bridal nails, glazed chrome, 3D charms, and French manicures.',
};

export const revalidate = 60;

export default async function PortfolioPage() {
  let items: any[] = [];
  try {
    items = await prisma.portfolioItem.findMany({
      include: {
        linkedProduct: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
  }

  return <PortfolioClient items={items} />;
}
