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
import { MoreHorizontal, Edit, Trash, Calendar } from "lucide-react"
import Link from "next/link"

export function TableManagement() {
  // In a real application, this data would come from the database
  const [tables] = useState([
    { id: "1", capacity: 2, location: "Window", status: "available" },
    { id: "2", capacity: 4, location: "Terrace", status: "occupied" },
    { id: "3", capacity: 2, location: "Indoor", status: "available" },
    { id: "4", capacity: 6, location: "Terrace", status: "reserved" },
    { id: "5", capacity: 4, location: "Indoor", status: "available" },
    { id: "6", capacity: 8, location: "VIP Room", status: "occupied" },
    { id: "7", capacity: 4, location: "Window", status: "available" },
    { id: "8", capacity: 2, location: "Indoor", status: "available" },
    { id: "9", capacity: 10, location: "VIP Room", status: "available" },
    { id: "10", capacity: 4, location: "Terrace", status: "reserved" },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Available
          </Badge>
        )
      case "occupied":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Occupied
          </Badge>
        )
      case "reserved":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Reserved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Table</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table.id}>
              <TableCell className="font-medium">Table {table.id}</TableCell>
              <TableCell>{table.capacity} people</TableCell>
              <TableCell>{table.location}</TableCell>
              <TableCell>{getStatusBadge(table.status)}</TableCell>
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
                      <Link href={`/dashboard/tables/${table.id}`} className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/reservations/new?table=${table.id}`} className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Reserve</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
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
