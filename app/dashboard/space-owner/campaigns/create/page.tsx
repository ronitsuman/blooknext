"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload } from "lucide-react"

const campaignFormSchema = z.object({
  campaignName: z.string().min(2, {
    message: "Campaign name must be at least 2 characters.",
  }),
  campaignType: z.string({
    required_error: "Please select a campaign type.",
  }),
  description: z.string().optional(),
  startDate: z.string({
    required_error: "Please select a start date.",
  }),
  endDate: z.string({
    required_error: "Please select an end date.",
  }),
  rewardType: z.string({
    required_error: "Please select a reward type.",
  }),
  rewardValue: z.string().min(1, {
    message: "Please enter a reward value.",
  }),
  rewardQuantity: z.string().min(1, {
    message: "Please enter a reward quantity.",
  }),
  termsAndConditions: z.string().min(10, {
    message: "Terms and conditions must be at least 10 characters.",
  }),
  notifyUsers: z.boolean().default(false),
})

export default function CreateCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      campaignName: "",
      campaignType: "",
      description: "",
      startDate: "",
      endDate: "",
      rewardType: "",
      rewardValue: "",
      rewardQuantity: "",
      termsAndConditions: "",
      notifyUsers: false,
    },
  })

  function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    setIsSubmitting(true)

    // In a real app, you would submit this data to your backend
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/space-owner/campaigns")
    }, 1000)
  }

  function nextStep() {
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard/space-owner/campaigns" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Create Campaign</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New BlookPerks Campaign</CardTitle>
          <CardDescription>Create a new campaign to engage customers at your space.</CardDescription>
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
                  <h3 className="text-lg font-medium">Campaign Details</h3>

                  <FormField
                    control={form.control}
                    name="campaignName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter campaign name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be displayed to customers when they scan your QR code.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="campaignType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select campaign type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="spin-to-win">Spin-to-Win</SelectItem>
                            <SelectItem value="scratch-card">Scratch Card</SelectItem>
                            <SelectItem value="lucky-draw">Lucky Draw</SelectItem>
                            <SelectItem value="survey">Customer Survey</SelectItem>
                            <SelectItem value="coupon">Instant Coupon</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Choose the type of engagement you want to offer.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter campaign description" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>Provide additional details about your campaign.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
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
                  <h3 className="text-lg font-medium">Rewards & Incentives</h3>

                  <FormField
                    control={form.control}
                    name="rewardType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Reward Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="discount" />
                              </FormControl>
                              <FormLabel className="font-normal">Discount (%)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed-amount" />
                              </FormControl>
                              <FormLabel className="font-normal">Fixed Amount (₹)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="free-item" />
                              </FormControl>
                              <FormLabel className="font-normal">Free Item</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="points" />
                              </FormControl>
                              <FormLabel className="font-normal">Loyalty Points</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rewardValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Value</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter reward value" {...field} />
                        </FormControl>
                        <FormDescription>
                          For discounts, enter percentage. For fixed amounts, enter the value in ₹.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rewardQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter reward quantity" {...field} />
                        </FormControl>
                        <FormDescription>How many rewards will be available for this campaign.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Upload Campaign Media (Optional)</FormLabel>
                    <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 h-32">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to upload images for your campaign
                      </p>
                    </div>
                    <FormDescription>
                      Upload images to make your campaign more engaging. Recommended size: 800x600px.
                    </FormDescription>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Terms & Settings</h3>

                  <FormField
                    control={form.control}
                    name="termsAndConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Terms and Conditions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter terms and conditions"
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Specify any terms, conditions, or limitations for your campaign.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifyUsers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Notify Users</FormLabel>
                          <FormDescription>
                            Send notifications to users who have previously engaged with your campaigns.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="rounded-md border p-4">
                    <h4 className="font-medium mb-2">Campaign Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-muted-foreground">Campaign Name:</p>
                        <p>{form.watch("campaignName") || "Not specified"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-muted-foreground">Campaign Type:</p>
                        <p>{form.watch("campaignType") || "Not specified"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-muted-foreground">Duration:</p>
                        <p>
                          {form.watch("startDate") && form.watch("endDate")
                            ? `${form.watch("startDate")} to ${form.watch("endDate")}`
                            : "Not specified"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-muted-foreground">Reward:</p>
                        <p>
                          {form.watch("rewardType") && form.watch("rewardValue")
                            ? `${form.watch("rewardType")} - ${form.watch("rewardValue")}`
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
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
                    {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
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
