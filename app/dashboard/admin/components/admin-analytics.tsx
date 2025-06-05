"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, DollarSign, QrCode } from "lucide-react"
import { getAdminAnalytics } from "@/lib/admin-database"

interface AdminStats {
  totalUsers: number
  totalSpaces: number
  totalCampaigns: number
  totalRevenue: number
  totalQRScans: number
  activeSubscriptions: number
  monthlyGrowth: number
  usersByRole: Record<string, number>
}

export function AdminAnalytics() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await getAdminAnalytics()
        setStats(data)
      } catch (error) {
        console.error("Error fetching admin stats:", error)
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
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSpaces}</div>
          <p className="text-xs text-muted-foreground">Across all space owners</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total platform earnings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">QR Scans</CardTitle>
          <QrCode className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalQRScans.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total engagement</p>
        </CardContent>
      </Card>
    </div>
  )
}
