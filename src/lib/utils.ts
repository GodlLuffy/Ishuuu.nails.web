export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function calculateDiscount(originalPrice: number, price: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SPB-${year}-${random}`;
}

export function generateConfirmationId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `BK-${year}-${random}`;
}

export const BRAND_PHONE = '+91 93221 18970';
export const BRAND_PHONE_CLEAN = '9322118970';
export const BRAND_WHATSAPP = '919322118970';

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${BRAND_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const CATEGORIES = [
  'Press-On Nail Sets',
  'Bridal & Festive Nails',
  'Minimalist & Everyday Sets',
  'Nail Care & Cuticle Oils',
  'Combo Kits',
];

export const NAIL_SHAPES = ['Almond', 'Coffin', 'Square', 'Stiletto', 'Short Round'];
export const NAIL_LENGTHS = ['Short', 'Medium', 'Long'];
export const NAIL_SIZES = ['XS', 'S', 'M', 'L', 'Custom'];
export const FINISHES = ['Glossy', 'Matte', 'Chrome', 'Glitter', '3D Art'];

export const ORDER_STATUSES = ['PLACED', 'HANDCRAFTING', 'QUALITY_CHECK', 'SHIPPED', 'DELIVERED'];
export const ORDER_STATUS_LABELS: Record<string, string> = {
  PLACED: 'Order Placed',
  HANDCRAFTING: 'Handcrafting Your Set',
  QUALITY_CHECK: 'Quality Check & Packed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
};

export const PORTFOLIO_CATEGORIES = ['All', 'Bridal', 'Minimalist', 'Chrome & Glaze', '3D & Charms', 'French Tips', 'Seasonal'];

export const SERVICES = ['Gel Extensions', 'Acrylics', 'Bridal Nails', 'Nail Art', 'Refill'];
