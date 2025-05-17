"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { Badge } from "@/ui/badge"
import { MoreHorizontal, Edit, Trash, Mail } from "lucide-react"
import Link from "next/link"

export function ReservationCalendar() {
  // In a real application, this data would come from the database
  const [reservations] = useState([
    {
      id: "RES-001",
      customer: "Maria Garcia",
      date: "17/05/2025",
      time: "19:00",
      people: 4,
      table: 7,
      status: "confirmed",
    },
    {
      id: "RES-002",
      customer: "Juan Perez",
      date: "17/05/2025",
      time: "20:30",
      people: 2,
      table: 3,
      status: "confirmed",
    },
    {
      id: "RES-003",
      customer: "Ana Rodriguez",
      date: "18/05/2025",
      time: "13:00",
      people: 6,
      table: 12,
      status: "pending",
    },
    {
      id: "RES-004",
      customer: "Carlos Lopez",
      date: "18/05/2025",
      time: "14:30",
      people: 3,
      table: 5,
      status: "confirmed",
    },
    {
      id: "RES-005",
      customer: "Laura Martinez",
      date: "19/05/2025",
      time: "21:00",
      people: 2,
      table: 8,
      status: "confirmed",
    },
  ])

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
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{reservation.id}</TableCell>
              <TableCell>{reservation.customer}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time}</TableCell>
              <TableCell>{reservation.people}</TableCell>
              <TableCell>{reservation.table}</TableCell>
              <TableCell>
                <Badge variant={reservation.status === "confirmed" ? "default" : "outline"}>
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
                      <Link href={`/reservations/${reservation.id}`} className="flex items-center">
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
