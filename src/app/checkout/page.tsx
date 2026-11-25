'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { 
  ShoppingBag, 
  CreditCard, 
  Banknote, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Tag, 
  ArrowRight,
  AlertCircle,
  X,
  Info
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');

  // Payment & Promo
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'COD'>('PREPAID');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [demoOrderPopup, setDemoOrderPopup] = useState<{
    orderNumber: string;
    customerName: string;
    total: number;
    items: typeof items;
    isSavedInDb: boolean;
  } | null>(null);

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const promoDiscount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const prepaidDiscount = paymentMethod === 'PREPAID' ? Math.round((subtotal - promoDiscount) * 0.05) : 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount - prepaidDiscount);

  // Promo Code Validation
  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setPromoError(null);

    try {
      const res = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput.trim(), subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedPromo({ code: data.code, discountPercent: data.discountPercent });
        setPromoError(null);
      } else {
        setPromoError(data.message || 'Invalid promo code');
        setAppliedPromo(null);
      }
    } catch {
      setPromoError('Failed to validate code');
    } finally {
      setPromoLoading(false);
    }
  };

  // Place Order
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const snapshotItems = [...items];
      const snapshotTotal = finalTotal;
      const snapshotName = customerName;

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          address,
          city,
          state,
          pincode,
          items,
          promoCode: appliedPromo?.code || null,
          paymentMethod,
          notes,
        }),
      });

      if (res.ok) {
        const order = await res.json();
        setDemoOrderPopup({
          orderNumber: order.orderNumber,
          customerName: snapshotName,
          total: snapshotTotal,
          items: snapshotItems,
          isSavedInDb: true,
        });
        clearCart();
      } else {
        // Fallback for read-only demo deployments (e.g., Vercel SQLite)
        const demoNumber = `SPB-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
        setDemoOrderPopup({
          orderNumber: demoNumber,
          customerName: snapshotName,
          total: snapshotTotal,
          items: snapshotItems,
          isSavedInDb: false,
        });
        clearCart();
      }
    } catch {
      const demoNumber = `SPB-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
      setDemoOrderPopup({
        orderNumber: demoNumber,
        customerName,
        total: finalTotal,
        items: [...items],
        isSavedInDb: false,
      });
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !demoOrderPopup) {
    return (
      <div className="min-h-screen bg-[#FAF8F6] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F3E8E2] text-[#C5A059] flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl text-[#1F1A18] mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-[#8A7F7A] max-w-sm mb-6">
          You need at least one handcrafted set in your bag before proceeding to luxury checkout.
        </p>
        <Link
          href="/shop"
          className="bg-[#1F1A18] hover:bg-[#C5A059] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
        >
          Explore Nails
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F6] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059] block mb-1">
            Secure Luxury Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-light">
            Complete Your Nail Order
          </h1>
        </div>

        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3 text-xs mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{submitError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Card 1: Contact Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-[#1F1A18] font-medium pb-2 border-b border-[#E8DDD7]">
                  1. Contact Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Roy"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                  <p className="text-[10px] text-[#8A7F7A] mt-1">
                    Used for shipping updates & custom nail sizing verification.
                  </p>
                </div>
              </div>

              {/* Card 2: Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-[#1F1A18] font-medium pb-2 border-b border-[#E8DDD7]">
                  2. Shipping Address (Pan-India & Worldwide)
                </h3>

                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Full Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No, Apartment, Landmark, Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharashtra"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 400001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Order Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Gift for bride, deliver before Friday"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                  />
                </div>
              </div>

              {/* Card 3: Payment Method Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-[#1F1A18] font-medium pb-2 border-b border-[#E8DDD7]">
                  3. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Prepaid Option (UPI, Cards, Netbanking) */}
                  <div
                    onClick={() => setPaymentMethod('PREPAID')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'PREPAID'
                        ? 'border-[#C5A059] bg-[#C5A059]/5 shadow-sm'
                        : 'border-[#E8DDD7] bg-[#FAF8F6]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#C5A059]" />
                        <span className="font-bold text-xs text-[#1F1A18]">Prepaid (UPI / Card)</span>
                      </div>
                      <span className="text-[10px] bg-[#4CAF50] text-white font-bold px-2 py-0.5 rounded-full">
                        Extra 5% OFF
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A7F7A] leading-relaxed">
                      Instant auto-discount applied. Supports Google Pay, PhonePe, Paytm, UPI, & Debit/Credit Cards.
                    </p>
                  </div>

                  {/* Cash On Delivery Option */}
                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#1F1A18] bg-[#FAF8F6] shadow-sm'
                        : 'border-[#E8DDD7] bg-[#FAF8F6]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-[#1F1A18]" />
                        <span className="font-bold text-xs text-[#1F1A18]">Cash on Delivery</span>
                      </div>
                      <span className="text-[10px] bg-[#8A7F7A]/20 text-[#1F1A18] font-semibold px-2 py-0.5 rounded-full">
                        Standard
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A7F7A] leading-relaxed">
                      Pay cash upon delivery. Note: Custom size sets require quick WhatsApp confirmation.
                    </p>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary & Promo Code */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-xl space-y-6 sticky top-28">
              
              <h3 className="font-serif text-xl text-[#1F1A18] font-medium pb-3 border-b border-[#E8DDD7]">
                Order Summary ({items.length} Set{items.length > 1 ? 's' : ''})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="w-14 h-14 rounded-lg bg-[#F3E8E2] overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#1F1A18] line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-[#8A7F7A]">
                        Qty: {item.quantity} {item.shape ? `• ${item.shape}` : ''} {item.size ? `• ${item.size}` : ''}
                      </p>
                      <p className="font-bold text-[#1F1A18] mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-[#E8DDD7]">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter SLEEK10 or Promo Code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] uppercase tracking-wider focus:border-[#C5A059] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={promoLoading}
                    className="bg-[#1F1A18] hover:bg-[#C5A059] text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {promoLoading ? '...' : 'Apply'}
                  </button>
                </form>

                {appliedPromo && (
                  <p className="text-[11px] text-[#4CAF50] font-semibold mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Code {appliedPromo.code} applied (-{appliedPromo.discountPercent}%)
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 font-medium mt-2">
                    {promoError}
                  </p>
                )}
              </div>

              {/* Calculations Breakdown */}
              <div className="space-y-2 pt-4 border-t border-[#E8DDD7] text-xs">
                <div className="flex justify-between text-[#8A7F7A]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1F1A18]">{formatPrice(subtotal)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#4CAF50]">
                    <span>Promo Discount ({appliedPromo?.code})</span>
                    <span>- {formatPrice(promoDiscount)}</span>
                  </div>
                )}

                {prepaidDiscount > 0 && (
                  <div className="flex justify-between text-[#C5A059]">
                    <span>Prepaid Discount (5% OFF)</span>
                    <span>- {formatPrice(prepaidDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#8A7F7A]">
                  <span>Express Shipping</span>
                  <span className="text-[#4CAF50] font-semibold">FREE</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#1F1A18] pt-3 border-t border-[#E8DDD7]">
                  <span>Grand Total</span>
                  <span className="font-serif text-xl text-[#C5A059]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-4 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xl disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>{submitting ? 'Placing Order...' : `Place Order • ${formatPrice(finalTotal)}`}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8A7F7A] text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Handcrafted with salon-grade gel • Guaranteed custom fit</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Demo Mode Order Pop-Up Modal */}
      {demoOrderPopup && (
        <div className="fixed inset-0 z-50 bg-[#1F1A18]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setDemoOrderPopup(null);
                router.push('/shop');
              }}
              className="absolute top-5 right-5 text-[#8A7F7A] hover:text-[#1F1A18] p-1 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mx-auto">
                <Info className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 bg-[#1F1A18] text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>Demo Mode Notice</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1F1A18] font-normal">
                  Website Is Currently in Demo Mode
                </h2>
                <p className="text-xs sm:text-sm text-[#8A7F7A] mt-2 leading-relaxed">
                  Thank you, <strong>{demoOrderPopup.customerName || 'Gorgeous'}</strong>! This website is currently running in <strong>Demo / Preview Mode</strong>, so your order (<strong>{demoOrderPopup.orderNumber}</strong>) is a demo preview and no payment or live shipment has been processed.
                </p>
              </div>

              {/* Order Preview Box */}
              <div className="bg-[#FAF8F6] rounded-2xl p-4 border border-[#E8DDD7] text-left text-xs space-y-2">
                <div className="flex justify-between font-semibold text-[#1F1A18] pb-2 border-b border-[#E8DDD7]">
                  <span>Preview Ref: {demoOrderPopup.orderNumber}</span>
                  <span className="text-[#C5A059]">{formatPrice(demoOrderPopup.total)}</span>
                </div>
                <div className="space-y-1 max-h-28 overflow-y-auto text-[#8A7F7A]">
                  {demoOrderPopup.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="truncate pr-2">
                        {it.quantity}x {it.name} ({it.shape}, {it.size})
                      </span>
                      <span className="font-medium text-[#1F1A18] flex-shrink-0">
                        {formatPrice(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-[#8A7F7A]">
                Want to place a real custom order with Ish? Tap below to send your selected sets directly on WhatsApp!
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={`https://wa.me/919322118970?text=${encodeURIComponent(
                    `Hi Ish! I tried ordering on your website (${demoOrderPopup.orderNumber}):\n` +
                      demoOrderPopup.items
                        .map((it) => `- ${it.quantity}x ${it.name} (${it.shape}, ${it.length}, Size ${it.size})`)
                        .join('\n') +
                      `\nTotal: ${formatPrice(demoOrderPopup.total)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>

                {demoOrderPopup.isSavedInDb ? (
                  <button
                    onClick={() => router.push(`/order-success/${demoOrderPopup.orderNumber}`)}
                    className="flex-1 bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    View Demo Receipt
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setDemoOrderPopup(null);
                      router.push('/shop');
                    }}
                    className="flex-1 border border-[#1F1A18] text-[#1F1A18] hover:bg-[#1F1A18] hover:text-white py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
