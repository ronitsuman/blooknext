import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Store, Wrench, Users, Phone } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join BlookMySpace</h1>
          <p className="text-xl text-gray-600">Choose your role and start your journey with us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Space Owner Registration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Space Owner</CardTitle>
                  <CardDescription>Monetize your space with advertising campaigns</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Earn 85% of campaign revenue</li>
                <li>• Flexible scheduling</li>
                <li>• Verified brand partners</li>
                <li>• 24-hour payouts</li>
              </ul>
              <Link href="/register/space-owner">
                <Button className="w-full">Register as Space Owner</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Brand Registration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Store className="h-8 w-8 text-green-600" />
                <div>
                  <CardTitle>Brand</CardTitle>
                  <CardDescription>Advertise in strategic locations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Access to verified spaces</li>
                <li>• Precise audience targeting</li>
                <li>• Real-time analytics</li>
                <li>• Flexible campaign duration</li>
              </ul>
              <Link href="/register/brand">
                <Button className="w-full">Register as Brand</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Vendor Registration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Wrench className="h-8 w-8 text-orange-600" />
                <div>
                  <CardTitle>Vendor</CardTitle>
                  <CardDescription>Provide services for advertising campaigns</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Steady stream of clients</li>
                <li>• Guaranteed payments</li>
                <li>• Skill development opportunities</li>
                <li>• Pan-India projects</li>
              </ul>
              <Link href="/register/vendor">
                <Button className="w-full">Register as Vendor</Button>
              </Link>
            </CardContent>
          </Card>

          {/* BlookForce Agent Registration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <CardTitle>BlookForce Agent</CardTitle>
                  <CardDescription>Earn commissions by referring new users</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Up to 5% commission rates</li>
                <li>• Monthly payouts</li>
                <li>• Territory management</li>
                <li>• Career growth opportunities</li>
              </ul>
              <Link href="/register/blookforce">
                <Button className="w-full">Register as Agent</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Telecaller Registration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Phone className="h-8 w-8 text-indigo-600" />
                <div>
                  <CardTitle>Telecaller</CardTitle>
                  <CardDescription>Join our telecalling team</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Competitive salary + incentives</li>
                <li>• Flexible working hours</li>
                <li>• Performance bonuses</li>
                <li>• Career growth opportunities</li>
              </ul>
              <Link href="/register/telecaller">
                <Button className="w-full">Register as Telecaller</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
