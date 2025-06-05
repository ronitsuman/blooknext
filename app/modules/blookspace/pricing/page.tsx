import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Star } from "lucide-react"

export default function BlookSpacePricing() {
  return (
    <div className="container py-10">
      <Link href="/modules/blookspace" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to BlookSpace
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">BlookSpace Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Transparent pricing with performance-based commissions. We succeed when you succeed.
        </p>
      </div>

      {/* Commission Structure */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Commission Structure</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-primary">
            <CardHeader className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Space Owners</CardTitle>
              <CardDescription>Earn from your advertising spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary">15%</div>
                <p className="text-muted-foreground">Platform Commission</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  You keep 85% of campaign revenue
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  No upfront costs or listing fees
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Instant payment after campaign completion
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Free analytics and performance tracking
                </li>
              </ul>
              <Link href="/register/space-owner">
                <Button className="w-full">List Your Space</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Brands</CardTitle>
              <CardDescription>Advertise on premium spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary">10%</div>
                <p className="text-muted-foreground">Service Fee</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Access to verified premium spaces
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  AI-powered space recommendations
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Real-time campaign analytics
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Dedicated account management
                </li>
              </ul>
              <Link href="/register/brand">
                <Button className="w-full">Start Advertising</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Subscription Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Basic</CardTitle>
              <div className="text-3xl font-bold">₹999</div>
              <CardDescription>per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Up to 5 active campaigns
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Basic analytics dashboard
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Email support
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Standard space matching
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Monthly performance reports
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <CardHeader className="text-center">
              <CardTitle>Professional</CardTitle>
              <div className="text-3xl font-bold">₹2,999</div>
              <CardDescription>per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Unlimited campaigns
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Advanced analytics & insights
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Priority support (24/7)
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  AI-powered smart matching
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Custom reporting & exports
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  API access for integrations
                </li>
              </ul>
              <Button className="w-full">Choose Professional</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>Enterprise</CardTitle>
              <div className="text-3xl font-bold">Custom</div>
              <CardDescription>pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Everything in Professional
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Dedicated account manager
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Custom integrations & APIs
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  White-label solutions
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  SLA guarantees (99.9% uptime)
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Custom commission rates
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* BlookForce Commission */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">BlookForce Agent Commissions</h2>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Referral Rewards</CardTitle>
            <CardDescription>Earn commissions by referring new users to BlookMySpace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">5%</div>
                <p className="text-sm text-muted-foreground">Space Owner Referral</p>
                <p className="text-xs mt-1">From their first year earnings</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3%</div>
                <p className="text-sm text-muted-foreground">Brand Referral</p>
                <p className="text-xs mt-1">From their campaign spends</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2%</div>
                <p className="text-sm text-muted-foreground">Vendor Referral</p>
                <p className="text-xs mt-1">From their project earnings</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/register/blookforce">
                <Button>Become a BlookForce Agent</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Terms */}
      <div className="bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Terms</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-3">For Space Owners</h3>
            <ul className="space-y-2 text-sm">
              <li>• Payments released within 24 hours of campaign completion</li>
              <li>• Minimum payout threshold: ₹500</li>
              <li>• Direct bank transfer (NEFT/RTGS)</li>
              <li>• GST handling and TDS deduction as per regulations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">For BlookForce Agents</h3>
            <ul className="space-y-2 text-sm">
              <li>• Monthly commission payouts on the 1st of each month</li>
              <li>• Minimum payout threshold: ₹1,000</li>
              <li>• UPI/Bank transfer options available</li>
              <li>• Real-time commission tracking in dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
