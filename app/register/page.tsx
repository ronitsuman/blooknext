import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Building, ShoppingBag, Users, Briefcase } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="container max-w-4xl py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join BlookMySpace</h1>
        <p className="mt-2 text-muted-foreground">Select your role to get started with registration</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Building className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Space Owner</CardTitle>
            <CardDescription>Register your physical space to monetize through advertising</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Perfect for RWAs, gyms, cafes, restaurants, corporate spaces, clinics, and more. Turn your space into a
              revenue-generating asset.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>List your space for brands to discover</li>
              <li>Set your own pricing and availability</li>
              <li>Track campaigns and earnings</li>
              <li>No upfront investment required</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/register/space-owner" className="w-full">
              <Button className="w-full">Register as Space Owner</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <ShoppingBag className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Brand / Advertiser</CardTitle>
            <CardDescription>Find spaces to advertise your products and services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Perfect for brands looking for targeted, hyperlocal advertising opportunities in physical spaces.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Discover verified spaces for advertising</li>
              <li>Target specific demographics and locations</li>
              <li>Book campaigns and track performance</li>
              <li>Access detailed analytics and insights</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/register/brand" className="w-full">
              <Button className="w-full">Register as Brand</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Briefcase className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Vendor</CardTitle>
            <CardDescription>Offer your services for campaign execution and implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Perfect for printing, fabrication, installation, and other service providers supporting advertising
              campaigns.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Get jobs and grow your business</li>
              <li>Receive RFQs from brands and spaces</li>
              <li>Secure faster payouts through escrow</li>
              <li>Build your reputation with ratings</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/register/vendor" className="w-full">
              <Button className="w-full">Register as Vendor</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>BlookForce Agent</CardTitle>
            <CardDescription>Recruit space owners or clients and earn commissions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Perfect for individuals or agencies looking to earn by bringing new participants to the platform.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Earn commissions on successful registrations</li>
              <li>Get recurring revenue from ongoing campaigns</li>
              <li>Track your performance and earnings</li>
              <li>Access field agent tools and CRM</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/register/blookforce" className="w-full">
              <Button className="w-full">Register as BlookForce Agent</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
