"use client"
import { useEffect, useState } from "react"
import { getTables } from "@/features/tables/services/tables.service"
import type { Table } from "@/types/app"

export function TableAvailability() {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading tables...</div>
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {tables.map((table) => (
        <div
          key={table.id_table}
          className="border rounded-md p-2 flex flex-col items-center justify-center text-center"
        >
          <div className="text-sm font-medium">Table {table.id_table}</div>
          <div className="text-xs text-muted-foreground">
            {table.capacity} people
          </div>
          <div
            className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(
              table.status
            )}`}
          />
        </div>
      ))}
    </div>
  )
}
