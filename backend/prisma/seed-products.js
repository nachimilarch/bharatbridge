const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
const prisma  = new PrismaClient();

const slug = (name) => slugify(name, { lower: true, strict: true });

async function main() {
  console.log('🌱 Seeding products...\n');

  // ── Step 1: Get existing approved vendor ─────────────────
  let vendor = await prisma.vendor.findFirst({
    where: { isApproved: true },
  });

  // ── Step 2: If none, get ANY vendor ──────────────────────
  if (!vendor) {
    vendor = await prisma.vendor.findFirst();
  }

  // ── Step 3: If no vendor at all, create minimal one ──────
  if (!vendor) {
    console.log('No vendor found — creating minimal demo vendor...');
    const bcrypt = require('bcryptjs');
    const hash   = await bcrypt.hash('Demo@1234', 12);

    // Create user first
    const user = await prisma.user.upsert({
      where:  { email: 'vendor@bharatbridge.com' },
      update: {},
      create: {
        name:         'Raj Kumar',
        email:        'vendor@bharatbridge.com',
        passwordHash: hash,
        role:         'vendor',
      },
    });

    // Create vendor with ONLY fields that exist in your schema
    // (based on error output showing available fields)
    vendor = await prisma.vendor.upsert({
      where:  { userId: user.id },
      update: { isApproved: true },
      create: {
        userId:      user.id,
        companyName: 'Raj Exports Pvt. Ltd.',
        isApproved:  true,
        kycStatus:   'verified',   // adjust if your enum is uppercase
      },
    });

    console.log('✅ Demo vendor created, id:', vendor.id);
  }

  console.log(`✅ Using vendor: "${vendor.companyName}" (id: ${vendor.id})\n`);

  // ── Step 4: Categories ────────────────────────────────────
  const CATS = [
    { name: 'Indian Spices',        slug: 'indian-spices'        },
    { name: 'Agriculture Products', slug: 'agriculture-products' },
    { name: 'Textiles & Fabrics',   slug: 'textiles-fabrics'     },
    { name: 'Pharmaceuticals',      slug: 'pharmaceuticals'      },
    { name: 'Herbal Products',      slug: 'herbal-products'      },
    { name: 'Handicrafts',          slug: 'handicrafts'          },
    { name: 'Ayurvedic Products',   slug: 'ayurvedic-products'   },
    { name: 'Food Processing',      slug: 'food-processing'      },
    { name: 'Industrial Goods',     slug: 'industrial-goods'     },
    { name: 'Chemicals',            slug: 'chemicals'            },
  ];

  const catMap = {};
  for (const cat of CATS) {
    const c = await prisma.category.upsert({
      where:  { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug },
    });
    catMap[cat.slug] = c.id;
  }
  console.log('✅ Categories ready\n');

  // ── Step 5: Products ──────────────────────────────────────
  const PRODUCTS = [
    // SPICES
    {
      name:            'Premium Turmeric Powder (Curcumin 3%)',
      category:        'indian-spices',
      basePriceInr:    180,
      unit:            'KG',
      minOrderQty:     100,
      isFeatured:      true,
      description:     'FSSAI & USDA Organic certified turmeric powder with minimum 3% curcumin content. Sourced from Erode, Tamil Nadu. Available in 25kg, 50kg, and bulk bags.',
      image:           'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80',
    },
    {
      name:            'Whole Black Pepper (TGSEB Grade)',
      category:        'indian-spices',
      basePriceInr:    620,
      unit:            'KG',
      minOrderQty:     50,
      isFeatured:      true,
      description:     'Premium Kerala black pepper, TGSEB grade. Hand-picked from Wayanad and Idukki districts. Strong aroma, high piperine content.',
      image:           'https://images.unsplash.com/photo-1588514912908-3f1bfb544c37?w=600&q=80',
    },
    {
      name:            'Green Cardamom Bold (8mm)',
      category:        'indian-spices',
      basePriceInr:    2800,
      unit:            'KG',
      minOrderQty:     25,
      isFeatured:      true,
      description:     'Premium green cardamom sourced from Idukki high-altitude farms of Kerala. Bold 8mm pods with intense aroma and high volatile oil content.',
      image:           'https://images.unsplash.com/photo-1632467829665-49c2eba35f43?w=600&q=80',
    },
    {
      name:            'Cumin Seeds European Grade',
      category:        'indian-spices',
      basePriceInr:    340,
      unit:            'KG',
      minOrderQty:     100,
      isFeatured:      true,
      description:     'Machine cleaned, sortex cleaned cumin seeds from Unjha, Gujarat — the world\'s largest cumin trading hub. EU export grade, low moisture.',
      image:           'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
    },
    // AGRICULTURE
    {
      name:            'Basmati Rice 1121 Extra Long Grain',
      category:        'agriculture-products',
      basePriceInr:    95,
      unit:            'KG',
      minOrderQty:     1000,
      isFeatured:      true,
      description:     'Premium 1121 Basmati Rice with extra-long grain (8.4mm+). Aged 12 months for maximum aroma. Available in custom private label packaging.',
      image:           'https://images.unsplash.com/photo-1536304993881-ff86e0c9b4a5?w=600&q=80',
    },
    {
      name:            'Organic Moringa Leaf Powder',
      category:        'agriculture-products',
      basePriceInr:    420,
      unit:            'KG',
      minOrderQty:     50,
      isFeatured:      true,
      description:     'USDA & EU Organic certified moringa leaf powder. Spray-dried. High protein, vitamins, and minerals. Premium nutraceutical grade.',
      image:           'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80',
    },
    {
      name:            'Dried Red Chilli Teja S17',
      category:        'agriculture-products',
      basePriceInr:    165,
      unit:            'KG',
      minOrderQty:     200,
      isFeatured:      false,
      description:     'Teja S17 dried red chilli from Guntur, Andhra Pradesh. High ASTA color value (160+). Used in sauces, spice blends, and oleoresins.',
      image:           'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=80',
    },
    // TEXTILES
    {
      name:            'Pure Cotton Cambric Fabric 60x60',
      category:        'textiles-fabrics',
      basePriceInr:    85,
      unit:            'Meter',
      minOrderQty:     500,
      isFeatured:      true,
      description:     'Premium 60x60 count pure cotton cambric fabric from Surat. Soft texture, excellent print base. OCS certified. For garments, bed linen, and home textiles.',
      image:           'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    },
    {
      name:            'Handloom Kantha Silk Stole',
      category:        'textiles-fabrics',
      basePriceInr:    1200,
      unit:            'Pieces',
      minOrderQty:     50,
      isFeatured:      false,
      description:     'Hand-embroidered pure silk Kantha stoles from West Bengal artisans. GI tagged. Traditional running stitch on pure mulberry silk.',
      image:           'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    },
    // PHARMACEUTICALS
    {
      name:            'Paracetamol 500mg Tablets (WHO-GMP)',
      category:        'pharmaceuticals',
      basePriceInr:    12,
      unit:            'Strip',
      minOrderQty:     10000,
      isFeatured:      true,
      description:     'WHO-GMP certified paracetamol 500mg tablets. USFDA-inspected facility. Custom packaging and private label for international distributors.',
      image:           'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    },
    // HERBAL
    {
      name:            'Ashwagandha Root Extract 5% Withanolides',
      category:        'herbal-products',
      basePriceInr:    1800,
      unit:            'KG',
      minOrderQty:     25,
      isFeatured:      true,
      description:     'Standardized ashwagandha root extract, 5% withanolides by HPLC. Water and ethanol soluble grades. Kosher, Halal, USDA Organic certified.',
      image:           'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    },
    {
      name:            'Cold Pressed Neem Oil 100% Pure',
      category:        'herbal-products',
      basePriceInr:    280,
      unit:            'Liter',
      minOrderQty:     100,
      isFeatured:      false,
      description:     'Pure cold-pressed neem oil. High azadirachtin content (3000-5000 ppm). OMRI listed. Used in organic farming, cosmetics, and biopesticides.',
      image:           'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
    },
    // AYURVEDIC
    {
      name:            'Triphala Churna Ayurvedic Powder',
      category:        'ayurvedic-products',
      basePriceInr:    320,
      unit:            'KG',
      minOrderQty:     50,
      isFeatured:      true,
      description:     'Classical Ayurvedic Triphala — equal parts Amalaki, Bibhitaki, Haritaki. Ayush GMP certified. Available bulk powder or private label capsules.',
      image:           'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600&q=80',
    },
    // HANDICRAFTS
    {
      name:            'Hand-Painted Madhubani Art Set of 3',
      category:        'handicrafts',
      basePriceInr:    2400,
      unit:            'Set',
      minOrderQty:     20,
      isFeatured:      true,
      description:     'Authentic Madhubani paintings from Mithila, Bihar. GI tagged. Hand-painted on handmade paper with natural colors by master artisans.',
      image:           'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=600&q=80',
    },
    {
      name:            'Brass Dhokra Elephant Figurine',
      category:        'handicrafts',
      basePriceInr:    3500,
      unit:            'Pieces',
      minOrderQty:     24,
      isFeatured:      false,
      description:     'Traditional Dhokra lost wax casting brass elephant from Bastar artisans. Antique finish. Popular in European and US home décor markets.',
      image:           'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    },
    {
      name:            'Handwoven Jute Eco Shopping Bags',
      category:        'handicrafts',
      basePriceInr:    185,
      unit:            'Pieces',
      minOrderQty:     200,
      isFeatured:      false,
      description:     'Eco-friendly handwoven jute bags from Kolkata. Natural golden jute fiber. Custom logo printing available. Popular with European sustainable retail brands.',
      image:           'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    },
    // FOOD PROCESSING
    {
      name:            'Alphonso Mango Pulp Kesar Grade',
      category:        'food-processing',
      basePriceInr:    95,
      unit:            'KG',
      minOrderQty:     500,
      isFeatured:      true,
      description:     'FSSAI & EU certified Alphonso mango pulp. TSS 16-18° Brix. No artificial color or preservatives. Aseptic and tin pack options available.',
      image:           'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80',
    },
    {
      name:            'Freeze-Dried Coconut Milk Powder',
      category:        'food-processing',
      basePriceInr:    680,
      unit:            'KG',
      minOrderQty:     100,
      isFeatured:      false,
      description:     'Premium freeze-dried coconut milk powder from Kerala. 65% fat content. Vegan, dairy-free. Used in food manufacturing, bakeries, and beverages.',
      image:           'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    },
    // INDUSTRIAL
    {
      name:            'Steel Wire Rod 5.5mm IS 1786',
      category:        'industrial-goods',
      basePriceInr:    58,
      unit:            'KG',
      minOrderQty:     10000,
      isFeatured:      false,
      description:     'IS:1786 grade steel wire rod 5.5mm diameter. Produced in integrated steel plant. Used for wire drawing, fasteners, springs, and construction mesh.',
      image:           'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    },
    // CHEMICALS
    {
      name:            'Reactive Dyes for Cotton Cold Brand',
      category:        'chemicals',
      basePriceInr:    850,
      unit:            'KG',
      minOrderQty:     50,
      isFeatured:      false,
      description:     'High fixation cold-brand reactive dyes for cotton. Full color range. REACH compliant. Used by textile mills for fabric and yarn dyeing.',
      image:           'https://images.unsplash.com/photo-1609205807107-2f4e8b4f44c0?w=600&q=80',
    },
  ];

  // ── Step 6: Insert products ───────────────────────────────
  let created = 0;
  let skipped = 0;

  for (const p of PRODUCTS) {
    const productSlug = slug(p.name);
    const existing    = await prisma.product.findUnique({ where: { slug: productSlug } });

    if (existing) {
      console.log(`⏭  Skipping (exists): ${p.name}`);
      skipped++;
      continue;
    }

    try {
    await prisma.product.create({
      data: {
        name:         p.name,
        slug:         productSlug,
        description:  p.description,
        basePriceInr: p.basePriceInr,
        unit:         p.unit,
        minOrderQty:  p.minOrderQty,
        isFeatured:   p.isFeatured,
        isPublished:  true,            // ✅ your schema field (not isActive)
        vendorId:     vendor.id,
        categoryId:   catMap[p.category],
        images: {
          create: [{ url: p.image }],
        },
      },
    });
      console.log(`✅ ${p.name}`);
      created++;
    } catch (err) {
      console.error(`❌ Failed: ${p.name} →`, err.message);
    }
  }

  console.log(`\n🎉 Done! Created ${created} | Skipped ${skipped}`);
  console.log(`📦 Total in DB: ${await prisma.product.count()}`);
}

main()
  .catch((e) => { console.error('\n❌ Fatal:', e.message); process.exit(1); })
  .finally(()  => prisma.$disconnect());
