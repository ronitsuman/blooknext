import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", receipt } = await request.json()

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
    })

    return NextResponse.json({ orderId: order.id, amount: order.amount })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
