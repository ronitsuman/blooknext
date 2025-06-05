"use server"

import { createClient } from "@/lib/supabase/server"

export async function registerBlookForce(formData: FormData) {
  try {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const city = formData.get("city") as string
    const experience = formData.get("experience") as string
    const languages = formData.get("languages") as string
    const referralCode = formData.get("referralCode") as string

    // Get uploaded files
    const aadhaarFile = formData.get("aadhaarFile") as File
    const selfieFile = formData.get("selfieFile") as File

    // Basic validation
    if (!email || !password || !fullName || !phone) {
      return { error: "Please fill in all required fields" }
    }

    if (!aadhaarFile || !selfieFile) {
      return { error: "Please upload all required documents" }
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: "blookforce_agent",
        },
      },
    })

    if (authError) {
      return { error: authError.message }
    }

    if (!authData.user) {
      return { error: "Failed to create user account" }
    }

    // Upload Aadhaar document
    const aadhaarFileName = `${authData.user.id}/aadhaar_${Date.now()}.${aadhaarFile.name.split(".").pop()}`
    const { data: aadhaarUpload, error: aadhaarError } = await supabase.storage
      .from("documents")
      .upload(aadhaarFileName, aadhaarFile)

    if (aadhaarError) {
      return { error: "Failed to upload Aadhaar document" }
    }

    // Upload selfie photo
    const selfieFileName = `${authData.user.id}/selfie_${Date.now()}.${selfieFile.name.split(".").pop()}`
    const { data: selfieUpload, error: selfieError } = await supabase.storage
      .from("documents")
      .upload(selfieFileName, selfieFile)

    if (selfieError) {
      return { error: "Failed to upload selfie photo" }
    }

    // Create BlookForce agent profile
    const { error: profileError } = await supabase.from("blookforce_agents").insert({
      id: authData.user.id,
      full_name: fullName,
      email,
      phone,
      city,
      experience,
      languages: languages.split(",").map((lang) => lang.trim()),
      referral_code: referralCode || null,
      aadhaar_document_url: aadhaarUpload.path,
      selfie_photo_url: selfieUpload.path,
      documents_verified: false,
      status: "documents_pending",
    })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      return { error: "Failed to create agent profile" }
    }

    return {
      success: true,
      message:
        "Registration successful! Your documents have been submitted for verification. You'll receive an email once approved.",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
