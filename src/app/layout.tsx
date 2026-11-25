import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Sleek Polish by Ish | Luxury Press-On Nails & Nail Art',
  description: 'Handcrafted luxury press-on nails, bridal nail art, and professional nail care products by Sleek Polish by Ish. Salon-quality nails delivered to your doorstep.',
  keywords: 'press-on nails, luxury nails, bridal nails, nail art, nail care, Sleek Polish, handcrafted nails',
  icons: {
    icon: [
      { url: '/images/favicon.png?v=2', type: 'image/png' },
      { url: '/favicon.ico?v=2', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/images/favicon.png?v=2',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FAF8F6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#FAF8F6] text-[#1F1A18] font-sans antialiased flex flex-col selection:bg-[#C5A059] selection:text-white">
        <Providers>
          <Header />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
        </Providers>
      </body>
    </html>
  );
}
