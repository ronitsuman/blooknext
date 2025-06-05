import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"
import { sendPasswordResetEmail } from "@/lib/email-service"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, email, full_name")
      .eq("email", email)
      .single()

    if (userError || !user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        message: "If an account with that email exists, we have sent a password reset link.",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Store reset token in database
    const { error: tokenError } = await supabase.from("password_reset_tokens").insert({
      user_id: user.id,
      token: resetToken,
      expires_at: resetTokenExpiry.toISOString(),
      used: false,
    })

    if (tokenError) {
      console.error("Token storage error:", tokenError)
      return NextResponse.json({ error: "Failed to generate reset token" }, { status: 500 })
    }

    // Send password reset email
    await sendPasswordResetEmail(user.email, user.full_name, resetToken)

    return NextResponse.json({
      message: "If an account with that email exists, we have sent a password reset link.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
