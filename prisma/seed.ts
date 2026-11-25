const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with authentic Sleek Polish by Ish handcrafted nail sets...');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Ishuu (Admin)',
      email: 'admin@sleekpolishbyish.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      phone: '+919322118970',
    },
  });
  console.log('✅ Admin user created');

  // Create a test customer
  const customerPassword = await bcrypt.hash('Customer@123', 12);
  const customer = await prisma.user.create({
    data: {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      passwordHash: customerPassword,
      role: 'CUSTOMER',
      phone: '+919876543211',
    },
  });

  // Promo Codes
  await prisma.promoCode.createMany({
    data: [
      { code: 'SLEEK10', discountPercent: 10, isActive: true, minOrderAmount: 499 },
      { code: 'BRIDAL20', discountPercent: 20, isActive: true, minOrderAmount: 1499 },
      { code: 'FIRST15', discountPercent: 15, isActive: true, minOrderAmount: 799 },
    ],
  });
  console.log('✅ Promo codes created');

  // 12 Authentic Sleek Polish Handcrafted Nail Sets (Zero Stock Photos, 100% Real Designs)
  const products = await Promise.all([
    // Set 1: Wild Glamour Leopard & 3D Gold Cuffs (nails 2.1 & 2.2)
    prisma.product.create({
      data: {
        name: 'Wild Glamour Leopard & 3D Gold Cuffs Set',
        slug: 'leopard-rose-gold-cuff-set',
        description: 'Signature Sleek & Polish handcrafted set featuring delicate nude ombre, hand-painted micro leopard print, high-shine rose gold shimmer, and sculptural 3D gold ring cuffs. Reusable up to 3x with proper care.',
        category: 'Press-On Nail Sets',
        price: 1499,
        originalPrice: 2099,
        images: JSON.stringify([
          '/images/products/nails2.1.jpg',
          '/images/products/nails2.2.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Coffin', 'Square']),
        lengths: JSON.stringify(['Medium', 'Long']),
        finish: 'Glossy & 3D Gold Cuffs',
        stock: 50,
        isNewLaunch: true,
        isFeatured: true,
        rating: 5.0,
        ratingCount: 168,
      },
    }),

    // Set 2: Royal Peacock & Oxidized Silver Luxe Set (nails 1.1 & 1.2)
    prisma.product.create({
      data: {
        name: 'Royal Peacock & Oxidized Silver Luxe Set',
        slug: 'royal-peacock-silver-set',
        description: 'Exquisite handcrafted royal navy press-on nails featuring authentic 3D oxidized silver peacock jewelry charms, hand-painted silver ethnic mandalas, micro-dot filigree, and sparkling silver glitter accents. Perfect for royal weddings and festive celebrations.',
        category: 'Bridal & Festive Nails',
        price: 1899,
        originalPrice: 2499,
        images: JSON.stringify([
          '/images/products/nails1.1.jpg',
          '/images/products/nails1.2.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Stiletto', 'Coffin']),
        lengths: JSON.stringify(['Long', 'Medium']),
        finish: '3D Art & Oxidized Silver Jewelry',
        stock: 35,
        isNewLaunch: true,
        isFeatured: true,
        rating: 5.0,
        ratingCount: 194,
      },
    }),

    // Set 3: Rose Quartz Glitter & Chunky 3D Gold Cuffs (nails 11.1 & 11.2)
    prisma.product.create({
      data: {
        name: 'Rose Quartz Glitter & Chunky 3D Gold Cuffs Set',
        slug: 'rose-quartz-chunky-gold-cuffs-set',
        description: 'Ultra-luxurious bespoke press-on set crafted with rose gold cat-eye velvet, silver reflective micro-glitter, contoured metallic gold line accents, delicate 3D white florets, and sculptural heavy gold ring cuffs. Handcrafted in our bespoke crystal presentation case.',
        category: 'Press-On Nail Sets',
        price: 1699,
        originalPrice: 2299,
        images: JSON.stringify([
          '/images/products/nails11.1.jpg',
          '/images/products/nails11.2.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Coffin', 'Stiletto']),
        lengths: JSON.stringify(['Medium', 'Long']),
        finish: '3D Sculpted Jewelry & Glitter',
        stock: 40,
        isNewLaunch: true,
        isFeatured: true,
        rating: 4.9,
        ratingCount: 142,
      },
    }),

    // Set 4: Sunlit Lemon French & 3D Star Flower Set (nails 9.1 & 9.2)
    prisma.product.create({
      data: {
        name: 'Sunlit Lemon French & 3D Star Flower Set',
        slug: 'sunlit-lemon-french-star-flower-set',
        description: 'Vibrant and joyful handcrafted set featuring pastel buttercup yellow French smile lines, delicate center star flower sculpture with magenta-gold stamen beads, and crystalline gel high-gloss topcoat.',
        category: 'Press-On Nail Sets',
        price: 1399,
        originalPrice: 1899,
        images: JSON.stringify([
          '/images/products/nails9.1.jpg',
          '/images/products/nails9.2.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Short Round', 'Square']),
        lengths: JSON.stringify(['Short', 'Medium']),
        finish: 'Glossy & 3D Flower',
        stock: 45,
        isNewLaunch: true,
        isFeatured: true,
        rating: 4.8,
        ratingCount: 116,
      },
    }),

    // Set 5: Liquid Gold Mirror Chrome & Rhinestone Crest Set (nails 8.1)
    prisma.product.create({
      data: {
        name: 'Liquid Gold Mirror Chrome & Rhinestone Crest Set',
        slug: 'liquid-gold-mirror-crest-set',
        description: 'Pure liquid gold mirror chrome reflection press-ons featuring hand-sculpted gold wire monogram crests and brilliant crystal rhinestone cuticle crowns. High-fashion couture statement for red carpets and celebrations.',
        category: 'Bridal & Festive Nails',
        price: 1799,
        originalPrice: 2399,
        images: JSON.stringify([
          '/images/products/nails8.1.jpg',
        ]),
        shapes: JSON.stringify(['Coffin', 'Almond', 'Stiletto']),
        lengths: JSON.stringify(['Medium', 'Long']),
        finish: 'Mirror Chrome & Crystals',
        stock: 30,
        isNewLaunch: true,
        isFeatured: true,
        rating: 5.0,
        ratingCount: 204,
      },
    }),

    // Set 6: Espresso Mocha Cream Velvet & 3D Gold Cuff Set (nails 10.1)
    prisma.product.create({
      data: {
        name: 'Espresso Mocha & Cream Velvet 3D Gold Cuff Set',
        slug: 'espresso-cream-velvet-cuff-set',
        description: 'Rich warm espresso mocha brown paired with smooth latte cream accent nails, holographic cat-eye velvet shimmer, and handcrafted 3D chunky gold ring cuffs. The ultimate autumn-winter luxury staple.',
        category: 'Press-On Nail Sets',
        price: 1499,
        originalPrice: 1999,
        images: JSON.stringify([
          '/images/products/nails10.1.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Coffin', 'Square']),
        lengths: JSON.stringify(['Medium', 'Long']),
        finish: 'Cat-Eye Velvet & 3D Gold',
        stock: 38,
        isNewLaunch: false,
        isFeatured: true,
        rating: 4.9,
        ratingCount: 185,
      },
    }),

    // Set 7: Champagne Cat-Eye Velvet & 3D White Flower Set (nails 3.1)
    prisma.product.create({
      data: {
        name: 'Champagne Velvet Cat-Eye & 3D Flower Set',
        slug: 'champagne-cat-eye-flower-set',
        description: 'Ethereal champagne nude magnetic cat-eye velvet finish with hand-sculpted 3D white blossom petals, delicate metallic gold wire arches, and micro-shimmer sparkle. Timeless bridal and everyday sophistication.',
        category: 'Minimalist & Everyday Sets',
        price: 1449,
        originalPrice: 1949,
        images: JSON.stringify([
          '/images/products/nails3.1.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Short Round']),
        lengths: JSON.stringify(['Short', 'Medium']),
        finish: 'Cat-Eye Magnetic & 3D Art',
        stock: 65,
        isNewLaunch: false,
        isFeatured: true,
        rating: 4.9,
        ratingCount: 228,
      },
    }),

    // Set 8: Baby Pink Glazed Swirl & 3D Hibiscus Set (nails 4.1)
    prisma.product.create({
      data: {
        name: 'Baby Pink Glazed Swirl & 3D Hibiscus Set',
        slug: 'pink-glazed-swirl-hibiscus-set',
        description: 'Delicate soft blush French smile lines with dimensional glazed seashell textured swirl accents and a handcrafted 3D tropical hibiscus flower charm with gold center bead. Highly requested on Instagram.',
        category: 'Press-On Nail Sets',
        price: 1399,
        originalPrice: 1899,
        images: JSON.stringify([
          '/images/products/nails4.1.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Short Round', 'Square']),
        lengths: JSON.stringify(['Short', 'Medium']),
        finish: 'Glazed Shell & 3D Art',
        stock: 52,
        isNewLaunch: false,
        isFeatured: true,
        rating: 4.8,
        ratingCount: 172,
      },
    }),

    // Set 9: Magenta Watercolor Flame & 3D Bloom Set (nails 5.1)
    prisma.product.create({
      data: {
        name: 'Magenta Watercolor Flame & 3D Bloom Set',
        slug: 'magenta-watercolor-flame-bloom-set',
        description: 'Translucent nude almond canvas crowned with artistic watercolor bleed magenta flame tips and an ornate 3D white petal flower accent with gold beaded center.',
        category: 'Press-On Nail Sets',
        price: 1299,
        originalPrice: 1799,
        images: JSON.stringify([
          '/images/products/nails5.1.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Coffin']),
        lengths: JSON.stringify(['Medium', 'Long']),
        finish: 'Watercolor & 3D Art',
        stock: 40,
        isNewLaunch: false,
        isFeatured: true,
        rating: 4.7,
        ratingCount: 98,
      },
    }),

    // Set 10: Retro Polka Dot French & 3D Flower Set (nails 6.2)
    prisma.product.create({
      data: {
        name: 'Retro Polka Dot French & 3D Flower Set',
        slug: 'retro-polka-dot-french-flower-set',
        description: 'Chic modern French tips with retro monochrome black-and-white polka dot detailing, sheer pink nailbed base, and a handcrafted 3D floral focal point on the accent nail.',
        category: 'Minimalist & Everyday Sets',
        price: 1199,
        originalPrice: 1599,
        images: JSON.stringify([
          '/images/products/nails6.2.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Square', 'Short Round']),
        lengths: JSON.stringify(['Short', 'Medium']),
        finish: 'Glossy & 3D Art',
        stock: 60,
        isNewLaunch: false,
        isFeatured: true,
        rating: 4.8,
        ratingCount: 145,
      },
    }),

    // Set 11: Bespoke Handcrafted Nail Duo Box Set (nails 12.1 & 12.2)
    prisma.product.create({
      data: {
        name: 'Bespoke Handcrafted Nail Duo Box Set',
        slug: 'bespoke-handcrafted-duo-box-set',
        description: 'Curated double set of handcrafted press-on nails custom-fitted in a luxury transparent jewelry case. Choose your favorite two designs for seamless everyday and event style swaps.',
        category: 'Combo Kits',
        price: 2499,
        originalPrice: 3499,
        images: JSON.stringify([
          '/images/products/nails12.1.jpg',
          '/images/products/nails12.2.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Coffin', 'Square']),
        lengths: JSON.stringify(['Medium', 'Long']),
        finish: 'Custom Art Finishes',
        stock: 25,
        isNewLaunch: true,
        isFeatured: true,
        rating: 5.0,
        ratingCount: 88,
      },
    }),

    // Set 12: Handcrafted Salon Artistry Trio Collection (nails 7.1)
    prisma.product.create({
      data: {
        name: 'Handcrafted Salon Artistry Trio Collection',
        slug: 'salon-artistry-trio-collection',
        description: 'The ultimate Sleek Polish collector bundle featuring three full handcrafted sets (Retro Polka Dot, Baby Pink Glazed Swirl, and Magenta Watercolor Flame). Photographed poolside with traditional bridal henna artistry. Includes application kit, builder gel adhesive, and prep tools.',
        category: 'Combo Kits',
        price: 2999,
        originalPrice: 4299,
        images: JSON.stringify([
          '/images/products/nails7.1.jpg',
        ]),
        shapes: JSON.stringify(['Almond', 'Coffin']),
        lengths: JSON.stringify(['Medium', 'Long']),
        finish: 'Complete Multi-Set Art',
        stock: 20,
        isNewLaunch: true,
        isFeatured: true,
        rating: 5.0,
        ratingCount: 64,
      },
    }),
  ]);
  console.log('✅ 12 authentic nail products created');

  // 12 Portfolio Items with 100% Authentic Sleek Polish Nail Art Photography
  await prisma.portfolioItem.createMany({
    data: [
      {
        title: 'Wild Glamour Leopard & 3D Gold Cuffs',
        imageUrl: '/images/portfolio/nails2.1.jpg',
        category: 'Minimalist & Glam',
        shape: 'Almond',
        length: 'Medium',
        description: 'Official Sleek & Polish signature card set with hand-painted leopard spots, rose gold shimmer, and 3D gold ring cuffs.',
        linkedProductId: products[0].id,
      },
      {
        title: 'Royal Peacock & Oxidized Silver Set',
        imageUrl: '/images/portfolio/nails1.1.jpg',
        category: 'Bridal & Festive',
        shape: 'Almond',
        length: 'Long',
        description: 'Royal navy handcrafted press-on nails with authentic 3D oxidized silver peacock charms and ethnic mandala art.',
        linkedProductId: products[1].id,
      },
      {
        title: 'Rose Quartz Shimmer & Chunky 3D Gold Cuffs',
        imageUrl: '/images/portfolio/nails11.1.jpg',
        category: '3D & Charms',
        shape: 'Almond',
        length: 'Long',
        description: 'Rose gold cat-eye velvet press-ons with chunky gold wire ring cuffs and sculpted white florets in clear display box.',
        linkedProductId: products[2].id,
      },
      {
        title: 'Sunlit Lemon French & 3D Star Flower',
        imageUrl: '/images/portfolio/nails9.1.jpg',
        category: 'French Tips',
        shape: 'Almond',
        length: 'Medium',
        description: 'Pastel yellow French smile lines with dimensional 3D star flower and magenta beads on official Sleek & Polish card.',
        linkedProductId: products[3].id,
      },
      {
        title: 'Liquid Gold Mirror Chrome & Royal Crest',
        imageUrl: '/images/portfolio/nails8.1.jpg',
        category: 'Chrome & Glaze',
        shape: 'Almond',
        length: 'Medium',
        description: 'Liquid mirror chrome finish with hand-twisted wire monogram crest and crystal rhinestone cuticle embellishment.',
        linkedProductId: products[4].id,
      },
      {
        title: 'Espresso Mocha & Cream Velvet Cuff',
        imageUrl: '/images/portfolio/nails10.1.jpg',
        category: 'Seasonal',
        shape: 'Almond',
        length: 'Medium',
        description: 'Warm chocolate espresso paired with cream cat-eye velvet shimmer and sculptural chunky 3D gold ring cuff.',
        linkedProductId: products[5].id,
      },
      {
        title: 'Champagne Velvet Cat-Eye & 3D White Flower',
        imageUrl: '/images/portfolio/nails3.1.jpg',
        category: 'Minimalist',
        shape: 'Almond',
        length: 'Medium',
        description: 'Subtle nude magnetic cat-eye with 3D sculpted blossom petals and micro glitter wire arches.',
        linkedProductId: products[6].id,
      },
      {
        title: 'Baby Pink Glazed Swirl & 3D Hibiscus',
        imageUrl: '/images/portfolio/nails4.1.jpg',
        category: '3D & Charms',
        shape: 'Almond',
        length: 'Short',
        description: 'Glazed shell texture swirl with 3D sculpted hibiscus flower on baby pink French tips.',
        linkedProductId: products[7].id,
      },
      {
        title: 'Magenta Watercolor Flame & 3D Bloom',
        imageUrl: '/images/portfolio/nails5.1.jpg',
        category: 'Seasonal',
        shape: 'Almond',
        length: 'Medium',
        description: 'Watercolor bleed magenta flame tips with delicate 3D center flower on sheer almond canvas.',
        linkedProductId: products[8].id,
      },
      {
        title: 'Retro Polka Dot French Tips',
        imageUrl: '/images/portfolio/nails6.2.jpg',
        category: 'French Tips',
        shape: 'Almond',
        length: 'Short',
        description: 'Monochrome black-and-white polka dot French tips with 3D center petal accent on official brand card.',
        linkedProductId: products[9].id,
      },
      {
        title: 'Bespoke Studio Edition Handcrafted Set',
        imageUrl: '/images/portfolio/nails12.1.jpg',
        category: 'Bridal & Festive',
        shape: 'Almond',
        length: 'Long',
        description: 'Custom-sculpted bespoke press-on set designed and curated in our luxury clear case.',
        linkedProductId: products[10].id,
      },
      {
        title: 'Bridal Henna & Handcrafted Press-On Trio',
        imageUrl: '/images/portfolio/nails7.1.jpg',
        category: 'Bridal & Festive',
        shape: 'Almond',
        length: 'Medium',
        description: 'Three handcrafted sets displayed poolside alongside traditional bridal henna artistry.',
        linkedProductId: products[11].id,
      },
    ],
  });
  console.log('✅ 12 authentic portfolio items created');

  // 2 Sample Orders
  await prisma.order.createMany({
    data: [
      {
        orderNumber: 'SPB-2026-1001',
        userId: customer.id,
        customerName: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+919876543211',
        address: '42, Rose Garden Apartments, MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        itemsJson: JSON.stringify([
          { productId: products[0].id, name: 'Wild Glamour Leopard & 3D Gold Cuffs Set', price: 1499, quantity: 1, shape: 'Almond', length: 'Medium', size: 'M' },
          { productId: products[3].id, name: 'Sunlit Lemon French & 3D Star Flower Set', price: 1399, quantity: 1, shape: 'Almond', length: 'Medium', size: 'M' },
        ]),
        subtotal: 2898,
        discount: 289.8,
        prepaidDiscount: 130.41,
        promoCode: 'SLEEK10',
        total: 2477.79,
        paymentMethod: 'PREPAID',
        paymentStatus: 'PAID',
        orderStatus: 'SHIPPED',
        trackingNumber: 'DTDC1234567890',
        estimatedDelivery: '2026-11-28',
      },
      {
        orderNumber: 'SPB-2026-1002',
        userId: null,
        customerName: 'Ananya Verma',
        email: 'ananya@example.com',
        phone: '+919876543212',
        address: '15, Lajpat Nagar, Block B',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110024',
        itemsJson: JSON.stringify([
          { productId: products[1].id, name: 'Royal Peacock & Oxidized Silver Luxe Set', price: 1899, quantity: 1, shape: 'Almond', length: 'Long', size: 'S' },
        ]),
        subtotal: 1899,
        discount: 0,
        prepaidDiscount: 0,
        total: 1899,
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        orderStatus: 'HANDCRAFTING',
      },
    ],
  });
  console.log('✅ 2 sample orders created');

  // Sample Reviews
  await prisma.review.createMany({
    data: [
      { productId: products[0].id, userId: customer.id, userName: 'Priya S.', rating: 5, comment: 'The 3D gold cuffs and leopard print look exactly like the photos! Got non-stop compliments all evening.' },
      { productId: products[0].id, userName: 'Meera K.', rating: 5, comment: 'Best press-ons in India! The gel quality is so sturdy and reusable.' },
      { productId: products[1].id, userName: 'Riya P.', rating: 5, comment: 'The peacock oxidized silver charms are authentic and regal. Wore these for my sister’s sangeet!' },
      { productId: products[2].id, userName: 'Sneha M.', rating: 5, comment: 'The rose gold cat-eye with chunky cuffs is next level. Feels like ₹5,000 salon nails.' },
      { productId: products[3].id, userName: 'Aisha T.', rating: 5, comment: 'The 3D star flower is sculpted to perfection. Super lightweight and easy to wear.' },
      { productId: products[4].id, userName: 'Kavya R.', rating: 5, comment: 'True mirror chrome! Reflects like pure liquid gold.' },
      { productId: products[5].id, userName: 'Divya L.', rating: 5, comment: 'The espresso mocha and velvet shimmer is so chic and classy.' },
    ],
  });
  console.log('✅ Sample reviews created');

  // Sample Booking
  await prisma.booking.create({
    data: {
      bookingType: 'STUDIO',
      name: 'Neha Kapoor',
      email: 'neha@example.com',
      phone: '+919322118970',
      service: 'Bridal Nails Consultation',
      preferredDate: '2026-12-15',
      preferredTime: '11:00 AM',
      notes: 'Looking for a custom bridal peacock and gold set matching my lehenga',
      status: 'PENDING',
      confirmationId: 'BK-2026-0001',
    },
  });
  console.log('✅ Sample booking created');

  console.log('🎉 Seeding complete with 100% authentic Sleek Polish nail designs!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
