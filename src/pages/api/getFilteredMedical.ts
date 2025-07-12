export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { z } from "zod";

const searchParamsSchema = z.object({
  specialty: z.string().optional(),
  city: z.string().optional(),
  procedure: z.string().optional(),
  language: z.string().optional(),
  experience: z.string().optional(),
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

  const { specialty, city, procedure, language, experience, sort, search } =
    result.data;

  const filters: ((data: any) => boolean)[] = [];

  // Specialty filter
  if (specialty && specialty !== "all") {
    filters.push((data: any) => data.specialty === specialty);
  }

  // City filter
  if (city && city !== "all") {
    filters.push((data: any) => data.location.city === city);
  }

  // Procedure filter
  if (procedure && procedure !== "all") {
    filters.push((data: any) => data.procedures.includes(procedure));
  }

  // Language filter
  if (language && language !== "all") {
    filters.push((data: any) =>
      data.professional.languagesSpoken.includes(language)
    );
  }

  // Experience filter
  if (experience && experience !== "all") {
    filters.push((data: any) => {
      const years = data.professional.yearsExperience;

      switch (experience) {
        case "1-5":
          return years >= 1 && years <= 5;
        case "6-10":
          return years >= 6 && years <= 10;
        case "11-15":
          return years >= 11 && years <= 15;
        case "16+":
          return years >= 16;
        default:
          return true;
      }
    });
  }

  // Search functionality
  if (search) {
    const searchQueries = search
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(" ");

    filters.push((data: any) => {
      const searchableFields = [
        data.title,
        data.specialty,
        data.location.city,
        data.location.clinic,
        data.professional.education,
        ...(data.procedures || []),
        ...(data.professional.certifications || []),
      ];

      return searchQueries.every((query) =>
        searchableFields.some(
          (field) => field && field.toLowerCase().includes(query)
        )
      );
    });
  }

  // Get filtered specialists
  const allSpecialists = await getCollection(
    "medicalTourism",
    ({ data }: { data: any }) => {
      return !data.misc?.hidden && filters.every((filter) => filter(data));
    }
  );

  // Sort specialists
  if (sort && sort !== "all") {
    const [sortKey, sortOrder] = sort.split("-");
    const order = sortOrder === "asc" ? 1 : -1;

    allSpecialists.sort((a: any, b: any) => {
      let aValue, bValue;

      switch (sortKey) {
        case "experience":
          aValue = a.data.professional.yearsExperience;
          bValue = b.data.professional.yearsExperience;
          break;
        case "name":
          aValue = a.data.title;
          bValue = b.data.title;
          break;
        case "specialty":
          aValue = a.data.specialty;
          bValue = b.data.specialty;
          break;
        case "city":
          aValue = a.data.location.city;
          bValue = b.data.location.city;
          break;
        case "featured":
          aValue =
            (a.data.misc?.featured ? 1 : 0) + (a.data.misc?.verified ? 1 : 0);
          bValue =
            (b.data.misc?.featured ? 1 : 0) + (b.data.misc?.verified ? 1 : 0);
          break;
        default:
          return 0;
      }

      return aValue < bValue ? -order : aValue > bValue ? order : 0;
    });
  } else {
    // Default sort: featured first, then by experience
    allSpecialists.sort((a: any, b: any) => {
      const aScore =
        (a.data.misc?.featured ? 2 : 0) + (a.data.misc?.verified ? 1 : 0);
      const bScore =
        (b.data.misc?.featured ? 2 : 0) + (b.data.misc?.verified ? 1 : 0);

      if (aScore !== bScore) {
        return bScore - aScore; // Higher score first
      }

      return (
        b.data.professional.yearsExperience -
        a.data.professional.yearsExperience
      );
    });
  }

  const end = performance.now();

  return new Response(
    JSON.stringify({
      allSpecialists,
      count: allSpecialists.length,
      processingTime: `${(end - start).toFixed(2)}ms`,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
};
