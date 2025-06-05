import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminAnalytics } from "./components/admin-analytics"
import { UserManagement } from "./components/user-management"
import { PlatformSettings } from "./components/platform-settings"
import { RevenueTracking } from "./components/revenue-tracking"
import { SystemHealth } from "./components/system-health"

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading analytics...</div>}>
            <AdminAnalytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Suspense fallback={<div>Loading users...</div>}>
            <UserManagement />
          </Suspense>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Suspense fallback={<div>Loading revenue data...</div>}>
            <RevenueTracking />
          </Suspense>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Suspense fallback={<div>Loading system health...</div>}>
            <SystemHealth />
          </Suspense>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <PlatformSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
