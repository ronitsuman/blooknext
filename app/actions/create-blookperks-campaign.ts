"use server"

import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { createBlookPerksCampaign } from "@/lib/database"
import { supabase } from "@/lib/supabase/client"

const campaignFormSchema = z.object({
  campaignName: z.string().min(2, {
    message: "Campaign name must be at least 2 characters.",
  }),
  spaceId: z.string().uuid({
    message: "Please select a valid space.",
  }),
  campaignType: z.string({
    required_error: "Please select a campaign type.",
  }),
  description: z.string().optional(),
  startDate: z.string({
    required_error: "Please select a start date.",
  }),
  endDate: z.string({
    required_error: "Please select an end date.",
  }),
  rewardType: z.string({
    required_error: "Please select a reward type.",
  }),
  rewardValue: z.string().min(1, {
    message: "Please enter a reward value.",
  }),
  rewardQuantity: z.string().min(1, {
    message: "Please enter a reward quantity.",
  }),
  termsAndConditions: z.string().min(10, {
    message: "Terms and conditions must be at least 10 characters.",
  }),
  notifyUsers: z.boolean().default(false),
})

export async function createBlookPerksCampaignAction(formData: FormData) {
  try {
    // Get current user
    const { user, profile } = await getCurrentUser()

    if (!user || !profile || profile.role !== "space_owner") {
      return {
        success: false,
        message: "Unauthorized. Please log in as a space owner.",
      }
    }

    // Parse form data
    const rawData = Object.fromEntries(formData.entries())

    // Convert string "true"/"false" to boolean
    const parsedData = {
      ...rawData,
      notifyUsers: rawData.notifyUsers === "true",
    }

    // Validate data
    const validatedData = campaignFormSchema.parse(parsedData)

    // Verify space ownership
    const { data: spaceOwner } = await supabase.from("space_owners").select("id").eq("user_id", user.id).single()

    if (!spaceOwner) {
      return {
        success: false,
        message: "Space owner profile not found.",
      }
    }

    const { data: space } = await supabase
      .from("spaces")
      .select("id")
      .eq("id", validatedData.spaceId)
      .eq("owner_id", spaceOwner.id)
      .single()

    if (!space) {
      return {
        success: false,
        message: "Space not found or you don't have permission to create campaigns for this space.",
      }
    }

    // Create rewards object
    const rewards = {
      type: validatedData.rewardType,
      value: validatedData.rewardValue,
      quantity: Number.parseInt(validatedData.rewardQuantity),
      remaining: Number.parseInt(validatedData.rewardQuantity),
    }

    // Create campaign
    const { data: campaign, error } = await createBlookPerksCampaign({
      spaceId: validatedData.spaceId,
      name: validatedData.campaignName,
      description: validatedData.description,
      campaignType: validatedData.campaignType,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      rewards,
      termsConditions: validatedData.termsAndConditions,
    })

    if (error || !campaign) {
      throw new Error("Failed to create campaign")
    }

    return {
      success: true,
      message: "Campaign created successfully!",
      data: campaign,
    }
  } catch (error) {
    console.error("Create campaign error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create campaign. Please try again.",
    }
  }
}
