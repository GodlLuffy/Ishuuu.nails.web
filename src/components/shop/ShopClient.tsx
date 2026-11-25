'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard, ProductData } from '@/components/home/ProductCard';
import { CATEGORIES, NAIL_SHAPES, FINISHES } from '@/lib/utils';
import { SlidersHorizontal, X, ChevronDown, Sparkles, RotateCcw } from 'lucide-react';

export function ShopClient({ initialProducts }: { initialProducts: ProductData[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL Params State
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');
  const searchParam = searchParams.get('search');

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [selectedFinish, setSelectedFinish] = useState<string>('All');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL params cleanly whenever navbar links change (?category, ?filter, ?search)
  useEffect(() => {
    setSelectedCategory(categoryParam || 'All');
  }, [categoryParam, filterParam, searchParam]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedShape('All');
    setSelectedFinish('All');
    setPriceMax(5000);
    setSortBy('featured');
    if (categoryParam || filterParam || searchParam) {
      router.push('/shop');
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Search query
        if (searchParam) {
          const q = searchParam.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // New launches filter
        if (filterParam === 'new' && !p.isNewLaunch) {
          return false;
        }

        // Shape filter
        if (selectedShape !== 'All') {
          try {
            const shapes = JSON.parse(p.shapes || '[]');
            if (!shapes.includes(selectedShape)) return false;
          } catch {
            return false;
          }
        }

        // Finish filter
        if (selectedFinish !== 'All' && p.finish !== selectedFinish) {
          return false;
        }

        // Price
        if (p.price > priceMax) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'newest') return (b.isNewLaunch ? 1 : 0) - (a.isNewLaunch ? 1 : 0);
        return 0; // default featured
      });
  }, [initialProducts, selectedCategory, selectedShape, selectedFinish, priceMax, sortBy, searchParam, filterParam]);

  return (
    <div className="min-h-screen bg-[#FAF8F6] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-1">
            Handcrafted Nails
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1F1A18] font-light">
                {searchParam
                  ? `Search: "${searchParam}"`
                  : filterParam === 'new' && selectedCategory === 'All'
                  ? 'New Launches'
                  : selectedCategory === 'All'
                  ? 'The Complete Nail Collection'
                  : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-[#8A7F7A] mt-1 font-light">
                Showing {filteredProducts.length} handcrafted sets tailored to your custom fit.
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort Dropdown */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-[#E8DDD7] px-4 py-2.5 rounded-full text-xs font-semibold text-[#1F1A18]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
                <span>Filters</span>
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-[#E8DDD7] rounded-full px-5 py-2.5 pr-10 text-xs font-medium text-[#1F1A18] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="newest">Sort: New Launches</option>
                  <option value="rating">Sort: Highest Rated</option>
                  <option value="price-low">Sort: Price: Low to High</option>
                  <option value="price-high">Sort: Price: High to Low</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#8A7F7A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Left Filters + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E8DDD7]/70 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD7]">
                <h3 className="font-serif text-lg text-[#1F1A18] font-medium">Refine Sets</h3>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-[#C5A059] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1A18] mb-3">
                  Categories
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`block w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-[#C5A059]/15 text-[#C5A059] font-bold'
                        : 'text-[#8A7F7A] hover:text-[#1F1A18]'
                    }`}
                  >
                    All Categories ({initialProducts.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[#C5A059]/15 text-[#C5A059] font-bold'
                          : 'text-[#8A7F7A] hover:text-[#1F1A18]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nail Shape Filter */}
              <div className="pt-4 border-t border-[#E8DDD7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1A18] mb-3">
                  Nail Shape
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['All', ...NAIL_SHAPES].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedShape === shape
                          ? 'bg-[#1F1A18] text-white border-[#1F1A18]'
                          : 'bg-[#FAF8F6] text-[#1F1A18] border-[#E8DDD7] hover:border-[#C5A059]'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish Filter */}
              <div className="pt-4 border-t border-[#E8DDD7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1A18] mb-3">
                  Finish Style
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['All', ...FINISHES].map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedFinish === finish
                          ? 'bg-[#C5A059] text-white border-[#C5A059]'
                          : 'bg-[#FAF8F6] text-[#1F1A18] border-[#E8DDD7] hover:border-[#C5A059]'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-[#E8DDD7]">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1A18]">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-[#C5A059]">₹{priceMax}</span>
                </div>
                <input
                  type="range"
                  min="499"
                  max="5000"
                  step="100"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#C5A059]"
                />
                <div className="flex justify-between text-[10px] text-[#8A7F7A] mt-1">
                  <span>₹499</span>
                  <span>₹3,000</span>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DDD7]">
                <div className="w-16 h-16 rounded-full bg-[#F3E8E2] text-[#C5A059] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#1F1A18] mb-2">No sets match your criteria</h3>
                <p className="text-xs text-[#8A7F7A] max-w-sm mx-auto mb-6">
                  Try clearing your filters or search keywords to view our complete collection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#1F1A18] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Slide-Out Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F1A18]/60 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="bg-[#FAF8F6] w-full max-w-xs h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD7]">
                <h3 className="font-serif text-lg text-[#1F1A18]">Filter Nails</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#1F1A18]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="py-4 border-b border-[#E8DDD7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1A18] mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`block w-full text-left text-xs py-1.5 ${
                      selectedCategory === 'All' ? 'text-[#C5A059] font-bold' : 'text-[#8A7F7A]'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left text-xs py-1.5 ${
                        selectedCategory === cat ? 'text-[#C5A059] font-bold' : 'text-[#8A7F7A]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Shape */}
              <div className="py-4 border-b border-[#E8DDD7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1A18] mb-2">Nail Shape</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['All', ...NAIL_SHAPES].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`text-xs px-2.5 py-1 rounded-full border ${
                        selectedShape === shape ? 'bg-[#1F1A18] text-white' : 'bg-white text-[#1F1A18]'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Finish */}
              <div className="py-4 border-b border-[#E8DDD7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1A18] mb-2">Finish</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['All', ...FINISHES].map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`text-xs px-2.5 py-1 rounded-full border ${
                        selectedFinish === finish ? 'bg-[#C5A059] text-white' : 'bg-white text-[#1F1A18]'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="py-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold">Max Price</span>
                  <span className="text-[#C5A059] font-bold">₹{priceMax}</span>
                </div>
                <input
                  type="range"
                  min="499"
                  max="5000"
                  step="100"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#C5A059]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DDD7] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#1F1A18] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2 text-xs text-[#8A7F7A] hover:underline"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
