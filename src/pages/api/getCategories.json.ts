export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const destination = url.searchParams.get("destination");

  if (!destination) {
    return new Response(
      JSON.stringify({ error: "Destination parameter is required" }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }

  try {
    const allTours = await getCollection(
      "tours",
      ({ data }) =>
        !data.misc?.hidden && data.general.destination === destination
    );

    const categories = [
      ...new Set(allTours.map((tour) => tour.data.general.category)),
    ].sort();

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
};
