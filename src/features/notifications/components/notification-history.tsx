"use client"

import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import { Eye, RotateCw } from "lucide-react"
import { useState } from "react"

export function NotificationHistory({ query }: { query: string }) {
  // In a real application, this data would come from the database
  const [notifications] = useState([
    {
      id: "1",
      type: "confirmacion",
      recipient: "maria.garcia@ejemplo.com",
      subject: "Reservation Confirmation - RES-001",
      sentAt: "17/05/2025 14:30",
      status: "sent",
    },
    {
      id: "2",
      type: "modificacion",
      recipient: "juan.perez@ejemplo.com",
      subject: "Reservation Modification - RES-002",
      sentAt: "16/05/2025 18:45",
      status: "sent",
    },
    {
      id: "3",
      type: "cancelacion",
      recipient: "ana.rodriguez@ejemplo.com",
      subject: "Reservation Cancellation - RES-003",
      sentAt: "15/05/2025 10:15",
      status: "error",
    },
    {
      id: "4",
      type: "confirmacion",
      recipient: "carlos.lopez@ejemplo.com",
      subject: "Reservation Confirmation - RES-004",
      sentAt: "14/05/2025 20:10",
      status: "sent",
    },
    {
      id: "5",
      type: "recordatorio",
      recipient: "laura.martinez@ejemplo.com",
      subject: "Reservation Reminder - RES-005",
      sentAt: "13/05/2025 09:30",
      status: "sent",
    },
  ])

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "confirmacion":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Confirmation
          </Badge>
        )
      case "modificacion":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Modification
          </Badge>
        )
      case "cancelacion":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancellation
          </Badge>
        )
      case "recordatorio":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Reminder
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
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Sent
          </Badge>
        )
      case "error":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
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
            <TableHead>Type</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Sent Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
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
                        <span className="sr-only">View</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Email Details</DialogTitle>
                        <DialogDescription>
                          Email sent to {notification.recipient} on{" "}
                          {notification.sentAt}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="border rounded-md p-4 mt-4">
                        <p className="mb-4">Dear customer,</p>
                        <p className="mb-4">
                          {notification.type === "confirmacion" &&
                            "Your reservation has been confirmed successfully."}
                          {notification.type === "modificacion" &&
                            "Your reservation has been modified as requested."}
                          {notification.type === "cancelacion" &&
                            "Your reservation has been cancelled as requested."}
                          {notification.type === "recordatorio" &&
                            "This is a reminder of your upcoming reservation at our restaurant."}
                        </p>
                        <p className="mb-4">Reservation details:</p>
                        <ul className="list-disc pl-5 mb-4">
                          <li>Date: 18/05/2025</li>
                          <li>Time: 20:30</li>
                          <li>Number of people: 4</li>
                          <li>Table: 7</li>
                        </ul>
                        <p>Thank you for choosing our restaurant.</p>
                        <p className="mt-4">Best regards,</p>
                        <p>The Restaurant Team</p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {notification.status === "error" && (
                    <Button variant="ghost" size="icon">
                      <RotateCw className="h-4 w-4" />
                      <span className="sr-only">Retry</span>
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
