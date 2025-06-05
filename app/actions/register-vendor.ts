import { createClient } from "@/lib/supabase/server"

export async function registerVendor(formData: FormData) {
  try {
    const supabase = await createClient()

    // Rest of the function remains the same...
  } catch (error) {
    console.error("Error registering vendor:", error)
    return { message: "Error registering vendor" }
  }
}
