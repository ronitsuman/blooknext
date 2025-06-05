import { type NextRequest, NextResponse } from "next/server"
import { getBlookPerksCampaignByQR, trackQRScan } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { qrCode: string } }) {
  try {
    const { qrCode } = params

    if (!qrCode) {
      return NextResponse.json({ error: "QR code is required" }, { status: 400 })
    }

    // Get campaign by QR code
    const { data: campaign, error } = await getBlookPerksCampaignByQR(qrCode)

    if (error || !campaign) {
      return NextResponse.json({ error: "Campaign not found or inactive" }, { status: 404 })
    }

    // Track the scan
    const userAgent = request.headers.get("user-agent") || undefined
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : request.ip

    await trackQRScan({
      campaignId: campaign.id,
      userAgent,
      ipAddress,
    })

    return NextResponse.json({
      success: true,
      data: {
        campaign: {
          id: campaign.id,
          name: campaign.name,
          description: campaign.description,
          campaignType: campaign.campaign_type,
          rewards: campaign.rewards,
          termsConditions: campaign.terms_conditions,
        },
        space: campaign.spaces,
      },
    })
  } catch (error) {
    console.error("QR scan API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { qrCode: string } }) {
  try {
    const { qrCode } = params
    const body = await request.json()
    const { action } = body // 'engage' or 'redeem'

    if (!qrCode) {
      return NextResponse.json({ error: "QR code is required" }, { status: 400 })
    }

    // Get campaign by QR code
    const { data: campaign, error } = await getBlookPerksCampaignByQR(qrCode)

    if (error || !campaign) {
      return NextResponse.json({ error: "Campaign not found or inactive" }, { status: 404 })
    }

    // Track the engagement/redemption
    const userAgent = request.headers.get("user-agent") || undefined
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : request.ip

    await trackQRScan({
      campaignId: campaign.id,
      userAgent,
      ipAddress,
      engaged: action === "engage" || action === "redeem",
      redeemed: action === "redeem",
    })

    return NextResponse.json({
      success: true,
      message: action === "redeem" ? "Reward redeemed successfully!" : "Thank you for participating!",
    })
  } catch (error) {
    console.error("QR action API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
