import type React from "react"
import { Home, LayoutDashboard, Settings, User, Plus, Calendar } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { Sidebar, SidebarNavItem } from "@/components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Overview",
    href: "/dashboard/space-owner",
    icon: Home,
  },
  {
    title: "Spaces",
    href: "/dashboard/space-owner/spaces",
    icon: LayoutDashboard,
  },
  {
    title: "Calendar",
    href: "/dashboard/space-owner/calendar",
    icon: Calendar,
  },
  {
    title: "Account",
    href: "/dashboard/space-owner/account",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/space-owner/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="bg-secondary">
        <MainNav className="flex flex-col gap-4" />
        <div className="mb-10 mt-auto">
          <SidebarNavItem title="Add Space" href="/dashboard/space-owner/spaces/create" icon={Plus} />
        </div>
        <div className="flex flex-col gap-4">
          {sidebarNavItems.map((item) => (
            <SidebarNavItem key={item.href} {...item} />
          ))}
        </div>
      </Sidebar>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
