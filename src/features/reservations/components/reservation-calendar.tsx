"use client"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import { Edit, Mail, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"

interface Props {
  date: string
  query: string
}

export function ReservationCalendar({ date, query }: Props) {
  const [reservations, setReservations] = useState([])
  const filteredReservations = query ?  : query
  useEffect(() => {
    
  }, []);
  if (filteredReservations instanceof Error) {
    return (
      <div className="text-md">
        There are no reservations for this date ({date}).
      </div>
    )
  }
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>People</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{reservation.id}</TableCell>
              <TableCell>{reservation.customer}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time}</TableCell>
              <TableCell>{reservation.people}</TableCell>
              <TableCell>{reservation.table}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    reservation.status === "confirmed" ? "default" : "outline"
                  }
                >
                  {reservation.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href={`/reservations/${reservation.id}`}
                        className="flex items-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Send confirmation</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Cancel</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
