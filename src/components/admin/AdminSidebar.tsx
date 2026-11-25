'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Package, 
  Image as ImageIcon, 
  ShoppingCart, 
  Calendar, 
  Tag, 
  ArrowLeft, 
  LogOut,
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products (CRUD)', icon: Package },
  { href: '/admin/orders', label: 'Orders & Status', icon: ShoppingCart },
  { href: '/admin/portfolio', label: 'Portfolio / Lookbook', icon: ImageIcon },
  { href: '/admin/bookings', label: 'Bookings & Calls', icon: Calendar },
  { href: '/admin/promos', label: 'Promo Codes', icon: Tag },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-[#1F1A18] text-white flex-shrink-0 flex flex-col justify-between p-6">
      <div className="space-y-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-[#C5A059] mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Control Center</span>
          </div>
          <h2 className="font-serif text-xl tracking-[0.2em] text-white">
            SLEEK POLISH
          </h2>
          <p className="text-[9px] tracking-[0.35em] text-[#8A7F7A] uppercase">
            ADMIN BY ISH
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#C5A059] text-[#1F1A18] font-bold shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Links */}
      <div className="pt-8 border-t border-white/10 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-white/60 hover:text-[#C5A059] transition-colors py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Website</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors py-2 text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
