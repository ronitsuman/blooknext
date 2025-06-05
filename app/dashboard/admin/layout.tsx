"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Users, CreditCard, CheckCircle, Settings, Activity, Building, TrendingUp } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Pending Approvals",
    href: "/dashboard/admin/approvals",
    icon: CheckCircle,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/admin/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Spaces",
    href: "/dashboard/admin/spaces",
    icon: Building,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: TrendingUp,
  },
  {
    title: "System Health",
    href: "/dashboard/admin/system",
    icon: Activity,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard/admin">
              <span className="">Admin Dashboard</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 px-3">
            <div className="flex flex-col gap-2 p-2">
              {sidebarNavItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Button
                    key={index}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", pathname === item.href && "bg-gray-100 dark:bg-gray-800")}
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
