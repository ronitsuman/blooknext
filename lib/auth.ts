import { supabase } from "./supabase/client"

export type UserRole = "space_owner" | "brand" | "vendor" | "blookforce_agent"

export interface SignUpData {
  email: string
  password: string
  fullName: string
  phone?: string
  role: UserRole
}

export async function signUp(data: SignUpData) {
  try {
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone,
          role: data.role,
        },
      },
    })

    if (authError) throw authError

    // Insert user profile
    if (authData.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        role: data.role,
      })

      if (profileError) throw profileError
    }

    return { data: authData, error: null }
  } catch (error) {
    console.error("Sign up error:", error)
    return { data: null, error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error("Sign in error:", error)
    return { data: null, error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error }
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) throw error
    if (!user) return { user: null, profile: null, error: null }

    // Get user profile
    const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", user.id).single()

    if (profileError) throw profileError

    return { user, profile, error: null }
  } catch (error) {
    console.error("Get current user error:", error)
    return { user: null, profile: null, error }
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<{
    full_name: string
    phone: string
    avatar_url: string
  }>,
) {
  try {
    const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error("Update profile error:", error)
    return { data: null, error }
  }
}
