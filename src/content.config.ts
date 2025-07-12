import { z, defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";

// Tourism-specific enums for Colombia
export const tourTypes = [
  "Adventure",
  "Cultural",
  "Nature",
  "Beach",
  "Urban",
  "Gastronomic",
] as const;
export const difficultyLevels = [
  "Easy",
  "Moderate",
  "Challenging",
  "Expert",
] as const;
export const transportationTypes = [
  "Bus",
  "Flight",
  "Private Vehicle",
  "Boat",
  "Walking",
  "Mixed",
] as const;
export const accommodationTypes = [
  "Hotel",
  "Hostel",
  "Lodge",
  "Camping",
  "Local Family",
  "Mixed",
] as const;
export const mealOptions = [
  "None",
  "Breakfast",
  "Half Board",
  "Full Board",
  "All Inclusive",
] as const;
export const guideTypes = [
  "Local Guide",
  "Bilingual Guide",
  "Specialist Guide",
  "Self-Guided",
] as const;
export const languageOptions = [
  "Spanish",
  "English",
  "French",
  "Portuguese",
] as const;
export const fitnessLevels = [
  "None",
  "Basic Fitness",
  "Good Fitness",
  "Excellent Fitness",
] as const;

// Colombian destinations
export const colombianDestinations = [
  "Cartagena",
  "Medellín",
  "Bogotá",
  "Amazon",
  "Coffee Region",
  "Tayrona",
  "Ciudad Perdida",
  "San Andrés",
  "Villa de Leyva",
  "Cocora Valley",
  "Nuquí",
  "Guatapé",
  "Caño Cristales",
  "Cali",
  "Santa Marta",
  "Providencia",
  "Popayán",
  "Barichara",
  "Leticia",
] as const;

// Tour categories
export const tourCategories = [
  "City Tour",
  "Hiking",
  "Diving",
  "Cultural Immersion",
  "Wildlife Watching",
  "Coffee Experience",
  "Beach Relaxation",
  "Adventure Sports",
  "Historical Tour",
  "Gastronomy",
  "Photography",
  "Bird Watching",
  "Indigenous Communities",
  "Colonial Architecture",
] as const;

// Months for seasonal info
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

// Medical specialties based on Colombia's popular medical tourism procedures
export const medicalSpecialties = [
  "Cosmetic Surgery",
  "Dentistry",
  "Bariatric Surgery",
  "Orthopedics",
  "Ophthalmology",
  "Cardiology",
  "Dermatology",
  "Fertility Treatment",
] as const;

// Popular procedures in Colombian medical tourism
export const medicalProcedures = [
  // Cosmetic Surgery
  "Breast Augmentation",
  "Liposuction",
  "Tummy Tuck",
  "Brazilian Butt Lift",
  "Rhinoplasty",
  "Facelift",
  "Mommy Makeover",

  // Dentistry
  "Dental Implants",
  "Veneers",
  "Teeth Whitening",
  "Full Mouth Reconstruction",
  "Orthodontics",

  // Bariatric
  "Gastric Sleeve",
  "Gastric Bypass",
  "Gastric Band",

  // Other specialties
  "LASIK Eye Surgery",
  "Knee Replacement",
  "Hip Replacement",
  "Hair Transplant",
  "Stem Cell Therapy",
] as const;

// Colombian medical tourism cities
export const medicalCities = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Cartagena",
  "Barranquilla",
] as const;

export const languagesSpoken = [
  "Spanish",
  "English",
  "Portuguese",
  "French",
] as const;

// Blog categories updated for tourism
export const blogCategories = {
  destinations: "blue",
  tips: "green",
  culture: "purple",
  adventure: "orange",
  news: "indigo",
} as const;

const categoryKeys = Object.keys(blogCategories) as [
  keyof typeof blogCategories,
  ...Array<keyof typeof blogCategories>
];

// Main tours collection (replacing cars)
const tours = defineCollection({
  loader: glob({
    pattern: ["*.mdx", "!example.mdx"],
    base: "./src/content/tours",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional().default(""),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
          })
        )
        .optional(),
      videoTourUrl: z.string().url().optional(),
      excerpt: z.string().optional(),
      publishDate: z.coerce.date().default(new Date(2025, 0, 1)),

      // General Information (replacing car general info)
      general: z.object({
        destination: z.enum(colombianDestinations),
        tourType: z.enum(tourTypes),
        category: z.enum(tourCategories),
        price: z.number().positive(),
        salePrice: z.number().positive().optional(),
        duration: z.object({
          days: z.number().int().positive(),
          nights: z.number().int().min(0),
        }),
        groupSize: z.object({
          min: z.number().int().positive().default(1),
          max: z.number().int().positive(),
        }),
        difficulty: z.enum(difficultyLevels),
        availability: z
          .enum(["Available", "Sold Out", "Coming Soon", "Seasonal"])
          .default("Available"),
      }),

      // Logistics (replacing car history)
      logistics: z.object({
        departureCity: z.enum(colombianDestinations),
        departurePoint: z.string().optional(),
        transportation: z.enum(transportationTypes),
        accommodationType: z.enum(accommodationTypes),
        mealsIncluded: z.enum(mealOptions).default("None"),
      }),

      // Experience Details (replacing car technical)
      experience: z.object({
        languages: z.array(z.enum(languageOptions)).default(["Spanish"]),
        guideType: z.enum(guideTypes),
        physicalRequirement: z.enum(fitnessLevels).default("None"),
        ageRestriction: z
          .object({
            min: z.number().int().min(0).optional(),
            max: z.number().int().max(99).optional(),
          })
          .optional(),
        bestTimeToVisit: z.array(z.enum(months)).optional(),
      }),

      // What's included/excluded (replacing car efficiency)
      pricing: z.object({
        currency: z.enum(["USD", "COP"]).default("USD"),
        priceIncludes: z.array(z.string()).optional(),
        priceExcludes: z.array(z.string()).optional(),
        depositRequired: z.number().min(0).max(100).optional(), // percentage
        cancellationPolicy: z.string().optional(),
      }),

      // Activities (replacing car options)
      activities: z.array(z.string()).optional(),

      // Safety & Requirements (replacing car security)
      requirements: z
        .object({
          documents: z.array(z.string()).optional(),
          vaccinations: z.array(z.string()).optional(),
          equipment: z.array(z.string()).optional(),
          insurance: z.boolean().optional().default(false),
          medicalClearance: z.boolean().optional().default(false),
          swimmingSkills: z.boolean().optional(),
        })
        .optional(),

      // Accommodation details (replacing car exterior)
      accommodation: z
        .object({
          type: z.enum(accommodationTypes),
          standard: z
            .enum(["Budget", "Standard", "Superior", "Luxury"])
            .optional(),
          roomType: z
            .enum(["Shared", "Private", "Double", "Single"])
            .optional(),
          amenities: z.array(z.string()).optional(),
        })
        .optional(),

      // Food & Dining (replacing car interior)
      dining: z
        .object({
          mealsIncluded: z.enum(mealOptions),
          dietaryRestrictions: z.boolean().optional().default(false),
          localCuisine: z.boolean().optional().default(false),
          vegetarianOptions: z.boolean().optional().default(false),
        })
        .optional(),

      // Seasonal & Weather Info
      seasonal: z
        .object({
          bestMonths: z.array(z.enum(months)).optional(),
          weatherConditions: z.string().optional(),
          seasonalHighlights: z.array(z.string()).optional(),
          specialEvents: z.array(z.string()).optional(),
        })
        .optional(),

      // Miscellaneous (similar structure to car misc)
      misc: z
        .object({
          tourCode: z.string().optional(),
          operator: z.string().optional(), // Hidden from frontend
          operatorContact: z.string().optional(), // Hidden from frontend
          bookingNotes: z.string().optional(),
          hidden: z.boolean().optional().default(false),
          featured: z.boolean().optional().default(false),
          sustainable: z.boolean().optional().default(false),
          newTour: z.boolean().optional().default(false),
          popularTour: z.boolean().optional().default(false),
        })
        .optional(),
    }),
});

// Blog collection updated for tourism content
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      image: image(),
      imageAlt: z.string(),
      excerpt: z.string().optional(),
      publishDate: z.coerce.date().default(new Date(2025, 0, 1)),
      category: z.enum(categoryKeys).default("destinations"),
      destination: z.enum(colombianDestinations).optional(),
      readTime: z.number().optional(), // estimated reading time in minutes
    }),
});

// Team collection (can remain mostly the same)
// const team = defineCollection({
//   loader: file("src/data/team.json"),
//   schema: ({ image }) =>
//     z.object({
//       name: z.string(),
//       role: z.string(),
//       email: z.string().email(),
//       phone: z.string(),
//       image: image(),
//       specialties: z.array(z.string()).optional(), // Tourism specialties
//       languages: z.array(z.enum(languageOptions)).optional(),
//       experience: z.string().optional(), // Years of experience description
//     }),
// });

// // Testimonials collection updated for tourism
// const testimonials = defineCollection({
//   loader: file("./src/data/testimonials.json"),
//   schema: ({ image }) =>
//     z.object({
//       title: z.string(),
//       description: z.string(),
//       img: image(),
//       author: z.string(),
//       location: z.string(),
//       tourTaken: z.string().optional(), // Which tour they took
//       travelDate: z.string().optional(), // When they traveled
//       hidden: z.boolean().default(false),
//       starRating: z.number().min(1).max(5),
//       verified: z.boolean().default(false), // Verified review
//     }),
// });

// Medical Tourism Collection
const medicalTourism = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/medical" }),
  schema: ({ image }) =>
    z.object({
      // Basic Information
      publishDate: z.date(),
      title: z.string(), // Doctor's name
      specialty: z.enum(medicalSpecialties),
      procedures: z.array(z.enum(medicalProcedures)).min(1),

      // Media
      image: image().optional(),
      imageAlt: z.string().optional(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
          })
        )
        .optional(),

      // Location & Contact
      location: z.object({
        city: z.enum(medicalCities),
        clinic: z.string(), // Clinic/Hospital name
        address: z.string().optional(),
      }),

      // Professional Details
      professional: z.object({
        yearsExperience: z.number().int().min(1),
        education: z.string(), // University/Medical School
        certifications: z.array(z.string()).optional(),
        languagesSpoken: z.array(z.enum(languagesSpoken)).default(["Spanish"]),
        internationalPatients: z.boolean().default(true),
      }),

      // Procedure Details
      procedureInfo: z.object({
        consultationRequired: z.boolean().default(true),
        followUpIncluded: z.boolean().default(true),
        estimatedStayDays: z.string().optional(), // e.g., "3-5 days"
        recoveryInfo: z.string().optional(), // Brief recovery description
      }),

      // Content
      excerpt: z.string().optional(),

      // Meta
      misc: z
        .object({
          featured: z.boolean().optional().default(false),
          verified: z.boolean().default(true), // Since it's curated
          hidden: z.boolean().optional().default(false),
          seoTitle: z.string().optional(),
          seoDescription: z.string().optional(),
        })
        .optional(),
    }),
});

// Export collections with new tourism focus
export const collections = { tours, blog, medicalTourism };
