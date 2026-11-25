'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Check, X, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function AdminPromosClient({ initialPromos }: { initialPromos: any[] }) {
  const [promos, setPromos] = useState(initialPromos);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [minOrderAmount, setMinOrderAmount] = useState(499);
  const [maxUses, setMaxUses] = useState(500);
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setCreating(true);

    try {
      const res = await fetch('/api/admin/promos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          discountPercent,
          minOrderAmount,
          maxUses,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setPromos([...promos, created]);
        setCode('');
      }
    } catch {
      alert('Failed to create promo code');
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/promos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) {
        setPromos(promos.map((p) => (p.id === id ? { ...p, isActive: !current } : p)));
      }
    } catch {
      alert('Toggle failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete promo code?')) return;
    try {
      const res = await fetch(`/api/admin/promos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPromos(promos.filter((p) => p.id !== id));
      }
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E8DDD7]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">Discounts</span>
        <h1 className="font-serif text-3xl text-[#1F1A18] font-normal mt-0.5">
          Promo & Voucher Codes ({promos.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Promo List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-[#E8DDD7] shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F6] text-[#8A7F7A] border-b border-[#E8DDD7]">
                <tr>
                  <th className="p-4 font-semibold">Code</th>
                  <th className="p-4 font-semibold">Discount</th>
                  <th className="p-4 font-semibold">Min Order</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD7]">
                {promos.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F6]">
                    <td className="p-4 font-mono font-bold text-[#1F1A18] text-sm">
                      {p.code}
                    </td>
                    <td className="p-4 font-bold text-[#C5A059]">{p.discountPercent}% OFF</td>
                    <td className="p-4">{formatPrice(p.minOrderAmount)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(p.id, p.isActive)}
                        className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full transition-colors ${
                          p.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {p.isActive ? 'Active' : 'Paused'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Create Promo Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-sm space-y-4">
            <h3 className="font-serif text-xl text-[#1F1A18] font-medium">Create New Promo Code</h3>
            
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Code Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BRIDAL20"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 uppercase font-mono font-bold focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Discount % *</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 focus:border-[#C5A059] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Max Redemptions</label>
                <input
                  type="number"
                  value={maxUses}
                  onChange={(e) => setMaxUses(Number(e.target.value))}
                  className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 focus:border-[#C5A059] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3 rounded-full font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {creating ? 'Creating...' : '+ Create Promo Code'}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
