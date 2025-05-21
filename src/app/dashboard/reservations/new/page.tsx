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
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { createReservation } from "@/features/reservations/services/reservations.service"
import { toast } from "@/hooks/use-toast"

export default function NewReservationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedTable = searchParams.get("table") || ""
  
  const [formData, setFormData] = useState({
    customer: "",
    date: new Date(),
    time: "",
    people: "2",
    table: preselectedTable,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      await createReservation({
        customer_id: Number(formData.customer),
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
        description: "Reservation created successfully.",
      })
      router.push("/dashboard/reservations")
    } catch (error) {
      let errorMessage = "Error creating the reservation"
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/reservations">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">New Reservation</h1>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardHeader>
            <CardTitle>Reservation Information</CardTitle>
            <CardDescription>
              Complete the form to create a new reservation.
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
              {isSubmitting ? "Creating..." : "Save Reservation"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
