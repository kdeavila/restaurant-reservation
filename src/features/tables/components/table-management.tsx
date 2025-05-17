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
  // En una aplicación real, estos datos vendrían de la base de datos
  const [tables] = useState([
    { id: "1", capacity: 2, location: "Ventana", status: "disponible" },
    { id: "2", capacity: 4, location: "Terraza", status: "ocupada" },
    { id: "3", capacity: 2, location: "Interior", status: "disponible" },
    { id: "4", capacity: 6, location: "Terraza", status: "reservada" },
    { id: "5", capacity: 4, location: "Interior", status: "disponible" },
    { id: "6", capacity: 8, location: "Salón VIP", status: "ocupada" },
    { id: "7", capacity: 4, location: "Ventana", status: "disponible" },
    { id: "8", capacity: 2, location: "Interior", status: "disponible" },
    { id: "9", capacity: 10, location: "Salón VIP", status: "disponible" },
    { id: "10", capacity: 4, location: "Terraza", status: "reservada" },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponible":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Disponible
          </Badge>
        )
      case "ocupada":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Ocupada
          </Badge>
        )
      case "reservada":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Reservada
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
            <TableHead>Mesa</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table.id}>
              <TableCell className="font-medium">Mesa {table.id}</TableCell>
              <TableCell>{table.capacity} personas</TableCell>
              <TableCell>{table.location}</TableCell>
              <TableCell>{getStatusBadge(table.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/dashboard/tables/${table.id}`} className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/reservations/new?table=${table.id}`} className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Reservar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
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
