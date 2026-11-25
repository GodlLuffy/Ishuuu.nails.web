'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Home, 
  AlertCircle, 
  Clock, 
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { formatPrice, ORDER_STATUSES, ORDER_STATUS_LABELS } from '@/lib/utils';

export function TrackOrderClient() {
  const [orderNumber, setOrderNumber] = useState('SPB-2026-1001'); // Pre-fill sample for testing
  const [email, setEmail] = useState('priya@example.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        const err = await res.json();
        setError(err.error || 'Order not found');
        setOrder(null);
      }
    } catch (err) {
      setError('Failed to connect to tracking server');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine current step index
  const getStepIndex = (status: string) => {
    const idx = ORDER_STATUSES.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Real-Time Status</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1F1A18] font-light">
            Track Your Nail Order
          </h1>
          <p className="text-xs sm:text-sm text-[#8A7F7A] mt-2 font-light">
            Follow every stage from handcrafting to quality inspection and doorstep courier delivery.
          </p>
        </div>

        {/* Tracking Search Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-lg mb-10">
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                Order Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SPB-2026-1001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] font-mono focus:border-[#C5A059] outline-none"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="text-xs font-semibold text-[#1F1A18] block mb-1.5">
                Billing Email
              </label>
              <input
                type="email"
                required
                placeholder="priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md disabled:opacity-50"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{loading ? '...' : 'Track'}</span>
              </button>
            </div>
          </form>

          {/* Quick Test Hint */}
          <div className="mt-4 pt-3 border-t border-[#FAF8F6] flex flex-wrap items-center gap-2 text-[11px] text-[#8A7F7A]">
            <span className="font-semibold text-[#1F1A18]">Sample orders for quick test:</span>
            <button
              type="button"
              onClick={() => { setOrderNumber('SPB-2026-1001'); setEmail('priya@example.com'); }}
              className="text-[#C5A059] underline hover:text-[#1F1A18]"
            >
              SPB-2026-1001 (Shipped)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => { setOrderNumber('SPB-2026-1002'); setEmail('ananya@example.com'); }}
              className="text-[#C5A059] underline hover:text-[#1F1A18]"
            >
              SPB-2026-1002 (Handcrafting)
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3 text-xs mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Order Result Card with 5-Step Visual Tracker */}
        {order && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Visual 5-Step Status Tracker */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DDD7] shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DDD7] mb-8 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                    Status Overview
                  </span>
                  <h3 className="font-serif text-2xl text-[#1F1A18] font-medium mt-0.5">
                    {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8A7F7A]">Order ID:</span>
                  <code className="text-xs bg-[#FAF8F6] border border-[#E8DDD7] px-2.5 py-1 rounded-lg font-bold text-[#1F1A18]">
                    {order.orderNumber}
                  </code>
                  <button
                    onClick={() => copyToClipboard(order.orderNumber)}
                    className="p-1 text-[#8A7F7A] hover:text-[#1F1A18]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* 5-Step Tracker Graphic */}
              <div className="relative">
                
                {/* Connecting Track Line */}
                <div className="hidden sm:block absolute top-6 left-12 right-12 h-1 bg-[#E8DDD7] -z-0">
                  <div
                    className="h-full bg-[#C5A059] transition-all duration-700"
                    style={{
                      width: `${(getStepIndex(order.orderStatus) / (ORDER_STATUSES.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* 5 Step Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                  {[
                    { key: 'PLACED', title: 'Order Placed', icon: Package },
                    { key: 'HANDCRAFTING', title: 'Handcrafting Your Set', icon: Sparkles },
                    { key: 'QUALITY_CHECK', title: 'Quality Check & Packed', icon: CheckCircle2 },
                    { key: 'SHIPPED', title: 'Shipped with Courier', icon: Truck },
                    { key: 'DELIVERED', title: 'Delivered', icon: Home },
                  ].map((step, idx) => {
                    const Icon = step.icon;
                    const currentIdx = getStepIndex(order.orderStatus);
                    const isPassed = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step.key} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            isCurrent
                              ? 'bg-[#C5A059] text-white shadow-lg ring-4 ring-[#C5A059]/30 scale-110'
                              : isPassed
                              ? 'bg-[#C5A059] text-white'
                              : 'bg-white border-2 border-[#E8DDD7] text-[#8A7F7A]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p
                            className={`text-xs font-semibold ${
                              isPassed ? 'text-[#1F1A18]' : 'text-[#8A7F7A]'
                            }`}
                          >
                            {step.title}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block mt-0.5">
                              Current Phase
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Courier Tracking Number Details */}
              {order.trackingNumber && (
                <div className="mt-10 p-4 bg-[#FAF8F6] rounded-2xl border border-[#E8DDD7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A7F7A]">
                      Express Courier Tracking Number
                    </span>
                    <p className="font-mono text-sm font-bold text-[#1F1A18] mt-0.5">
                      {order.trackingNumber}
                    </p>
                  </div>
                  {order.estimatedDelivery && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#8A7F7A]">
                        Estimated Delivery
                      </span>
                      <p className="text-xs font-bold text-[#4CAF50] mt-0.5">
                        {order.estimatedDelivery}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Items & Shipping Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Items Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD7] shadow-md space-y-4">
                <h4 className="font-serif text-lg text-[#1F1A18] font-medium pb-2 border-b border-[#E8DDD7]">
                  Items In Your Order
                </h4>
                <div className="space-y-3">
                  {(() => {
                    let items = [];
                    try {
                      items = JSON.parse(order.itemsJson);
                    } catch {}
                    return items.map((it: any, i: number) => (
                      <div key={i} className="flex justify-between items-start text-xs">
                        <div>
                          <p className="font-semibold text-[#1F1A18]">{it.name}</p>
                          <p className="text-[11px] text-[#8A7F7A]">
                            Qty: {it.quantity} {it.shape ? `• ${it.shape}` : ''} {it.length ? `• ${it.length}` : ''} {it.size ? `• Size: ${it.size}` : ''}
                          </p>
                        </div>
                        <span className="font-bold text-[#1F1A18]">
                          {formatPrice(it.price * (it.quantity || 1))}
                        </span>
                      </div>
                    ));
                  })()}
                </div>

                <div className="pt-3 border-t border-[#E8DDD7] space-y-1 text-xs">
                  <div className="flex justify-between text-[#8A7F7A]">
                    <span>Payment Method:</span>
                    <span className="font-bold text-[#1F1A18]">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1F1A18] pt-2 border-t border-[#FAF8F6]">
                    <span>Total Paid / Due:</span>
                    <span className="text-[#C5A059]">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address & Help */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD7] shadow-md flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-serif text-lg text-[#1F1A18] font-medium pb-2 border-b border-[#E8DDD7]">
                    Delivery Address
                  </h4>
                  <div className="text-xs text-[#1F1A18]/80 space-y-1 mt-3">
                    <p className="font-bold text-[#1F1A18]">{order.customerName}</p>
                    <p>{order.address}</p>
                    <p>{order.city}, {order.state} - {order.pincode}</p>
                    <p className="text-[#8A7F7A] mt-2">Phone: {order.phone}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DDD7]">
                  <a
                    href={`https://wa.me/919322118970?text=Hi%20Ish!%20I%20have%20a%20question%20regarding%20my%20order%20${order.orderNumber}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#1F1A18] hover:text-white py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Need Help? WhatsApp +91 93221 18970</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
