import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Star } from "lucide-react"

export default function SubscriptionPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Plan</h1>
        <p className="mt-2 text-muted-foreground">
          Select the plan that best fits your needs. Upgrade or downgrade at any time.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Free Plan
              <Badge variant="outline">Current</Badge>
            </CardTitle>
            <CardDescription>Perfect for getting started with BlookMySpace</CardDescription>
            <div className="text-3xl font-bold">
              ₹0<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Basic space listing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Up to 3 campaigns per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Email support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>QR code generation</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Premium Plan
              <Badge className="bg-primary">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            </CardTitle>
            <CardDescription>Everything you need to maximize your space revenue</CardDescription>
            <div className="text-3xl font-bold">
              ₹1,800
              <span className="text-sm font-normal text-muted-foreground">/year</span>
              <div className="text-sm text-muted-foreground">~₹5/day</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Badge className="bg-green-500 mb-2">Limited Time: 1 Month Free!</Badge>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Everything in Free plan</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Unlimited campaigns</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Featured badge on listings</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Priority in search results</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Advanced analytics & insights</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Early access to BLookHeat</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Featured on homepage</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Priority in BLookPerks rewards</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/subscription/checkout" className="w-full">
              <Button className="w-full">Upgrade to Premium</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-left">
            <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
              cycle.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
            <p className="text-muted-foreground">
              Yes, we offer a 30-day money-back guarantee for premium subscriptions if you're not satisfied with our
              service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
