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

    // En una aplicación real, aquí se validarían los datos y se enviarían al servidor
    console.log("Datos actualizados de la reserva:", formData)

    // Redirigir a la lista de reservas
    router.push("/reservas")
  }

  const handleCancel = () => {
    // En una aplicación real, aquí se cancelaría la reserva
    console.log("Cancelando reserva:", reservationId)

    // Redirigir a la lista de reservas
    router.push("/reservas")
  }

  const handleSendConfirmation = () => {
    // En una aplicación real, aquí se enviaría el correo de confirmación
    console.log("Enviando confirmación para la reserva:", reservationId)

    // Mostrar mensaje de éxito
    alert("Correo de confirmación enviado correctamente")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/reservations">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Editar Reserva {reservationId}</h1>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información de la Reserva</CardTitle>
            <CardDescription>Actualice los datos de la reserva.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cliente *</Label>
              <CustomerSelector />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha *</Label>
                <DatePicker />
              </div>

              <div className="space-y-2">
                <Label>Hora *</Label>
                <TimePicker />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="people">Número de personas *</Label>
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
              <Label>Mesa *</Label>
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
                    <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. La reserva será cancelada y la mesa quedará disponible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Volver</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel} className="bg-red-600">
                      Cancelar Reserva
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button variant="outline" type="button" onClick={handleSendConfirmation}>
                <Mail className="mr-2 h-4 w-4" />
                Enviar Confirmación
              </Button>
            </div>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
