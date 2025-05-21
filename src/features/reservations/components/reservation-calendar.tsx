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
import { useEffect, useState } from "react"
import {
  getReservations,
  reservationsAdapter,
  deleteReservation,
} from "@/features/reservations/services/reservations.service"
import { toast } from "@/hooks/use-toast"
import type { ReservationTableData } from "@/types/app"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/alert-dialog"

interface Props {
  date: string
  query: string
}

export function ReservationCalendar({ date, query }: Props) {
  const [reservations, setReservations] = useState<ReservationTableData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reservationToDelete, setReservationToDelete] = useState<number | null>(
    null
  )
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true)
        const apiReservations = await getReservations()
        const mappedReservations = reservationsAdapter(apiReservations)
        setReservations(mappedReservations)
      } catch (err) {
        setError("Error loading reservations")
      } finally {
        setLoading(false)
      }
    }
    fetchReservations()
  }, [])
  console.log(reservations)

  const handleDelete = (id: number) => {
    setReservationToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!reservationToDelete) return
    try {
      setIsDeleting(true)
      await deleteReservation(reservationToDelete)
      toast({
        title: "Reservation deleted",
        description: "The reservation has been deleted successfully",
      })
      // Refresh reservations
      const apiReservations = await getReservations()
      const mappedReservations = reservationsAdapter(apiReservations)
      setReservations(mappedReservations)
    } catch (error) {
      let errorMessage = "Error deleting reservation"
      if (error instanceof Error) errorMessage = error.message
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setReservationToDelete(null)
    }
  }

  const filteredReservations = reservations
    .filter(
      (reservation) =>
        !query ||
        reservation.client
          .toString()
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    )
    .sort((a, b) => {
      // Confirmed first, then cancelled
      if (a.status === b.status) return 0
      if (a.status === "confirmed") return -1
      return 1
    })

  if (loading) {
    return <div className="p-8 text-center">Loading reservations...</div>
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }
  if (filteredReservations.length === 0) {
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
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{reservation.id}</TableCell>
              <TableCell>{reservation.client}</TableCell>
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
                  {reservation.status === "confirmed" && (
                    <>
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
                            href={`/dashboard/reservations/${reservation.id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleDelete(reservation.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span>Cancel</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </>
                  )}
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the reservation. The reservation will no
              longer be visible in the system, but its data will be kept in the
              database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={(e) => {
                e.preventDefault()
                confirmDelete()
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
