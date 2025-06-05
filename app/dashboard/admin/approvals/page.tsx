"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Eye, Clock } from "lucide-react"
import { getPendingApprovals, approveSpaceOwner, rejectSpaceOwner } from "@/lib/admin-database"

interface PendingApproval {
  id: string
  full_name: string
  email: string
  phone: string
  company_name?: string
  space_name: string
  space_type: string
  city: string
  state: string
  space_size: number
  footfall_weekday: number
  footfall_weekend: number
  created_at: string
  status: "pending" | "approved" | "rejected"
}

export default function ApprovalsPage() {
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApprovals() {
      try {
        const { data } = await getPendingApprovals()
        setPendingApprovals(data || [])
      } catch (error) {
        console.error("Error fetching approvals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApprovals()
  }, [])

  const handleApprove = async (id: string) => {
    try {
      await approveSpaceOwner(id)
      setPendingApprovals(pendingApprovals.filter((approval) => approval.id !== id))
    } catch (error) {
      console.error("Error approving space owner:", error)
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectSpaceOwner(id)
      setPendingApprovals(pendingApprovals.filter((approval) => approval.id !== id))
    } catch (error) {
      console.error("Error rejecting space owner:", error)
    }
  }

  if (loading) {
    return <div>Loading approvals...</div>
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pending Approvals</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          <Clock className="h-4 w-4 mr-1" />
          {pendingApprovals.length} Pending
        </Badge>
      </div>

      <Tabs defaultValue="spaces" className="space-y-4">
        <TabsList>
          <TabsTrigger value="spaces">Space Owners</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="spaces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Space Owner Approvals</CardTitle>
              <CardDescription>Review and approve new space owner registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Owner Details</TableHead>
                    <TableHead>Space Information</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Footfall</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{approval.full_name}</div>
                          <div className="text-sm text-muted-foreground">{approval.email}</div>
                          <div className="text-sm text-muted-foreground">{approval.phone}</div>
                          {approval.company_name && (
                            <div className="text-sm text-muted-foreground">{approval.company_name}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{approval.space_name}</div>
                          <Badge variant="outline">{approval.space_type}</Badge>
                          <div className="text-sm text-muted-foreground">{approval.space_size} sq ft</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{approval.city}</div>
                          <div className="text-sm text-muted-foreground">{approval.state}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">Weekday: {approval.footfall_weekday}</div>
                          <div className="text-sm">Weekend: {approval.footfall_weekend}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(approval.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" onClick={() => handleApprove(approval.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleReject(approval.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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
