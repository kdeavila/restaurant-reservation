"use client"
import { DatePicker } from "@/features/reservations/components/date-picker"
import { ReservationCalendar } from "@/features/reservations/components/reservation-calendar"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function ReservationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const date = searchParams?.get("date") || new Date().toISOString().split("T")[0]
  const clientQuery = searchParams?.get("client") || ""
  
  const [currentQuery, setCurrentQuery] = useState(clientQuery)
  
  const updateUrlWithClient = (query: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set("client", query)
    } else {
      params.delete("client")
    }
    router.push(`?${params.toString()}`)
  }
  
  const handleSearch = (query: string) => {
    setCurrentQuery(query)
    updateUrlWithClient(query)
  }
  
  // Handle the initial URL parameters
  useEffect(() => {
    setCurrentQuery(clientQuery)
  }, [clientQuery])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <Link href="/dashboard/reservations/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Reservation
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <DatePicker />
        <Input
          placeholder="Search by client..."
          className="max-w-sm"
          value={currentQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <ReservationCalendar query={currentQuery} date={date} />
    </div>
  )
}
