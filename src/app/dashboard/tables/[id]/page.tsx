"use client"

import type React from "react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  getTable,
  updateTable,
} from "@/features/tables/services/tables.service"
import type { Table, UpdateTableDTO, TableLocation } from "@/types/app"

export default function EditTablePage() {
  const params = useParams()
  const router = useRouter()
  const tableId = params.id

  const [table, setTable] = useState<Table | null>(null)
  const [formData, setFormData] = useState<UpdateTableDTO>({
    capacity: table?.capacity,
    location: table?.location,
  })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({
    capacity: "",
    location: "",
  })

  useEffect(() => {
    const fetchTable = async () => {
      setLoading(true)
      const t = await getTable(Number(tableId))
      setTable(t)
      if (t) {
        setFormData({
          capacity: t.capacity,
          location: t.location,
        })
      }
      setLoading(false)
    }
    fetchTable()
  }, [tableId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }))

    // Limpiar errores al editar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: TableLocation) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar errores al editar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { capacity: "", location: "" }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required"
      valid = false
    }

    if (!formData.location) {
      newErrors.location = "Location is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      await updateTable(Number(tableId), formData)
      router.push("/dashboard/tables")
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading table data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/tables">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          Edit table {tableId}
        </h1>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Table Information</CardTitle>
            <CardDescription>Update the table information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (people) *</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                max="20"
                value={formData.capacity}
                onChange={handleChange}
              />
              {errors.capacity && (
                <p className="text-sm text-red-500">{errors.capacity}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select
                value={formData.location}
                onValueChange={(value: TableLocation) =>
                  handleSelectChange("location", value)
                }
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="window">Window</SelectItem>
                  <SelectItem value="terrace">Terrace</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="vip room">VIP Room</SelectItem>
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/dashboard/tables")}
            >
              Cancel
            </Button>
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
