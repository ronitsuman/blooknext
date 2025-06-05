"use server"

import { z } from "zod"

const brandFormSchema = z.object({
  brandName: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
  contactPerson: z.string().min(2, {
    message: "Contact person name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  industryType: z.string({
    required_error: "Please select an industry type.",
  }),
  website: z.string().url().optional().or(z.literal("")),
  campaignInterests: z.array(z.string()).min(1, {
    message: "Please select at least one campaign interest.",
  }),
  targetSpaces: z.array(z.string()).min(1, {
    message: "Please select at least one target space.",
  }),
  targetCities: z.array(z.string()).min(1, {
    message: "Please select at least one target city.",
  }),
  budget: z.string({
    required_error: "Please select a budget range.",
  }),
  needsVendor: z.boolean().default(false),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export async function registerBrand(formData: FormData) {
  try {
    // Parse form data
    const rawData = Object.fromEntries(formData.entries())

    // Handle array fields
    const campaignInterests = formData.getAll("campaignInterests")
    const targetSpaces = formData.getAll("targetSpaces")
    const targetCities = formData.getAll("targetCities")

    // Convert string "true"/"false" to boolean
    const parsedData = {
      ...rawData,
      campaignInterests,
      targetSpaces,
      targetCities,
      needsVendor: rawData.needsVendor === "true",
      termsAgreed: rawData.termsAgreed === "true",
    }

    // Validate data
    const validatedData = brandFormSchema.parse(parsedData)

    // In a real app, you would save this data to your database
    console.log("Brand registration data:", validatedData)

    // Generate a unique ID for the brand
    const brandId = crypto.randomUUID()

    // Return success response
    return {
      success: true,
      message: "Registration successful!",
      data: {
        id: brandId,
        ...validatedData,
      },
    }
  } catch (error) {
    console.error("Brand registration error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Registration failed. Please try again.",
    }
  }
}
