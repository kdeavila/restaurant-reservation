import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { ReservationCalendar } from "@/features/reservations/components/reservation-calendar"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { DatePicker } from "@/features/reservations/components/date-picker"

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
        <Link href="/dashboard/reservations/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Reserva
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <DatePicker />
        <Input placeholder="Buscar por cliente..." className="max-w-sm" />
        <Button variant="outline">Buscar</Button>
      </div>

      <ReservationCalendar />
    </div>
  )
}
