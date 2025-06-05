import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search, Filter, BarChart, Camera, Shield } from "lucide-react"

export default function BlookSpaceFeaturesPage() {
  return (
    <div className="container py-10">
      <Link href="/modules/blookspace" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to BlookSpace
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">BlookSpace Features</h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive tools and features for effective space-brand connections
        </p>
      </div>

      <div className="grid gap-8 mt-10">
        <Card>
          <CardHeader>
            <Search className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Advanced Search & Discovery</CardTitle>
            <CardDescription>Find the perfect spaces with powerful search capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Location-Based Search</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Search by city, area, or pincode</li>
                  <li>• Radius-based proximity search</li>
                  <li>• Map view with interactive markers</li>
                  <li>• Nearby amenities and landmarks</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Audience Targeting</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Age group demographics</li>
                  <li>• Income segment filtering</li>
                  <li>• Footfall patterns and timing</li>
                  <li>• Visitor behavior analytics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Filter className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Smart Filtering System</CardTitle>
            <CardDescription>Narrow down options with intelligent filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2">Space Type</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Retail stores</li>
                  <li>• Restaurants & cafes</li>
                  <li>• Office buildings</li>
                  <li>• Shopping malls</li>
                  <li>• Transit stations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Budget Range</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Daily rate filters</li>
                  <li>• Monthly package deals</li>
                  <li>• Seasonal pricing</li>
                  <li>• Bulk booking discounts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Availability</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time availability</li>
                  <li>• Date range selection</li>
                  <li>• Recurring bookings</li>
                  <li>• Last-minute deals</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Comprehensive Analytics</CardTitle>
            <CardDescription>Data-driven insights for optimal campaign performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Performance Metrics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Impression tracking</li>
                  <li>• Engagement rates</li>
                  <li>• Conversion analytics</li>
                  <li>• ROI calculations</li>
                  <li>• A/B testing results</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Audience Insights</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Demographic breakdowns</li>
                  <li>• Behavior patterns</li>
                  <li>• Peak hours analysis</li>
                  <li>• Seasonal trends</li>
                  <li>• Competitive analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Camera className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Visual Documentation</CardTitle>
            <CardDescription>Rich media content for informed decision making</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Space Visualization</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• High-resolution photos</li>
                  <li>• 360° virtual tours</li>
                  <li>• Video walkthroughs</li>
                  <li>• Floor plans and layouts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Campaign Mockups</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AR visualization tools</li>
                  <li>• Creative placement previews</li>
                  <li>• Size and scale references</li>
                  <li>• Lighting condition samples</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Trust & Safety</CardTitle>
            <CardDescription>Verified spaces and secure transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Verification Process</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Identity verification</li>
                  <li>• Business license checks</li>
                  <li>• Property ownership validation</li>
                  <li>• Quality assessments</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Secure Payments</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Escrow payment system</li>
                  <li>• Multiple payment options</li>
                  <li>• Automated invoicing</li>
                  <li>• Dispute resolution</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Experience BlookSpace Features</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Ready to explore all these powerful features? Join BlookSpace today and revolutionize your advertising
          strategy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/brand">
            <Button size="lg">Start Free Trial</Button>
          </Link>
          <Link href="/modules/blookspace">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
