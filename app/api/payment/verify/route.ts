import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { supabase } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, planType } = await request.json()

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Save subscription to database
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .insert({
        user_id: userId,
        plan_type: planType,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        status: "active",
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, subscription })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
