import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function VendorDiscoveryLoading() {
  return (
    <div className="container py-10">
      <Skeleton className="h-6 w-32 mb-6" />

      <div className="flex flex-col gap-2 mb-8">
        <Skeleton className="h-12 w-3/4 sm:w-1/2" />
        <Skeleton className="h-6 w-full sm:w-2/3" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar Skeleton */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full md:w-3/4">
          {/* Search Bar Skeleton */}
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-20" />
          </div>

          {/* Tabs Skeleton */}
          <Skeleton className="h-10 w-full mb-6" />

          {/* Results Skeleton */}
          <div className="space-y-4">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Skeleton className="h-32 w-full md:w-1/4" />
                      <div className="w-full md:w-3/4 space-y-4">
                        <div className="flex justify-between">
                          <Skeleton className="h-6 w-40" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                        <div className="flex flex-wrap gap-2">
                          {Array(4)
                            .fill(null)
                            .map((_, j) => (
                              <Skeleton key={j} className="h-6 w-20" />
                            ))}
                        </div>
                        <div className="space-y-2">
                          {Array(4)
                            .fill(null)
                            .map((_, j) => (
                              <Skeleton key={j} className="h-4 w-full" />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-10 w-28" />
                          <Skeleton className="h-10 w-28" />
                          <Skeleton className="h-10 w-32" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8" />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
