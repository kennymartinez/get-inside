/**
 * SEO-specific helper functions for tourism content
 */

import type { CollectionEntry } from "astro:content";
type Tour = CollectionEntry<"tours">;

/**
 * Generates SEO-optimized title for tour pages
 */
export function generateTourSEOTitle(tour: Tour): string {
  const { destination, tourType, duration } = tour.data.general;
  const days = duration.days;

  const durationText = days === 1 ? "Day Tour" : `${days}-Day Tour`;

  return `${tour.data.title} | ${destination} ${tourType} ${durationText} | Colombia Adventures`;
}

/**
 * Generates SEO-optimized meta description for tour pages
 */
export function generateTourMetaDescription(tour: Tour): string {
  const { destination, tourType, difficulty, price } = tour.data.general;
  const activities = tour.data.activities?.slice(0, 3).join(", ") || "";

  const priceText = `from $${price}`;
  const difficultyText = difficulty !== "Easy" ? `${difficulty} level` : "";

  let description = `Experience ${destination} with our ${tourType.toLowerCase()} tour. `;

  if (activities) {
    description += `Enjoy ${activities} and more. `;
  }

  if (difficultyText) {
    description += `${difficultyText}. `;
  }

  description += `Starting ${priceText}. Book your Colombia adventure today!`;

  // Ensure description is under 160 characters
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return description;
}

/**
 * Generates structured data (JSON-LD) for tour pages
 */
export function generateTourStructuredData(tour: Tour, baseUrl: string) {
  const { general, logistics, pricing } = tour.data;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.data.title,
    description: tour.data.excerpt,
    image: tour.data.image ? `${baseUrl}${tour.data.image.src}` : undefined,
    touristType: general.tourType,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: general.duration.days,
      itemListElement: Array.from(
        { length: general.duration.days },
        (_, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `Day ${i + 1}`,
        })
      ),
    },
    offers: {
      "@type": "Offer",
      price: general.salePrice || general.price,
      priceCurrency: pricing?.currency || "USD",
      availability:
        general.availability === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(), // 1 year from now
    },
    provider: {
      "@type": "TravelAgency",
      name: "Colombia Adventures",
      url: baseUrl,
    },
    duration: `P${general.duration.days}D`,
    startLocation: {
      "@type": "Place",
      name: logistics.departureCity,
      address: {
        "@type": "PostalAddress",
        addressCountry: "CO",
      },
    },
    touristDestination: {
      "@type": "Place",
      name: general.destination,
      address: {
        "@type": "PostalAddress",
        addressCountry: "CO",
      },
    },
  };
}

/**
 * Generates keywords for tour SEO
 */
export function generateTourKeywords(tour: Tour): string[] {
  const { destination, tourType, category, difficulty } = tour.data.general;
  const activities = tour.data.activities || [];

  const keywords = [
    `${destination} tours`,
    `${destination} ${tourType.toLowerCase()}`,
    `Colombia ${tourType.toLowerCase()}`,
    `${category.toLowerCase()} Colombia`,
    `${destination} travel`,
    `Colombia travel`,
    ...activities.map((activity) => `${activity.toLowerCase()} ${destination}`),
    `${difficulty.toLowerCase()} tours Colombia`,
    "Colombia adventures",
    "South America tours",
  ];

  // Remove duplicates and return unique keywords
  return [...new Set(keywords)];
}

/**
 * Generates breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(tour: Tour, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tours",
        item: `${baseUrl}/tours`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tour.data.general.destination,
        item: `${baseUrl}/tours?destination=${encodeURIComponent(
          tour.data.general.destination
        )}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tour.data.title,
        item: `${baseUrl}/tour/${tour.id}`,
      },
    ],
  };
}
