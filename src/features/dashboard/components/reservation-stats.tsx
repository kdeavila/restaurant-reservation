"use client"

import { useEffect, useState } from "react"
import { getTables } from "@/features/tables/services/tables.service"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { CalendarDays, CheckCircle, Users } from "lucide-react"
import type { Table } from "@/types/app"

export function ReservationStats() {
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true)
        const apiTables = await getTables()
        setTables(apiTables)
      } catch (err) {
        setError("Error loading tables")
      } finally {
        setLoading(false)
      }
    }
    fetchTables()
  }, [])

  // Cálculos de stats
  const totalTables = tables.length
  const availableTables = tables.filter((t) => t.status === "available").length
  const occupiedTables = tables.filter((t) => t.status === "occupied").length
  // If reserved is not a valid TableStatus, skip it or handle only available/occupied
  // const reservedTables = tables.filter((t) => t.status === "reserved").length
  const availabilityPercent =
    totalTables > 0 ? Math.round((availableTables / totalTables) * 100) : 0

  // Fake stats for demonstration
  const totalRevenue = 1240 // USD
  const ordersPerHour = 7

  const stats = [
    {
      title: "Total Tables",
      value: totalTables,
      icon: CheckCircle,
      description: `${availableTables} available, ${occupiedTables} occupied`,
    },
    {
      title: "Available Tables",
      value: `${availableTables}/${totalTables}`,
      icon: CheckCircle,
      description: `${availabilityPercent}% availability`,
    },
    {
      title: "Today's Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: Users,
      description: "Estimated gross income",
    },
    {
      title: "Orders per Hour",
      value: ordersPerHour,
      icon: CalendarDays,
      description: "Average orders this hour",
    },
  ]

  if (loading) {
    return <div className="p-8 text-center">Loading table stats...</div>
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
