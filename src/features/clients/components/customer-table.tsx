"use client"

import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import { Edit, History, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllUsers, mapUsersToCustomerData } from "../services/client-service"
import type { CustomerTableData } from "../services/client-service"

interface CustomerTableProps {
  searchQuery?: string;
}

export function CustomerTable({ searchQuery = "" }: CustomerTableProps) {
  const [customers, setCustomers] = useState<CustomerTableData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        const users = await getAllUsers()
        const mappedCustomers = mapUsersToCustomerData(users)
        setCustomers(mappedCustomers)
      } catch (err) {
        console.error("Error fetching customers:", err)
        setError("Error loading customer data")
      } finally {
        setLoading(false)
      }
    }
    
    fetchCustomers()
  }, [])
  
  const filteredCustomers =
    searchQuery.length > 0
      ? customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : customers

  if (loading) {
    return (
      <div className="border rounded-md p-8 text-center">
        Loading customers...
      </div>
    )
  }

  if (error) {
    return (
      <div className="border rounded-md p-8 text-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Reservations</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {customer.reservations > 0 ? (
                    <Badge variant="secondary">{customer.reservations}</Badge>
                  ) : (
                    <span className="text-muted-foreground">No reservations</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/clients/${customer.id}`}
                          className="flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/clients/${customer.id}/history`}
                          className="flex items-center"
                        >
                          <History className="mr-2 h-4 w-4" />
                          <span>History</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
