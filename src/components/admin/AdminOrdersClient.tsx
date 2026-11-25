'use client';

import React, { useState } from 'react';
import { formatPrice, ORDER_STATUSES, ORDER_STATUS_LABELS } from '@/lib/utils';
import { ShoppingCart, Truck, ChevronDown, ChevronUp, Save, CheckCircle2, MessageCircle } from 'lucide-react';

export function AdminOrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Status & Tracking update states for an order
  const [editStatus, setEditStatus] = useState<Record<string, string>>({});
  const [editTracking, setEditTracking] = useState<Record<string, string>>({});
  const [editDelivery, setEditDelivery] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleUpdate = async (id: string) => {
    setUpdatingId(id);
    const order = orders.find((o) => o.id === id);
    const newStatus = editStatus[id] || order.orderStatus;
    const newTracking = editTracking[id] !== undefined ? editTracking[id] : (order.trackingNumber || '');
    const newDelivery = editDelivery[id] !== undefined ? editDelivery[id] : (order.estimatedDelivery || '');

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderStatus: newStatus,
          trackingNumber: newTracking,
          estimatedDelivery: newDelivery,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders(orders.map((o) => (o.id === id ? updated : o)));
        alert('Order updated successfully!');
      }
    } catch {
      alert('Failed to update order');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DDD7] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">Fulfillment</span>
          <h1 className="font-serif text-3xl text-[#1F1A18] font-normal mt-0.5">
            Customer Orders ({orders.length})
          </h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedId === order.id;
          let items: any[] = [];
          try {
            items = JSON.parse(order.itemsJson);
          } catch {}

          const currentStatus = editStatus[order.id] || order.orderStatus;
          const currentTracking = editTracking[order.id] !== undefined ? editTracking[order.id] : (order.trackingNumber || '');
          const currentDelivery = editDelivery[order.id] !== undefined ? editDelivery[order.id] : (order.estimatedDelivery || '');

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-[#E8DDD7] shadow-sm overflow-hidden"
            >
              {/* Primary Row Summary */}
              <div
                onClick={() => toggleExpand(order.id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F6] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#1F1A18]">{order.orderNumber}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#1F1A18] text-white">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A7F7A] mt-0.5">
                      {order.customerName} • {order.phone} • {order.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="font-serif text-base font-bold text-[#1F1A18]">
                      {formatPrice(order.total)}
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-[#C5A059]">
                      {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus}
                    </span>
                  </div>

                  <button className="text-[#8A7F7A]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Order Details Panel */}
              {isExpanded && (
                <div className="p-6 border-t border-[#E8DDD7] bg-[#FAF8F6] space-y-6 text-xs">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Items List */}
                    <div className="bg-white p-4 rounded-2xl border border-[#E8DDD7] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#8A7F7A] block">Nail Sets & Sizing</span>
                      {items.map((it, idx) => (
                        <div key={idx} className="pb-2 border-b border-[#FAF8F6] last:border-0 last:pb-0">
                          <p className="font-semibold text-[#1F1A18]">{it.quantity}x {it.name}</p>
                          <p className="text-[11px] text-[#8A7F7A]">
                            Shape: {it.shape || 'Almond'} | Length: {it.length || 'Medium'} | Size: {it.size || 'M'}
                          </p>
                          {it.customSizes && (
                            <p className="text-[10px] text-[#C5A059] font-mono mt-0.5">
                              Custom mm: {it.customSizes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Customer & Shipping Details */}
                    <div className="bg-white p-4 rounded-2xl border border-[#E8DDD7] space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#8A7F7A] block">Shipping Destination</span>
                      <p className="font-bold text-[#1F1A18]">{order.customerName}</p>
                      <p className="text-[#8A7F7A]">{order.email}</p>
                      <p className="text-[#1F1A18]">{order.address}</p>
                      <p className="text-[#1F1A18]">{order.city}, {order.state} - {order.pincode}</p>
                      {order.notes && (
                        <p className="text-[11px] text-[#C5A059] pt-1">
                          Note: {order.notes}
                        </p>
                      )}
                    </div>

                    {/* Status & Courier Update Form */}
                    <div className="bg-white p-4 rounded-2xl border border-[#E8DDD7] space-y-3">
                      <span className="text-[10px] uppercase font-bold text-[#8A7F7A] block">Update Phase & Courier</span>
                      
                      <div>
                        <label className="text-[10px] font-semibold text-[#1F1A18] block mb-1">Status Phase</label>
                        <select
                          value={currentStatus}
                          onChange={(e) => setEditStatus({ ...editStatus, [order.id]: e.target.value })}
                          className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-lg p-2 text-xs outline-none focus:border-[#C5A059]"
                        >
                          {ORDER_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {ORDER_STATUS_LABELS[st] || st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-[#1F1A18] block mb-1">Courier Tracking ID</label>
                        <input
                          type="text"
                          placeholder="e.g. DTDC123456789"
                          value={currentTracking}
                          onChange={(e) => setEditTracking({ ...editTracking, [order.id]: e.target.value })}
                          className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-lg p-2 text-xs outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-[#1F1A18] block mb-1">Estimated Delivery</label>
                        <input
                          type="date"
                          value={currentDelivery}
                          onChange={(e) => setEditDelivery({ ...editDelivery, [order.id]: e.target.value })}
                          className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-lg p-2 text-xs outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <button
                        onClick={() => handleUpdate(order.id)}
                        disabled={updatingId === order.id}
                        className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{updatingId === order.id ? 'Updating...' : 'Save Updates'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
