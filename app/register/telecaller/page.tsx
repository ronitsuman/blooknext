"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Phone } from "lucide-react"
import { FileUpload } from "@/components/file-upload"

const telecallerFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  address: z.string().min(10, "Please enter complete address"),

  // Experience Details
  totalExperience: z.string().min(1, "Please select experience level"),
  telecallingExperience: z.string().min(1, "Please select telecalling experience"),
  previousCompanies: z.string().optional(),

  // Skills & Languages
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  computerSkills: z.boolean().default(false),
  crmExperience: z.boolean().default(false),

  // Availability
  availability: z.string().min(1, "Please select availability"),
  preferredShift: z.string().min(1, "Please select preferred shift"),
  canWorkWeekends: z.boolean().default(false),

  // Documents
  resume: z.string().optional(),
  aadhaarNumber: z.string().min(12, "Aadhaar number must be 12 digits"),
  aadhaarDocument: z.string().optional(),
  panNumber: z.string().min(10, "PAN number must be 10 characters"),
  panDocument: z.string().optional(),

  // Bank Details
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(8, "Account number is required"),
  ifscCode: z.string().min(11, "IFSC code must be 11 characters"),
  accountHolderName: z.string().min(2, "Account holder name is required"),

  // Agreement
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to terms and conditions"),
})

const languages = [
  "Hindi",
  "English",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Urdu",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
]

export default function TelecallerRegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const form = useForm<z.infer<typeof telecallerFormSchema>>({
    resolver: zodResolver(telecallerFormSchema),
    defaultValues: {
      languages: [],
      computerSkills: false,
      crmExperience: false,
      canWorkWeekends: false,
      agreeToTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof telecallerFormSchema>) {
    setIsLoading(true)
    console.log("Telecaller Registration:", values)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/register/success?type=telecaller")
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="container max-w-2xl py-10">
      <Link href="/register" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Registration Options
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Phone className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Telecaller Registration</CardTitle>
              <CardDescription>Join our telecalling team and earn competitive salaries</CardDescription>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep} of {totalSteps}
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="10-digit mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="alternatePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternate Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional alternate number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complete Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your complete address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your city" {...field} />
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
                            <Input placeholder="Your state" {...field} />
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
                            <Input placeholder="6-digit pincode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Experience & Skills */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Experience & Skills</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="totalExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Work Experience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                              <SelectItem value="1-2">1-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5+">5+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telecallingExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telecalling Experience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select telecalling experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no-experience">No Experience</SelectItem>
                              <SelectItem value="6-months">6 months</SelectItem>
                              <SelectItem value="1-year">1 year</SelectItem>
                              <SelectItem value="2-years">2+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="previousCompanies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Companies (if any)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List your previous companies and roles" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={() => (
                      <FormItem>
                        <FormLabel>Languages Known *</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {languages.map((language) => (
                            <FormField
                              key={language}
                              control={form.control}
                              name="languages"
                              render={({ field }) => {
                                return (
                                  <FormItem key={language} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(language)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, language])
                                            : field.onChange(field.value?.filter((value) => value !== language))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{language}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="computerSkills"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Basic Computer Skills</FormLabel>
                            <p className="text-sm text-muted-foreground">Can use computer, email, and basic software</p>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="crmExperience"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>CRM Experience</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Experience with CRM software or lead management
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Availability */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Availability & Preferences</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full-time">Full Time</SelectItem>
                              <SelectItem value="part-time">Part Time</SelectItem>
                              <SelectItem value="flexible">Flexible Hours</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredShift"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Shift *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select shift preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9 AM - 1 PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (1 PM - 6 PM)</SelectItem>
                              <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="canWorkWeekends"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Available for Weekend Work</FormLabel>
                          <p className="text-sm text-muted-foreground">Can work on Saturdays and Sundays if required</p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Documents */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Documents & Verification</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Resume Upload</label>
                      <FileUpload
                        accept=".pdf,.doc,.docx"
                        maxSize={5}
                        onUpload={(url) => form.setValue("resume", url)}
                        placeholder="Upload your resume (PDF/DOC)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="aadhaarNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Aadhaar Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="12-digit Aadhaar number" {...field} />
                            </FormControl>
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
                              <Input placeholder="10-character PAN number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Aadhaar Document</label>
                        <FileUpload
                          accept=".pdf,.jpg,.jpeg,.png"
                          maxSize={5}
                          onUpload={(url) => form.setValue("aadhaarDocument", url)}
                          placeholder="Upload Aadhaar card"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">PAN Document</label>
                        <FileUpload
                          accept=".pdf,.jpg,.jpeg,.png"
                          maxSize={5}
                          onUpload={(url) => form.setValue("panDocument", url)}
                          placeholder="Upload PAN card"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Bank Details & Agreement */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Bank Details & Agreement</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <FormField
                      control={form.control}
                      name="accountHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="As per bank records" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Bank account number" {...field} />
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
                            <Input placeholder="11-character IFSC code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className="ml-auto">
                    {isLoading ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
