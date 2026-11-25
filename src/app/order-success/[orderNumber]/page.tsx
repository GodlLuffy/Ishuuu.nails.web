import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderSuccessPage({ params }: Props) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
  });

  if (!order) {
    notFound();
  }

  let items = [];
  try {
    items = JSON.parse(order.itemsJson);
  } catch {}

  return (
    <div className="min-h-screen bg-[#FAF8F6] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DDD7] shadow-2xl text-center space-y-6">
          
          {/* Success Badge */}
          <div className="w-20 h-20 rounded-full bg-[#4CAF50]/15 text-[#4CAF50] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] block mb-1">
              Thank You For Your Order!
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal">
              Order Confirmed
            </h1>
            <p className="text-xs text-[#8A7F7A] mt-2">
              We&apos;ve sent a confirmation email to <strong>{order.email}</strong>. Ish is already preparing to handcraft your custom set.
            </p>
          </div>

          {/* Order Details Summary Box */}
          <div className="bg-[#FAF8F6] rounded-2xl p-6 border border-[#E8DDD7] text-left text-xs space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-[#E8DDD7]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8A7F7A]">Order Number</span>
                <p className="font-mono text-sm font-bold text-[#1F1A18]">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#8A7F7A]">Total Amount</span>
                <p className="font-serif text-base font-bold text-[#C5A059]">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#8A7F7A] block mb-2">Ordered Items:</span>
              <div className="space-y-1.5">
                {items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-[#1F1A18]">
                    <span>{it.quantity}x {it.name} {it.shape ? `(${it.shape})` : ''}</span>
                    <span className="font-semibold">{formatPrice(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8DDD7] flex justify-between text-[#8A7F7A]">
              <span>Payment Mode: <strong>{order.paymentMethod}</strong></span>
              <span>Delivery Pincode: <strong>{order.pincode}</strong></span>
            </div>
          </div>

          {/* Next Steps Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/track?orderNumber=${order.orderNumber}&email=${encodeURIComponent(order.email)}`}
              className="w-full sm:w-auto bg-[#1F1A18] hover:bg-[#C5A059] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Truck className="w-4 h-4" />
              <span>Track Your Order</span>
            </Link>

            <a
              href={`https://wa.me/919322118970?text=Hi%20Ish!%20I%20just%20placed%20order%20${order.orderNumber}%20and%20wanted%20to%20connect.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>

            <Link
              href="/shop"
              className="w-full sm:w-auto border border-[#E8DDD7] hover:border-[#1F1A18] text-[#1F1A18] px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
