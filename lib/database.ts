import { supabase } from "./supabase/client"

// Space Owner functions
export async function createSpaceOwner(data: {
  userId: string
  companyName?: string
  contactPerson: string
  address: string
  pincode: string
  landmark?: string
}) {
  try {
    const { data: spaceOwner, error } = await supabase
      .from("space_owners")
      .insert({
        user_id: data.userId,
        company_name: data.companyName,
        contact_person: data.contactPerson,
        address: data.address,
        pincode: data.pincode,
        landmark: data.landmark,
      })
      .select()
      .single()

    if (error) throw error
    return { data: spaceOwner, error: null }
  } catch (error) {
    console.error("Create space owner error:", error)
    return { data: null, error }
  }
}

export async function createSpace(data: {
  ownerId: string
  name: string
  spaceType: string
  address: string
  city: string
  state: string
  pincode: string
  spaceSize: number
  footfallWeekday: number
  footfallWeekend: number
  ageGroup: string
  incomeSegment: string
  hasCameras: boolean
  cameraCount?: number
  cameraType?: string
  cameraAccessible?: boolean
  photos?: string[]
}) {
  try {
    const { data: space, error } = await supabase
      .from("spaces")
      .insert({
        owner_id: data.ownerId,
        name: data.name,
        space_type: data.spaceType,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        space_size: data.spaceSize,
        footfall_weekday: data.footfallWeekday,
        footfall_weekend: data.footfallWeekend,
        age_group: data.ageGroup,
        income_segment: data.incomeSegment,
        has_cameras: data.hasCameras,
        camera_count: data.cameraCount,
        camera_type: data.cameraType,
        camera_accessible: data.cameraAccessible,
        photos: data.photos || [],
      })
      .select()
      .single()

    if (error) throw error
    return { data: space, error: null }
  } catch (error) {
    console.error("Create space error:", error)
    return { data: null, error }
  }
}

export async function getSpacesByOwner(ownerId: string) {
  try {
    const { data: spaces, error } = await supabase
      .from("spaces")
      .select("*")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data: spaces, error: null }
  } catch (error) {
    console.error("Get spaces by owner error:", error)
    return { data: null, error }
  }
}

// Brand functions
export async function createBrand(data: {
  userId: string
  brandName: string
  contactPerson: string
  industryType: string
  website?: string
  socialLinks?: string[]
  targetCities?: string[]
  budgetRange?: string
}) {
  try {
    const { data: brand, error } = await supabase
      .from("brands")
      .insert({
        user_id: data.userId,
        brand_name: data.brandName,
        contact_person: data.contactPerson,
        industry_type: data.industryType,
        website: data.website,
        social_links: data.socialLinks || [],
        target_cities: data.targetCities || [],
        budget_range: data.budgetRange,
      })
      .select()
      .single()

    if (error) throw error
    return { data: brand, error: null }
  } catch (error) {
    console.error("Create brand error:", error)
    return { data: null, error }
  }
}

// Campaign functions
export async function createCampaign(data: {
  brandId: string
  spaceId: string
  name: string
  description?: string
  campaignType: string
  startDate: string
  endDate: string
  budget: number
  requirements?: any
  deliverables?: string[]
}) {
  try {
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .insert({
        brand_id: data.brandId,
        space_id: data.spaceId,
        name: data.name,
        description: data.description,
        campaign_type: data.campaignType as any,
        start_date: data.startDate,
        end_date: data.endDate,
        budget: data.budget,
        requirements: data.requirements,
        deliverables: data.deliverables || [],
      })
      .select()
      .single()

    if (error) throw error
    return { data: campaign, error: null }
  } catch (error) {
    console.error("Create campaign error:", error)
    return { data: null, error }
  }
}

// BlookPerks functions
export async function createBlookPerksCampaign(data: {
  spaceId: string
  name: string
  description?: string
  campaignType: string
  startDate: string
  endDate: string
  rewards: any
  termsConditions?: string
}) {
  try {
    // Generate unique QR code
    const qrCode = `BMS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const { data: campaign, error } = await supabase
      .from("blookperks_campaigns")
      .insert({
        space_id: data.spaceId,
        name: data.name,
        description: data.description,
        campaign_type: data.campaignType as any,
        start_date: data.startDate,
        end_date: data.endDate,
        rewards: data.rewards,
        qr_code: qrCode,
        terms_conditions: data.termsConditions,
      })
      .select()
      .single()

    if (error) throw error
    return { data: campaign, error: null }
  } catch (error) {
    console.error("Create BlookPerks campaign error:", error)
    return { data: null, error }
  }
}

export async function getBlookPerksCampaignsBySpace(spaceId: string) {
  try {
    const { data: campaigns, error } = await supabase
      .from("blookperks_campaigns")
      .select("*")
      .eq("space_id", spaceId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data: campaigns, error: null }
  } catch (error) {
    console.error("Get BlookPerks campaigns error:", error)
    return { data: null, error }
  }
}

export async function getBlookPerksCampaignByQR(qrCode: string) {
  try {
    const { data: campaign, error } = await supabase
      .from("blookperks_campaigns")
      .select(`
        *,
        spaces (
          name,
          address,
          city
        )
      `)
      .eq("qr_code", qrCode)
      .eq("status", "active")
      .single()

    if (error) throw error
    return { data: campaign, error: null }
  } catch (error) {
    console.error("Get BlookPerks campaign by QR error:", error)
    return { data: null, error }
  }
}

// QR Scan tracking
export async function trackQRScan(data: {
  campaignId: string
  userAgent?: string
  ipAddress?: string
  location?: any
  engaged?: boolean
  redeemed?: boolean
}) {
  try {
    const { data: scan, error } = await supabase
      .from("qr_scans")
      .insert({
        campaign_id: data.campaignId,
        user_agent: data.userAgent,
        ip_address: data.ipAddress,
        location: data.location,
        engaged: data.engaged || false,
        redeemed: data.redeemed || false,
      })
      .select()
      .single()

    if (error) throw error

    // Update campaign analytics
    const { error: updateError } = await supabase.rpc("increment_campaign_scans", {
      campaign_id: data.campaignId,
      engaged: data.engaged || false,
      redeemed: data.redeemed || false,
    })

    if (updateError) console.error("Update campaign analytics error:", updateError)

    return { data: scan, error: null }
  } catch (error) {
    console.error("Track QR scan error:", error)
    return { data: null, error }
  }
}

// Analytics functions
export async function getSpaceOwnerAnalytics(ownerId: string) {
  try {
    // Get spaces count
    const { data: spaces, error: spacesError } = await supabase.from("spaces").select("id").eq("owner_id", ownerId)

    if (spacesError) throw spacesError

    const spaceIds = spaces?.map((s) => s.id) || []

    // Get campaigns count
    const { data: campaigns, error: campaignsError } = await supabase
      .from("campaigns")
      .select("id, budget")
      .in("space_id", spaceIds)
      .eq("status", "active")

    if (campaignsError) throw campaignsError

    // Get BlookPerks campaigns analytics
    const { data: blookperksData, error: blookperksError } = await supabase
      .from("blookperks_campaigns")
      .select("total_scans, total_engagements, total_redemptions")
      .in("space_id", spaceIds)

    if (blookperksError) throw blookperksError

    const totalRevenue = campaigns?.reduce((sum, c) => sum + (c.budget || 0), 0) || 0
    const totalScans = blookperksData?.reduce((sum, c) => sum + (c.total_scans || 0), 0) || 0

    return {
      data: {
        totalSpaces: spaces?.length || 0,
        activeCampaigns: campaigns?.length || 0,
        totalRevenue,
        totalScans,
      },
      error: null,
    }
  } catch (error) {
    console.error("Get space owner analytics error:", error)
    return { data: null, error }
  }
}
