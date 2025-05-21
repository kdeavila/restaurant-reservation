"use client"

import {
  getCustomer,
  getCustomerHistory,
} from "@/features/clients/services/client-service"
import type { Customer, Reservation } from "@/types/app"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CustomerHistoryPage() {
  const params = useParams()
  const customerId = params.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [history, setHistory] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true)
        const customer = await getCustomer(Number(customerId))
        if (customer instanceof Error || !customer) {
          throw new Error("Cliente no encontrado")
        }
        const customerHistory = await getCustomerHistory(Number(customerId))
        setCustomer(customer)
        setHistory(customerHistory)
      } catch (err) {
        console.error("Error fetching customer data:", err)
        setError("Failed to load customer data")
      } finally {
        setLoading(false)
      }
    }

    fetchCustomerData()
  }, [customerId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Cargando datos del cliente...</p>
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error || "Error fetching data"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          Historial del Cliente
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cliente: {customer.name}</CardTitle>
          <CardDescription>
            Email: {customer.email} | Teléfono: {customer.phone}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Este cliente no tiene historial de actividades
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length > 0 ? (
                  history.map((entry) => (
                    <TableRow key={entry.customer_id}>
                      <TableCell className="font-medium">
                        {entry.customer_id}
                      </TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.time}</TableCell>
                      <TableCell>
                        {entry.status && getStatusBadge(entry.status)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="text-md mt-8 font-bold">
                    <TableCell colSpan={4} className="text-center py-8">
                      This customer has no history.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
