"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Star, Zap } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    icon: Star,
    features: ["Up to 5 spaces", "Basic analytics", "QR code generation", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 2999,
    icon: Crown,
    popular: true,
    features: ["Up to 25 spaces", "Advanced analytics", "Custom QR codes", "Priority support", "API access"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 9999,
    icon: Zap,
    features: [
      "Unlimited spaces",
      "Real-time analytics",
      "White-label solution",
      "24/7 support",
      "Custom integrations",
    ],
  },
]

export function PaymentModal({ isOpen, onClose, userId }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("pro")

  const handlePayment = async (planType: string, amount: number) => {
    setLoading(true)

    try {
      // Create order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          receipt: `receipt_${Date.now()}`,
        }),
      })

      const { orderId } = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "BlookMySpace",
        description: `${planType} Plan Subscription`,
        order_id: orderId,
        handler: async (response: any) => {
          // Verify payment
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              userId,
              planType,
            }),
          })

          if (verifyResponse.ok) {
            alert("Payment successful!")
            onClose()
          } else {
            alert("Payment verification failed!")
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed!")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Choose Your Plan</h2>
          <Button variant="ghost" onClick={onClose}>
            ×
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""
                } ${plan.popular ? "border-blue-500" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => {
              const plan = plans.find((p) => p.id === selectedPlan)
              if (plan) handlePayment(plan.name, plan.price)
            }}
            disabled={loading}
            size="lg"
            className="px-8"
          >
            {loading ? "Processing..." : `Subscribe to ${plans.find((p) => p.id === selectedPlan)?.name} Plan`}
          </Button>
        </div>
      </div>
    </div>
  )
}
