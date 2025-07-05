/**
 * Tourism-specific formatting utilities
 */

import type { CollectionEntry } from "astro:content";
type Tour = CollectionEntry<"tours">;

/**
 * Formats tour duration for different contexts
 */
export function formatTourDuration(
  days: number,
  nights: number = 0,
  style: "short" | "long" | "compact" = "short"
): string {
  switch (style) {
    case "compact":
      return nights > 0 ? `${days}D/${nights}N` : `${days}D`;
    case "long":
      const dayText = `${days} ${days === 1 ? "day" : "days"}`;
      const nightText =
        nights > 0 ? ` and ${nights} ${nights === 1 ? "night" : "nights"}` : "";
      return dayText + nightText;
    case "short":
    default:
      return nights > 0
        ? `${days} days / ${nights} nights`
        : `${days} day${days > 1 ? "s" : ""}`;
  }
}

/**
 * Formats activity lists for display
 */
export function formatActivities(
  activities: string[],
  maxDisplay: number = 3
): {
  displayed: string[];
  remaining: number;
  formatted: string;
} {
  const displayed = activities.slice(0, maxDisplay);
  const remaining = Math.max(0, activities.length - maxDisplay);

  let formatted = displayed.join(" • ");
  if (remaining > 0) {
    formatted += ` • +${remaining} more`;
  }

  return { displayed, remaining, formatted };
}

/**
 * Formats price with context (per person, per group, etc.)
 */
export function formatPriceWithContext(
  price: number,
  salePrice?: number,
  currency: "USD" | "COP" = "USD",
  context: "per_person" | "per_group" | "total" = "per_person"
): {
  display: string;
  original?: string;
  savings?: string;
  contextLabel: string;
} {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const actualPrice = salePrice || price;
  const display = formatter.format(actualPrice);
  const original = salePrice ? formatter.format(price) : undefined;
  const savings = salePrice ? formatter.format(price - salePrice) : undefined;

  const contextLabels = {
    per_person: "per person",
    per_group: "per group",
    total: "total",
  };

  return {
    display,
    original,
    savings,
    contextLabel: contextLabels[context],
  };
}

/**
 * Formats group size range with descriptive text
 */
export function formatGroupSizeWithDescription(
  min: number,
  max: number
): {
  range: string;
  description: string;
  type: "private" | "small" | "standard" | "large";
} {
  const range = min === max ? `${min} people` : `${min}-${max} people`;

  let type: "private" | "small" | "standard" | "large";
  let description: string;

  if (max <= 3) {
    type = "private";
    description = "Private & intimate experience";
  } else if (max <= 8) {
    type = "small";
    description = "Small group adventure";
  } else if (max <= 15) {
    type = "standard";
    description = "Standard group tour";
  } else {
    type = "large";
    description = "Large group experience";
  }

  return { range, description, type };
}

/**
 * Formats difficulty level with description and requirements
 */
export function formatDifficultyLevel(difficulty: string): {
  level: string;
  description: string;
  requirements: string;
  color: string;
} {
  const levels = {
    Easy: {
      description: "Suitable for all fitness levels",
      requirements: "No special preparation needed",
      color: "green",
    },
    Moderate: {
      description: "Basic fitness required",
      requirements: "Some walking and light activity",
      color: "yellow",
    },
    Challenging: {
      description: "Good fitness required",
      requirements: "Regular exercise recommended",
      color: "orange",
    },
    Expert: {
      description: "Excellent fitness required",
      requirements: "Advanced preparation necessary",
      color: "red",
    },
  };

  const level = levels[difficulty as keyof typeof levels] || levels["Easy"];

  return {
    level: difficulty,
    ...level,
  };
}

/**
 * Formats inclusion/exclusion lists for better readability
 */
export function formatInclusionsExclusions(items: string[]): {
  formatted: string[];
  categories: { [key: string]: string[] };
} {
  const formatted = items.map((item) => {
    // Ensure proper capitalization
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  });

  // Categorize items
  const categories: { [key: string]: string[] } = {
    transportation: [],
    accommodation: [],
    meals: [],
    activities: [],
    equipment: [],
    services: [],
    other: [],
  };

  formatted.forEach((item) => {
    const lower = item.toLowerCase();
    if (
      lower.includes("transport") ||
      lower.includes("flight") ||
      lower.includes("transfer")
    ) {
      categories.transportation.push(item);
    } else if (
      lower.includes("hotel") ||
      lower.includes("accommodation") ||
      lower.includes("lodge")
    ) {
      categories.accommodation.push(item);
    } else if (
      lower.includes("meal") ||
      lower.includes("breakfast") ||
      lower.includes("lunch") ||
      lower.includes("dinner")
    ) {
      categories.meals.push(item);
    } else if (
      lower.includes("tour") ||
      lower.includes("visit") ||
      lower.includes("activity")
    ) {
      categories.activities.push(item);
    } else if (lower.includes("equipment") || lower.includes("gear")) {
      categories.equipment.push(item);
    } else if (lower.includes("guide") || lower.includes("service")) {
      categories.services.push(item);
    } else {
      categories.other.push(item);
    }
  });

  // Remove empty categories
  Object.keys(categories).forEach((key) => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return { formatted, categories };
}

/**
 * Formats seasonal information for display
 */
export function formatSeasonalInfo(
  months: string[],
  weatherConditions?: string
): {
  months: string;
  season: string;
  weather: string;
  recommendation: string;
} {
  const monthAbbreviations: { [key: string]: string } = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  const abbreviated = months.map((month) => monthAbbreviations[month] || month);
  const monthsFormatted = abbreviated.join(", ");

  // Determine season
  let season = "Year-round";
  if (months.length <= 6) {
    const winterMonths = ["December", "January", "February"];
    const summerMonths = ["June", "July", "August"];
    const hasWinter = months.some((month) => winterMonths.includes(month));
    const hasSummer = months.some((month) => summerMonths.includes(month));

    if (hasWinter && !hasSummer) season = "Dry season";
    else if (hasSummer && !hasWinter) season = "High season";
    else season = "Peak season";
  }

  const weather = weatherConditions || "Tropical climate";

  let recommendation = "Book in advance";
  if (months.length <= 3) recommendation = "Limited availability - book early";
  else if (months.length >= 9) recommendation = "Available most of the year";

  return {
    months: monthsFormatted,
    season,
    weather,
    recommendation,
  };
}
