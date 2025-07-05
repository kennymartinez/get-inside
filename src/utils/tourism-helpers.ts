import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

type Tour = CollectionEntry<"tours">;

/**
 * Returns a set of unique destinations and categories from the tours collection.
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
 * Gets unique tour types from the collection
 */
export async function getTourTypes(): Promise<string[]> {
  const allTours = await getCollection(
    "tours",
    ({ data }) => !data.misc?.hidden
  );
  return [
    ...new Set(allTours.map((tour) => tour.data.general.tourType)),
  ].sort();
}

/**
 * Gets unique destinations from the collection
 */
export async function getDestinations(): Promise<string[]> {
  const allTours = await getCollection(
    "tours",
    ({ data }) => !data.misc?.hidden
  );
  return [
    ...new Set(allTours.map((tour) => tour.data.general.destination)),
  ].sort();
}

/**
 * Gets unique categories from the collection
 */
export async function getCategories(): Promise<string[]> {
  const allTours = await getCollection(
    "tours",
    ({ data }) => !data.misc?.hidden
  );
  return [
    ...new Set(allTours.map((tour) => tour.data.general.category)),
  ].sort();
}

/**
 * Gets unique difficulty levels from the collection
 */
export async function getDifficulties(): Promise<string[]> {
  const allTours = await getCollection(
    "tours",
    ({ data }) => !data.misc?.hidden
  );
  return [
    ...new Set(allTours.map((tour) => tour.data.general.difficulty)),
  ].sort();
}
