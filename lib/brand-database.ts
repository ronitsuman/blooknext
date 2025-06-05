import { supabase } from "./supabase/client"

export async function getBrandAnalytics() {
  try {
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    // Get brand profile
    const { data: brand, error: brandError } = await supabase
      .from("brands")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (brandError) throw brandError

    // Get campaigns
    const { data: campaigns, error: campaignsError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("brand_id", brand.id)

    if (campaignsError) throw campaignsError

    const totalCampaigns = campaigns?.length || 0
    const activeCampaigns = campaigns?.filter((c) => c.status === "active").length || 0
    const totalSpend = campaigns?.reduce((sum, c) => sum + c.budget, 0) || 0

    // Get campaign analytics
    const campaignIds = campaigns?.map((c) => c.id) || []
    const { data: analytics, error: analyticsError } = await supabase
      .from("campaign_analytics")
      .select("*")
      .in("campaign_id", campaignIds)

    if (analyticsError) throw analyticsError

    const totalReach = analytics?.reduce((sum, a) => sum + (a.total_reach || 0), 0) || 0
    const totalEngagements = analytics?.reduce((sum, a) => sum + (a.total_engagements || 0), 0) || 0
    const avgEngagement = totalReach > 0 ? Math.round((totalEngagements / totalReach) * 100) : 0

    return {
      data: {
        totalCampaigns,
        activeCampaigns,
        totalSpend,
        totalReach,
        avgEngagement,
        topPerformingSpace: "Mall Plaza", // TODO: Calculate from analytics
      },
      error: null,
    }
  } catch (error) {
    console.error("Get brand analytics error:", error)
    return { data: null, error }
  }
}

export async function getBrandCampaigns() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data: brand, error: brandError } = await supabase
      .from("brands")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (brandError) throw brandError

    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select(`
        *,
        spaces (
          name,
          address,
          city
        )
      `)
      .eq("brand_id", brand.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data: campaigns, error: null }
  } catch (error) {
    console.error("Get brand campaigns error:", error)
    return { data: null, error }
  }
}

export async function getAvailableSpaces(filters?: {
  city?: string
  spaceType?: string
  budgetRange?: [number, number]
}) {
  try {
    let query = supabase
      .from("spaces")
      .select(`
        *,
        space_owners (
          contact_person,
          user_id
        )
      `)
      .eq("status", "active")

    if (filters?.city) {
      query = query.eq("city", filters.city)
    }

    if (filters?.spaceType) {
      query = query.eq("space_type", filters.spaceType)
    }

    const { data: spaces, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return { data: spaces, error: null }
  } catch (error) {
    console.error("Get available spaces error:", error)
    return { data: null, error }
  }
}
