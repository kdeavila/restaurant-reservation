"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { ScrollArea } from "@/ui/scroll-area"
import * as React from "react"
import { useEffect, useState } from "react"
import { getTables } from "@/features/tables/services/tables.service"
import type { Table } from "@/types/app"

export function TableSelector({
  value,
  onChange,
}: {
  value: string | null
  onChange: (val: string) => void
}) {
  const [selectedTable, setSelectedTable] = useState<string | null>(
    value || null
  )
  const [tables, setTables] = useState<Table[]>([])

  useEffect(() => {
    const fetchTables = async () => {
      const apiTables = await getTables()
      setTables(apiTables)
    }
    fetchTables()
  }, [])

  useEffect(() => {
    setSelectedTable(value || null)
  }, [value])

  const handleSelect = (id: number) => {
    setSelectedTable(String(id))
    onChange(String(id))
  }

  return (
    <ScrollArea className="h-[200px] border rounded-md p-4">
      <div className="grid grid-cols-5 gap-2">
        {tables.map((table) => (
          <Button
            key={table.id_table}
            variant={
              selectedTable === String(table.id_table) ? "default" : "outline"
            }
            className={cn(
              "h-20 flex flex-col items-center justify-center",
              table.status === "occupied" && "opacity-50 cursor-not-allowed"
            )}
            disabled={table.status === "occupied"}
            onClick={() => handleSelect(table.id_table)}
          >
            <span className="text-sm font-medium">Table {table.id_table}</span>
            <span className="text-xs">{table.capacity} people</span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
