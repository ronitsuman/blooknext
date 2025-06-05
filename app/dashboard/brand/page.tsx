import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandAnalytics } from "./components/brand-analytics"
import { CampaignManagement } from "./components/campaign-management"
import { SpaceDiscovery } from "./components/space-discovery"
import { BrandProfile } from "./components/brand-profile"

export default function BrandDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Brand Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="spaces">Discover Spaces</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading analytics...</div>}>
            <BrandAnalytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Suspense fallback={<div>Loading campaigns...</div>}>
            <CampaignManagement />
          </Suspense>
        </TabsContent>

        <TabsContent value="spaces" className="space-y-4">
          <Suspense fallback={<div>Loading spaces...</div>}>
            <SpaceDiscovery />
          </Suspense>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <BrandProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}
