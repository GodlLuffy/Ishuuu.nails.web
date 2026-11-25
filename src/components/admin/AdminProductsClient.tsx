'use client';

import React, { useState } from 'react';
import { formatPrice, CATEGORIES, NAIL_SHAPES, NAIL_LENGTHS, FINISHES } from '@/lib/utils';
import { Plus, Edit2, Trash2, X, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

export function AdminProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState(1299);
  const [originalPrice, setOriginalPrice] = useState(1799);
  const [imagesInput, setImagesInput] = useState('');
  const [shapesInput, setShapesInput] = useState<string[]>(['Almond', 'Coffin']);
  const [lengthsInput, setLengthsInput] = useState<string[]>(['Medium', 'Long']);
  const [finish, setFinish] = useState('Glossy');
  const [stock, setStock] = useState(50);
  const [isNewLaunch, setIsNewLaunch] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);

  const [saving, setSaving] = useState(false);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setCategory(CATEGORIES[0]);
    setPrice(1299);
    setOriginalPrice(1799);
    setImagesInput('/images/products/nails2.1.jpg');
    setShapesInput(['Almond', 'Coffin']);
    setLengthsInput(['Medium', 'Long']);
    setFinish('Glossy');
    setStock(50);
    setIsNewLaunch(true);
    setIsFeatured(true);
    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingId(p.id);
    setName(p.name);
    setSlug(p.slug);
    setDescription(p.description);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);

    let parsedImgs = [];
    try { parsedImgs = JSON.parse(p.images); } catch {}
    setImagesInput(parsedImgs.join(', '));

    let parsedShapes = [];
    try { parsedShapes = JSON.parse(p.shapes); } catch {}
    setShapesInput(parsedShapes);

    let parsedLengths = [];
    try { parsedLengths = JSON.parse(p.lengths); } catch {}
    setLengthsInput(parsedLengths);

    setFinish(p.finish || 'Glossy');
    setStock(p.stock || 50);
    setIsNewLaunch(p.isNewLaunch);
    setIsFeatured(p.isFeatured);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const imageUrls = imagesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      images: JSON.stringify(imageUrls.length ? imageUrls : ['/images/products/nails2.1.jpg']),
      shapes: JSON.stringify(shapesInput),
      lengths: JSON.stringify(lengthsInput),
      finish,
      stock: Number(stock),
      isNewLaunch,
      isFeatured,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts(products.map((p) => (p.id === editingId ? updated : p)));
          setModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setProducts([created, ...products]);
          setModalOpen(false);
        }
      }
    } catch {
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DDD7] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">Inventory</span>
          <h1 className="font-serif text-3xl text-[#1F1A18] font-normal mt-0.5">
            Product Catalog ({products.length} Sets)
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Set</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E8DDD7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F6] text-[#8A7F7A] border-b border-[#E8DDD7]">
              <tr>
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Badges</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDD7]">
              {products.map((p) => {
                let img = '/images/products/nails2.1.jpg';
                try {
                  const arr = JSON.parse(p.images);
                  if (arr.length) img = arr[0];
                } catch {}

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F6]">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F3E8E2] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-serif text-sm font-semibold text-[#1F1A18]">{p.name}</p>
                      <p className="text-[10px] text-[#8A7F7A]">/{p.slug}</p>
                    </td>
                    <td className="p-4 font-medium text-[#1F1A18]">{p.category}</td>
                    <td className="p-4">
                      <span className="font-bold text-[#1F1A18]">{formatPrice(p.price)}</span>
                      {p.originalPrice > p.price && (
                        <span className="text-[10px] text-[#8A7F7A] line-through ml-1.5">
                          {formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-medium">{p.stock}</td>
                    <td className="p-4">
                      <div className="flex gap-1.5">
                        {p.isFeatured && (
                          <span className="text-[9px] bg-[#C5A059]/15 text-[#C5A059] font-bold px-2 py-0.5 rounded-full uppercase">
                            Featured
                          </span>
                        )}
                        {p.isNewLaunch && (
                          <span className="text-[9px] bg-[#1F1A18] text-white font-bold px-2 py-0.5 rounded-full uppercase">
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-[#1F1A18] hover:text-[#C5A059] rounded-lg hover:bg-gray-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1F1A18]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F6] w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-[#E8DDD7] shadow-2xl relative my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#8A7F7A] hover:text-[#1F1A18] p-1.5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#1F1A18] font-normal mb-6">
              {editingId ? 'Edit Nail Product' : 'Add New Handcrafted Set'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Set Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Finish Style</label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                  >
                    {FINISHES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Sale Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1F1A18] block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-[#E8DDD7] rounded-xl p-3 outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1F1A18] block mb-1">Image URLs (comma-separated)</label>
                <input
                  type="text"
                  placeholder="/images/products/nails2.1.jpg, /images/products/nails2.2.jpg"
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  className="w-full bg-white border border-[#E8DDD7] rounded-xl px-4 py-2.5 outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-[#C5A059] w-4 h-4"
                  />
                  <span className="font-semibold text-[#1F1A18]">Feature on Home Page</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewLaunch}
                    onChange={(e) => setIsNewLaunch(e.target.checked)}
                    className="accent-[#C5A059] w-4 h-4"
                  />
                  <span className="font-semibold text-[#1F1A18]">Mark as New Launch</span>
                </label>
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
                  {saving ? 'Saving...' : 'Save Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
