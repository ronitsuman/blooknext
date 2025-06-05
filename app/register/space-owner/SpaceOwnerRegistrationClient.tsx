"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Camera } from "lucide-react"
import { toast } from "sonner"

const spaceOwnerFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  companyName: z.string().optional(),
  contactPerson: z.string().min(2, {
    message: "Contact person name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  alternatePhone: z.string().optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  pincode: z.string().min(6, {
    message: "Pincode must be at least 6 characters.",
  }),
  landmark: z.string().optional(),
  spaceType: z.string({
    required_error: "Please select a space type.",
  }),
  spaceName: z.string().min(2, {
    message: "Space name must be at least 2 characters.",
  }),
  spaceAddress: z.string().min(5, {
    message: "Space address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  spaceSize: z.string().min(1, {
    message: "Please enter the space size.",
  }),
  footfallWeekday: z.string().min(1, {
    message: "Please enter the weekday footfall.",
  }),
  footfallWeekend: z.string().min(1, {
    message: "Please enter the weekend footfall.",
  }),
  ageGroup: z.string({
    required_error: "Please select the age group.",
  }),
  incomeSegment: z.string({
    required_error: "Please select the income segment.",
  }),
  hasCameras: z.boolean().default(false),
  cameraCount: z.string().optional(),
  cameraType: z.string().optional(),
  cameraAccessible: z.boolean().default(false),
  gstNumber: z.string().optional(),
  panNumber: z.string().min(10, {
    message: "PAN number must be 10 characters.",
  }),
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(5, {
    message: "Account number must be at least 5 characters.",
  }),
  ifscCode: z.string().min(11, {
    message: "IFSC code must be 11 characters.",
  }),
  accountHolderName: z.string().min(2, {
    message: "Account holder name must be at least 2 characters.",
  }),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function SpaceOwnerRegistrationClient() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [outsidePhoto, setOutsidePhoto] = useState<File | null>(null)
  const [insidePhoto, setInsidePhoto] = useState<File | null>(null)
  const [panCardPhoto, setPanCardPhoto] = useState<File | null>(null)
  const [gstCertificate, setGstCertificate] = useState<File | null>(null)

  const form = useForm<z.infer<typeof spaceOwnerFormSchema>>({
    resolver: zodResolver(spaceOwnerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      contactPerson: "",
      phone: "",
      alternatePhone: "",
      address: "",
      pincode: "",
      landmark: "",
      spaceType: "",
      spaceName: "",
      spaceAddress: "",
      city: "",
      state: "",
      spaceSize: "",
      footfallWeekday: "",
      footfallWeekend: "",
      ageGroup: "",
      incomeSegment: "",
      hasCameras: false,
      cameraCount: "",
      cameraType: "",
      cameraAccessible: false,
      gstNumber: "",
      panNumber: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      termsAgreed: false,
    },
  })

  const handleOutsidePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setOutsidePhoto(file)
    }
  }

  const handleInsidePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setInsidePhoto(file)
    }
  }

  const handlePanCardUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPanCardPhoto(file)
    }
  }

  const handleGstCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setGstCertificate(file)
    }
  }

  async function onSubmit(values: z.infer<typeof spaceOwnerFormSchema>) {
    // Validate required photos
    if (!outsidePhoto) {
      toast.error("Please upload an outside photo of your space")
      return
    }

    if (!insidePhoto) {
      toast.error("Please upload an inside photo of your space")
      return
    }

    if (!panCardPhoto) {
      toast.error("Please upload your PAN card")
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for file uploads
      const formData = new FormData()

      // Add all form values
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })

      // Add files
      formData.append("outsidePhoto", outsidePhoto)
      formData.append("insidePhoto", insidePhoto)
      formData.append("panCardPhoto", panCardPhoto)

      if (gstCertificate) {
        formData.append("gstCertificate", gstCertificate)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Registration successful! Your application is under review.")
      router.push("/dashboard/space-owner")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function nextStep() {
    const currentFields = getCurrentStepFields()

    // Validate current step fields before proceeding
    const isValid = currentFields.every((field) => {
      const value = form.getValues(field as any)
      return value !== undefined && value !== ""
    })

    if (!isValid) {
      // Trigger validation for the current fields
      form.trigger(currentFields as any)
      return
    }

    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  function getCurrentStepFields() {
    switch (step) {
      case 1:
        return ["fullName", "email", "password", "contactPerson", "phone", "address", "pincode"]
      case 2:
        return ["spaceName", "spaceAddress", "city", "state", "spaceType", "spaceSize"]
      case 3:
        return ["footfallWeekday", "footfallWeekend", "ageGroup", "incomeSegment"]
      case 4:
        return ["panNumber", "bankName", "accountNumber", "ifscCode", "accountHolderName"]
      case 5:
        return ["termsAgreed"]
      default:
        return []
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Information"
      case 2:
        return "Space Details"
      case 3:
        return "Audience & Cameras"
      case 4:
        return "Financial Details"
      case 5:
        return "Documents & Agreement"
      default:
        return "Registration"
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <Link href="/register" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Registration Options
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Space Owner Registration</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}: {getStepTitle()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`flex-1 h-2 mx-1 rounded-full ${step > i ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name / Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name or company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" autoComplete="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll use this email for account verification and important updates.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a strong password"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Password must be at least 8 characters long.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact person name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" autoComplete="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="alternatePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter alternate phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your complete address" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pincode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="landmark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Landmark (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter nearby landmark" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Space Details</h3>

                  <FormField
                    control={form.control}
                    name="spaceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Space Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter space name (e.g., Sunrise Café)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spaceAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Space Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter complete space address" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pincode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Landmark (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nearby landmark" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spaceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Space *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select space type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rwa">RWA / Housing Society</SelectItem>
                            <SelectItem value="retail">Retail Store</SelectItem>
                            <SelectItem value="mall">Mall</SelectItem>
                            <SelectItem value="gym">Gym</SelectItem>
                            <SelectItem value="salon">Salon</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="cafe">Café</SelectItem>
                            <SelectItem value="clinic">Clinic</SelectItem>
                            <SelectItem value="office">Office Building</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spaceSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Space Size (sq ft) *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter space size in square feet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Audience & Camera Details</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="footfallWeekday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weekday Footfall *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 100-200 people/day" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="footfallWeekend"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weekend Footfall *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 200-300 people/day" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="ageGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Age Group *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select primary age group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="18-25">18-25 years</SelectItem>
                            <SelectItem value="26-35">26-35 years</SelectItem>
                            <SelectItem value="36-45">36-45 years</SelectItem>
                            <SelectItem value="46-55">46-55 years</SelectItem>
                            <SelectItem value="55+">55+ years</SelectItem>
                            <SelectItem value="mixed">Mixed age groups</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="incomeSegment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Income Segment *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select income segment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="budget">Budget (Lower income)</SelectItem>
                            <SelectItem value="middle">Middle class</SelectItem>
                            <SelectItem value="premium">Premium (Higher income)</SelectItem>
                            <SelectItem value="luxury">Luxury (High net worth)</SelectItem>
                            <SelectItem value="mixed">Mixed segments</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasCameras"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Do you have CCTV cameras installed?</FormLabel>
                          <FormDescription>
                            This helps us understand the monitoring capabilities of your space.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasCameras") && (
                    <>
                      <FormField
                        control={form.control}
                        name="cameraCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Cameras</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter number of cameras" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cameraType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Camera Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select camera type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="analog">Analog</SelectItem>
                                <SelectItem value="ip">IP Cameras</SelectItem>
                                <SelectItem value="wireless">Wireless</SelectItem>
                                <SelectItem value="mixed">Mixed types</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cameraAccessible"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Can camera footage be shared with advertisers?</FormLabel>
                              <FormDescription>
                                This helps provide analytics to brands for their campaigns.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Financial Details</h3>

                  <FormField
                    control={form.control}
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter GST number if registered" {...field} />
                        </FormControl>
                        <FormDescription>
                          GST registration is not mandatory but helps with business transactions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PAN number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h4 className="text-md font-medium mt-6">Bank Account Details</h4>

                  <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter account holder name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter bank name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ifscCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter IFSC code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Documents & Agreement</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Outside Photo of Space *</label>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="outsidePhoto"
                          accept="image/*"
                          onChange={handleOutsidePhotoUpload}
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor="outsidePhoto"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          {outsidePhoto ? (
                            <div className="text-center">
                              <Camera className="mx-auto h-8 w-8 text-green-500" />
                              <p className="mt-2 text-sm text-gray-600">{outsidePhoto.name}</p>
                              <p className="text-xs text-green-600">Photo uploaded</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">Upload Outside Photo</p>
                              <p className="text-xs text-gray-500">Clear photo of space exterior</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Inside Photo of Space *</label>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="insidePhoto"
                          accept="image/*"
                          onChange={handleInsidePhotoUpload}
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor="insidePhoto"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          {insidePhoto ? (
                            <div className="text-center">
                              <Camera className="mx-auto h-8 w-8 text-green-500" />
                              <p className="mt-2 text-sm text-gray-600">{insidePhoto.name}</p>
                              <p className="text-xs text-green-600">Photo uploaded</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">Upload Inside Photo</p>
                              <p className="text-xs text-gray-500">Clear photo of space interior</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">PAN Card *</label>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="panCard"
                          accept="image/*,.pdf"
                          onChange={handlePanCardUpload}
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor="panCard"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          {panCardPhoto ? (
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-green-500" />
                              <p className="mt-2 text-sm text-gray-600">{panCardPhoto.name}</p>
                              <p className="text-xs text-green-600">Document uploaded</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">Upload PAN Card</p>
                              <p className="text-xs text-gray-500">Image or PDF format</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">GST Certificate (Optional)</label>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="gstCertificate"
                          accept="image/*,.pdf"
                          onChange={handleGstCertificateUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="gstCertificate"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          {gstCertificate ? (
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-green-500" />
                              <p className="mt-2 text-sm text-gray-600">{gstCertificate.name}</p>
                              <p className="text-xs text-green-600">Document uploaded</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">Upload GST Certificate</p>
                              <p className="text-xs text-gray-500">Optional - Image or PDF</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAgreed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>{" "}
                            *
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you agree to our terms and conditions.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="ml-auto">
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
