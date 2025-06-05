"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { registerVendor } from "@/app/actions/register-vendor"
import { toast } from "sonner"

const serviceCategories = [
  "Printing & Graphics",
  "Digital Displays",
  "Installation Services",
  "Fabrication",
  "Event Management",
  "Photography",
  "Content Creation",
]

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

export function VendorRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
    contactPerson: "",
    phone: "",
    serviceCategories: [] as string[],
    operationalCities: [] as string[],
    experienceYears: "",
    portfolioUrl: "",
    hasDelivery: false,
    avgTurnaroundTime: "",
    gstNumber: "",
    panNumber: "",
    bankDetails: {
      bankName: "",
      branch: "",
      accountNumber: "",
      ifscCode: "",
    },
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      const result = await registerVendor(formData)

      if (result.success) {
        toast.success("Registration successful! Please check your email for verification.")
        router.push("/login")
      } else {
        toast.error(result.error || "Registration failed")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleServiceCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceCategories: prev.serviceCategories.includes(category)
        ? prev.serviceCategories.filter((c) => c !== category)
        : [...prev.serviceCategories, category],
    }))
  }

  const toggleCity = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      operationalCities: prev.operationalCities.includes(city)
        ? prev.operationalCities.filter((c) => c !== city)
        : [...prev.operationalCities, city],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Registration</CardTitle>
        <CardDescription>Join our network of service providers</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service Categories *</Label>
              <div className="grid grid-cols-2 gap-2">
                {serviceCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.serviceCategories.includes(category)}
                      onCheckedChange={() => toggleServiceCategory(category)}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Operational Cities *</Label>
              <div className="grid grid-cols-3 gap-2">
                {cities.map((city) => (
                  <div key={city} className="flex items-center space-x-2">
                    <Checkbox
                      id={city}
                      checked={formData.operationalCities.includes(city)}
                      onCheckedChange={() => toggleCity(city)}
                    />
                    <Label htmlFor={city} className="text-sm">
                      {city}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                  placeholder="ABCDE1234F"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl">Portfolio URL</Label>
              <Input
                id="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://www.yourportfolio.com"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasDelivery"
                checked={formData.hasDelivery}
                onCheckedChange={(checked) => setFormData({ ...formData, hasDelivery: checked as boolean })}
              />
              <Label htmlFor="hasDelivery">We provide delivery services</Label>
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bank Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankDetails.bankName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, bankName: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  value={formData.bankDetails.branch}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, branch: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, accountNumber: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <Input
                  id="ifscCode"
                  value={formData.bankDetails.ifscCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, ifscCode: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
              />
              <Label htmlFor="agreeToTerms">I agree to the Terms of Service and Privacy Policy *</Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register as Vendor"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
