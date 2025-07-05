/**
 * Tourism-specific constants and configurations
 */

// Colombian regions with detailed information
export const COLOMBIAN_REGIONS = {
  caribbean: {
    name: "Caribbean Coast",
    description: "Tropical beaches, colonial cities, and vibrant culture",
    destinations: [
      "Cartagena",
      "Santa Marta",
      "Tayrona",
      "San Andrés",
      "Providencia",
    ],
    climate: "Tropical, hot and humid year-round",
    bestMonths: ["December", "January", "February", "March", "April"],
    highlights: ["Beaches", "Colonial architecture", "Diving", "Nightlife"],
    averageTemp: "28°C (82°F)",
  },
  andean: {
    name: "Andean Region",
    description: "Mountain cities, coffee farms, and colonial towns",
    destinations: [
      "Bogotá",
      "Medellín",
      "Villa de Leyva",
      "Barichara",
      "Guatapé",
    ],
    climate: "Temperate, spring-like year-round",
    bestMonths: ["June", "July", "August", "December", "January", "February"],
    highlights: ["Cities", "Culture", "Architecture", "Art"],
    averageTemp: "18°C (64°F)",
  },
  coffee: {
    name: "Coffee Region",
    description: "Rolling hills, coffee plantations, and charming towns",
    destinations: ["Coffee Region", "Cocora Valley", "Salento", "Manizales"],
    climate: "Mild mountain climate",
    bestMonths: ["June", "July", "August", "December", "January"],
    highlights: ["Coffee tours", "Hiking", "Landscapes", "Culture"],
    averageTemp: "20°C (68°F)",
  },
  pacific: {
    name: "Pacific Coast",
    description: "Wild coastline, whale watching, and biodiversity",
    destinations: ["Nuquí", "Bahía Solano", "Buenaventura"],
    climate: "Tropical rainforest, high rainfall",
    bestMonths: ["July", "August", "September", "October"],
    highlights: ["Whale watching", "Surfing", "Biodiversity", "Beaches"],
    averageTemp: "26°C (79°F)",
  },
  amazon: {
    name: "Amazon Region",
    description: "Pristine rainforest, wildlife, and indigenous cultures",
    destinations: ["Amazon", "Leticia", "Puerto Nariño"],
    climate: "Tropical rainforest, hot and humid",
    bestMonths: ["June", "July", "August", "September"],
    highlights: ["Wildlife", "Rivers", "Indigenous culture", "Adventure"],
    averageTemp: "27°C (81°F)",
  },
  llanos: {
    name: "Los Llanos",
    description: "Vast plains, wildlife, and cowboy culture",
    destinations: ["Villavicencio", "Yopal", "Casanare"],
    climate: "Tropical savanna with wet and dry seasons",
    bestMonths: ["November", "December", "January", "February", "March"],
    highlights: ["Wildlife", "Horseback riding", "Culture", "Birdwatching"],
    averageTemp: "26°C (79°F)",
  },
} as const;

// Tour difficulty definitions
export const DIFFICULTY_LEVELS = {
  Easy: {
    description: "Suitable for all fitness levels and ages",
    requirements: "No special preparation needed",
    activities: [
      "Walking on flat surfaces",
      "Short distances",
      "Minimal physical exertion",
    ],
    maxWalkingDistance: "2km",
    maxAltitude: "2000m",
    suitableFor: ["Families", "Seniors", "First-time travelers"],
  },
  Moderate: {
    description: "Basic fitness required, some walking involved",
    requirements: "Comfortable walking for extended periods",
    activities: [
      "Walking on uneven terrain",
      "Some stairs/hills",
      "Light hiking",
    ],
    maxWalkingDistance: "5km",
    maxAltitude: "3000m",
    suitableFor: ["Most adults", "Active families", "Casual hikers"],
  },
  Challenging: {
    description: "Good fitness required, physically demanding",
    requirements: "Regular exercise and good health recommended",
    activities: [
      "Hiking",
      "Climbing",
      "Long walking distances",
      "Varied terrain",
    ],
    maxWalkingDistance: "15km",
    maxAltitude: "4000m",
    suitableFor: ["Active adults", "Experienced hikers", "Adventure seekers"],
  },
  Expert: {
    description: "Excellent fitness required, very demanding",
    requirements: "Advanced preparation and excellent physical condition",
    activities: ["Multi-day trekking", "High altitude", "Technical terrain"],
    maxWalkingDistance: "20km+",
    maxAltitude: "4000m+",
    suitableFor: ["Athletes", "Experienced trekkers", "Adventure experts"],
  },
} as const;

// Group size categories
export const GROUP_SIZE_CATEGORIES = {
  private: {
    min: 1,
    max: 3,
    description: "Private & intimate experience",
    benefits: ["Personalized attention", "Flexible schedule", "Privacy"],
    priceModifier: 1.5, // 50% premium for private tours
  },
  small: {
    min: 4,
    max: 8,
    description: "Small group adventure",
    benefits: ["Personal attention", "Easy coordination", "Better access"],
    priceModifier: 1.0, // Base price
  },
  standard: {
    min: 9,
    max: 15,
    description: "Standard group tour",
    benefits: ["Social experience", "Cost effective", "Well organized"],
    priceModifier: 0.9, // 10% discount
  },
  large: {
    min: 16,
    max: 30,
    description: "Large group experience",
    benefits: ["Very economical", "Social", "Comprehensive services"],
    priceModifier: 0.8, // 20% discount
  },
} as const;

// Tour type definitions
export const TOUR_TYPES = {
  Adventure: {
    description: "High-energy activities and outdoor adventures",
    activities: ["Hiking", "Climbing", "Water sports", "Extreme sports"],
    targetAudience: "Adventure seekers, active travelers",
    averageDuration: "3-7 days",
    fitnessRequired: "Moderate to Challenging",
    seasonality: "Depends on activity and location",
  },
  Cultural: {
    description: "Immersive cultural experiences and heritage sites",
    activities: [
      "Museum visits",
      "Historical tours",
      "Local interactions",
      "Art experiences",
    ],
    targetAudience: "Culture enthusiasts, history buffs",
    averageDuration: "1-5 days",
    fitnessRequired: "Easy to Moderate",
    seasonality: "Year-round",
  },
  Nature: {
    description: "Wildlife viewing and natural environment exploration",
    activities: [
      "Wildlife watching",
      "Bird watching",
      "Nature walks",
      "Photography",
    ],
    targetAudience: "Nature lovers, photographers, families",
    averageDuration: "2-8 days",
    fitnessRequired: "Easy to Moderate",
    seasonality: "Varies by destination",
  },
  Beach: {
    description: "Coastal relaxation and water-based activities",
    activities: ["Beach relaxation", "Swimming", "Snorkeling", "Water sports"],
    targetAudience: "Beach lovers, families, couples",
    averageDuration: "2-7 days",
    fitnessRequired: "Easy",
    seasonality: "Dry season preferred",
  },
  Urban: {
    description: "City exploration and metropolitan experiences",
    activities: ["City tours", "Shopping", "Dining", "Nightlife", "Museums"],
    targetAudience: "City explorers, cultural travelers",
    averageDuration: "1-4 days",
    fitnessRequired: "Easy to Moderate",
    seasonality: "Year-round",
  },
  Gastronomic: {
    description: "Culinary experiences and food culture exploration",
    activities: [
      "Food tours",
      "Cooking classes",
      "Market visits",
      "Wine/coffee tasting",
    ],
    targetAudience: "Food lovers, culinary enthusiasts",
    averageDuration: "1-5 days",
    fitnessRequired: "Easy",
    seasonality: "Year-round",
  },
} as const;

// Seasonal pricing multipliers
export const SEASONAL_PRICING = {
  high: {
    months: ["December", "January", "July", "August"],
    multiplier: 1.3,
    description: "Peak tourist season",
  },
  medium: {
    months: ["February", "March", "June", "November"],
    multiplier: 1.0,
    description: "Regular season",
  },
  low: {
    months: ["April", "May", "September", "October"],
    multiplier: 0.8,
    description: "Low season with best deals",
  },
} as const;

// Booking lead times
export const BOOKING_LEAD_TIMES = {
  minimum: 2, // days
  recommended: 14, // days
  advance: 60, // days for better prices
  group: 30, // days for group bookings
} as const;

// Contact information
export const CONTACT_INFO = {
  whatsapp: "+57 300 123 4567",
  phone: "+57 1 555 1234",
  email: "info@colombia-adventures.com",
  emergencyPhone: "+57 300 987 6543",
  officeHours: "Monday-Friday 8:00-18:00, Saturday 9:00-15:00",
} as const;

// Payment options
export const PAYMENT_OPTIONS = {
  deposit: {
    percentage: 30,
    description: "30% deposit required to secure booking",
  },
  fullPayment: {
    deadline: 15, // days before tour
    description: "Full payment due 15 days before tour",
  },
  cancellation: {
    fullRefund: 30, // days before tour
    partialRefund: 15, // days before tour
    noRefund: 7, // days before tour
  },
} as const;
