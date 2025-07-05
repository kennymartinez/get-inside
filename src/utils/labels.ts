import type { CollectionEntry } from "astro:content";

type ShapeToLabels<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? ShapeToLabels<T[K]>
    : string | Record<string, string>;
};

// Updated labels for tourism schema
export const labels: ShapeToLabels<CollectionEntry<"tours">["data"]> = {
  title: "Tour Title",
  image: "Main Image",
  imageAlt: "Image Description",
  gallery: {
    image: "Gallery Image",
    alt: "Image Description",
  },
  videoTourUrl: "Video Tour URL",
  excerpt: "Tour Summary",
  publishDate: "Publish Date" as unknown as ShapeToLabels<Date>,

  // General Information
  general: {
    destination: "Destination",
    tourType: "Tour Type",
    category: "Category",
    price: "Price",
    salePrice: "Special Price",
    duration: {
      days: "Days",
      nights: "Nights",
    },
    groupSize: {
      min: "Minimum Group",
      max: "Maximum Group",
    },
    difficulty: "Difficulty Level",
    availability: "Availability",
  },

  // Logistics
  logistics: {
    departureCity: "Departure City",
    departurePoint: "Meeting Point",
    transportation: "Transportation",
    accommodationType: "Accommodation",
    mealsIncluded: "Meals Included",
  },

  // Experience Details
  experience: {
    languages: "Languages",
    guideType: "Guide Type",
    physicalRequirement: "Fitness Level",
    ageRestriction: {
      min: "Minimum Age",
      max: "Maximum Age",
    },
    bestTimeToVisit: "Best Months",
  },

  // Pricing
  pricing: {
    currency: "Currency",
    priceIncludes: "What's Included",
    priceExcludes: "What's Excluded",
    depositRequired: "Deposit Required",
    cancellationPolicy: "Cancellation Policy",
  },

  // Activities
  activities: "Activities Included",

  // Requirements
  requirements: {
    documents: "Required Documents",
    vaccinations: "Vaccinations",
    equipment: "Required Equipment",
    insurance: "Insurance Required",
    medicalClearance: "Medical Clearance",
    swimmingSkills: "Swimming Skills",
  },

  // Accommodation
  accommodation: {
    type: "Accommodation Type",
    standard: "Standard",
    roomType: "Room Type",
    amenities: "Amenities",
  },

  // Dining
  dining: {
    mealsIncluded: "Meals Included",
    dietaryRestrictions: "Dietary Options",
    localCuisine: "Local Cuisine",
    vegetarianOptions: "Vegetarian Options",
  },

  // Seasonal Information
  seasonal: {
    bestMonths: "Best Travel Months",
    weatherConditions: "Weather Conditions",
    seasonalHighlights: "Seasonal Highlights",
    specialEvents: "Special Events",
  },

  // Miscellaneous
  misc: {
    tourCode: "Tour Code",
    operator: "Tour Operator",
    operatorContact: "Operator Contact",
    bookingNotes: "Booking Notes",
    hidden: "Hidden",
    featured: "Featured Tour",
    sustainable: "Eco-Friendly",
    newTour: "New Tour",
    popularTour: "Popular Tour",
  },
};

// Updated category labels for tourism
export const categoryLabels = {
  general: "General Information",
  logistics: "Logistics & Travel",
  experience: "Experience Details",
  pricing: "Pricing Information",
  activities: "Activities",
  requirements: "Requirements & Preparation",
  accommodation: "Accommodation",
  dining: "Meals & Dining",
  seasonal: "Seasonal Information",
  misc: "Additional Information",
};

// Legacy labels for backward compatibility
export const legacyLabels = {
  // Car fields mapped to closest tourism equivalent
  make: "Destination",
  model: "Category",
  bodyType: "Tour Type",
  fuelType: "Difficulty",
  transmission: "Guide Type",
  mileage: "Duration",
  year: "Season",
  horsePower: "Group Size",
  condition: "Availability",
  color: "Special Features",
};
