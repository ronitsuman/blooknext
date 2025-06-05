import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentAnalytics } from "./components/agent-analytics"
import { ReferralManagement } from "./components/referral-management"
import { CommissionTracking } from "./components/commission-tracking"
import { AgentProfile } from "./components/agent-profile"

export default function BlookForceDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">BlookForce Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading analytics...</div>}>
            <AgentAnalytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Suspense fallback={<div>Loading referrals...</div>}>
            <ReferralManagement />
          </Suspense>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Suspense fallback={<div>Loading commissions...</div>}>
            <CommissionTracking />
          </Suspense>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <AgentProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}
