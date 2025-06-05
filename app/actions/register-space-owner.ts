"use server"

import { z } from "zod"
import { signUp } from "@/lib/auth"
import { createSpaceOwner, createSpace } from "@/lib/database"

const spaceOwnerFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  companyName: z.string().optional(),
  contactPerson: z.string().min(2, {
    message: "Contact person name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  pincode: z.string().min(6, {
    message: "Pincode must be at least 6 characters.",
  }),
  landmark: z.string().optional(),
  spaceType: z.string({
    required_error: "Please select a space type.",
  }),
  spaceName: z.string().min(2, {
    message: "Space name must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  spaceSize: z.string().min(1, {
    message: "Please enter the space size.",
  }),
  footfallWeekday: z.string().min(1, {
    message: "Please enter the weekday footfall.",
  }),
  footfallWeekend: z.string().min(1, {
    message: "Please enter the weekend footfall.",
  }),
  ageGroup: z.string({
    required_error: "Please select the age group.",
  }),
  incomeSegment: z.string({
    required_error: "Please select the income segment.",
  }),
  hasCameras: z.boolean().default(false),
  cameraCount: z.string().optional(),
  cameraType: z.string().optional(),
  cameraAccessible: z.boolean().default(false),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export async function registerSpaceOwner(formData: FormData) {
  try {
    // Parse form data
    const rawData = Object.fromEntries(formData.entries())

    // Convert string "true"/"false" to boolean
    const parsedData = {
      ...rawData,
      hasCameras: rawData.hasCameras === "true",
      cameraAccessible: rawData.cameraAccessible === "true",
      termsAgreed: rawData.termsAgreed === "true",
    }

    // Validate data
    const validatedData = spaceOwnerFormSchema.parse(parsedData)

    // Create user account
    const { data: authData, error: authError } = await signUp({
      email: validatedData.email,
      password: validatedData.password,
      fullName: validatedData.fullName,
      phone: validatedData.phone,
      role: "space_owner",
    })

    if (authError || !authData.user) {
      throw new Error(authError?.message || "Failed to create user account")
    }

    // Create space owner profile
    const { data: spaceOwnerData, error: spaceOwnerError } = await createSpaceOwner({
      userId: authData.user.id,
      companyName: validatedData.companyName,
      contactPerson: validatedData.contactPerson,
      address: validatedData.address,
      pincode: validatedData.pincode,
      landmark: validatedData.landmark,
    })

    if (spaceOwnerError || !spaceOwnerData) {
      throw new Error("Failed to create space owner profile")
    }

    // Create space
    const { data: spaceData, error: spaceError } = await createSpace({
      ownerId: spaceOwnerData.id,
      name: validatedData.spaceName,
      spaceType: validatedData.spaceType,
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
      pincode: validatedData.pincode,
      spaceSize: Number.parseInt(validatedData.spaceSize),
      footfallWeekday: Number.parseInt(validatedData.footfallWeekday),
      footfallWeekend: Number.parseInt(validatedData.footfallWeekend),
      ageGroup: validatedData.ageGroup,
      incomeSegment: validatedData.incomeSegment,
      hasCameras: validatedData.hasCameras,
      cameraCount: validatedData.cameraCount ? Number.parseInt(validatedData.cameraCount) : undefined,
      cameraType: validatedData.cameraType,
      cameraAccessible: validatedData.cameraAccessible,
    })

    if (spaceError) {
      throw new Error("Failed to create space")
    }

    return {
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
      data: {
        user: authData.user,
        spaceOwner: spaceOwnerData,
        space: spaceData,
      },
    }
  } catch (error) {
    console.error("Space owner registration error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed. Please try again.",
    }
  }
}
