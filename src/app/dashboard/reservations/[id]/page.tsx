"use client"

import type React from "react"

import { CustomerSelector } from "@/features/reservations/components/customer-selector"
import { DatePicker } from "@/features/reservations/components/date-picker"
import { TableSelector } from "@/features/reservations/components/table-selector"
import { TimePicker } from "@/features/reservations/components/time-picker"
import { Button } from "@/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { ArrowLeft, Save, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  updateReservation,
  getReservation,
} from "@/features/reservations/services/reservations.service"
import { toast } from "@/hooks/use-toast"
import { useParams } from "next/navigation"

export default function EditReservationPage() {
  const router = useRouter()
  const params = useParams()
  const reservationId = Number(params.id)
  const [formData, setFormData] = useState({
    customer: "",
    date: new Date(),
    time: "",
    people: "2",
    table: "",
  })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true)
        const reservation = await getReservation(reservationId)
        
        if (!reservation) {
          setError("Reservation not found")
          return
        }
        
        setFormData({
          customer: String(reservation.Customer.id_customer),
          date: new Date(reservation.date),
          time: reservation.time,
          people: String(reservation.people),
          table: String(reservation.table_id),
        })
      } catch (err) {
        setError("Error loading reservation data")
        console.error("Error fetching reservation:", err)
      } finally {
        setLoading(false)
      }
    }
    
    if (reservationId) {
      fetchReservation()
    }
  }, [reservationId])

  const isFormValid = () => {
    return (
      formData.customer.trim() !== "" &&
      formData.time.trim() !== "" &&
      formData.people.trim() !== "" &&
      formData.table.trim() !== ""
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      toast({
        title: "Error",
        description: "Please complete all required fields.",
        variant: "destructive",
      })
      return
    }
    
    try {
      setIsSubmitting(true)
      await updateReservation(reservationId, {
        table_id: Number(formData.table),
        date:
          typeof formData.date === "string"
            ? formData.date
            : formData.date.toISOString().slice(0, 10),
        time: formData.time,
        people: Number(formData.people),
      })
      toast({
        title: "Success",
        description: "Reservation updated successfully.",
      })
      router.push("/dashboard/reservations")
    } catch (error) {
      let errorMessage = "Error updating the reservation"
      if (error instanceof Error) errorMessage = error.message
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading reservation...</div>
  }
  
  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
        <div className="mt-4">
          <Button variant="outline" onClick={() => router.push("/dashboard/reservations")}>
            Go back to reservations
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/reservations">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Reservation</h1>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardHeader>
            <CardTitle>Reservation Information</CardTitle>
            <CardDescription>
              Complete all required fields to update the reservation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Client *</Label>
              <CustomerSelector
                value={formData.customer}
                onChange={(val: string) =>
                  setFormData({ ...formData, customer: val })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <DatePicker
                  value={formData.date}
                  onChange={(val: Date) =>
                    setFormData({ ...formData, date: val })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Time *</Label>
                <TimePicker
                  value={formData.time}
                  onChange={(val: string) =>
                    setFormData({ ...formData, time: val })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="people">Number of people *</Label>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="people"
                  name="people"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.people}
                  onChange={(e) =>
                    setFormData({ ...formData, people: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Table *</Label>
              <TableSelector
                value={formData.table}
                onChange={(val: string) =>
                  setFormData({ ...formData, table: val })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/dashboard/reservations")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid() || isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Reservation"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
