import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Building, MapPin, Target, TrendingUp, Users, Calendar } from "lucide-react"

export default function BlookSpacePage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">BlookSpace</h1>
        <p className="text-muted-foreground text-lg">
          The core platform connecting spaces with brands for advertising and promotions
        </p>
      </div>

      <div className="grid gap-6 mt-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Building className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Space Discovery</CardTitle>
            <CardDescription>Find the perfect spaces for your advertising campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              BlookSpace provides a comprehensive marketplace where brands can discover and book advertising spaces:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Advanced search filters by location, audience, and space type</li>
              <li>Detailed space analytics including footfall and demographics</li>
              <li>Real-time availability and pricing information</li>
              <li>360° virtual tours and high-quality photos</li>
              <li>Verified space owners with ratings and reviews</li>
            </ul>
            <Link href="/register/brand">
              <Button className="w-full">Discover Spaces</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MapPin className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Smart Matching</CardTitle>
            <CardDescription>AI-powered recommendations for optimal space-brand partnerships</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Our intelligent matching system connects brands with the most suitable spaces:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>AI-driven recommendations based on campaign objectives</li>
              <li>Audience alignment analysis for maximum impact</li>
              <li>Budget optimization suggestions</li>
              <li>Historical performance data insights</li>
              <li>Competitive analysis and market trends</li>
            </ul>
            <Link href="/modules/blookspace/matching">
              <Button variant="outline" className="w-full">
                Learn About Matching
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Target className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Campaign Management</CardTitle>
            <CardDescription>End-to-end campaign planning, execution, and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookSpace provides comprehensive tools for managing your advertising campaigns:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Campaign planning and timeline management</li>
              <li>Creative asset management and approval workflows</li>
              <li>Real-time campaign monitoring and adjustments</li>
              <li>Performance tracking with detailed analytics</li>
              <li>Automated reporting and ROI calculations</li>
            </ul>
            <Link href="/modules/blookspace/campaigns">
              <Button variant="outline" className="w-full">
                Explore Campaign Tools
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Analytics & Insights</CardTitle>
            <CardDescription>Data-driven insights to optimize your advertising strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Get deep insights into your campaign performance and market trends:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Real-time campaign performance metrics</li>
              <li>Audience engagement and interaction data</li>
              <li>Competitive benchmarking and market analysis</li>
              <li>ROI tracking and attribution modeling</li>
              <li>Predictive analytics for future campaigns</li>
            </ul>
            <Link href="/modules/blookspace/analytics">
              <Button variant="outline" className="w-full">
                View Analytics Demo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose BlookSpace?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verified Network</h3>
            <p className="text-muted-foreground">
              All spaces and brands are verified for authenticity and quality assurance
            </p>
          </div>
          <div className="text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flexible Booking</h3>
            <p className="text-muted-foreground">
              Book spaces for any duration - from single days to long-term campaigns
            </p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Performance Tracking</h3>
            <p className="text-muted-foreground">
              Track every aspect of your campaign with detailed analytics and reporting
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mt-12 bg-muted rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">BlookSpace Commission Structure</h2>
          <p className="text-muted-foreground">Performance-based pricing. We succeed when you succeed.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-primary">
            <CardHeader className="text-center">
              <CardTitle>Space Owners</CardTitle>
              <div className="text-3xl font-bold text-primary">15%</div>
              <CardDescription>Platform Commission</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li>• Keep 85% of campaign revenue</li>
                <li>• No upfront costs or listing fees</li>
                <li>• Instant payments after completion</li>
                <li>• Free analytics and tracking</li>
              </ul>
              <Button className="w-full">List Your Space</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Brands</CardTitle>
              <div className="text-3xl font-bold text-primary">10%</div>
              <CardDescription>Service Fee</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li>• Access to verified premium spaces</li>
                <li>• AI-powered recommendations</li>
                <li>• Real-time campaign analytics</li>
                <li>• Dedicated account management</li>
              </ul>
              <Button className="w-full" variant="outline">
                Start Advertising
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-6">
          <Link href="/modules/blookspace/pricing">
            <Button variant="outline">View Detailed Pricing</Button>
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Advertising Strategy?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join BlookSpace today and connect with the perfect spaces for your brand. Start your first campaign in minutes
          and see the difference data-driven advertising can make.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/brand">
            <Button size="lg">Start Your Campaign</Button>
          </Link>
          <Link href="/register/space-owner">
            <Button variant="outline" size="lg">
              List Your Space
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
