import yonexAstrox99 from "../assets/products/Yonex Astrox 99.png"
import victorThrusterK900 from "../assets/products/Victor Thruster K9000.png"
import liNingWindstorm72 from "../assets/products/Li-Ning Windstorm 72.png"
import carltonPowerbladeSuperlite from "../assets/products/Carlton Powerblade Superlite.png"
import yonexAerosensa50 from "../assets/products/Yonex Aerosensa 50.png"
import liNingGripMasterPro from "../assets/products/Li-Ning Grip Master Pro.png"
import victorProBadmintonBag from "../assets/products/Victor Pro Badminton Bag.png"
import yonexPowerCushion from "../assets/products/Yonex Power Cushion 65 Z2.png"
import victorA922Ace from "../assets/products/Victor A922 Ace.png"
import liNingRangerTD from "../assets/products/Li-Ning Ranger TD.png"
import yonexTournamentShirt from "../assets/products/Yonex Tournament Shirt.png"
import victorTeamShorts from "../assets/products/Victor Team Shorts.png"
import liNingPerformanceSkirt from "../assets/products/Li-Ning Performance Skirt.png"
import yonexTeamTracksuit from "../assets/products/Yonex Team Tracksuit.png"

// Product database with all products
const products = [
  // Rackets
  {
    id: 1,
    name: "Yonex Astrox 99",
    description:
      "Professional racket designed for speed and control. Lightweight, durable, and perfect for quick plays.",
    longDescription: `
      The Yonex Astrox 99 is engineered for players who value speed and precision in their game. Featuring a lightweight carbon fiber frame and an aerodynamic design, this racket allows for quick movements and rapid response during fast-paced rallies.

      The balanced weight distribution provides excellent control without sacrificing power, making it suitable for both offensive and defensive play styles. The string tension can be customized between 20-30 lbs to match your preferred playing characteristics.

      With its durable construction and premium materials, this racket is built to last through countless matches and practice sessions. The comfortable grip reduces hand fatigue during extended play, allowing you to maintain peak performance throughout your game.
    `,
    price: 200.0,
    originalPrice: 300.0,
    rating: 4.8,
    reviewCount: 120,
    image: yonexAstrox99,
    category: "Rackets",
    features: [
      "Lightweight carbon fiber frame",
      "Aerodynamic design for faster swings",
      "Balanced weight distribution",
      "Customizable string tension (20-30 lbs)",
      "Premium grip for comfort and control",
    ],
    specifications: {
      weight: "85g (±2g)",
      length: "675mm",
      balance: "285mm",
      material: "High Modulus Graphite",
      stringPattern: "22 × 21",
      maxTension: "30 lbs",
    },
    stock: 15,
    relatedProducts: [2, 6, 9],
  },
  {
    id: 2,
    name: "Victor Thruster K9000",
    description:
      "Professional grade racket with carbon fiber frame. Exceptional power and precision for competitive play.",
    longDescription: `
      The Victor Thruster K9000 is our flagship model designed for competitive players who demand the best. This professional-grade racket features an advanced carbon fiber frame reinforced with titanium for unmatched durability and performance.

      The head-heavy balance provides exceptional power for smashes and clears, while the stiff shaft ensures precise control for drop shots and net play. The aerodynamic frame reduces air resistance, allowing for faster swing speeds and quicker reactions.

      Used by several professional players on the international circuit, the Victor Thruster K9000 is the choice for serious badminton enthusiasts who want to elevate their game to the next level.
    `,
    price: 250.0,
    originalPrice: 350.0,
    rating: 4.9,
    reviewCount: 98,
    image: victorThrusterK900,
    category: "Rackets",
    features: [
      "Professional-grade carbon fiber frame",
      "Titanium reinforced construction",
      "Head-heavy balance for powerful smashes",
      "Stiff shaft for precise control",
      "Premium string included",
    ],
    specifications: {
      weight: "88g (±2g)",
      length: "675mm",
      balance: "290mm (head-heavy)",
      material: "Carbon Fiber with Titanium Mesh",
      stringPattern: "24 × 22",
      maxTension: "35 lbs",
    },
    stock: 8,
    relatedProducts: [1, 6, 9],
  },
  {
    id: 6,
    name: "Li-Ning Windstorm 72",
    description: "Ideal racket for beginners and training sessions. Balanced weight and durability.",
    longDescription: `
      The Li-Ning Windstorm 72 is designed specifically for players who are new to badminton or looking for a reliable training racket. With its evenly balanced weight distribution, this racket offers excellent maneuverability and control, making it easier for beginners to develop proper technique.

      The frame is constructed from a durable aluminum-carbon composite that can withstand the rigors of regular practice and accidental impacts that often occur during the learning process. The medium-flex shaft provides a good combination of power and control, allowing players to execute a variety of shots effectively.

      The comfortable grip and forgiving sweet spot make this racket an ideal choice for players who are still developing their skills or for casual players who want a dependable racket for recreational play.
    `,
    price: 120.0,
    originalPrice: 180.0,
    rating: 4.5,
    reviewCount: 134,
    image: liNingWindstorm72,
    category: "Rackets",
    features: [
      "Aluminum-carbon composite frame",
      "Medium-flex shaft",
      "Evenly balanced design",
      "Enlarged sweet spot for beginners",
      "Comfortable non-slip grip",
    ],
    specifications: {
      weight: "92g (±2g)",
      length: "675mm",
      balance: "Even balance",
      material: "Aluminum-Carbon Composite",
      stringPattern: "22 × 21",
      maxTension: "28 lbs",
    },
    stock: 25,
    relatedProducts: [1, 2, 9],
  },
  {
    id: 9,
    name: "Carlton Powerblade Superlite",
    description: "Ultra-lightweight racket for fast-paced play. Ideal for doubles specialists and defensive players.",
    longDescription: `
      The Carlton Powerblade Superlite is engineered for players who prioritize speed and maneuverability in their game. At just 80g, this is one of the lightest rackets in our collection, designed to give players lightning-fast reaction times and effortless handling.

      The head-light balance makes it exceptionally easy to maneuver, perfect for defensive players who need to react quickly or doubles specialists who require rapid exchanges at the net. Despite its lightweight construction, the isometric head shape provides a generous sweet spot for consistent power delivery.

      The flexible shaft adds extra whip to your shots, generating power through speed rather than weight. This makes the Powerblade Superlite particularly effective for players with a technical playing style who rely on finesse and placement rather than raw power.
    `,
    price: 170.0,
    originalPrice: 220.0,
    rating: 4.7,
    reviewCount: 76,
    image: carltonPowerbladeSuperlite,
    category: "Rackets",
    features: [
      "Ultra-lightweight design (80g)",
      "Head-light balance for quick handling",
      "Isometric head shape for larger sweet spot",
      "Flexible shaft for added whip",
      "Nano-resin coating for durability",
    ],
    specifications: {
      weight: "80g (±2g)",
      length: "675mm",
      balance: "Head-light",
      material: "Nano Carbon Fiber",
      stringPattern: "22 × 21",
      maxTension: "26 lbs",
    },
    stock: 12,
    relatedProducts: [1, 2, 6],
  },

  // Shuttlecocks and Accessories
  {
    id: 3,
    name: "Yonex Aerosensa 50",
    description: "Tournament grade feather shuttlecocks with excellent flight stability. Pack of 12.",
    longDescription: `
      The Yonex Aerosensa 50 shuttlecocks represent the pinnacle of badminton shuttle technology, designed for tournament play and serious training sessions. Each shuttle features premium goose feathers that are carefully selected and processed to ensure consistent flight characteristics and durability.

      The cork base is precision-engineered to provide stable flight paths and optimal speed, while the special feather treatment helps resist moisture and extends the life of each shuttlecock. The Aerosensa 50 shuttles are calibrated for medium speed, making them suitable for a wide range of playing conditions.

      Used in international tournaments around the world, these shuttlecocks deliver the performance that competitive players demand, with predictable flight patterns that allow for precise shot placement and control.
    `,
    price: 30.0,
    originalPrice: 45.0,
    rating: 4.7,
    reviewCount: 203,
    image: yonexAerosensa50,
    category: "Accessories",
    features: [
      "Premium goose feathers",
      "Precision-engineered cork base",
      "Consistent flight characteristics",
      "Medium speed calibration",
      "Special moisture-resistant treatment",
    ],
    specifications: {
      type: "Feather",
      quantity: "Tube of 12",
      speed: "Medium",
      grade: "Tournament",
      featherType: "Premium goose feathers",
      corkBase: "Natural cork",
    },
    stock: 50,
    relatedProducts: [4, 7],
  },
  {
    id: 4,
    name: "Li-Ning Grip Master Pro",
    description: "Premium grip tape for maximum comfort and sweat absorption. Pack of 3.",
    longDescription: `
      The Li-Ning Grip Master Pro is designed for players who demand the best in comfort and performance from their racket grip. This premium grip tape features a unique honeycomb texture that provides exceptional tack and feel, ensuring your racket stays firmly in your hand during even the most intense rallies.

      The advanced moisture-wicking material rapidly absorbs sweat to maintain a dry, non-slip surface throughout your game. With its optimal 2mm thickness, the Grip Master Pro adds just the right amount of cushioning to reduce hand fatigue and prevent blisters during extended play sessions.

      Each pack contains three grip tapes in different colors, allowing you to customize your racket's appearance while enjoying professional-grade performance. The easy application design includes an adhesive backing that prevents slipping and ensures a secure fit on any racket handle.
    `,
    price: 15.0,
    originalPrice: 22.0,
    rating: 4.6,
    reviewCount: 155,
    image: liNingGripMasterPro,
    category: "Accessories",
    features: [
      "Honeycomb texture for enhanced grip",
      "Advanced moisture-wicking material",
      "Optimal 2mm cushioning",
      "Easy application design",
      "Pack of 3 in assorted colors",
    ],
    specifications: {
      material: "Polyurethane with cotton backing",
      thickness: "2mm",
      length: "1100mm",
      width: "25mm",
      colors: "Black, Blue, Red",
      adhesiveType: "Premium tacky adhesive",
    },
    stock: 100,
    relatedProducts: [3, 7],
  },
  {
    id: 7,
    name: "Victor Pro Badminton Bag",
    description: "Spacious bag with multiple compartments for rackets, shoes, and accessories.",
    longDescription: `
      The Victor Pro Badminton Bag is the ultimate carrying solution for serious players who need to transport all their equipment safely and conveniently. This premium bag features a spacious main compartment that can hold up to 6 rackets in the dedicated padded section, protecting your valuable equipment from damage.

      The thermal-lined shoe compartment keeps footwear separate from your other gear and helps contain odors, while the multiple accessory pockets provide organized storage for shuttlecocks, grip tapes, water bottles, and personal items. The moisture-resistant outer fabric protects your equipment from light rain and spills.

      Designed with comfort in mind, the bag features ergonomic padded shoulder straps and a reinforced handle, making it easy to carry even when fully loaded. The sleek design with reflective details not only looks professional but also enhances visibility in low-light conditions.
    `,
    price: 80.0,
    originalPrice: 120.0,
    rating: 4.7,
    reviewCount: 92,
    image: victorProBadmintonBag,
    category: "Accessories",
    features: [
      "Holds up to 6 rackets in padded compartment",
      "Thermal-lined shoe compartment",
      "Multiple accessory pockets",
      "Moisture-resistant outer fabric",
      "Ergonomic padded shoulder straps",
    ],
    specifications: {
      dimensions: "75cm x 32cm x 28cm",
      material: "600D Polyester with PU coating",
      capacity: "45 liters",
      weight: "1.2kg",
      compartments: "3 main + 5 accessory pockets",
      warranty: "1 year manufacturer warranty",
    },
    stock: 18,
    relatedProducts: [3, 4],
  },
 
  // Footwear
  {
    id: 5,
    name: "Yonex Power Cushion 65 Z2",
    description: "Lightweight badminton shoes with excellent court grip and ankle support.",
    longDescription: `
      The Yonex Power Cushion 65 Z2 shoes represent the perfect balance of speed, stability, and comfort for serious badminton players. The innovative Power Cushion+ technology in the midsole provides exceptional shock absorption while returning energy with each step, reducing fatigue during long matches and training sessions.

      The Tough Guard reinforcement in high-wear areas ensures durability, while the Round Sole design promotes smooth foot movements in all directions, essential for the quick directional changes in badminton. The specially designed non-marking outsole provides excellent grip on indoor court surfaces without leaving marks.

      The breathable mesh upper keeps your feet cool during intense play, while the supportive midfoot structure helps prevent ankle injuries during lateral movements. These shoes are the choice of many professional players for their combination of lightweight design and superior performance features.
    `,
    price: 120.0,
    originalPrice: 180.0,
    rating: 4.8,
    reviewCount: 87,
    image: yonexPowerCushion,
    category: "Footwear",
    features: [
      "Power Cushion+ technology for shock absorption",
      "Tough Guard reinforcement in high-wear areas",
      "Round Sole design for smooth movements",
      "Non-marking gum rubber outsole",
      "Breathable mesh upper",
    ],
    specifications: {
      weight: "305g (size 9 US)",
      upperMaterial: "Synthetic leather and mesh",
      soleMaterial: "Gum rubber",
      cushioning: "Power Cushion+ technology",
      closure: "Lace-up with reinforced eyelets",
      sizes: "US 7-13",
    },
    stock: 12,
    relatedProducts: [8, 11, 12],
  },
  {
    id: 11,
    name: "Victor A922 Ace",
    description: "Professional badminton shoes with advanced cushioning and stability features.",
    longDescription: `
      The Victor A922 Ace shoes are designed for competitive players who demand the highest level of performance from their footwear. The Energy Max cushioning system provides exceptional impact protection while maintaining excellent court feel, allowing for precise movements and quick reactions.

      The Energetic Core in the midsole delivers superior energy return, helping you move more efficiently around the court and reducing fatigue in long matches. The shoe's Lateral Support System provides exceptional stability during side-to-side movements, significantly reducing the risk of ankle injuries.

      The breathable PU leather and mesh upper offers a perfect combination of durability and ventilation, while the specially designed VSAS (Victor Shock Absorbing System) in the heel absorbs impact forces to protect your joints. The durable carbon rubber outsole provides excellent traction on all indoor court surfaces.
    `,
    price: 135.0,
    originalPrice: 190.0,
    rating: 4.7,
    reviewCount: 64,
    image: victorA922Ace,
    category: "Footwear",
    features: [
      "Energy Max cushioning system",
      "Energetic Core for superior energy return",
      "Lateral Support System for stability",
      "VSAS heel protection",
      "Carbon rubber non-marking outsole",
    ],
    specifications: {
      weight: "320g (size 9 US)",
      upperMaterial: "PU leather and mesh",
      soleMaterial: "Carbon rubber",
      cushioning: "Energy Max and VSAS technology",
      closure: "Lace-up with reinforced eyelets",
      sizes: "US 7-12",
    },
    stock: 10,
    relatedProducts: [5, 8, 12],
  },
  {
    id: 12,
    name: "Li-Ning Ranger TD",
    description: "Entry-level badminton shoes with good cushioning and durability at an affordable price.",
    longDescription: `
      The Li-Ning Ranger TD shoes offer excellent value for recreational players and beginners looking for reliable badminton footwear without breaking the bank. These shoes feature Li-Ning's Cushion technology in the midsole that provides adequate shock absorption for casual play and training sessions.

      The synthetic leather and mesh upper offers good breathability and durability, while the anti-slip rubber outsole ensures reliable traction on indoor court surfaces. The reinforced toe cap protects against wear from toe-dragging during lunges and provides additional durability in this high-impact area.

      With their lightweight design and comfortable fit, the Ranger TD shoes are perfect for players who are just getting started in badminton or who play occasionally for fitness and fun. The classic design with subtle Li-Ning branding gives these shoes a clean, professional look.
    `,
    price: 65.0,
    originalPrice: 90.0,
    rating: 4.3,
    reviewCount: 112,
    image: liNingRangerTD,
    category: "Footwear",
    features: [
      "Li-Ning Cushion technology",
      "Synthetic leather and mesh upper",
      "Anti-slip rubber outsole",
      "Reinforced toe cap",
      "Lightweight design",
    ],
    specifications: {
      weight: "290g (size 9 US)",
      upperMaterial: "Synthetic leather and mesh",
      soleMaterial: "Rubber",
      cushioning: "Li-Ning Cushion technology",
      closure: "Lace-up",
      sizes: "US 6-12",
    },
    stock: 25,
    relatedProducts: [5, 8, 11],
  },

  // Apparel
  {
    id: 8,
    name: "Yonex Tournament Shirt",
    description: "Breathable, quick-dry fabric designed for maximum comfort during intense matches.",
    longDescription: `
      The Yonex Tournament Shirt is designed for players who demand the highest level of performance from their apparel. Made with Yonex's advanced Quick-Dry Plus technology, this shirt rapidly wicks moisture away from your skin, keeping you dry and comfortable even during the most intense rallies.

      The lightweight, breathable fabric features strategic ventilation zones that enhance airflow where you need it most, preventing overheating during competitive play. The ergonomic design with 4-way stretch material allows for complete freedom of movement, ensuring that your clothing never restricts your game.

      The anti-odor treatment helps keep the shirt fresh during extended wear, while the UPF 30+ sun protection is beneficial for outdoor training sessions. The slim athletic fit provides a professional appearance without being restrictive, making this the shirt of choice for serious players at all levels.
    `,
    price: 45.0,
    originalPrice: 65.0,
    rating: 4.6,
    reviewCount: 109,
    image: yonexTournamentShirt,
    category: "Apparel",
    features: [
      "Quick-Dry Plus moisture-wicking technology",
      "Strategic ventilation zones",
      "4-way stretch fabric",
      "Anti-odor treatment",
      "UPF 30+ sun protection",
    ],
    specifications: {
      material: "90% Polyester, 10% Elastane",
      fit: "Athletic fit",
      care: "Machine wash cold, tumble dry low",
      sizes: "XS-XXL",
      colors: "Blue, Red, Black, White",
      weight: "120g",
    },
    stock: 30,
    relatedProducts: [13, 14, 15],
  },
  {
    id: 13,
    name: "Victor Team Shorts",
    description: "Lightweight badminton shorts with built-in compression liner for support and comfort.",
    longDescription: `
      The Victor Team Shorts are engineered for serious players who need reliable performance and comfort during intense matches and training sessions. These shorts feature a lightweight outer shell made from quick-drying fabric that won't weigh you down or restrict movement on the court.

      The built-in compression liner provides gentle support for your muscles while ensuring complete coverage during lunges and jumps. The wide elastic waistband with internal drawcord allows for a secure, customizable fit that stays in place during active play.

      Multiple pockets offer convenient storage for shuttlecocks or personal items between games, while the reflective Victor logo adds a touch of style. The durable construction is designed to withstand frequent washing and wear, making these shorts a reliable addition to any player's badminton wardrobe.
    `,
    price: 40.0,
    originalPrice: 55.0,
    rating: 4.5,
    reviewCount: 87,
    image: victorTeamShorts,
    category: "Apparel",
    features: [
      "Lightweight quick-drying outer shell",
      "Built-in compression liner",
      "Wide elastic waistband with drawcord",
      "Multiple pocket design",
      "Reflective branding details",
    ],
    specifications: {
      outerMaterial: "100% Polyester",
      linerMaterial: "85% Polyester, 15% Spandex",
      inseam: "7 inches",
      care: "Machine wash cold, line dry",
      sizes: "S-XXL",
      colors: "Navy, Black, White",
    },
    stock: 25,
    relatedProducts: [8, 14, 15],
  },
  {
    id: 14,
    name: "Li-Ning Performance Skirt",
    description: "Athletic skirt with built-in shorts designed specifically for female badminton players.",
    longDescription: `
      The Li-Ning Performance Skirt combines style and functionality for female badminton players who want both comfort and freedom of movement on the court. The pleated design provides a flattering silhouette while allowing for unrestricted movement during lunges, jumps, and quick directional changes.

      The built-in compression shorts offer coverage and support, while the moisture-wicking fabric keeps you dry and comfortable throughout your match. The wide waistband sits flat against your body to prevent distractions during play, and the internal drawcord ensures a secure fit.

      The lightweight, breathable fabric is designed to move with your body, never against it, making this skirt ideal for competitive play. Available in multiple colors to match team uniforms or personal preference, this performance skirt is a favorite among club and competitive players alike.
    `,
    price: 38.0,
    originalPrice: 50.0,
    rating: 4.7,
    reviewCount: 73,
    image: liNingPerformanceSkirt,
    category: "Apparel",
    features: [
      "Pleated design for unrestricted movement",
      "Built-in compression shorts",
      "Moisture-wicking fabric",
      "Wide, flat waistband with drawcord",
      "Lightweight, breathable construction",
    ],
    specifications: {
      material: "92% Polyester, 8% Spandex",
      length: "14 inches",
      care: "Machine wash cold, line dry",
      sizes: "XS-XL",
      colors: "Black, White, Pink, Navy",
      weight: "135g",
    },
    stock: 20,
    relatedProducts: [8, 13, 15],
  },
  {
    id: 15,
    name: "Yonex Team Tracksuit",
    description: "Professional badminton tracksuit for warm-up and travel to tournaments.",
    longDescription: `
      The Yonex Team Tracksuit is the perfect outer layer for players heading to training sessions or tournaments. This professional-grade tracksuit features a jacket and pants made from Yonex's premium microfiber fabric that offers the perfect balance of warmth and breathability.

      The jacket features a full-length zipper with a protective guard to prevent chin irritation, while the adjustable cuffs and hem allow you to customize the fit. The pants have an elastic waistband with drawcord for a secure fit, zippered leg openings for easy on/off over shoes, and side pockets for convenient storage.

      Both pieces feature mesh-lined ventilation panels that allow excess heat to escape during warm-ups, preventing overheating before your match begins. The sleek design with contrast piping and embroidered Yonex logo gives this tracksuit a professional appearance suitable for club and tournament settings.
    `,
    price: 95.0,
    originalPrice: 130.0,
    rating: 4.8,
    reviewCount: 56,
    image: yonexTeamTracksuit,
    category: "Apparel",
    features: [
      "Premium microfiber fabric construction",
      "Mesh-lined ventilation panels",
      "Full-length zipper with chin guard",
      "Elastic waistband with drawcord",
      "Zippered leg openings",
    ],
    specifications: {
      material: "100% Polyester microfiber",
      fit: "Athletic fit",
      care: "Machine wash cold, tumble dry low",
      sizes: "XS-XXL",
      colors: "Blue/White, Black/Red, Navy/Gold",
      includes: "Jacket and pants",
    },
    stock: 15,
    relatedProducts: [8, 13, 14],
  },
]

// Bestseller products for the homepage
const bestsellerProducts = [
  {
    id: 1,
    name: "Yonex Astrox 99",
    description: "A racket designed for speed and control. Lightweight, durable, and perfect for quick plays.",
    price: 200.0,
    originalPrice: 300.0,
    rating: "4.8/5 (120)",
    image: yonexAstrox99,
  },
  {
    id: 2,
    name: "Victor Thruster K9000",
    description:
      "Professional grade racket with carbon fiber frame. Exceptional power and precision for competitive play.",
    price: 250.0,
    originalPrice: 350.0,
    rating: "4.9/5 (98)",
    image: victorThrusterK900,
  },
  {
    id: 3,
    name: "Yonex Aerosensa 50",
    description: "Tournament grade shuttlecocks with excellent flight stability. Pack of 12.",
    price: 30.0,
    originalPrice: 45.0,
    rating: "4.7/5 (203)",
    image: yonexAerosensa50,
  },
  {
    id: 4,
    name: "Li-Ning Grip Master Pro",
    description: "Premium grip tape for maximum comfort and sweat absorption. Pack of 3.",
    price: 15.0,
    originalPrice: 22.0,
    rating: "4.6/5 (155)",
    image: liNingGripMasterPro,
  },
]

// Blog posts
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Techniques to Improve Your Smash",
    excerpt:
      "Learn the essential techniques that professional players use to develop a powerful and accurate smash that can win you points.",
  },
  {
    id: 2,
    title: "Choosing the Right Racket for Your Play Style",
    excerpt:
      "Different play styles require different racket specifications. Find out which racket characteristics best match your playing style.",
  },
];

// Export all data
export { products, bestsellerProducts, blogPosts }

// Helper function to get product by ID
export function getProductById(id) {
  return products.find((product) => product.id === Number(id)) || null
}

// Helper function to get related products
export function getRelatedProducts(productId) {
  const product = getProductById(productId)
  if (!product || !product.relatedProducts) return []

  return product.relatedProducts.map((id) => getProductById(id)).filter(Boolean)
}

// Helper function to get products by category
export function getProductsByCategory(category) {
  return products.filter((product) => product.category === category)
}

