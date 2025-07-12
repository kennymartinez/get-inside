import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get("name")?.toString(),
      email: formData.get("email")?.toString(),
      phone: formData.get("phone")?.toString(),
      country: formData.get("country")?.toString(),
      procedure: formData.get("procedure")?.toString(),
      preferredDate: formData.get("preferredDate")?.toString(),
      medicalHistory: formData.get("medicalHistory")?.toString(),
      message: formData.get("message")?.toString(),
      specialistId: formData.get("specialistId")?.toString(),
    };

    // Validate required fields
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.country ||
      !data.procedure
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Here you would typically:
    // 1. Send email to the medical specialist
    // 2. Send confirmation email to the patient
    // 3. Store in database
    // 4. Integrate with CRM system

    console.log("Medical inquiry received:", data);

    // For now, return success
    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Your consultation request has been sent successfully. You will receive a response within 24-48 hours.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing medical inquiry:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
