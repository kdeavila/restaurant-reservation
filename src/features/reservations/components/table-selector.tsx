"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
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
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true)
      const apiTables = await getTables()
      setTables(apiTables)
      setLoading(false)
    }
    fetchTables()
  }, [])

  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a table" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem value="loading" disabled>
            Loading tables...
          </SelectItem>
        ) : (
          tables
            .filter(table => table.status !== "occupied")
            .map((table) => (
              <SelectItem key={table.id_table} value={String(table.id_table)}>
                Table {table.id_table} ({table.capacity} people)
              </SelectItem>
            ))
        )}
        {!loading && tables.filter(table => table.status !== "occupied").length === 0 && (
          <SelectItem value="none" disabled>
            No available tables
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
