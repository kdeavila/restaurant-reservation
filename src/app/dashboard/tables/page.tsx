"use client"
import { TableManagement } from "@/features/tables/components/table-management"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TablesPage() {
  const [currentQuery, setCurrentQuery] = useState("")

  const handleSearch = (query: string) => {
    setCurrentQuery(query)
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tables</h1>
        <Link href="/dashboard/tables/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Table
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search tables..."
          className="max-w-sm"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <TableManagement query={currentQuery} />
    </div>
  )
}
