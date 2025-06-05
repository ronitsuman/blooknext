"use client"

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
import { ArrowLeft, Upload } from "lucide-react"

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
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function SpaceOwnerRegistrationClient() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof spaceOwnerFormSchema>>({
    resolver: zodResolver(spaceOwnerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      contactPerson: "",
      phone: "",
      address: "",
      pincode: "",
      landmark: "",
      spaceType: "",
      spaceName: "",
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
      termsAgreed: false,
    },
  })

  async function onSubmit(values: z.infer<typeof spaceOwnerFormSchema>) {
    setIsSubmitting(true)
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/space-owner")
    }, 2000)
  }

  function nextStep() {
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Information"
      case 2:
        return "Space Details"
      case 3:
        return "Cameras & Heat Mapping"
      case 4:
        return "Terms & Agreement"
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
                        <FormLabel>Full Name / Company Name</FormLabel>
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
                        <FormLabel>Email Address</FormLabel>
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
                        <FormLabel>Password</FormLabel>
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
                        <FormLabel>Contact Person Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact person name" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" autoComplete="tel" {...field} />
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
                        <FormLabel>Address</FormLabel>
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
                          <FormLabel>Pincode</FormLabel>
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
                        <FormLabel>Space Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter space name (e.g., Sunrise Café)" {...field} />
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
                        <FormLabel>Type of Space</FormLabel>
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
                            <SelectItem value="hospital">Hospital</SelectItem>
                            <SelectItem value="coworking">Co-working</SelectItem>
                            <SelectItem value="corporate">Corporate Park</SelectItem>
                            <SelectItem value="banquet">Banquet</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
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
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="spaceSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Space Size (sq ft)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter space size" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="footfallWeekday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Approx Footfall (Weekday)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter weekday footfall" {...field} />
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
                          <FormLabel>Approx Footfall (Weekend)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter weekend footfall" {...field} />
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
                        <FormLabel>Age Group Mix</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="18-24">Mostly 18-24</SelectItem>
                            <SelectItem value="25-34">Mostly 25-34</SelectItem>
                            <SelectItem value="35-44">Mostly 35-44</SelectItem>
                            <SelectItem value="45-60">Mostly 45-60</SelectItem>
                            <SelectItem value="60+">Mostly 60+</SelectItem>
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
                        <FormLabel>Income Segment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select income segment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mass">Mass</SelectItem>
                            <SelectItem value="mid">Mid</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cameras & Heat Mapping</h3>

                  <FormField
                    control={form.control}
                    name="hasCameras"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Are CCTV cameras installed?</FormLabel>
                          <FormDescription>Check this if your space has CCTV cameras installed.</FormDescription>
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
                            <FormLabel>How many cameras?</FormLabel>
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
                            <FormLabel>Camera Types</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select camera type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="dome">Dome</SelectItem>
                                <SelectItem value="bullet">Bullet</SelectItem>
                                <SelectItem value="ptz">PTZ</SelectItem>
                                <SelectItem value="unknown">Unknown</SelectItem>
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
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Are camera feeds accessible for heat mapping?</FormLabel>
                              <FormDescription>
                                Check this if camera feeds can be accessed for heat mapping analysis.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Upload Photos
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 h-32">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Outside Front (Facade)</p>
                      </div>
                      <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 h-32">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Inside Main Area</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Terms & Agreement</h3>

                  <FormField
                    control={form.control}
                    name="termsAgreed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I agree to the BlookMySpace Terms & Conditions</FormLabel>
                          <FormDescription>
                            By checking this, you confirm that you have read and agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms & Conditions
                            </Link>
                            .
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Already registered?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
