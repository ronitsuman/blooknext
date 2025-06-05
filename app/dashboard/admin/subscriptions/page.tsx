"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, TrendingUp, Users, DollarSign } from "lucide-react"
import { getSubscriptionAnalytics, getAllSubscriptions, updateSubscriptionPlan } from "@/lib/admin-database"

interface Subscription {
  id: string
  user_id: string
  user_name: string
  user_email: string
  plan_type: "basic" | "professional" | "enterprise"
  status: "active" | "cancelled" | "expired"
  amount: number
  start_date: string
  end_date: string
  auto_renew: boolean
  created_at: string
}

interface SubscriptionStats {
  totalRevenue: number
  activeSubscriptions: number
  monthlyGrowth: number
  planDistribution: Record<string, number>
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [stats, setStats] = useState<SubscriptionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    async function fetchData() {
      try {
        const [subscriptionsData, statsData] = await Promise.all([getAllSubscriptions(), getSubscriptionAnalytics()])

        setSubscriptions(subscriptionsData.data || [])
        setStats(statsData.data)
      } catch (error) {
        console.error("Error fetching subscription data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (filter === "all") return true
    return sub.status === filter
  })

  const handlePlanUpdate = async (subscriptionId: string, newPlan: string) => {
    try {
      await updateSubscriptionPlan(subscriptionId, newPlan)
      // Refresh data
      const { data } = await getAllSubscriptions()
      setSubscriptions(data || [])
    } catch (error) {
      console.error("Error updating subscription:", error)
    }
  }

  if (loading) {
    return <div>Loading subscription data...</div>
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Subscription Management</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats?.totalRevenue?.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground">+{stats?.monthlyGrowth || 0}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeSubscriptions || 0}</div>
            <p className="text-xs text-muted-foreground">Currently active plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professional Plans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.planDistribution?.professional || 0}</div>
            <p className="text-xs text-muted-foreground">Most popular plan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats?.monthlyGrowth || 0}%</div>
            <p className="text-xs text-muted-foreground">Subscription growth rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>Manage currently active subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="Search by user name or email..." className="max-w-sm" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Auto Renew</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subscription.user_name}</div>
                          <div className="text-sm text-muted-foreground">{subscription.user_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            subscription.plan_type === "enterprise"
                              ? "default"
                              : subscription.plan_type === "professional"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {subscription.plan_type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{subscription.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            subscription.status === "active"
                              ? "default"
                              : subscription.status === "expired"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {subscription.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(subscription.start_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(subscription.end_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={subscription.auto_renew ? "default" : "outline"}>
                          {subscription.auto_renew ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Select
                            value={subscription.plan_type}
                            onValueChange={(value) => handlePlanUpdate(subscription.id, value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="enterprise">Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
