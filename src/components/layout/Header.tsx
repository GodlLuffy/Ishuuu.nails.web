'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  Phone
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const ANNOUNCEMENTS = [
  '✨ 5% OFF on all PREPAID Orders (Auto-Applied)',
  '💖 Use Code SLEEK10 for 10% OFF your first set',
  '✈️ Pan-India & Worldwide Fast Shipping Available',
  '📞 Custom Nails & WhatsApp Support: +91 93221 18970',
  '💅 Handcrafted Luxury Press-On Nails by Ish (@sleekpolishbyish)'
];

const NAV_LINKS = [
  { label: 'Home', href: '/', match: (p: string) => p === '/' },
  { label: 'Shop Nails', href: '/shop', match: (p: string, f: string | null, c: string | null) => p === '/shop' && f !== 'new' && c !== 'Combo Kits' },
  { label: 'New Launches', href: '/shop?filter=new', dot: true, match: (p: string, f: string | null) => p === '/shop' && f === 'new' },
  { label: 'Portfolio', href: '/portfolio', match: (p: string) => p === '/portfolio' },
  { label: 'Combos', href: '/shop?category=Combo+Kits', match: (p: string, _f: string | null, c: string | null) => p === '/shop' && c === 'Combo Kits' },
  { label: 'Book / Consult', href: '/book', highlight: true, match: (p: string) => p === '/book' },
  { label: 'Track Order', href: '/track', match: (p: string) => p === '/track' },
  { label: 'About', href: '/#about', match: () => false },
];

function DesktopNavLinks() {
  const pathname = usePathname();
  const [query, setQuery] = useState<{ filter: string | null; category: string | null }>({
    filter: null,
    category: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery({
      filter: params.get('filter'),
      category: params.get('category'),
    });
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    const [, searchPart] = href.split('?');
    const params = new URLSearchParams(searchPart || '');
    setQuery({
      filter: params.get('filter'),
      category: params.get('category'),
    });
  };

  return (
    <nav className="hidden md:flex h-12 items-center justify-center gap-6 lg:gap-8 border-t border-[#E8DFD8]/80 text-xs font-medium tracking-[0.15em] uppercase text-[#1F1A18]/85 px-4">
      {NAV_LINKS.map((item) => {
        const isActive = item.match(pathname, query.filter, query.category);
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => handleLinkClick(item.href)}
            className={`h-full inline-flex items-center gap-1.5 px-1 whitespace-nowrap transition-colors relative group ${
              isActive
                ? 'text-[#C5A059] font-semibold'
                : item.highlight
                ? 'text-[#C5A059] font-semibold hover:text-[#1F1A18]'
                : 'hover:text-[#C5A059]'
            }`}
          >
            <span>{item.label}</span>
            {item.dot && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#C5A059] transition-all duration-300 ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const router = useRouter();
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { items: cartItems, openCart } = useCartStore();
  const { items: wishlistItems, openWishlist } = useWishlistStore();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Rotating Announcement
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Announcement Bar: Full-width deep espresso, crisp white text, zero overlapping badges */}
      <div className="bg-[#1F1A18] text-white py-2.5 px-4 text-xs tracking-widest uppercase border-b border-[#1F1A18]/10 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <span className="font-medium truncate transition-opacity duration-500">
            {ANNOUNCEMENTS[announcementIndex]}
          </span>
        </div>
      </div>

      {/* Sticky Luxury Header */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF8F6]/95 backdrop-blur-md border-b border-[#E8DFD8] transition-all duration-300">
        
        {/* Row 1: Balanced 3-Column Luxury Brand Identity Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-3 items-center">
          
          {/* Left Column: Mobile Hamburger (mobile) or Search Trigger (desktop) */}
          <div className="flex items-center justify-start gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#1F1A18] hover:text-[#C5A059] p-2 -ml-2 transition-colors focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#1F1A18]/80 hover:text-[#C5A059] transition-colors py-1 px-2.5 rounded-full hover:bg-black/5"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4 text-[#1F1A18]" />
              <span>Search</span>
            </button>
          </div>

          {/* Center Column: Official Brand Logo */}
          <div className="flex items-center justify-center text-center">
            <Link href="/" className="inline-flex items-center justify-center group py-1" aria-label="Sleek & Polish Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Sleek & Polish by Ish"
                className="h-10 sm:h-12 md:h-13 w-auto max-w-[200px] sm:max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Right Column: Account, Wishlist, Cart Drawer evenly spaced */}
          <div className="flex items-center justify-end gap-4 sm:gap-5 text-[#1F1A18]">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-1.5 hover:text-[#C5A059] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link */}
            <Link
              href="/login"
              className="p-1.5 hover:text-[#C5A059] transition-colors hidden sm:block"
              aria-label="Account Login"
              title="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Drawer Button */}
            <button
              onClick={openWishlist}
              className="p-1.5 hover:text-[#C5A059] transition-colors relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={openCart}
              className="p-1.5 hover:text-[#C5A059] transition-colors relative flex items-center gap-2 group cursor-pointer"
              aria-label="Shopping Cart"
              title="Cart Drawer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1F1A18] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              {cartSubtotal > 0 && (
                <span className="hidden xl:inline-block text-xs font-semibold tracking-wider text-[#1F1A18]">
                  {formatPrice(cartSubtotal)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Desktop Horizontal Nav Bar with active state & smooth gold hover underlines */}
        <DesktopNavLinks />
      </header>

      {/* Live Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F1A18]/60 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-24 px-4">
          <div className="bg-[#FAF8F6] w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#E8DDD7] relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-[#8A7F7A] hover:text-[#1F1A18] p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-serif text-2xl text-[#1F1A18] mb-4">Search Luxury Nails</h3>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search chrome, bridal, almond, french tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-white border border-[#E8DDD7] rounded-xl px-5 py-3.5 pr-12 text-[#1F1A18] placeholder-[#8A7F7A] text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1F1A18] hover:bg-[#C5A059] text-white p-2 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#8A7F7A]">
              <span className="font-semibold text-[#1F1A18]">Popular:</span>
              {['Rose Quartz', 'Bridal Luxe', 'French Tip', 'Cat-Eye', 'Cuticle Oil'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term);
                    setSearchOpen(false);
                    router.push(`/shop?search=${encodeURIComponent(term)}`);
                  }}
                  className="bg-[#F3E8E2] hover:bg-[#C5A059] hover:text-white px-2.5 py-1 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-Out Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F1A18]/60 backdrop-blur-sm flex justify-start">
          <div className="bg-[#FAF8F6] w-4/5 max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DDD7]">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo.png"
                    alt="Sleek & Polish by Ish"
                    className="h-9 w-auto max-w-[170px] object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#1F1A18] hover:text-[#C5A059]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-4 font-semibold text-xs tracking-widest uppercase text-[#1F1A18]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40"
                >
                  Shop All Nails
                </Link>
                <Link
                  href="/shop?filter=new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40 flex items-center justify-between"
                >
                  <span>New Launches</span>
                  <span className="text-[10px] bg-[#C5A059] text-white px-2 py-0.5 rounded-full">New</span>
                </Link>
                <Link
                  href="/portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40"
                >
                  Lookbook / Portfolio
                </Link>
                <Link
                  href="/shop?category=Combo+Kits"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40"
                >
                  Combos & Care Bundles
                </Link>
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40 text-[#C5A059] flex items-center justify-between font-bold"
                >
                  <span>Book Appointment / Consult</span>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                </Link>
                <Link
                  href="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40"
                >
                  Track Order
                </Link>
                <Link
                  href="/#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40"
                >
                  About Us
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition-colors py-2 border-b border-[#E8DDD7]/40"
                >
                  Account / Sign In
                </Link>
              </nav>
            </div>

            <div className="pt-5 border-t border-[#E8DDD7] space-y-3">
              <a
                href="https://wa.me/919322118970?text=Hi%20Ish!%20I%20am%20inquiring%20about%20custom%20press-on%20nails."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+919322118970"
                className="w-full border border-[#1F1A18] text-[#1F1A18] py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 93221 18970</span>
              </a>

              <div className="bg-[#F3E8E2] rounded-xl p-3 text-center space-y-1.5">
                <p className="text-[11px] text-[#1F1A18] font-medium">Follow Ish</p>
                <div className="flex items-center justify-center gap-3 text-xs font-bold">
                  <a
                    href="https://www.instagram.com/sleekpolishbyish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A059] hover:underline"
                  >
                    Instagram
                  </a>
                  <span className="text-[#1F1A18]/30">•</span>
                  <a
                    href="https://www.youtube.com/@Sleekpolish29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF0000] hover:underline"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
