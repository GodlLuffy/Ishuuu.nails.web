import React from 'react';
import { prisma } from '@/lib/prisma';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ReelShowcase } from '@/components/home/ReelShowcase';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { BookingBanner } from '@/components/home/BookingBanner';
import { BrandStory } from '@/components/home/BrandStory';
import { TrustPillars } from '@/components/home/TrustPillars';
import { InstagramFeed } from '@/components/home/InstagramFeed';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  // Fetch featured products from database
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { isFeatured: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
  }

  // Fetch portfolio items
  let portfolioItems: any[] = [];
  try {
    portfolioItems = await prisma.portfolioItem.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
  }

  return (
    <div className="min-h-screen">
      {/* 1. Editorial Hero Banner */}
      <HeroBanner />

      {/* 2. Shop by Category Circular Strip */}
      <CategoryStrip />

      {/* 3. Featured / Best-Selling Products Grid */}
      <FeaturedProducts products={products} />

      {/* 4. Shoppable Reel / Video Showcase */}
      <ReelShowcase />

      {/* 5. Nail Art Portfolio Preview */}
      <PortfolioPreview items={portfolioItems} />

      {/* 6. Studio Appointment & Video Consultation Split Banner */}
      <BookingBanner />

      {/* 7. Brand Story ("About Sleek Polish by Ish") */}
      <BrandStory />

      {/* 8. 4-Column Luxury Trust Pillars */}
      <TrustPillars />

      {/* 9. Live Instagram Feed Strip */}
      <InstagramFeed />
    </div>
  );
}
