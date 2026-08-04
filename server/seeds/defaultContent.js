const shopify = 'https://www.omichef.com';

export const defaultContent = {
  brand: {
    name: 'OmiChef Business',
    eyebrow: 'Wholesale cookware for growing businesses',
    announcement: 'Bulk pricing • Pan-India supply • Dedicated account support',
    logo: '/images/omichef-mark.webp'
  },
  theme: {
    rust: '#9b3f1d',
    rustDark: '#793016',
    cream: '#f7f1e7',
    creamDeep: '#eee4d5',
    navy: '#294355',
    charcoal: '#20252a',
    white: '#ffffff',
    peach: '#edc09e'
  },
  hero: {
    eyebrow: 'B2B cookware procurement, simplified',
    title: 'Premium OmiChef cookware, priced and packed for business.',
    description:
      'Source cookware in bundles for retail, hospitality, corporate gifting, marketplaces and institutional kitchens. Tell us your required mix and volume; our team will prepare a tailored commercial quote.',
    primaryLabel: 'Request bulk pricing',
    primaryLink: '/contact#quote',
    secondaryLabel: 'Explore collections',
    secondaryLink: '/collections',
    image: '/images/hero-cookware.webp',
    trustLine: 'Triply steel • Cast iron • Non-stick triply • Drinkware • Pressure cookers'
  },
  stats: [
    { value: '6+', label: 'Core product collections' },
    { value: '10,000+', label: 'Customers served by OmiChef' },
    { value: '5 Year', label: 'Warranty on selected cookware' },
    { value: 'Pan India', label: 'Business supply support' }
  ],
  buyerSegments: [
    {
      icon: 'Store',
      title: 'Retailers & Distributors',
      text: 'Build a cookware assortment with flexible collection mixes and repeat-order support.'
    },
    {
      icon: 'Hotel',
      title: 'Hotels, Restaurants & Caterers',
      text: 'Source durable cookware for demanding commercial and institutional kitchen use.'
    },
    {
      icon: 'Gift',
      title: 'Corporate Gifting',
      text: 'Create practical premium gift bundles for employees, channel partners and events.'
    },
    {
      icon: 'ShoppingBag',
      title: 'Marketplaces & D2C Brands',
      text: 'Discuss bulk supply, curated bundles and category expansion with our business team.'
    }
  ],
  collectionsIntro: {
    eyebrow: 'OmiChef product range',
    title: 'Choose the collections your customers need.',
    text: 'Browse each live OmiChef collection, then submit your preferred product mix and estimated volume for a business quotation.'
  },
  collections: [
    {
      title: 'Triply Cookware',
      slug: 'triply-cookware',
      description: 'Kadai, frypans, woks, saucepans, casserole pots and cookware sets.',
      image: 'https://www.omichef.com/cdn/shop/files/WhatsApp_Image_2026-05-02_at_17.51.42.jpg?v=1777724753&width=900',
      link: `${shopify}/collections/triply-cookware`,
      tag: 'Best for broad assortments'
    },
    {
      title: 'Non-Stick Triply',
      slug: 'non-stick-triply',
      description: 'Honeycomb kadai and tawa options designed for modern Indian cooking.',
      image: 'https://www.omichef.com/cdn/shop/files/honeycomb.jpg?v=1781679686&width=900',
      link: `${shopify}/collections/honeycomb-triply-cookware`,
      tag: 'Premium modern range'
    },
    {
      title: 'Cast Iron',
      slug: 'cast-iron',
      description: 'Skillets, kadai, dosa tawa, roti tawa and paniyaram pans.',
      image: 'https://www.omichef.com/cdn/shop/files/1_4_9da4ece6-a50a-4b00-887c-2dda493b2b0e.png?v=1781504919&width=900',
      link: `${shopify}/collections/cast-iron`,
      tag: 'Traditional high-retention cookware'
    },
    {
      title: 'Drinkware',
      slug: 'drinkware',
      description: 'Stainless steel bottles and insulated hot-and-cold drinkware.',
      image: '/images/bulk-range.webp',
      link: `${shopify}/collections/drinkware`,
      tag: 'Ideal for gifting and retail'
    },
    {
      title: 'Pressure Cookers',
      slug: 'pressure-cookers',
      description: 'Sandwich-bottom and triply steel pressure cooker options.',
      image: 'https://www.omichef.com/cdn/shop/files/Triply_Steel_Saucepan.jpg?v=1777987307&width=900',
      link: `${shopify}/collections/pressure-cooker`,
      tag: 'Everyday kitchen essential'
    },
    {
      title: 'Cookware Sets',
      slug: 'cookware-sets',
      description: 'Pre-built combinations for gifting, retail shelves and institutional supply.',
      image: '/images/compatibility.webp',
      link: `${shopify}/collections/combo-pack-offer-best-deals-on-omichef-cookware`,
      tag: 'Ready-made bundles'
    }
  ],
  benefits: [
    { title: 'Volume-based quotations', text: 'Pricing is prepared around quantity, mix, delivery location and repeat-order potential.' },
    { title: 'Mixed collection sourcing', text: 'Request multiple cookware categories in one commercial enquiry instead of browsing product by product.' },
    { title: 'Dedicated business support', text: 'A team member reviews requirements, recommends a suitable mix and coordinates next steps.' },
    { title: 'Reliable product standards', text: 'OmiChef focuses on durable materials, modern Indian kitchen compatibility and after-sales support.' },
    { title: 'Business-ready documentation', text: 'Share company, GST and delivery details through the quote form for a faster commercial discussion.' },
    { title: 'Repeat procurement', text: 'The website is structured for long-term retailer, hospitality and institutional relationships.' }
  ],
  process: [
    { step: '01', title: 'Share your requirement', text: 'Select collections, buyer type, expected monthly volume and delivery city.' },
    { step: '02', title: 'Commercial consultation', text: 'Our team validates availability, bundle composition, packaging and business terms.' },
    { step: '03', title: 'Receive your quote', text: 'Get a tailored quotation and discuss samples, timelines or recurring procurement.' },
    { step: '04', title: 'Confirm and fulfil', text: 'Once terms are approved, the team coordinates payment, dispatch and support.' }
  ],
  about: {
    eyebrow: 'About OmiChef',
    title: 'Cookware built around quality, durability and everyday performance.',
    paragraphs: [
      'OmiChef develops premium cookware and kitchen essentials for modern Indian cooking. The range combines practical design, durable materials and compatibility with gas, induction and other common cooktops.',
      'OmiChef Business extends that same product range to retailers, hospitality groups, gifting companies, marketplaces and institutional buyers who need coordinated volume purchasing.'
    ],
    image: '/images/commercial-kitchen.webp'
  },
  supplySection: {
    eyebrow: 'Built for procurement teams',
    title: 'One conversation for your complete cookware requirement.',
    text: 'Use the live Shopify collections to shortlist products, then send us the quantities and business context. The B2B team will help structure an appropriate bundle and quotation.',
    image: '/images/bulk-range.webp'
  },
  faqs: [
    { question: 'What is the minimum order quantity?', answer: 'MOQ depends on the selected products, assortment and delivery requirement. Submit your expected quantity and our team will confirm the most suitable commercial structure.' },
    { question: 'Can I mix products from different collections?', answer: 'Yes. The quote form supports multiple collection selections so retailers and institutions can discuss a mixed cookware bundle.' },
    { question: 'Are prices shown on this B2B website?', answer: 'The live Shopify collection links show retail products and current D2C prices. Wholesale pricing is shared separately after reviewing volume, mix and location.' },
    { question: 'Can I book a call before sending a final requirement?', answer: 'Yes. Use the appointment form to request a phone, video or in-person discussion with the business team.' },
    { question: 'Do you support corporate gifting?', answer: 'Corporate and channel gifting requirements can be discussed, including cookware sets, drinkware and practical kitchen bundles.' }
  ],
  contact: {
    phone: '+91 8147039497',
    email: 'care.omichef@gmail.com',
    address: '574-C, Moti Ram Road, Ram Nagar, Shahdara, Delhi - 110032',
    hours: 'Monday–Saturday, 10:00 AM–6:00 PM',
    appointmentUrl: '',
    whatsappUrl: 'https://wa.me/918147039497',
    d2cUrl: 'https://www.omichef.com/'
  },
  footer: {
    statement: 'Cook better. Source smarter. Grow with OmiChef Business.',
    copyright: 'OmiChef Cookware LLP'
  }
};
