// Colombia Tourism Agency Configuration
// Global variables
export const siteLang = "en-US";
export const siteCurrency = "USD";
export const siteDomain = "get-inside.com";
export const siteName = "Get Inside Colombia";
export const siteSlogan =
  "Discover the magic of Colombia with authentic experiences!";
export const themeColor = "#FCDC00"; // Colombian yellow
export const unitSystem = "metric"; // Changed to metric for Colombia
export const defaultPaginationSize = 12;

// Tourism-specific price steps (in USD for international travelers)
export const priceSteps = [200, 500, 1000, 1500, 2500, 5000];

// Duration filter steps (in days)
export const durationSteps = [
  { label: "1 Day", value: "1" },
  { label: "2-3 Days", value: "2-3" },
  { label: "4-7 Days", value: "4-7" },
  { label: "8-14 Days", value: "8-14" },
  { label: "15+ Days", value: "15+" },
];

// Group size options
export const groupSizeOptions = [
  { label: "Private (1-3)", value: "private" },
  { label: "Small Group (4-8)", value: "small" },
  { label: "Standard Group (9-15)", value: "standard" },
  { label: "Large Group (16+)", value: "large" },
];

// Difficulty level filters
export const difficultyFilters = [
  {
    label: "Easy",
    value: "Easy",
    description: "Suitable for all fitness levels",
  },
  {
    label: "Moderate",
    value: "Moderate",
    description: "Basic fitness required",
  },
  {
    label: "Challenging",
    value: "Challenging",
    description: "Good fitness required",
  },
  {
    label: "Expert",
    value: "Expert",
    description: "Excellent fitness required",
  },
];

// Tour type color coding (for UI elements)
export const tourTypeColors = {
  Adventure: "#FF6B35", // Orange
  Cultural: "#9B59B6", // Purple
  Nature: "#27AE60", // Green
  Beach: "#3498DB", // Blue
  Urban: "#95A5A6", // Gray
  Gastronomic: "#E74C3C", // Red
};

// Company contact information (updated for Colombia)
export const phone = {
  href: "tel:+5715551234",
  label: "+57 1 555-1234",
  whatsapp: "https://wa.me/5715551234",
};

export const email = {
  href: "mailto:info@colombia-adventures.com",
  label: "info@colombia-adventures.com",
};

export const address = {
  street: "Carrera 7 #32-45",
  neighborhood: "La Candelaria",
  city: "Bogotá",
  zip: "111711",
  state: "Cundinamarca",
  country: "Colombia",
};

// Colombian time zone and business hours
export const timezone = "America/Bogota";
export const hours = {
  monday: "8:00 - 18:00",
  tuesday: "8:00 - 18:00",
  wednesday: "8:00 - 18:00",
  thursday: "8:00 - 18:00",
  friday: "8:00 - 18:00",
  saturday: "9:00 - 15:00",
  sunday: "Closed",
};

// Social media (updated for tourism focus)
export const socialMedia = {
  facebook: {
    url: "https://facebook.com/colombia-adventures",
    label: "Facebook",
    icon: "facebook",
  },
  instagram: {
    url: "https://instagram.com/colombia_adventures",
    label: "Instagram",
    icon: "instagram",
  },
  youtube: {
    url: "https://youtube.com/@colombia-adventures",
    label: "YouTube",
    icon: "youtube",
  },
  tiktok: {
    url: "https://tiktok.com/@colombia_adventures",
    label: "TikTok",
    icon: "tiktok",
  },
  x: {
    url: "https://x.com/colombia_adventures",
    label: "X",
    icon: "x",
  },
};

// Colombian regions for destination filtering
export const colombianRegions = {
  caribbean: {
    name: "Caribbean Coast",
    destinations: [
      "Cartagena",
      "Santa Marta",
      "Tayrona",
      "San Andrés",
      "Providencia",
    ],
    color: "#00D2FF", // Caribbean blue
  },
  andean: {
    name: "Andean Region",
    destinations: [
      "Bogotá",
      "Medellín",
      "Villa de Leyva",
      "Barichara",
      "Guatapé",
    ],
    color: "#4CAF50", // Mountain green
  },
  coffee: {
    name: "Coffee Region",
    destinations: ["Coffee Region", "Cocora Valley", "Salento", "Manizales"],
    color: "#8D6E63", // Coffee brown
  },
  pacific: {
    name: "Pacific Coast",
    destinations: ["Nuquí", "Bahía Solano", "Buenaventura"],
    color: "#607D8B", // Pacific gray-blue
  },
  amazon: {
    name: "Amazon Region",
    destinations: ["Amazon", "Leticia", "Puerto Nariño"],
    color: "#4CAF50", // Jungle green
  },
  llanos: {
    name: "Los Llanos",
    destinations: ["Villavicencio", "Yopal", "Casanare"],
    color: "#FFC107", // Savanna yellow
  },
};

// Best months to visit Colombia (by region)
export const seasonalInfo = {
  drySeasons: ["December", "January", "February", "March"],
  rainySeasons: ["April", "May", "September", "October", "November"],
  caribbeanBest: ["December", "January", "February", "March", "April"],
  pacificBest: ["July", "August", "September", "October"],
  andeanBest: ["June", "July", "August", "December", "January", "February"],
  amazonBest: ["June", "July", "August", "September"],
};

// Popular festival seasons
export const festivalSeasons = {
  carnival: { months: ["February", "March"], region: "caribbean" },
  flowerFestival: { months: ["August"], region: "andean" },
  salsa: { months: ["December"], region: "pacific" },
  barranquilla: { months: ["February", "March"], region: "caribbean" },
};

// Default search and filter settings
export const defaultFilters = {
  sort: "popularity-desc",
  priceRange: "all",
  duration: "all",
  difficulty: "all",
  tourType: "all",
  destination: "all",
};

// SEO and marketing constants
export const seoDefaults = {
  title: "Colombia Tours & Adventures | Authentic Colombian Experiences",
  description:
    "Discover Colombia's hidden gems with our authentic tours. From Caribbean beaches to Amazon rainforest, coffee regions to colonial cities. Book your Colombian adventure today!",
  keywords: [
    "Colombia tours",
    "Colombian adventures",
    "South America travel",
    "Cartagena tours",
    "Coffee region",
    "Amazon tours",
  ],
  author: "Colombia Adventures Team",
};

// Currency exchange rates (for reference - should be updated regularly)
export const exchangeRates = {
  USD_to_COP: 4200, // Approximate rate
  EUR_to_USD: 1.08,
  CAD_to_USD: 0.74,
};

// Emergency and travel info
export const emergencyInfo = {
  police: "123",
  medical: "125",
  fire: "119",
  touristPolice: "147",
  embassy: {
    us: "+57 1 275-2000",
    uk: "+57 1 326-8300",
    canada: "+57 1 657-9800",
  },
};

// Travel requirements (general info)
export const travelRequirements = {
  passportRequired: true,
  visaFreeStay: 90, // days for most countries
  yellowFeverVaccine: "recommended", // for certain regions
  tipping: {
    restaurants: "10%",
    guides: "$5-10 USD per day",
    drivers: "$3-5 USD per day",
  },
};

// Legacy constants (for compatibility during migration)
export const interestRate = 0; // Not used in tourism, set to 0
export const unitSystemLegacy = "imperial"; // Keep for backwards compatibility

// Filter presets for quick searches
export const filterPresets = {
  adventure: {
    tourType: "Adventure",
    difficulty: "Challenging",
    duration: "4-7",
  },
  cultural: {
    tourType: "Cultural",
    difficulty: "Easy",
    destination: "Cartagena",
  },
  nature: {
    tourType: "Nature",
    destination: "Amazon",
    duration: "8-14",
  },
  beach: {
    tourType: "Beach",
    destination: "Tayrona",
    difficulty: "Easy",
  },
  weekend: {
    duration: "2-3",
    difficulty: "Easy",
  },
  luxury: {
    priceFrom: "1500",
  },
  budget: {
    priceTo: "500",
  },
};
