"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp, Users, Eye } from "lucide-react"
import { getBrandAnalytics } from "@/lib/brand-database"

interface BrandStats {
  totalCampaigns: number
  activeCampaigns: number
  totalSpend: number
  totalReach: number
  avgEngagement: number
  topPerformingSpace: string
}

export function BrandAnalytics() {
  const [stats, setStats] = useState<BrandStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await getBrandAnalytics()
        setStats(data)
      } catch (error) {
        console.error("Error fetching brand stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading analytics...</div>
  }

  if (!stats) {
    return <div>Error loading analytics</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
          <p className="text-xs text-muted-foreground">{stats.activeCampaigns} currently active</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalSpend.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Campaign investments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReach.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">People reached</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
          <p className="text-xs text-muted-foreground">Engagement rate</p>
        </CardContent>
      </Card>
    </div>
  )
}
