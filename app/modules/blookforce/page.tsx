import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, DollarSign, Building, BarChart } from "lucide-react"

export default function BlookForcePage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">BlookForce</h1>
        <p className="text-muted-foreground text-lg">
          Recruitment module for bringing in space owners or clients and earning commissions
        </p>
      </div>

      <div className="grid gap-6 mt-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Users className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Recruit & Earn</CardTitle>
            <CardDescription>Invite space owners or clients and earn commissions on their activity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookForce allows you to earn by bringing new participants to the platform:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Recruit space owners to list their properties</li>
              <li>Bring in brands looking for advertising spaces</li>
              <li>Earn commissions on successful registrations</li>
              <li>Get recurring revenue from ongoing campaigns</li>
              <li>Build your own network of spaces and clients</li>
            </ul>
            <Link href="/register/blookforce">
              <Button className="w-full">Join BlookForce</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <DollarSign className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Commission Structure</CardTitle>
            <CardDescription>Transparent commission system with competitive rates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookForce offers a lucrative commission structure:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Fixed commission for each space registration</li>
              <li>Percentage-based commission on campaign bookings</li>
              <li>Bonus incentives for premium subscriptions</li>
              <li>Recurring commissions for long-term clients</li>
              <li>Special rewards for high-performing recruiters</li>
            </ul>
            <Link href="/modules/blookforce/commissions">
              <Button variant="outline" className="w-full">
                View Commission Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Building className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Field Agent Tools</CardTitle>
            <CardDescription>Comprehensive CRM and tracking tools for field agents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookForce provides powerful tools for field agents:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Mobile-friendly CRM for tracking leads</li>
              <li>GPS-based location tracking for field visits</li>
              <li>Photo upload for meeting documentation</li>
              <li>Lead status updates and follow-up reminders</li>
              <li>Commission tracking and earnings dashboard</li>
            </ul>
            <Link href="/modules/blookforce/tools">
              <Button variant="outline" className="w-full">
                Explore Agent Tools
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>Track your recruitment performance and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookForce provides detailed analytics on your performance:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Real-time earnings and commission tracking</li>
              <li>Conversion rates for your leads</li>
              <li>Performance comparison with other agents</li>
              <li>Target vs. achievement monitoring</li>
              <li>Detailed reports for tax and accounting</li>
            </ul>
            <Link href="/modules/blookforce/analytics">
              <Button variant="outline" className="w-full">
                View Analytics Demo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join BlookForce?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join BlookForce today and start earning commissions by recruiting space owners and clients. Build your
          network, track your performance, and grow your income.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/blookforce">
            <Button size="lg">Join BlookForce</Button>
          </Link>
          <Link href="/modules/blookforce/faq">
            <Button variant="outline" size="lg">
              View FAQ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
