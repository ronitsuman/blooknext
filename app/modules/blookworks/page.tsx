import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Printer, Truck, FileText, ShoppingBag } from "lucide-react"

export default function BlookWorksPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">BlookWorks</h1>
        <p className="text-muted-foreground text-lg">
          Vendor discovery and execution module for printing, fabrication, and deployment services
        </p>
      </div>

      <div className="grid gap-6 mt-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Printer className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Vendor Discovery</CardTitle>
            <CardDescription>Find pre-vetted vendors for your campaign execution needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              BlookWorks connects you with qualified vendors for all your campaign execution needs:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Printing services for posters, banners, and signage</li>
              <li>Fabrication for custom displays and installations</li>
              <li>Deployment teams for on-site setup and maintenance</li>
              <li>Quality-checked and verified vendors only</li>
              <li>Transparent pricing and timelines</li>
            </ul>
            <Link href="/register/brand">
              <Button className="w-full">Find Vendors</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Truck className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Campaign Execution</CardTitle>
            <CardDescription>End-to-end management of your advertising campaign deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookWorks handles the entire execution process for your campaigns:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Request for quotes from multiple vendors</li>
              <li>Vendor selection and job assignment</li>
              <li>Production monitoring and quality control</li>
              <li>On-site installation and deployment</li>
              <li>Post-campaign removal and cleanup</li>
            </ul>
            <Link href="/modules/blookworks/execution">
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
            <FileText className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Compliance & Documentation</CardTitle>
            <CardDescription>Streamlined compliance process for vendor onboarding and management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookWorks ensures all vendors meet compliance requirements:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Verified tax and business documentation</li>
              <li>Compliance packet sharing with brands</li>
              <li>Secure document storage and management</li>
              <li>Automated compliance checks and updates</li>
              <li>Simplified vendor onboarding process</li>
            </ul>
            <Link href="/modules/blookworks/compliance">
              <Button variant="outline" className="w-full">
                View Compliance Process
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ShoppingBag className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>For Vendors</CardTitle>
            <CardDescription>
              Join as a vendor to access jobs, grow your business, and get faster payouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">BlookWorks offers vendors a platform to grow their business:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Access to a steady stream of job opportunities</li>
              <li>Simplified bidding and quote submission</li>
              <li>Secure escrow payment system</li>
              <li>Performance ratings to build reputation</li>
              <li>Reduced client acquisition costs</li>
            </ul>
            <Link href="/register/vendor">
              <Button variant="outline" className="w-full">
                Join as Vendor
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Streamline Your Campaign Execution?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join BlookMySpace today to access our network of verified vendors and simplify your campaign execution
          process. Save time, reduce costs, and ensure quality results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/brand">
            <Button size="lg">Find Vendors</Button>
          </Link>
          <Link href="/register/vendor">
            <Button variant="outline" size="lg">
              Join as Vendor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
