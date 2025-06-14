import { createClient } from "@/lib/supabase/server"

export async function registerBrand(formData: FormData) {
  try {
    const supabase = await createClient()

    // Rest of the function remains the same...
  } catch (error) {
    console.error("Error registering brand:", error)
    return { message: "Failed to register brand" }
  }
}
