"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Users, CalendarDays, LayoutDashboard, Table2, LogOut, Mail } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/clients",
      label: "Clients",
      icon: Users,
    },
    {
      href: "/dashboard/reservations",
      label: "Reservations",
      icon: CalendarDays,
    },
    {
      href: "/dashboard/tables",
      label: "Tables",
      icon: Table2,
    },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: Mail,
    },
  ]

  return (
    <div className="flex flex-col h-full w-64 border-r bg-background">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Restaurant</h1>
        <p className="text-sm text-muted-foreground">Restaurant Reservation System</p>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === route.href ? "bg-secondary" : "")}
            >
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
