'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  Ruler, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Package, 
  Share2, 
  Minus, 
  Plus,
  Send
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { ProductCard } from '@/components/home/ProductCard';
import { SizeGuideModal } from '@/components/shop/SizeGuideModal';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment?: string | null;
  createdAt: Date;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  images: string;
  shapes: string;
  lengths: string;
  finish: string;
  stock: number;
  isNewLaunch: boolean;
  isFeatured: boolean;
  rating: number;
  ratingCount: number;
  reviews: Review[];
}

export function ProductDetailClient({ 
  product, 
  relatedProducts 
}: { 
  product: Product; 
  relatedProducts: any[]; 
}) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  // Parse images, shapes, lengths safely
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = ['/images/products/nails2.1.jpg'];
  }

  let shapes: string[] = ['Almond', 'Coffin', 'Square', 'Stiletto', 'Short Round'];
  try {
    const parsed = JSON.parse(product.shapes);
    if (parsed.length > 0) shapes = parsed;
  } catch {}

  let lengths: string[] = ['Short', 'Medium', 'Long'];
  try {
    const parsed = JSON.parse(product.lengths);
    if (parsed.length > 0) lengths = parsed;
  } catch {}

  // Selection states
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [selectedShape, setSelectedShape] = useState(shapes[0] || 'Almond');
  const [selectedLength, setSelectedLength] = useState(lengths[0] || 'Medium');
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'Custom'>('M');
  const [customSizes, setCustomSizes] = useState({
    thumb: '',
    index: '',
    middle: '',
    ring: '',
    pinky: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [boxAccordionOpen, setBoxAccordionOpen] = useState(true);
  const [howToApplyOpen, setHowToApplyOpen] = useState(false);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);
  const inWishlist = isInWishlist(product.id);

  // Handle Add to Cart
  const handleAddToCart = () => {
    let customSizeStr = '';
    if (selectedSize === 'Custom') {
      customSizeStr = `Thumb:${customSizes.thumb || '16'}mm, Index:${customSizes.index || '13'}mm, Middle:${customSizes.middle || '14'}mm, Ring:${customSizes.ring || '12'}mm, Pinky:${customSizes.pinky || '9'}mm`;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: selectedImage || images[0],
      quantity,
      shape: selectedShape,
      length: selectedLength,
      size: selectedSize,
      customSizes: customSizeStr,
    });
    openCart();
  };

  // Handle Review Submit
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    setReviewSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userName: reviewName.trim(),
          rating: reviewRating,
          comment: reviewComment.trim(),
        }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviewsList([newReview, ...reviewsList]);
        setReviewName('');
        setReviewComment('');
        setReviewRating(5);
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6] pt-6 sm:pt-10 pb-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#8A7F7A] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1F1A18]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1F1A18]">Shop</Link>
          <span>/</span>
          <span className="text-[#1F1A18] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#E8DDD7]">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Active Image with Zoom/Hover */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#E8DDD7] shadow-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-zoom-in"
              />

              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Save {discount}%
                </span>
              )}

              <button
                onClick={() => toggleItem(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  inWishlist ? 'bg-[#C5A059] text-white' : 'bg-white/80 hover:bg-white text-[#1F1A18] shadow-md'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === img
                        ? 'border-[#C5A059] shadow-md scale-95'
                        : 'border-[#E8DDD7] hover:border-[#1F1A18]'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Customization & Buying Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A059] block mb-1">
                {product.category} • Handcrafted by Ish
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1F1A18] font-normal leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 5) ? 'fill-[#C5A059]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#8A7F7A] font-medium">
                  {product.rating?.toFixed(1) || '5.0'} ({reviewsList.length} reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DDD7] flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#1F1A18]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#8A7F7A] line-through ml-2.5">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <p className="text-[11px] text-[#4CAF50] font-medium mt-0.5">
                  ✨ Extra 5% OFF on UPI / Prepaid at checkout
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#4CAF50] font-semibold bg-[#4CAF50]/10 px-2.5 py-1 rounded-full">
                  In Stock (Handcrafted)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#1F1A18]/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Selectors Form (Press-On Specific) */}
            {shapes.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E8DDD7]">
                
                {/* 1. Nail Shape Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F1A18]">
                      1. Select Shape: <span className="text-[#C5A059]">{selectedShape}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {shapes.map((shape) => (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => setSelectedShape(shape)}
                        className={`text-xs px-3.5 py-2 rounded-xl border transition-all font-medium ${
                          selectedShape === shape
                            ? 'bg-[#1F1A18] text-white border-[#1F1A18] shadow-sm'
                            : 'bg-white text-[#1F1A18] border-[#E8DDD7] hover:border-[#C5A059]'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Nail Length Selector */}
                {lengths.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1F1A18]">
                        2. Select Length: <span className="text-[#C5A059]">{selectedLength}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {lengths.map((len) => (
                        <button
                          key={len}
                          type="button"
                          onClick={() => setSelectedLength(len)}
                          className={`flex-1 text-xs py-2 rounded-xl border transition-all font-medium ${
                            selectedLength === len
                              ? 'bg-[#1F1A18] text-white border-[#1F1A18] shadow-sm'
                              : 'bg-white text-[#1F1A18] border-[#E8DDD7] hover:border-[#C5A059]'
                          }`}
                        >
                          {len}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Nail Size Selector + Guide Modal Trigger */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F1A18]">
                      3. Select Size: <span className="text-[#C5A059]">{selectedSize}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSizeModalOpen(true)}
                      className="text-xs font-semibold text-[#C5A059] hover:underline flex items-center gap-1"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {(['XS', 'S', 'M', 'L', 'Custom'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs py-2 rounded-xl border transition-all font-semibold ${
                          selectedSize === size
                            ? 'bg-[#C5A059] text-white border-[#C5A059] shadow-sm'
                            : 'bg-white text-[#1F1A18] border-[#E8DDD7] hover:border-[#C5A059]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Custom Sizing Millimeter Inputs */}
                  {selectedSize === 'Custom' && (
                    <div className="mt-3 p-4 bg-white rounded-2xl border border-[#C5A059]/40 space-y-2">
                      <p className="text-[11px] text-[#1F1A18] font-semibold">
                        Enter millimeter (mm) width for each finger:
                      </p>
                      <div className="grid grid-cols-5 gap-2">
                        <div>
                          <label className="text-[9px] text-[#8A7F7A] uppercase block">Thumb</label>
                          <input
                            type="text"
                            placeholder="16"
                            value={customSizes.thumb}
                            onChange={(e) => setCustomSizes({ ...customSizes, thumb: e.target.value })}
                            className="w-full text-center text-xs p-1.5 border border-[#E8DDD7] rounded-lg focus:border-[#C5A059] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-[#8A7F7A] uppercase block">Index</label>
                          <input
                            type="text"
                            placeholder="13"
                            value={customSizes.index}
                            onChange={(e) => setCustomSizes({ ...customSizes, index: e.target.value })}
                            className="w-full text-center text-xs p-1.5 border border-[#E8DDD7] rounded-lg focus:border-[#C5A059] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-[#8A7F7A] uppercase block">Middle</label>
                          <input
                            type="text"
                            placeholder="14"
                            value={customSizes.middle}
                            onChange={(e) => setCustomSizes({ ...customSizes, middle: e.target.value })}
                            className="w-full text-center text-xs p-1.5 border border-[#E8DDD7] rounded-lg focus:border-[#C5A059] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-[#8A7F7A] uppercase block">Ring</label>
                          <input
                            type="text"
                            placeholder="12"
                            value={customSizes.ring}
                            onChange={(e) => setCustomSizes({ ...customSizes, ring: e.target.value })}
                            className="w-full text-center text-xs p-1.5 border border-[#E8DDD7] rounded-lg focus:border-[#C5A059] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-[#8A7F7A] uppercase block">Pinky</label>
                          <input
                            type="text"
                            placeholder="9"
                            value={customSizes.pinky}
                            onChange={(e) => setCustomSizes({ ...customSizes, pinky: e.target.value })}
                            className="w-full text-center text-xs p-1.5 border border-[#E8DDD7] rounded-lg focus:border-[#C5A059] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Quantity & Add to Cart Controls */}
            <div className="pt-4 border-t border-[#E8DDD7] space-y-3">
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8DDD7] rounded-full bg-white px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#C5A059]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#1F1A18]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#C5A059]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag • {formatPrice(product.price * quantity)}</span>
                </button>
              </div>

              {/* Direct WhatsApp Consultation button */}
              <a
                href={`https://wa.me/919322118970?text=Hi%20Ish!%20I'm%20interested%20in%20customizing%20the%20"${encodeURIComponent(product.name)}"%20set.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#1F1A18] hover:text-white py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Ask Ish on WhatsApp (93221 18970)</span>
              </a>
            </div>

            {/* Accordions: What's in the Box & Application */}
            <div className="space-y-3 pt-4 border-t border-[#E8DDD7]">
              
              {/* Accordion 1: What's in the Box */}
              <div className="bg-white rounded-2xl border border-[#E8DDD7] overflow-hidden">
                <button
                  onClick={() => setBoxAccordionOpen(!boxAccordionOpen)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="font-serif text-sm text-[#1F1A18] font-medium flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#C5A059]" />
                    What&apos;s Included In Your Box
                  </span>
                  {boxAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#8A7F7A]" /> : <ChevronDown className="w-4 h-4 text-[#8A7F7A]" />}
                </button>
                {boxAccordionOpen && (
                  <div className="px-4 pb-4 text-xs text-[#8A7F7A] space-y-2 border-t border-[#FAF8F6] pt-3">
                    <div className="flex items-center gap-2 text-[#1F1A18]">
                      <Check className="w-3.5 h-3.5 text-[#4CAF50]" />
                      <span>10 Handcrafted custom-sized gel press-on nails</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1F1A18]">
                      <Check className="w-3.5 h-3.5 text-[#4CAF50]" />
                      <span>Professional waterproof nail glue (2-3 week wear)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1F1A18]">
                      <Check className="w-3.5 h-3.5 text-[#4CAF50]" />
                      <span>24 Sticky adhesive tabs (for weekend / 3-day wear)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1F1A18]">
                      <Check className="w-3.5 h-3.5 text-[#4CAF50]" />
                      <span>Wooden cuticle pusher & dual-sided mini nail buffer</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1F1A18]">
                      <Check className="w-3.5 h-3.5 text-[#4CAF50]" />
                      <span>2 Alcohol prep pads & step-by-step application card</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Reusability & Hygiene */}
              <div className="bg-white rounded-2xl border border-[#E8DDD7] overflow-hidden">
                <button
                  onClick={() => setHowToApplyOpen(!howToApplyOpen)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="font-serif text-sm text-[#1F1A18] font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    How to Apply & Reuse
                  </span>
                  {howToApplyOpen ? <ChevronUp className="w-4 h-4 text-[#8A7F7A]" /> : <ChevronDown className="w-4 h-4 text-[#8A7F7A]" />}
                </button>
                {howToApplyOpen && (
                  <div className="px-4 pb-4 text-xs text-[#8A7F7A] space-y-2 border-t border-[#FAF8F6] pt-3 leading-relaxed">
                    <p>
                      <strong>Application:</strong> Gently push cuticles back, buff natural nail shine with mini buffer, wipe clean with alcohol pad, apply glue or adhesive tab, and press firmly for 30 seconds.
                    </p>
                    <p>
                      <strong>Removal & Reusability:</strong> Soak fingers in warm soapy water with a few drops of cuticle oil for 10-15 minutes. Gently peel off using the wooden stick. File away excess dried glue and store back in the Sleek Polish box for your next wear!
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Customer Reviews & Feedback Section */}
        <section className="py-16 border-b border-[#E8DDD7]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Reviews List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#1F1A18] font-normal">
                    Customer Reviews ({reviewsList.length})
                  </h3>
                  <p className="text-xs text-[#8A7F7A] mt-0.5">
                    Real feedback from clients who wear Sleek Polish by Ish
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {reviewsList.length === 0 ? (
                  <p className="text-xs text-[#8A7F7A] py-8 text-center bg-white rounded-2xl border border-[#E8DDD7]">
                    No reviews yet. Be the first to review this handcrafted set!
                  </p>
                ) : (
                  reviewsList.map((rev) => (
                    <div key={rev.id} className="p-5 bg-white rounded-2xl border border-[#E8DDD7]/70 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-sm font-semibold text-[#1F1A18]">
                          {rev.userName}
                        </span>
                        <div className="flex text-[#C5A059]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-[#C5A059]' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#1F1A18]/80 font-light leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Submit a Review Form */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DDD7] shadow-sm space-y-4">
                <h4 className="font-serif text-xl text-[#1F1A18] font-medium">
                  Write a Review
                </h4>
                <p className="text-xs text-[#8A7F7A] font-light">
                  Share your experience with this press-on set.
                </p>

                {reviewSuccess && (
                  <div className="p-3 bg-[#4CAF50]/15 text-[#4CAF50] rounded-xl text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Thank you! Your review has been added.</span>
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Your Rating</label>
                    <div className="flex gap-1 text-[#C5A059]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-[#C5A059]' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya M."
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl px-4 py-2.5 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label className="text-xs font-semibold text-[#1F1A18] block mb-1">Your Feedback</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about the fit, quality, and compliments you received..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-[#E8DDD7] rounded-xl p-3 text-xs text-[#1F1A18] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="w-full bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{reviewSubmitting ? 'Submitting...' : 'Post Review'}</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="pt-16">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1A18] font-normal mb-8 text-center">
              You May Also Love
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sizing Modal */}
      <SizeGuideModal isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} />

      {/* Sticky Mobile Bottom Action Bar (iPhone / Android) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DDD7] p-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#1F1A18]">{formatPrice(product.price * quantity)}</span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-[#8A7F7A] line-through">{formatPrice(product.originalPrice * quantity)}</span>
            )}
          </div>
          <p className="text-[10px] text-[#C5A059] font-medium leading-tight">
            {selectedShape} • {selectedSize} {selectedSize === 'Custom' ? '(Custom mm)' : ''}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 max-w-[200px] bg-[#1F1A18] hover:bg-[#C5A059] text-white py-3 px-4 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add To Bag</span>
        </button>
      </div>
    </div>
  );
}
