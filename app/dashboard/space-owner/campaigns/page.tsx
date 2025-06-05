import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Plus, QrCode } from "lucide-react"
import { QRCodeDisplay } from "@/components/qr-code-display"

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">Manage your BlookPerks campaigns and track their performance.</p>
        </div>
        <Link href="/dashboard/space-owner/campaigns/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+256 from last month</p>
          </CardContent>
        </Card>
      </div>

      <QRCodeDisplay qrCodeUrl="/placeholder.svg?height=300&width=300" spaceId="space-1" spaceName="Sunrise Café" />

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>These campaigns are currently live and accessible via your QR code.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Summer Spin-to-Win</h3>
                      <p className="text-sm text-muted-foreground">Spin-to-Win • Started 01 Jun 2025</p>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Scans</p>
                      <p>543</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagements</p>
                      <p>412</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Redemptions</p>
                      <p>89</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href="/dashboard/space-owner/campaigns/1">
                      <Button variant="outline" size="sm">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Customer Feedback Survey</h3>
                      <p className="text-sm text-muted-foreground">Survey • Started 15 May 2025</p>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Scans</p>
                      <p>321</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagements</p>
                      <p>198</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Redemptions</p>
                      <p>45</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href="/dashboard/space-owner/campaigns/2">
                      <Button variant="outline" size="sm">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Loyalty Points Program</h3>
                      <p className="text-sm text-muted-foreground">Loyalty • Started 01 Apr 2025</p>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Scans</p>
                      <p>870</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagements</p>
                      <p>654</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Redemptions</p>
                      <p>123</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href="/dashboard/space-owner/campaigns/3">
                      <Button variant="outline" size="sm">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Campaigns</CardTitle>
              <CardDescription>These campaigns are scheduled to start in the future.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Monsoon Scratch Card</h3>
                      <p className="text-sm text-muted-foreground">Scratch Card • Starts 01 Jul 2025</p>
                    </div>
                    <Badge variant="outline">Schedule</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p>01 Jul 2025</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p>31 Jul 2025</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reward</p>
                      <p>10% Discount</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href="/dashboard/space-owner/campaigns/4">
                      <Button variant="outline" size="sm">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Campaigns</CardTitle>
              <CardDescription>These campaigns have ended and are no longer active.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Spring Lucky Draw</h3>
                      <p className="text-sm text-muted-foreground">Lucky Draw • Ended 31 May 2025</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Scans</p>
                      <p>1,234</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Engagements</p>
                      <p>987</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Redemptions</p>
                      <p>234</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href="/dashboard/space-owner/campaigns/5">
                      <Button variant="outline" size="sm">
                        View Report
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
