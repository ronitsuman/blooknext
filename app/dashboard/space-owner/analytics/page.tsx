"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, TrendingUp, Users, QrCode, Calendar } from "lucide-react"

interface AnalyticsData {
  totalScans: number
  totalEngagements: number
  totalRedemptions: number
  conversionRate: number
  topCampaigns: any[]
  scansByDay: any[]
  demographicData: any[]
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      // This would be replaced with actual analytics queries
      const mockData: AnalyticsData = {
        totalScans: 1234,
        totalEngagements: 987,
        totalRedemptions: 234,
        conversionRate: 18.9,
        topCampaigns: [
          { name: "Summer Spin-to-Win", scans: 543, engagements: 412, redemptions: 89 },
          { name: "Customer Survey", scans: 321, engagements: 198, redemptions: 45 },
          { name: "Loyalty Points", scans: 370, engagements: 277, redemptions: 100 },
        ],
        scansByDay: [
          { date: "2025-06-01", scans: 45 },
          { date: "2025-06-02", scans: 67 },
          { date: "2025-06-03", scans: 89 },
          { date: "2025-06-04", scans: 123 },
          { date: "2025-06-05", scans: 156 },
        ],
        demographicData: [
          { ageGroup: "18-24", percentage: 25 },
          { ageGroup: "25-34", percentage: 35 },
          { ageGroup: "35-44", percentage: 25 },
          { ageGroup: "45+", percentage: 15 },
        ],
      }

      setAnalyticsData(mockData)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <Card>
          <CardContent className="text-center p-6">
            <p className="text-muted-foreground">Failed to load analytics data.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Track your campaign performance and customer engagement.</p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant={timeRange === "7d" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTimeRange("7d")}
          >
            7 Days
          </Badge>
          <Badge
            variant={timeRange === "30d" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTimeRange("30d")}
          >
            30 Days
          </Badge>
          <Badge
            variant={timeRange === "90d" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTimeRange("90d")}
          >
            90 Days
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalScans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagements</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalEngagements.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redemptions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalRedemptions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2.1% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>Your best performing campaigns in the selected time period.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topCampaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.scans} scans • {campaign.engagements} engagements • {campaign.redemptions} redemptions
                      </p>
                    </div>
                    <Badge>{((campaign.redemptions / campaign.scans) * 100).toFixed(1)}% conversion</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan Trends</CardTitle>
              <CardDescription>Daily scan activity over the selected time period.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Age group breakdown of your customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.demographicData.map((demo, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{demo.ageGroup}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${demo.percentage}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground">{demo.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
