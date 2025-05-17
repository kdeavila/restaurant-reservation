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
import { MoreHorizontal, Edit, Trash, History } from "lucide-react"
import Link from "next/link"

export function CustomerTable() {
  // En una aplicación real, estos datos vendrían de la base de datos
  const [customers] = useState([
    {
      id: "1",
      name: "María García",
      email: "maria.garcia@ejemplo.com",
      phone: "612345678",
      reservations: 5,
    },
    {
      id: "2",
      name: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      phone: "623456789",
      reservations: 3,
    },
    {
      id: "3",
      name: "Ana Rodríguez",
      email: "ana.rodriguez@ejemplo.com",
      phone: "634567890",
      reservations: 8,
    },
    {
      id: "4",
      name: "Carlos López",
      email: "carlos.lopez@ejemplo.com",
      phone: "645678901",
      reservations: 2,
    },
    {
      id: "5",
      name: "Laura Martínez",
      email: "laura.martinez@ejemplo.com",
      phone: "656789012",
      reservations: 0,
    },
  ])

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Reservas</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                {customer.reservations > 0 ? (
                  <Badge variant="secondary">{customer.reservations}</Badge>
                ) : (
                  <span className="text-muted-foreground">Ninguna</span>
                )}
              </TableCell>
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
                      <Link href={`/dashboard/clients/${customer.id}`} className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/clients/${customer.id}/historial`} className="flex items-center">
                        <History className="mr-2 h-4 w-4" />
                        <span>Historial</span>
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
