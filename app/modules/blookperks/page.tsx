import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, QrCode, Award, Smartphone, BarChart } from "lucide-react"

export default function BlookPerksPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">BlookPerks</h1>
        <p className="text-muted-foreground text-lg">
          Consumer-facing rewards and engagement module for QR-based campaigns
        </p>
      </div>

      <div className="grid gap-6 mt-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <QrCode className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>QR-Based Campaigns</CardTitle>
            <CardDescription>Create engaging QR code campaigns that consumers can scan at your space</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              BlookPerks allows you to create multiple campaigns linked to a single QR code. When consumers scan the
              code, they can engage with:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Scratch cards for instant rewards</li>
              <li>Spin-the-wheel games</li>
              <li>Feedback surveys</li>
              <li>Instant coupons and offers</li>
              <li>Loyalty programs</li>
            </ul>
            <Link href="/register">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Award className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Rewards & Engagement</CardTitle>
            <CardDescription>Drive consumer engagement and build loyalty through gamified experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              BlookPerks helps you create memorable consumer experiences that drive engagement and repeat visits:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Gamified interactions for higher engagement</li>
              <li>Instant rewards to drive immediate action</li>
              <li>Loyalty programs to encourage repeat visits</li>
              <li>Feedback collection to improve your offerings</li>
              <li>Hyperlocal promotions for nearby businesses</li>
            </ul>
            <Link href="/modules/blookperks/features">
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Smartphone className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Consumer Experience</CardTitle>
            <CardDescription>Seamless mobile experience for consumers who scan your QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">When consumers scan your QR code, they get a mobile-optimized experience:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>No app download required - works in any browser</li>
              <li>Fast loading and responsive design</li>
              <li>Multiple campaign options to choose from</li>
              <li>Easy redemption process for rewards</li>
              <li>Optional notifications for future campaigns</li>
            </ul>
            <Link href="/modules/blookperks/consumer-journey">
              <Button variant="outline" className="w-full">
                See Demo
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Analytics & Insights</CardTitle>
            <CardDescription>Track campaign performance and consumer engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookPerks provides detailed analytics to help you understand campaign performance:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Real-time scan and engagement tracking</li>
              <li>Campaign performance comparisons</li>
              <li>Consumer demographic insights</li>
              <li>Redemption rate analysis</li>
              <li>ROI calculations for each campaign</li>
            </ul>
            <Link href="/modules/blookperks/analytics">
              <Button variant="outline" className="w-full">
                View Analytics Demo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started with BlookPerks?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join BlookMySpace today and start creating engaging QR campaigns for your space. Drive consumer engagement,
          collect valuable data, and increase revenue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/space-owner">
            <Button size="lg">Register Your Space</Button>
          </Link>
          <Link href="/modules/blookperks/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
