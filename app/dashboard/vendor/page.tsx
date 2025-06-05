import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VendorAnalytics } from "./components/vendor-analytics"
import { JobManagement } from "./components/job-management"
import { ServiceCatalog } from "./components/service-catalog"
import { VendorProfile } from "./components/vendor-profile"

export default function VendorDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading analytics...</div>}>
            <VendorAnalytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Suspense fallback={<div>Loading jobs...</div>}>
            <JobManagement />
          </Suspense>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServiceCatalog />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <VendorProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}
