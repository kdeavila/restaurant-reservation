"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import { Button } from "@/ui/button"
import { Badge } from "@/ui/badge"
import { Eye, RotateCw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"

export function NotificationHistory() {
  // En una aplicación real, estos datos vendrían de la base de datos
  const [notifications] = useState([
    {
      id: "1",
      type: "confirmacion",
      recipient: "maria.garcia@ejemplo.com",
      subject: "Confirmación de Reserva - RES-001",
      sentAt: "17/05/2025 14:30",
      status: "enviado",
    },
    {
      id: "2",
      type: "modificacion",
      recipient: "juan.perez@ejemplo.com",
      subject: "Modificación de Reserva - RES-002",
      sentAt: "16/05/2025 18:45",
      status: "enviado",
    },
    {
      id: "3",
      type: "cancelacion",
      recipient: "ana.rodriguez@ejemplo.com",
      subject: "Cancelación de Reserva - RES-003",
      sentAt: "15/05/2025 10:15",
      status: "error",
    },
    {
      id: "4",
      type: "confirmacion",
      recipient: "carlos.lopez@ejemplo.com",
      subject: "Confirmación de Reserva - RES-004",
      sentAt: "14/05/2025 20:10",
      status: "enviado",
    },
    {
      id: "5",
      type: "recordatorio",
      recipient: "laura.martinez@ejemplo.com",
      subject: "Recordatorio de Reserva - RES-005",
      sentAt: "13/05/2025 09:30",
      status: "enviado",
    },
  ])

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "confirmacion":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Confirmación
          </Badge>
        )
      case "modificacion":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Modificación
          </Badge>
        )
      case "cancelacion":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelación
          </Badge>
        )
      case "recordatorio":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Recordatorio
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enviado":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Enviado
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Error
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
            <TableHead>ID</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Destinatario</TableHead>
            <TableHead>Asunto</TableHead>
            <TableHead>Fecha de Envío</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell className="font-medium">{notification.id}</TableCell>
              <TableCell>{getTypeBadge(notification.type)}</TableCell>
              <TableCell>{notification.recipient}</TableCell>
              <TableCell>{notification.subject}</TableCell>
              <TableCell>{notification.sentAt}</TableCell>
              <TableCell>{getStatusBadge(notification.status)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{notification.subject}</DialogTitle>
                        <DialogDescription>
                          Enviado a {notification.recipient} el {notification.sentAt}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="border rounded-md p-4 mt-4">
                        <p className="mb-4">Estimado cliente,</p>
                        <p className="mb-4">
                          {notification.type === "confirmacion" && "Su reserva ha sido confirmada con éxito."}
                          {notification.type === "modificacion" && "Su reserva ha sido modificada según lo solicitado."}
                          {notification.type === "cancelacion" && "Su reserva ha sido cancelada según lo solicitado."}
                          {notification.type === "recordatorio" &&
                            "Le recordamos su próxima reserva en nuestro restaurante."}
                        </p>
                        <p className="mb-4">Detalles de la reserva:</p>
                        <ul className="list-disc pl-5 mb-4">
                          <li>Fecha: 18/05/2025</li>
                          <li>Hora: 20:30</li>
                          <li>Número de personas: 4</li>
                          <li>Mesa: 7</li>
                        </ul>
                        <p>Gracias por elegir nuestro restaurante.</p>
                        <p className="mt-4">Atentamente,</p>
                        <p>El equipo del Restaurante</p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {notification.status === "error" && (
                    <Button variant="ghost" size="icon">
                      <RotateCw className="h-4 w-4" />
                      <span className="sr-only">Reintentar</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
