"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Phone, Target, TrendingUp, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react"

export default function TelecallerDashboard() {
  const [stats, setStats] = useState({
    totalCalls: 156,
    successfulCalls: 42,
    conversionRate: 27,
    todaysCalls: 23,
    monthlyTarget: 200,
    monthlyAchieved: 156,
    earnings: 15600,
    bonus: 2400,
  })

  const [recentCalls, setRecentCalls] = useState([
    {
      id: 1,
      customerName: "Rajesh Kumar",
      phone: "+91 98765 43210",
      status: "converted",
      service: "Space Owner",
      duration: "12:34",
      timestamp: "2024-01-15 14:30",
    },
    {
      id: 2,
      customerName: "Priya Sharma",
      phone: "+91 87654 32109",
      status: "follow-up",
      service: "Brand Registration",
      duration: "8:45",
      timestamp: "2024-01-15 13:15",
    },
    {
      id: 3,
      customerName: "Amit Patel",
      phone: "+91 76543 21098",
      status: "not-interested",
      service: "Vendor Registration",
      duration: "3:22",
      timestamp: "2024-01-15 12:00",
    },
  ])

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Sunita Devi",
      phone: "+91 98765 11111",
      location: "Mumbai",
      interest: "Space Owner",
      priority: "high",
      assignedDate: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      name: "Rohit Singh",
      phone: "+91 87654 22222",
      location: "Delhi",
      interest: "Brand",
      priority: "medium",
      assignedDate: "2024-01-15",
      status: "contacted",
    },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Telecaller Dashboard</h1>
          <p className="text-muted-foreground">Track your calls, leads, and performance</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Phone className="mr-2 h-4 w-4" />
            Start Calling
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls Today</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todaysCalls}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.monthlyAchieved}/{stats.monthlyTarget}
            </div>
            <Progress value={(stats.monthlyAchieved / stats.monthlyTarget) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.earnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+₹{stats.bonus} bonus this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Assigned Leads</TabsTrigger>
          <TabsTrigger value="calls">Recent Calls</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Assigned Leads */}
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Leads</CardTitle>
              <CardDescription>Your assigned leads for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{lead.name}</h4>
                        <Badge variant={lead.priority === "high" ? "destructive" : "secondary"}>{lead.priority}</Badge>
                        <Badge variant="outline">{lead.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{lead.phone}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.location} • Interested in: {lead.interest}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Calls */}
        <TabsContent value="calls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
              <CardDescription>Your call history for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          call.status === "converted"
                            ? "bg-green-100 text-green-600"
                            : call.status === "follow-up"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {call.status === "converted" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : call.status === "follow-up" ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{call.customerName}</h4>
                        <p className="text-sm text-muted-foreground">{call.phone}</p>
                        <p className="text-sm text-muted-foreground">
                          {call.service} • Duration: {call.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          call.status === "converted"
                            ? "default"
                            : call.status === "follow-up"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {call.status.replace("-", " ")}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(call.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Your performance metrics for this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Calls Made</span>
                  <span className="font-semibold">{stats.totalCalls}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Successful Conversions</span>
                  <span className="font-semibold">{stats.successfulCalls}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conversion Rate</span>
                  <span className="font-semibold">{stats.conversionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Target Achievement</span>
                  <span className="font-semibold">
                    {Math.round((stats.monthlyAchieved / stats.monthlyTarget) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
                <CardDescription>Your earnings for this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Base Salary</span>
                  <span className="font-semibold">₹12,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Performance Bonus</span>
                  <span className="font-semibold">₹{stats.bonus.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Incentives</span>
                  <span className="font-semibold">₹1,200</span>
                </div>
                <hr />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Earnings</span>
                  <span>₹{stats.earnings.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
