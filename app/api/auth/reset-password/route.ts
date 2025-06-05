import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Find valid reset token
    const { data: resetToken, error: tokenError } = await supabase
      .from("password_reset_tokens")
      .select("user_id, expires_at, used")
      .eq("token", token)
      .single()

    if (tokenError || !resetToken) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Check if token is expired or used
    if (resetToken.used || new Date() > new Date(resetToken.expires_at)) {
      return NextResponse.json({ error: "Reset token has expired" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password in Supabase Auth
    const { error: authError } = await supabase.auth.admin.updateUserById(resetToken.user_id, { password })

    if (authError) {
      console.error("Auth password update error:", authError)
      return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
    }

    // Mark token as used
    const { error: markUsedError } = await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("token", token)

    if (markUsedError) {
      console.error("Token mark used error:", markUsedError)
    }

    return NextResponse.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
