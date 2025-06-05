"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Upload, Camera, FileText, CreditCard } from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function BlookForceRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [panFile, setPanFile] = useState<File | null>(null)
  const [addressProofFile, setAddressProofFile] = useState<File | null>(null)
  const router = useRouter()

  const languages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Marathi",
    "Bengali",
    "Gujarati",
    "Punjabi",
  ]

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language])
    } else {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language))
    }
  }

  const handleAadhaarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAadhaarFile(file)
    }
  }

  const handleSelfieUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelfieFile(file)
    }
  }

  const handlePanUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPanFile(file)
    }
  }

  const handleAddressProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAddressProofFile(file)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Validate required documents
    if (!aadhaarFile) {
      toast.error("Please upload your Aadhaar card")
      return
    }

    if (!selfieFile) {
      toast.error("Please take a selfie photo")
      return
    }

    if (!panFile) {
      toast.error("Please upload your PAN card")
      return
    }

    if (!addressProofFile) {
      toast.error("Please upload address proof")
      return
    }

    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    // Add selected languages to form data
    formData.set("languages", selectedLanguages.join(","))

    // Add files to form data
    formData.append("aadhaarFile", aadhaarFile)
    formData.append("selfieFile", selfieFile)
    formData.append("panFile", panFile)
    formData.append("addressProofFile", addressProofFile)

    try {
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Registration successful! Documents submitted for verification.")
      router.push("/login")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Join BlookForce</CardTitle>
        <CardDescription>Become a BlookForce agent and start earning commissions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" type="text" required placeholder="Enter your full name" />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="Enter your phone number" />
              </div>

              <div>
                <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                <Input
                  id="alternatePhone"
                  name="alternatePhone"
                  type="tel"
                  placeholder="Enter alternate phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input id="password" name="password" type="password" required placeholder="Create a password" />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea id="address" name="address" required placeholder="Enter your complete address" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Select name="city" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="jaipur">Jaipur</SelectItem>
                    <SelectItem value="lucknow">Lucknow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Select name="state" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                    <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="west_bengal">West Bengal</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="uttar_pradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input id="pincode" name="pincode" type="text" required placeholder="Enter pincode" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>

            <div>
              <Label htmlFor="education">Educational Qualification *</Label>
              <Select name="education" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your highest qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">High School</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="post_graduate">Post Graduate</SelectItem>
                  <SelectItem value="doctorate">Doctorate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Sales Experience *</Label>
                <Select name="experience" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="experienced">Experienced (3+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability">Availability *</Label>
                <Select name="availability" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="weekends">Weekends only</SelectItem>
                    <SelectItem value="flexible">Flexible hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Languages You Speak *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    />
                    <Label htmlFor={language} className="text-sm">
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="referralCode">Referral Code (optional)</Label>
              <Input id="referralCode" name="referralCode" type="text" placeholder="Enter referral code if any" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bank Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountName">Account Holder Name *</Label>
                <Input
                  id="accountName"
                  name="accountName"
                  type="text"
                  required
                  placeholder="Enter account holder name"
                />
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  required
                  placeholder="Enter account number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input id="bankName" name="bankName" type="text" required placeholder="Enter bank name" />
              </div>

              <div>
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input id="ifscCode" name="ifscCode" type="text" required placeholder="Enter IFSC code" />
              </div>
            </div>

            <div>
              <Label htmlFor="accountType">Account Type *</Label>
              <RadioGroup defaultValue="savings" name="accountType" className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="savings" id="savings" />
                  <Label htmlFor="savings">Savings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="current" />
                  <Label htmlFor="current">Current</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Document Verification</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                <Input
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  type="text"
                  required
                  placeholder="Enter 12-digit Aadhaar number"
                />
              </div>

              <div>
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input id="panNumber" name="panNumber" type="text" required placeholder="Enter 10-digit PAN number" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aadhaar">Aadhaar Card *</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="aadhaar"
                    name="aadhaar"
                    accept="image/*,.pdf"
                    onChange={handleAadhaarUpload}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="aadhaar"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {aadhaarFile ? (
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-green-500" />
                        <p className="mt-2 text-sm text-gray-600">{aadhaarFile.name}</p>
                        <p className="text-xs text-green-600">Uploaded successfully</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Upload Aadhaar Card</p>
                        <p className="text-xs text-gray-500">PNG, JPG or PDF (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="pan">PAN Card *</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="pan"
                    name="pan"
                    accept="image/*,.pdf"
                    onChange={handlePanUpload}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="pan"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {panFile ? (
                      <div className="text-center">
                        <CreditCard className="mx-auto h-8 w-8 text-green-500" />
                        <p className="mt-2 text-sm text-gray-600">{panFile.name}</p>
                        <p className="text-xs text-green-600">Uploaded successfully</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <CreditCard className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Upload PAN Card</p>
                        <p className="text-xs text-gray-500">PNG, JPG or PDF (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="selfie">Selfie Photo *</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="selfie"
                    name="selfie"
                    accept="image/*"
                    capture="user"
                    onChange={handleSelfieUpload}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="selfie"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {selfieFile ? (
                      <div className="text-center">
                        <Camera className="mx-auto h-8 w-8 text-green-500" />
                        <p className="mt-2 text-sm text-gray-600">{selfieFile.name}</p>
                        <p className="text-xs text-green-600">Photo captured</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Take Selfie Photo</p>
                        <p className="text-xs text-gray-500">Clear photo of your face</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="addressProof">Address Proof *</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="addressProof"
                    name="addressProof"
                    accept="image/*,.pdf"
                    onChange={handleAddressProofUpload}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="addressProof"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {addressProofFile ? (
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-green-500" />
                        <p className="mt-2 text-sm text-gray-600">{addressProofFile.name}</p>
                        <p className="text-xs text-green-600">Uploaded successfully</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Upload Address Proof</p>
                        <p className="text-xs text-gray-500">Utility bill, Passport, etc.</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" name="terms" required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the Terms of Service and Privacy Policy *
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Register as BlookForce Agent"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
