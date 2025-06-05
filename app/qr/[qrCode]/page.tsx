"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Gift, MapPin } from "lucide-react"

interface Campaign {
  id: string
  name: string
  description?: string
  campaignType: string
  rewards: any
  termsConditions?: string
}

interface Space {
  name: string
  address: string
  city: string
}

export default function QRLandingPage() {
  const params = useParams()
  const qrCode = params.qrCode as string

  const [loading, setLoading] = useState(true)
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [space, setSpace] = useState<Space | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  useEffect(() => {
    if (qrCode) {
      fetchCampaign()
    }
  }, [qrCode])

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/qr/${qrCode}`)
      const data = await response.json()

      if (data.success) {
        setCampaign(data.data.campaign)
        setSpace(data.data.space)
      } else {
        setError(data.error || "Campaign not found")
      }
    } catch (err) {
      setError("Failed to load campaign")
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (action: "engage" | "redeem") => {
    setActionLoading(true)
    try {
      const response = await fetch(`/api/qr/${qrCode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })

      const data = await response.json()

      if (data.success) {
        setActionMessage(data.message)
      } else {
        setActionMessage(data.error || "Action failed")
      }
    } catch (err) {
      setActionMessage("Action failed. Please try again.")
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading campaign...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold mb-2">Campaign Not Found</h2>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!campaign || !space) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold mb-2">No Active Campaign</h2>
            <p className="text-muted-foreground">This QR code doesn't have any active campaigns.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="mb-4">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">{space.name}</span>
            </div>
            <CardTitle className="text-2xl">{campaign.name}</CardTitle>
            {campaign.description && <CardDescription>{campaign.description}</CardDescription>}
          </CardHeader>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Your Reward
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Badge className="text-lg px-4 py-2 mb-4">
                {campaign.campaignType === "spin_to_win" && "🎰 Spin to Win!"}
                {campaign.campaignType === "scratch_card" && "🎫 Scratch Card"}
                {campaign.campaignType === "lucky_draw" && "🍀 Lucky Draw"}
                {campaign.campaignType === "survey" && "📝 Survey Reward"}
                {campaign.campaignType === "coupon" && "🎟️ Instant Coupon"}
              </Badge>

              {campaign.rewards && (
                <div className="space-y-2">
                  {Array.isArray(campaign.rewards) ? (
                    campaign.rewards.map((reward: any, index: number) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{reward.type}</p>
                        <p className="text-sm text-muted-foreground">{reward.value}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">{campaign.rewards.type || "Special Reward"}</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.rewards.value || "Exciting prizes await!"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {actionMessage ? (
          <Card className="mb-4">
            <CardContent className="text-center p-6">
              <h3 className="text-lg font-semibold mb-2">🎉 Success!</h3>
              <p className="text-muted-foreground">{actionMessage}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <Button className="w-full h-12 text-lg" onClick={() => handleAction("engage")} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Gift className="h-5 w-5 mr-2" />}
              {campaign.campaignType === "spin_to_win" && "Spin Now!"}
              {campaign.campaignType === "scratch_card" && "Scratch Card!"}
              {campaign.campaignType === "lucky_draw" && "Enter Draw!"}
              {campaign.campaignType === "survey" && "Take Survey!"}
              {campaign.campaignType === "coupon" && "Get Coupon!"}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAction("redeem")}
              disabled={actionLoading}
            >
              {actionLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Redeem Reward
            </Button>
          </div>
        )}

        {campaign.termsConditions && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{campaign.termsConditions}</p>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-semibold">BlookMySpace</span>
          </p>
        </div>
      </div>
    </div>
  )
}
