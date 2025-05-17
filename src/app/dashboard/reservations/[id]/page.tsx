"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { ArrowLeft, Save, Trash, Mail } from "lucide-react"
import Link from "next/link"
import { DatePicker } from "@/features/reservations/components/date-picker"
import { TimePicker } from "@/features/reservations/components/time-picker"
import { CustomerSelector } from "@/features/reservations/components/customer-selector"
import { TableSelector } from "@/features/reservations/components/table-selector"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog"

export default function EditReservationPage() {
  const params = useParams()
  const router = useRouter()
  const reservationId = params.id

  // En una aplicación real, estos datos vendrían de la base de datos
  const [formData, setFormData] = useState({
    customer: "María García",
    date: new Date(),
    time: "19:00",
    people: "4",
    table: "7",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, data would be validated and sent to the server
    console.log("Updated reservation data:", formData)

    // Redirect to reservations list
    router.push("/dashboard/reservations")
  }

  const handleCancel = () => {
    // In a real app, the reservation would be cancelled here
    console.log("Cancelling reservation:", reservationId)

    // Redirect to reservations list
    router.push("/dashboard/reservations")
  }

  const handleSendConfirmation = () => {
    // In a real app, confirmation email would be sent here
    console.log("Sending confirmation for reservation:", reservationId)

    // Show success message
    alert("Confirmation email sent successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/reservations">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Reservation {reservationId}</h1>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Reservation Information</CardTitle>
            <CardDescription>Update the reservation details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Client *</Label>
              <CustomerSelector />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <DatePicker />
              </div>

              <div className="space-y-2">
                <Label>Time *</Label>
                <TimePicker />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="people">Number of people *</Label>
              <Input
                id="people"
                name="people"
                type="number"
                min="1"
                max="20"
                value={formData.people}
                onChange={(e) => setFormData({ ...formData, people: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Table *</Label>
              <TableSelector />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Cancelar Reserva
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The reservation will be cancelled and the table will become available.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Back</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel} className="bg-red-600">
                      Cancel Reservation
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button variant="outline" type="button" onClick={handleSendConfirmation}>
                <Mail className="mr-2 h-4 w-4" />
                Send Confirmation
              </Button>
            </div>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
