export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { z } from "zod";

const searchParamsSchema = z.object({
  destination: z.string().optional(),
  tourType: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  duration: z.string().optional(),
  price: z.string().optional(),
  groupSize: z.string().optional(),
  special: z.string().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
});

export const GET: APIRoute = async ({ request }) => {
  const start = performance.now();
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  const result = searchParamsSchema.safeParse(searchParams);

  if (!result.success) {
    return new Response(
      JSON.stringify({ error: "Invalid search parameters" }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }

  const {
    destination,
    tourType,
    category,
    difficulty,
    duration,
    price,
    groupSize,
    special,
    sort,
    search,
  } = result.data;

  const filters: ((data: any) => boolean)[] = [];

  // Destination filter (replaces "make")
  if (destination && destination !== "all") {
    filters.push((data: any) => data.general.destination === destination);
  }

  // Tour Type filter (replaces "bodyType")
  if (tourType && tourType !== "all") {
    filters.push((data: any) => data.general.tourType === tourType);
  }

  // Category filter (replaces "model")
  if (category && category !== "all") {
    filters.push((data: any) => data.general.category === category);
  }

  // Difficulty filter (replaces "fuelType")
  if (difficulty && difficulty !== "all") {
    filters.push((data: any) => data.general.difficulty === difficulty);
  }

  // Duration filter (NEW for tourism)
  if (duration && duration !== "all") {
    filters.push((data: any) => {
      const tourDays = data.general.duration.days;

      switch (duration) {
        case "1":
          return tourDays === 1;
        case "2-3":
          return tourDays >= 2 && tourDays <= 3;
        case "4-7":
          return tourDays >= 4 && tourDays <= 7;
        case "8-14":
          return tourDays >= 8 && tourDays <= 14;
        case "15+":
          return tourDays >= 15;
        default:
          return true;
      }
    });
  }

  // Price filter (updated for tourism pricing)
  if (price && price !== "all") {
    const [minPrice, maxPrice] = price.split("-").map(Number);

    filters.push((data: any) => {
      const regularPrice = data.general.price;
      const salePrice = data.general.salePrice;
      const actualPrice = salePrice || regularPrice;

      if (maxPrice) {
        return actualPrice >= minPrice && actualPrice <= maxPrice;
      } else {
        return actualPrice >= minPrice;
      }
    });
  }

  // Group Size filter (NEW for tourism)
  if (groupSize && groupSize !== "all") {
    filters.push((data: any) => {
      const maxSize = data.general.groupSize.max;

      switch (groupSize) {
        case "private":
          return maxSize <= 3;
        case "small":
          return maxSize >= 4 && maxSize <= 8;
        case "standard":
          return maxSize >= 9 && maxSize <= 15;
        case "large":
          return maxSize >= 16;
        default:
          return true;
      }
    });
  }

  // Special filters (NEW for tourism)
  if (special && special !== "all") {
    filters.push((data: any) => {
      switch (special) {
        case "featured":
          return data.misc?.featured === true;
        case "sustainable":
          return data.misc?.sustainable === true;
        case "popular":
          return data.misc?.popularTour === true;
        case "new":
          return data.misc?.newTour === true;
        case "sale":
          return data.general.salePrice > 0;
        default:
          return true;
      }
    });
  }

  // Search functionality (updated for tourism)
  if (search) {
    const searchQueries = search
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(" ");

    filters.push((data: any) => {
      const searchableFields = [
        data.general.destination,
        data.general.tourType,
        data.general.category,
        data.general.difficulty,
        data.logistics.transportation,
        data.experience.guideType,
        ...(data.activities || []),
      ];

      return searchQueries.every((query) =>
        searchableFields.some(
          (field) => field && field.toLowerCase().includes(query)
        )
      );
    });
  }

  // Get filtered tours
  const allTours = await getCollection("tours", ({ data }: { data: any }) => {
    return !data.misc?.hidden && filters.every((filter) => filter(data));
  });

  // Sort tours
  if (sort && sort !== "all") {
    const [sortKey, sortOrder] = sort.split("-");
    const order = sortOrder === "asc" ? 1 : -1;

    allTours.sort((a: any, b: any) => {
      let aValue, bValue;

      switch (sortKey) {
        case "price":
          aValue = a.data.general.salePrice || a.data.general.price;
          bValue = b.data.general.salePrice || b.data.general.price;
          break;
        case "duration":
          aValue = a.data.general.duration.days;
          bValue = b.data.general.duration.days;
          break;
        case "difficulty":
          const difficultyOrder = {
            Easy: 1,
            Moderate: 2,
            Challenging: 3,
            Expert: 4,
          };
          aValue =
            difficultyOrder[
              a.data.general.difficulty as keyof typeof difficultyOrder
            ] || 5;
          bValue =
            difficultyOrder[
              b.data.general.difficulty as keyof typeof difficultyOrder
            ] || 5;
          break;
        case "popularity":
          aValue =
            (a.data.misc?.popularTour ? 1 : 0) +
            (a.data.misc?.featured ? 1 : 0);
          bValue =
            (b.data.misc?.popularTour ? 1 : 0) +
            (b.data.misc?.featured ? 1 : 0);
          break;
        case "newest":
          aValue = new Date(a.data.publishDate).getTime();
          bValue = new Date(b.data.publishDate).getTime();
          break;
        default:
          aValue = a.data.general.price;
          bValue = b.data.general.price;
      }

      return (aValue - bValue) * order;
    });
  }

  const end = performance.now();
  console.log(`Tour filtering took ${end - start} milliseconds`);

  return new Response(JSON.stringify({ allTours }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
