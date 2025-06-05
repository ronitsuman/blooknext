"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { registerBrand } from "@/app/actions/register-brand"
import { toast } from "sonner"

const industryTypes = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Food & Beverage",
  "Automotive",
  "Real Estate",
  "Education",
  "Entertainment",
  "Fashion",
]

const budgetRanges = [
  "₹10,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹5,00,000",
  "₹5,00,000 - ₹10,00,000",
  "₹10,00,000+",
]

export function BrandRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    brandName: "",
    contactPerson: "",
    phone: "",
    industryType: "",
    website: "",
    socialLinks: [] as string[],
    targetCities: [] as string[],
    budgetRange: "",
    marketingObjectives: "",
    previousExperience: false,
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
      const result = await registerBrand(formData)

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand Registration</CardTitle>
        <CardDescription>Create your brand account to start advertising campaigns</CardDescription>
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

          {/* Brand Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Brand Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name *</Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industryType">Industry Type *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, industryType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryTypes.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://www.yourbrand.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetRange">Monthly Advertising Budget *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketingObjectives">Marketing Objectives</Label>
              <Textarea
                id="marketingObjectives"
                value={formData.marketingObjectives}
                onChange={(e) => setFormData({ ...formData, marketingObjectives: e.target.value })}
                placeholder="Describe your marketing goals and target audience..."
                rows={3}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="previousExperience"
                checked={formData.previousExperience}
                onCheckedChange={(checked) => setFormData({ ...formData, previousExperience: checked as boolean })}
              />
              <Label htmlFor="previousExperience">I have previous experience with outdoor advertising</Label>
            </div>

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
            {isLoading ? "Creating Account..." : "Register Brand"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
