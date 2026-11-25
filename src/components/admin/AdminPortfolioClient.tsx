'use client';

import React, { useState } from 'react';
import { PORTFOLIO_CATEGORIES, NAIL_SHAPES, NAIL_LENGTHS } from '@/lib/utils';
import { Plus, Trash2, X, Image as ImageIcon, Sparkles } from 'lucide-react';

export function AdminPortfolioClient({ 
  initialItems, 
  products 
}: { 
  initialItems: any[]; 
  products: { id: string; name: string }[]; 
}) {
  const [items, setItems] = useState(initialItems);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/portfolio/nails2.1.jpg');
  const [category, setCategory] = useState(PORTFOLIO_CATEGORIES[1] || 'Bridal');
  const [shape, setShape] = useState('Almond');
  const [length, setLength] = useState('Long');
  const [description, setDescription] = useState('');
  const [linkedProductId, setLinkedProductId] = useState('');
  const [saving, setSaving] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this look?')) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
      }
    } catch {
      alert('Delete failed');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          imageUrl,
          category,
          shape,
          length,
          description,
          linkedProductId: linkedProductId || null,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setItems([created, ...items]);
        setModalOpen(false);
        setTitle('');
        setDescription('');
      }
    } catch {
      alert('Failed to save look');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DDD7] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">Artistry Lookbook</span>
          <h1 className="font-serif text-3xl text-[#1F1A18] font-normal mt-0.5">
            Portfolio Gallery ({items.length} Looks)
          </h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Portfolio Look</span>
        </button>
      </div>

      {/* Grid of Portfolio Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-[#E8DDD7] shadow-sm overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] bg-[#F3E8E2] relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-[#1F1A18]/80 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                {item.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold text-[#1F1A18]">{item.title}</h3>
                <p className="text-xs text-[#8A7F7A] mt-1">
                  {item.shape} • {item.length}
                </p>
                {item.linkedProduct && (
                  <p className="text-[11px] text-[#C5A059] font-medium mt-1">
                    Linked: {item.linkedProduct.name}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-3 border-t border-[#FAF8F6] flex justify-end">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Look</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1F1A18]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F6] w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-2xl relative my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#8A7F7A] hover:text-[#1F1A18] p-1.5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#1F1A18] font-normal mb-6">
              Add Look to Artist Lookbook
            </h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Look Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chrome Glazed Rose Gold Bridal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="/images/portfolio/nails2.1.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl p-2 outline-none focus:border-[#C5A059]"
                  >
                    {PORTFOLIO_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Shape</label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl p-2 outline-none focus:border-[#C5A059]"
                  >
                    {NAIL_SHAPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Length</label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl p-2 outline-none focus:border-[#C5A059]"
                  >
                    {NAIL_LENGTHS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Link to Shop Product (Optional)</label>
                <select
                  value={linkedProductId}
                  onChange={(e) => setLinkedProductId(e.target.value)}
                  className="w-full bg-white border border-[#E8DDD7] rounded-xl p-2.5 outline-none focus:border-[#C5A059]"
                >
                  <option value="">None (Custom Art Only)</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Artistry Description</label>
                <textarea
                  rows={3}
                  placeholder="Notes on techniques, pigments, 3D charms used..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-[#E8DDD7] rounded-xl p-3 outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-4 border-t border-[#E8DDD7] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-[#E8DDD7] text-[#8A7F7A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#1F1A18] hover:bg-[#C5A059] text-white px-8 py-2.5 rounded-full font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {saving ? 'Uploading...' : 'Publish to Lookbook'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
