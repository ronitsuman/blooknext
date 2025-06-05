import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Building, Calendar, DollarSign, Users, Plus } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getSpacesByOwner, getSpaceOwnerAnalytics } from "@/lib/database"
import { supabase } from "@/lib/supabase/client"

async function getSpaceOwnerData() {
  const { user, profile } = await getCurrentUser()

  if (!user || !profile || profile.role !== "space_owner") {
    redirect("/login")
  }

  // Get space owner record
  const { data: spaceOwner } = await supabase.from("space_owners").select("*").eq("user_id", user.id).single()

  if (!spaceOwner) {
    redirect("/onboarding/space-owner")
  }

  // Get spaces and analytics
  const { data: spaces } = await getSpacesByOwner(spaceOwner.id)
  const { data: analytics } = await getSpaceOwnerAnalytics(spaceOwner.id)

  return {
    user,
    profile,
    spaceOwner,
    spaces: spaces || [],
    analytics: analytics || {
      totalSpaces: 0,
      activeCampaigns: 0,
      totalRevenue: 0,
      totalScans: 0,
    },
  }
}

export default async function SpaceOwnerDashboard() {
  const { spaces, analytics } = await getSpaceOwnerData()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your spaces and campaigns.</p>
        </div>
        <Link href="/dashboard/space-owner/spaces/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Space
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSpaces}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalSpaces > 0 ? "Active listings" : "No spaces yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.activeCampaigns > 0 ? "Currently running" : "No active campaigns"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{analytics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalRevenue > 0 ? "From campaigns" : "No revenue yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalScans}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalScans > 0 ? "QR code scans" : "No scans yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="spaces">
        <TabsList>
          <TabsTrigger value="spaces">My Spaces</TabsTrigger>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="spaces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Spaces</CardTitle>
              <CardDescription>Manage your registered spaces and their details.</CardDescription>
            </CardHeader>
            <CardContent>
              {spaces.length === 0 ? (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No spaces registered yet</h3>
                  <p className="text-muted-foreground mb-4">Add your first space to start monetizing your property.</p>
                  <Link href="/dashboard/space-owner/spaces/add">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Space
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {spaces.map((space) => (
                    <div key={space.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{space.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {space.space_type} • {space.city}, {space.state}
                          </p>
                        </div>
                        <Badge variant={space.status === "active" ? "default" : "secondary"}>{space.status}</Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Space Size</p>
                          <p>{space.space_size.toLocaleString()} sq ft</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Daily Footfall</p>
                          <p>~{space.footfall_weekday} visitors</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Link href={`/dashboard/space-owner/spaces/${space.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>View and manage your active advertising campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.activeCampaigns === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No active campaigns</h3>
                  <p className="text-muted-foreground mb-4">
                    Create BlookPerks campaigns to engage customers at your space.
                  </p>
                  <Link href="/dashboard/space-owner/campaigns/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Campaign
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    You have {analytics.activeCampaigns} active campaign{analytics.activeCampaigns !== 1 ? "s" : ""}.
                  </p>
                  <Link href="/dashboard/space-owner/campaigns">
                    <Button variant="outline">
                      View All Campaigns
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
