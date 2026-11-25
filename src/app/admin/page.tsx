import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import { 
  TrendingUp, 
  ShoppingCart, 
  Calendar, 
  Package, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const revalidate = 0; // Dynamic

export default async function AdminDashboardPage() {
  // Fetch overview KPI numbers
  const [orders, bookings, products] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.product.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrders = orders.filter((o) => o.orderStatus !== 'DELIVERED').length;
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING').length;
  const totalProducts = products.length;

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DDD7]">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
            Welcome Back, Ish
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal mt-0.5">
            Admin Overview & Insights
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* 4 Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8DDD7] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8A7F7A]">Total Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1F1A18]">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-[11px] text-[#4CAF50] font-medium mt-1">
            Across {orders.length} orders
          </p>
        </div>

        {/* KPI 2: Active Orders */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8DDD7] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8A7F7A]">Active Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-[#1F1A18]/10 text-[#1F1A18] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1F1A18]">
            {activeOrders}
          </p>
          <p className="text-[11px] text-[#C5A059] font-medium mt-1">
            Handcrafting & In-Transit
          </p>
        </div>

        {/* KPI 3: Pending Bookings */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8DDD7] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8A7F7A]">Pending Bookings</span>
            <div className="w-10 h-10 rounded-2xl bg-[#4CAF50]/15 text-[#4CAF50] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1F1A18]">
            {pendingBookings}
          </p>
          <p className="text-[11px] text-[#8A7F7A] font-medium mt-1">
            Studio sessions & video calls
          </p>
        </div>

        {/* KPI 4: Total Products */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8DDD7] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8A7F7A]">Catalog Products</span>
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8E2] text-[#C5A059] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#1F1A18]">
            {totalProducts}
          </p>
          <p className="text-[11px] text-[#8A7F7A] font-medium mt-1">
            Live handcrafted sets
          </p>
        </div>

      </div>

      {/* Recent Orders & Recent Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD7]">
            <h3 className="font-serif text-xl text-[#1F1A18] font-medium">Recent Customer Orders</h3>
            <Link href="/admin/orders" className="text-xs text-[#C5A059] font-bold hover:underline flex items-center gap-1">
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[#8A7F7A] border-b border-[#FAF8F6]">
                <tr>
                  <th className="pb-3 font-semibold">Order #</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF8F6]">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F6]">
                    <td className="py-3 font-mono font-bold text-[#1F1A18]">
                      <Link href="/admin/orders" className="hover:text-[#C5A059]">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3">
                      <p className="font-medium text-[#1F1A18]">{order.customerName}</p>
                      <p className="text-[10px] text-[#8A7F7A]">{order.city || 'India'}</p>
                    </td>
                    <td className="py-3 font-bold text-[#1F1A18]">{formatPrice(order.total)}</td>
                    <td className="py-3">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059]">
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Recent Bookings */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD7]">
            <h3 className="font-serif text-xl text-[#1F1A18] font-medium">Recent Booking Requests</h3>
            <Link href="/admin/bookings" className="text-xs text-[#C5A059] font-bold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 4).map((b) => (
              <div key={b.id} className="p-3.5 bg-[#FAF8F6] rounded-2xl border border-[#E8DDD7] text-xs space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[#1F1A18]">{b.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#C5A059] border border-[#E8DDD7]">
                    {b.bookingType}
                  </span>
                </div>
                <p className="text-[#8A7F7A] text-[11px]">{b.service || 'Nail Art Consultation'}</p>
                {b.preferredDate && (
                  <p className="text-[10px] text-[#1F1A18]">
                    Date: <strong>{b.preferredDate}</strong> at {b.preferredTime}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
