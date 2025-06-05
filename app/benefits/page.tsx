import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Target,
  MapPin,
  Zap,
  Award,
  Globe,
  Smartphone,
} from "lucide-react"

export default function BenefitsPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl mb-4">Why Choose BlookMySpace?</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the comprehensive benefits that make BlookMySpace the leading platform for space monetization and
          brand advertising in India.
        </p>
      </div>

      {/* For Space Owners */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            For Space Owners
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Monetize Your Space Effortlessly</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your unused spaces into profitable advertising opportunities with our comprehensive platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Passive Income Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Earn ₹5,000 - ₹50,000+ monthly per space</li>
                <li>• Keep 85% of all campaign revenue</li>
                <li>• No upfront investment required</li>
                <li>• Multiple revenue streams available</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Verified Brand Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Work with verified, premium brands</li>
                <li>• Secure payment guarantee</li>
                <li>• Professional campaign management</li>
                <li>• Quality content and materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Choose your own availability</li>
                <li>• Set minimum and maximum durations</li>
                <li>• Block dates for personal use</li>
                <li>• Real-time calendar management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Track footfall and engagement</li>
                <li>• Optimize pricing strategies</li>
                <li>• Performance insights and trends</li>
                <li>• Revenue forecasting tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Quick Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• List your space in under 10 minutes</li>
                <li>• Professional photography support</li>
                <li>• Automated campaign matching</li>
                <li>• 24/7 platform support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Premium Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Dedicated account manager</li>
                <li>• Installation and maintenance support</li>
                <li>• Legal and compliance assistance</li>
                <li>• Marketing and promotion help</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Brands */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            For Brands
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Reach Your Target Audience Effectively</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with your ideal customers through strategic space advertising with measurable results.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Strategic Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Access to 10,000+ premium locations</li>
                <li>• High-footfall areas and venues</li>
                <li>• Demographic-targeted placements</li>
                <li>• Real-time availability checking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Precise Targeting</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• AI-powered audience matching</li>
                <li>• Age, income, and interest targeting</li>
                <li>• Geographic and behavioral filters</li>
                <li>• Custom audience creation tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Measurable ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Real-time campaign analytics</li>
                <li>• QR code engagement tracking</li>
                <li>• Conversion and attribution data</li>
                <li>• Detailed performance reports</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Flexible Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Campaigns from 1 day to 1 year</li>
                <li>• Budget control and optimization</li>
                <li>• Real-time campaign adjustments</li>
                <li>• Multi-location coordination</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Smartphone className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Digital Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• QR codes for instant engagement</li>
                <li>• Social media integration</li>
                <li>• Mobile-first campaign design</li>
                <li>• Cross-platform analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Risk-Free Advertising</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Performance-based pricing options</li>
                <li>• Campaign insurance coverage</li>
                <li>• Quality guarantee on placements</li>
                <li>• 24/7 monitoring and support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Vendors */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            For Vendors
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Grow Your Service Business</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with space owners and brands to provide essential services and grow your business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Steady Client Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Access to 1000+ active clients</li>
                <li>• Regular installation projects</li>
                <li>• Maintenance and service contracts</li>
                <li>• Referral-based growth opportunities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Guaranteed Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Secure escrow payment system</li>
                <li>• Weekly payment cycles</li>
                <li>• Transparent pricing structure</li>
                <li>• Performance-based bonuses</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Skill Development</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Free training and certification</li>
                <li>• Latest technology exposure</li>
                <li>• Quality standards training</li>
                <li>• Business development support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For BlookForce Agents */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            For BlookForce Agents
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Build Your Referral Empire</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn substantial commissions by connecting businesses with our platform ecosystem.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>High Commission Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 5% from space owner referrals</li>
                <li>• 3% from brand referrals</li>
                <li>• 2% from vendor referrals</li>
                <li>• Lifetime recurring commissions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Territory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Exclusive territory assignments</li>
                <li>• Local market expertise advantage</li>
                <li>• Regional performance bonuses</li>
                <li>• Territory expansion opportunities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Career Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Team building opportunities</li>
                <li>• Leadership development programs</li>
                <li>• Performance recognition rewards</li>
                <li>• Annual achievement bonuses</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Platform Benefits
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Why BlookMySpace Leads the Market</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the advantages of India's most comprehensive space monetization platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>100% Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bank-grade security with encrypted transactions and verified users
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Round-the-clock customer support and technical assistance</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Mobile First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimized for mobile with dedicated apps for all platforms
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Pan-India</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coverage across 500+ cities with local language support</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Real results from our platform users across India.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Rajesh Kumar</CardTitle>
              <CardDescription>Space Owner, Mumbai</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                "Earned ₹2.5 lakhs in 6 months by listing my shop's exterior wall. The platform is incredibly easy to
                use!"
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">₹2.5L Earned</Badge>
                <Badge variant="secondary">6 Months</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Priya Sharma</CardTitle>
              <CardDescription>Brand Manager, Delhi</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                "Achieved 300% ROI on our campaign. The targeting was precise and analytics were comprehensive."
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">300% ROI</Badge>
                <Badge variant="secondary">50K Reach</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amit Patel</CardTitle>
              <CardDescription>BlookForce Agent, Bangalore</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                "Built a team of 20 agents and earning ₹80K monthly through referrals. Best decision of my career!"
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">₹80K/Month</Badge>
                <Badge variant="secondary">20 Team</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center bg-primary/5 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience These Benefits?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of successful users who are already monetizing their spaces and growing their businesses with
          BlookMySpace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Get Started Today</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Talk to Our Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
