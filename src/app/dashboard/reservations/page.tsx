import { DatePicker } from "@/features/reservations/components/date-picker"
import { ReservationCalendar } from "@/features/reservations/components/reservation-calendar"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams?: { date?: string }
}) {
  const date = searchParams?.date || new Date().toISOString().split("T")[0]
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
        <Input placeholder="Search by client..." className="max-w-sm" />
        <Button variant="outline">Search</Button>
      </div>

      <ReservationCalendar date={date} />
    </div>
  )
}
