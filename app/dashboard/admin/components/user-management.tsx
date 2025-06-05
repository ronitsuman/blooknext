"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserCheck, UserX } from "lucide-react"
import { getAllUsers, updateUserStatus } from "@/lib/admin-database"

interface User {
  id: string
  email: string
  full_name: string
  role: string
  status: "active" | "inactive" | "pending"
  created_at: string
  last_sign_in_at?: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await getAllUsers()
        setUsers(data || [])
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleStatusUpdate = async (userId: string, newStatus: "active" | "inactive") => {
    try {
      await updateUserStatus(userId, newStatus)
      setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
    } catch (error) {
      console.error("Error updating user status:", error)
    }
  }

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage all platform users and their access</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="space_owner">Space Owner</SelectItem>
              <SelectItem value="brand">Brand</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="blookforce_agent">BlookForce Agent</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role.replace("_", " ").toUpperCase()}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : user.status === "pending" ? "secondary" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {user.status === "active" ? (
                      <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(user.id, "inactive")}>
                        <UserX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(user.id, "active")}>
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
