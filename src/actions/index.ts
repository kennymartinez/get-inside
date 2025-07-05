import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getPrice, validateBookingForm } from "~/utils/helpers";

export const server = {
  // Legacy loan calculator (keep for backward compatibility)
  getMonthlyInstallment: defineAction({
    accept: "form",
    input: z.object({
      amount: z.number(),
      duration: z.number(),
      finalinstallment: z.number().optional(),
    }),
    handler: async ({ amount, duration, finalinstallment }) => {
      // Keep existing loan logic for car section if needed
      const interestRate = 5.12; // Hardcoded since not used in tourism

      if (amount <= 0) {
        throw new Error("Amount must be greater than 0.");
      }

      if (duration <= 0) {
        throw new Error("Duration must be greater than 0.");
      }

      const monthlyInterestRate = interestRate / 100 / 12;
      const principal = amount - (finalinstallment || 0);
      const monthlyInstallment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -duration));
      const totalPayment =
        monthlyInstallment * duration + (finalinstallment || 0);

      return {
        monthlyInstallment: getPrice(monthlyInstallment),
        totalPayment: getPrice(totalPayment),
        interestRate,
      };
    },
  }),

  // New tourism booking inquiry action
  submitBookingInquiry: defineAction({
    accept: "form",
    input: z.object({
      tourCode: z.string().optional(),
      tourTitle: z.string(),
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please provide a valid email"),
      phone: z.string().optional(),
      groupSize: z.number().min(1).max(50),
      preferredDate: z.string(),
      specialRequests: z.string().optional(),
      hearAboutUs: z.string().optional(),
    }),
    handler: async (input) => {
      // Validate the form data
      const validation = validateBookingForm({
        name: input.name,
        email: input.email,
        groupSize: input.groupSize,
        preferredDate: input.preferredDate,
      });

      if (!validation.isValid) {
        throw new Error(validation.errors.join(", "));
      }

      // Here you would typically:
      // 1. Save to database
      // 2. Send email notifications
      // 3. Integrate with booking system
      // For now, we'll just return success

      return {
        success: true,
        message:
          "Your booking inquiry has been submitted successfully! We'll contact you within 24 hours.",
        inquiryId: `INQ-${Date.now()}`, // Simple ID generation
        tourCode: input.tourCode,
        estimatedResponse: "24 hours",
      };
    },
  }),

  // Tour price calculation action
  calculateTourPrice: defineAction({
    accept: "form",
    input: z.object({
      basePrice: z.number(),
      groupSize: z.number(),
      duration: z.number(),
      seasonalMultiplier: z.number().optional().default(1),
      addOns: z
        .array(
          z.object({
            name: z.string(),
            price: z.number(),
          })
        )
        .optional()
        .default([]),
    }),
    handler: async ({
      basePrice,
      groupSize,
      duration,
      seasonalMultiplier,
      addOns,
    }) => {
      // Calculate base cost
      let totalPrice = basePrice * groupSize;

      // Apply seasonal pricing
      totalPrice *= seasonalMultiplier;

      // Add optional services
      const addOnTotal = addOns.reduce(
        (sum, addOn) => sum + addOn.price * groupSize,
        0
      );
      totalPrice += addOnTotal;

      // Calculate per person price
      const pricePerPerson = totalPrice / groupSize;

      // Calculate daily rate
      const pricePerDay = totalPrice / duration;

      return {
        totalPrice: getPrice(totalPrice),
        pricePerPerson: getPrice(pricePerPerson),
        pricePerDay: getPrice(pricePerDay),
        breakdown: {
          basePrice: getPrice(basePrice * groupSize),
          seasonalAdjustment:
            seasonalMultiplier !== 1
              ? getPrice(basePrice * groupSize * (seasonalMultiplier - 1))
              : null,
          addOns: addOns.map((addOn) => ({
            name: addOn.name,
            unitPrice: getPrice(addOn.price),
            totalPrice: getPrice(addOn.price * groupSize),
          })),
          addOnTotal: getPrice(addOnTotal),
        },
      };
    },
  }),
};
