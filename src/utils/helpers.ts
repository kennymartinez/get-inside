import { siteLang, siteCurrency } from "~/data/config";
import { getCollection } from "astro:content";

/**
 * Formats a given price number into a localized currency string representation.
 * Enhanced for tourism pricing with better formatting options.
 *
 * @param price - The price number to be formatted.
 * @param options - Optional formatting options
 * @returns A string representing the formatted price.
 */
export function getPrice(
  price: number,
  options?: {
    compact?: boolean;
    currency?: "USD" | "COP";
    showCents?: boolean;
  }
): string {
  const currency = options?.currency || siteCurrency;
  const showCents = options?.showCents || false;

  if (options?.compact && price >= 1000) {
    // For compact display: $1.2K, $15K, etc.
    return new Intl.NumberFormat(siteLang, {
      style: "currency",
      currency: currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(price);
  }

  return new Intl.NumberFormat(siteLang, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(price);
}

/**
 * Returns the currency symbol based on the site language and currency.
 *
 * @returns {string} The currency symbol.
 */
export function getCurrencySymbol(currency?: "USD" | "COP"): string {
  const targetCurrency = currency || siteCurrency;
  const formatter = new Intl.NumberFormat(siteLang, {
    style: "currency",
    currency: targetCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const parts = formatter.formatToParts(0);
  const symbol = parts.find((part) => part.type === "currency")?.value;
  return symbol || "";
}

// ===== TOURISM-SPECIFIC FUNCTIONS (New) =====

/**
 * Formats tour duration into human-readable text.
 *
 * @param days - Number of days
 * @param nights - Number of nights (optional)
 * @returns A string like "5 days" or "5 days / 4 nights"
 */
export function formatDuration(days: number, nights?: number): string {
  const dayText = `${days} day${days !== 1 ? "s" : ""}`;

  if (nights !== undefined && nights > 0) {
    const nightText = `${nights} night${nights !== 1 ? "s" : ""}`;
    return `${dayText} / ${nightText}`;
  }

  return dayText;
}

/**
 * Formats group size range into readable text.
 *
 * @param min - Minimum group size
 * @param max - Maximum group size
 * @returns A string like "4-12 people" or "Private (1-3)"
 */
export function formatGroupSize(min: number, max: number): string {
  if (max <= 3) {
    return `Private (${min}-${max})`;
  }

  if (min === max) {
    return `${min} people`;
  }

  return `${min}-${max} people`;
}

/**
 * Gets difficulty level color for UI components.
 *
 * @param difficulty - The difficulty level
 * @returns Tailwind CSS classes for the difficulty
 */
export function getDifficultyColor(difficulty: string): string {
  const colors = {
    Easy: "bg-green-100 text-green-800 ring-green-600/20",
    Moderate: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
    Challenging: "bg-orange-100 text-orange-800 ring-orange-600/20",
    Expert: "bg-red-100 text-red-800 ring-red-600/20",
  };

  return (
    colors[difficulty as keyof typeof colors] ||
    "bg-gray-100 text-gray-800 ring-gray-600/20"
  );
}

/**
 * Gets tour type color for UI components.
 *
 * @param tourType - The tour type
 * @returns Tailwind CSS classes for the tour type
 */
export function getTourTypeColor(tourType: string): string {
  const colors = {
    Adventure: "bg-orange-100 text-orange-800 ring-orange-600/20",
    Cultural: "bg-purple-100 text-purple-800 ring-purple-600/20",
    Nature: "bg-green-100 text-green-800 ring-green-600/20",
    Beach: "bg-blue-100 text-blue-800 ring-blue-600/20",
    Urban: "bg-gray-100 text-gray-800 ring-gray-600/20",
    Gastronomic: "bg-red-100 text-red-800 ring-red-600/20",
  };

  return (
    colors[tourType as keyof typeof colors] ||
    "bg-gray-100 text-gray-800 ring-gray-600/20"
  );
}

/**
 * Calculates tour price per day for comparison.
 *
 * @param price - Tour price
 * @param days - Number of days
 * @returns Price per day
 */
export function getPricePerDay(price: number, days: number): number {
  return Math.round(price / days);
}

/**
 * Determines if a tour is considered a deal based on price per day.
 *
 * @param price - Tour price
 * @param days - Number of days
 * @param tourType - Type of tour for context
 * @returns Boolean indicating if it's a good deal
 */
export function isGoodDeal(
  price: number,
  days: number,
  tourType: string
): boolean {
  const pricePerDay = getPricePerDay(price, days);

  // Different thresholds for different tour types
  const thresholds = {
    Adventure: 150,
    Cultural: 100,
    Nature: 120,
    Beach: 80,
    Urban: 60,
    Gastronomic: 130,
  };

  const threshold = thresholds[tourType as keyof typeof thresholds] || 100;
  return pricePerDay <= threshold;
}

/**
 * Formats best months for travel into readable text.
 *
 * @param months - Array of month names
 * @returns Formatted string like "Dec-Mar, Jul-Aug"
 */
export function formatBestMonths(months: string[]): string {
  if (!months || months.length === 0) return "Year-round";

  const monthOrder = [
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
  ];

  // Sort months by calendar order
  const sortedMonths = months.sort(
    (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
  );

  // Group consecutive months
  const groups: string[][] = [];
  let currentGroup: string[] = [];

  for (let i = 0; i < sortedMonths.length; i++) {
    const month = sortedMonths[i];
    const monthIndex = monthOrder.indexOf(month);

    if (currentGroup.length === 0) {
      currentGroup = [month];
    } else {
      const lastMonth = currentGroup[currentGroup.length - 1];
      const lastMonthIndex = monthOrder.indexOf(lastMonth);

      if (
        monthIndex === lastMonthIndex + 1 ||
        (lastMonthIndex === 11 && monthIndex === 0)
      ) {
        currentGroup.push(month);
      } else {
        groups.push(currentGroup);
        currentGroup = [month];
      }
    }
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  // Format groups
  const formattedGroups = groups.map((group) => {
    if (group.length === 1) {
      return group[0].substring(0, 3);
    } else {
      const start = group[0].substring(0, 3);
      const end = group[group.length - 1].substring(0, 3);
      return `${start}-${end}`;
    }
  });

  return formattedGroups.join(", ");
}

// ===== LEGACY FUNCTIONS (Updated for backward compatibility) =====

/**
 * Legacy function for mileage - now repurposed for tour distance if needed.
 * @deprecated Use formatDuration for tours instead
 */
export function getMileage(distance: number): string {
  return distance.toLocaleString(siteLang, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/**
 * Legacy function for mileage unit - now repurposed for distance unit.
 * @deprecated Not typically used in tourism context
 */
export function getMileageUnit(): string {
  return "km"; // Colombia uses metric
}

/**
 * Legacy function for mileage label - now repurposed.
 * @deprecated Use tourism-specific functions instead
 */
export function getMileageLabel(): string {
  return "Distance";
}

// ===== TOURISM DATA COLLECTION FUNCTIONS =====

/**
 * Returns a set of unique destinations and categories from the tours collection.
 * Replaces getMakeModelSet for tourism.
 */
export async function getDestinationCategorySet() {
  const allTours = await getCollection("tours", ({ data }) => {
    return data.misc?.hidden !== true;
  });

  const destinationsWithCategories = allTours.reduce(
    (acc: { [key: string]: Set<string> }, tour) => {
      const destination = tour.data.general.destination;
      const category = tour.data.general.category;

      if (!acc[destination]) {
        acc[destination] = new Set();
      }
      acc[destination].add(category);

      return acc;
    },
    {}
  );

  const result = Object.entries(destinationsWithCategories).map(
    ([destination, categories]) => ({
      destination,
      categories: Array.from(categories),
    })
  );

  return result;
}

/**
 * Legacy function - kept for backward compatibility during migration.
 * @deprecated Use getDestinationCategorySet instead
 */
export async function getMakeModelSet() {
  // For backward compatibility, map to tourism data
  const tourData = await getDestinationCategorySet();

  return tourData.map(({ destination, categories }) => ({
    make: destination, // Destination becomes "make"
    models: categories, // Categories become "models"
  }));
}

/**
 * Gets tour statistics for dashboard/summary displays.
 */
export async function getTourStats() {
  const allTours = await getCollection(
    "tours",
    ({ data }) => !data.misc?.hidden
  );

  const stats = {
    totalTours: allTours.length,
    destinations: new Set(allTours.map((tour) => tour.data.general.destination))
      .size,
    averagePrice: Math.round(
      allTours.reduce((sum, tour) => sum + tour.data.general.price, 0) /
        allTours.length
    ),
    featuredTours: allTours.filter((tour) => tour.data.misc?.featured).length,
    sustainableTours: allTours.filter((tour) => tour.data.misc?.sustainable)
      .length,
    tourTypes: new Set(allTours.map((tour) => tour.data.general.tourType)).size,
  };

  return stats;
}

/**
 * Gets popular destinations based on tour count.
 */
export async function getPopularDestinations(limit: number = 5) {
  const allTours = await getCollection(
    "tours",
    ({ data }) => !data.misc?.hidden
  );

  const destinationCounts = allTours.reduce(
    (acc: { [key: string]: number }, tour) => {
      const destination = tour.data.general.destination;
      acc[destination] = (acc[destination] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(destinationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([destination, count]) => ({ destination, count }));
}

// ===== UTILITY FUNCTIONS FOR FORMS AND VALIDATION =====

/**
 * Validates tour booking form data.
 */
export function validateBookingForm(data: {
  name: string;
  email: string;
  groupSize: number;
  preferredDate: string;
}) {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Please provide a valid email address");
  }

  if (!data.groupSize || data.groupSize < 1 || data.groupSize > 50) {
    errors.push("Group size must be between 1 and 50 people");
  }

  if (!data.preferredDate) {
    errors.push("Please select a preferred travel date");
  } else {
    const selectedDate = new Date(data.preferredDate);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 2);

    if (selectedDate < today) {
      errors.push("Travel date must be in the future");
    }

    if (selectedDate > maxDate) {
      errors.push("Travel date must be within the next 2 years");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
