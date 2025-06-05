import { supabase } from "./supabase/client"
import { sendEmail } from "./email-service"

export async function getAdminAnalytics() {
  try {
    // Get total users
    const { data: users, error: usersError } = await supabase.from("users").select("id, role, created_at")

    if (usersError) throw usersError

    // Get total spaces
    const { data: spaces, error: spacesError } = await supabase.from("spaces").select("id")

    if (spacesError) throw spacesError

    // Get total campaigns
    const { data: campaigns, error: campaignsError } = await supabase.from("campaigns").select("id, budget")

    if (campaignsError) throw campaignsError

    // Get QR scans
    const { data: qrScans, error: qrError } = await supabase.from("qr_scans").select("id")

    if (qrError) throw qrError

    // Calculate revenue (platform commission)
    const totalRevenue = campaigns?.reduce((sum, c) => sum + c.budget * 0.1, 0) || 0

    // Calculate monthly growth
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const currentMonthUsers =
      users?.filter((u) => {
        const userDate = new Date(u.created_at)
        return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear
      }).length || 0

    const lastMonthUsers =
      users?.filter((u) => {
        const userDate = new Date(u.created_at)
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
        return userDate.getMonth() === lastMonth && userDate.getFullYear() === lastMonthYear
      }).length || 0

    const monthlyGrowth = lastMonthUsers > 0 ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100 : 0

    // Users by role
    const usersByRole =
      users?.reduce(
        (acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ) || {}

    return {
      data: {
        totalUsers: users?.length || 0,
        totalSpaces: spaces?.length || 0,
        totalCampaigns: campaigns?.length || 0,
        totalRevenue: Math.round(totalRevenue),
        totalQRScans: qrScans?.length || 0,
        activeSubscriptions: 0, // TODO: Implement subscription tracking
        monthlyGrowth: Math.round(monthlyGrowth),
        usersByRole,
      },
      error: null,
    }
  } catch (error) {
    console.error("Get admin analytics error:", error)
    return { data: null, error }
  }
}

export async function getAllUsers() {
  try {
    const { data: users, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { data: users, error: null }
  } catch (error) {
    console.error("Get all users error:", error)
    return { data: null, error }
  }
}

export async function updateUserStatus(userId: string, status: "active" | "inactive") {
  try {
    const { data, error } = await supabase.from("users").update({ status }).eq("id", userId).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Update user status error:", error)
    return { data: null, error }
  }
}

export async function getPlatformRevenue() {
  try {
    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select("budget, created_at, status")
      .eq("status", "completed")

    if (error) throw error

    const monthlyRevenue =
      campaigns?.reduce(
        (acc, campaign) => {
          const month = new Date(campaign.created_at).toISOString().slice(0, 7)
          const commission = campaign.budget * 0.1 // 10% platform commission
          acc[month] = (acc[month] || 0) + commission
          return acc
        },
        {} as Record<string, number>,
      ) || {}

    return { data: monthlyRevenue, error: null }
  } catch (error) {
    console.error("Get platform revenue error:", error)
    return { data: null, error }
  }
}

// New approval functions
export async function getPendingApprovals() {
  try {
    const { data: approvals, error } = await supabase
      .from("space_owners")
      .select(`
        *,
        spaces (
          name,
          space_type,
          city,
          state,
          space_size,
          footfall_weekday,
          footfall_weekend
        )
      `)
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) throw error

    const formattedApprovals = approvals?.map((approval) => ({
      id: approval.id,
      full_name: approval.full_name,
      email: approval.email,
      phone: approval.phone,
      company_name: approval.company_name,
      space_name: approval.spaces?.[0]?.name || "N/A",
      space_type: approval.spaces?.[0]?.space_type || "N/A",
      city: approval.spaces?.[0]?.city || "N/A",
      state: approval.spaces?.[0]?.state || "N/A",
      space_size: approval.spaces?.[0]?.space_size || 0,
      footfall_weekday: approval.spaces?.[0]?.footfall_weekday || 0,
      footfall_weekend: approval.spaces?.[0]?.footfall_weekend || 0,
      created_at: approval.created_at,
      status: approval.status,
    }))

    return { data: formattedApprovals, error: null }
  } catch (error) {
    console.error("Get pending approvals error:", error)
    return { data: null, error }
  }
}

export async function approveSpaceOwner(spaceOwnerId: string) {
  try {
    // Update space owner status
    const { data: spaceOwner, error: ownerError } = await supabase
      .from("space_owners")
      .update({ status: "approved" })
      .eq("id", spaceOwnerId)
      .select()
      .single()

    if (ownerError) throw ownerError

    // Update associated spaces status
    const { error: spacesError } = await supabase
      .from("spaces")
      .update({ status: "active" })
      .eq("owner_id", spaceOwnerId)

    if (spacesError) throw spacesError

    // Send approval email
    await sendEmail({
      to: spaceOwner.email,
      subject: "Space Registration Approved - Welcome to BlookMySpace!",
      template: "space-owner-approved",
      data: {
        name: spaceOwner.full_name,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      },
    })

    return { data: spaceOwner, error: null }
  } catch (error) {
    console.error("Approve space owner error:", error)
    return { data: null, error }
  }
}

export async function rejectSpaceOwner(spaceOwnerId: string) {
  try {
    // Update space owner status
    const { data: spaceOwner, error: ownerError } = await supabase
      .from("space_owners")
      .update({ status: "rejected" })
      .eq("id", spaceOwnerId)
      .select()
      .single()

    if (ownerError) throw ownerError

    // Update associated spaces status
    const { error: spacesError } = await supabase
      .from("spaces")
      .update({ status: "rejected" })
      .eq("owner_id", spaceOwnerId)

    if (spacesError) throw spacesError

    // Send rejection email
    await sendEmail({
      to: spaceOwner.email,
      subject: "Space Registration Update",
      template: "space-owner-rejected",
      data: {
        name: spaceOwner.full_name,
        supportEmail: "support@blookmyspace.com",
      },
    })

    return { data: spaceOwner, error: null }
  } catch (error) {
    console.error("Reject space owner error:", error)
    return { data: null, error }
  }
}

// Subscription management functions
export async function getAllSubscriptions() {
  try {
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select(`
        *,
        users (
          full_name,
          email
        )
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    const formattedSubscriptions = subscriptions?.map((sub) => ({
      id: sub.id,
      user_id: sub.user_id,
      user_name: sub.users?.full_name || "N/A",
      user_email: sub.users?.email || "N/A",
      plan_type: sub.plan_type,
      status: sub.status,
      amount: sub.amount,
      start_date: sub.start_date,
      end_date: sub.end_date,
      auto_renew: sub.auto_renew,
      created_at: sub.created_at,
    }))

    return { data: formattedSubscriptions, error: null }
  } catch (error) {
    console.error("Get all subscriptions error:", error)
    return { data: null, error }
  }
}

export async function getSubscriptionAnalytics() {
  try {
    const { data: subscriptions, error } = await supabase.from("subscriptions").select("*")

    if (error) throw error

    const totalRevenue = subscriptions?.reduce((sum, sub) => sum + sub.amount, 0) || 0
    const activeSubscriptions = subscriptions?.filter((sub) => sub.status === "active").length || 0

    // Calculate monthly growth
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const currentMonthSubs =
      subscriptions?.filter((sub) => {
        const subDate = new Date(sub.created_at)
        return subDate.getMonth() === currentMonth && subDate.getFullYear() === currentYear
      }).length || 0

    const lastMonthSubs =
      subscriptions?.filter((sub) => {
        const subDate = new Date(sub.created_at)
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
        return subDate.getMonth() === lastMonth && subDate.getFullYear() === lastMonthYear
      }).length || 0

    const monthlyGrowth = lastMonthSubs > 0 ? ((currentMonthSubs - lastMonthSubs) / lastMonthSubs) * 100 : 0

    // Plan distribution
    const planDistribution =
      subscriptions?.reduce(
        (acc, sub) => {
          acc[sub.plan_type] = (acc[sub.plan_type] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ) || {}

    return {
      data: {
        totalRevenue,
        activeSubscriptions,
        monthlyGrowth: Math.round(monthlyGrowth),
        planDistribution,
      },
      error: null,
    }
  } catch (error) {
    console.error("Get subscription analytics error:", error)
    return { data: null, error }
  }
}

export async function updateSubscriptionPlan(subscriptionId: string, newPlan: string) {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ plan_type: newPlan })
      .eq("id", subscriptionId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Update subscription plan error:", error)
    return { data: null, error }
  }
}
