import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

type MedicalSpecialist = CollectionEntry<"medicalTourism">;

/**
 * Gets unique medical specialties from the collection
 */
export async function getMedicalSpecialties(): Promise<string[]> {
  const allSpecialists = await getCollection(
    "medicalTourism",
    ({ data }) => !data.misc?.hidden
  );
  return [
    ...new Set(allSpecialists.map((specialist) => specialist.data.specialty)),
  ].sort();
}

/**
 * Gets unique cities from the medical collection
 */
export async function getMedicalCities(): Promise<string[]> {
  const allSpecialists = await getCollection(
    "medicalTourism",
    ({ data }) => !data.misc?.hidden
  );
  return [
    ...new Set(
      allSpecialists.map((specialist) => specialist.data.location.city)
    ),
  ].sort();
}

/**
 * Gets unique procedures from the collection
 */
export async function getMedicalProcedures(): Promise<string[]> {
  const allSpecialists = await getCollection(
    "medicalTourism",
    ({ data }) => !data.misc?.hidden
  );

  const allProcedures = allSpecialists.flatMap(
    (specialist) => specialist.data.procedures
  );

  return [...new Set(allProcedures)].sort();
}

/**
 * Gets unique languages from the collection
 */
export async function getMedicalLanguages(): Promise<string[]> {
  const allSpecialists = await getCollection(
    "medicalTourism",
    ({ data }) => !data.misc?.hidden
  );

  const allLanguages = allSpecialists.flatMap(
    (specialist) => specialist.data.professional.languagesSpoken
  );

  return [...new Set(allLanguages)].sort();
}

/**
 * Returns a set of unique specialties and procedures from the medical collection.
 */
export async function getSpecialtyProcedureSet() {
  const allSpecialists = await getCollection("medicalTourism", ({ data }) => {
    return data.misc?.hidden !== true;
  });

  const specialtiesWithProcedures = allSpecialists.reduce(
    (acc: { [key: string]: Set<string> }, specialist) => {
      const specialty = specialist.data.specialty;
      const procedures = specialist.data.procedures;

      if (!acc[specialty]) {
        acc[specialty] = new Set();
      }

      procedures.forEach((procedure) => acc[specialty].add(procedure));

      return acc;
    },
    {}
  );

  const result = Object.entries(specialtiesWithProcedures).map(
    ([specialty, procedures]) => ({
      specialty,
      procedures: Array.from(procedures),
    })
  );

  return result;
}

/**
 * Gets medical specialist statistics for dashboard/summary displays.
 */
export async function getMedicalStats() {
  const allSpecialists = await getCollection(
    "medicalTourism",
    ({ data }) => !data.misc?.hidden
  );

  const stats = {
    totalSpecialists: allSpecialists.length,
    cities: new Set(
      allSpecialists.map((specialist) => specialist.data.location.city)
    ).size,
    averageExperience: Math.round(
      allSpecialists.reduce(
        (sum, specialist) => sum + specialist.data.professional.yearsExperience,
        0
      ) / allSpecialists.length
    ),
    featuredSpecialists: allSpecialists.filter(
      (specialist) => specialist.data.misc?.featured
    ).length,
    verifiedSpecialists: allSpecialists.filter(
      (specialist) => specialist.data.misc?.verified
    ).length,
    specialties: new Set(
      allSpecialists.map((specialist) => specialist.data.specialty)
    ).size,
  };

  return stats;
}
