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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Edit, History, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllActiveUsers, mapUsersToCustomerData, softDeleteUser } from "../services/client-service"
import type { CustomerTableData } from "../services/client-service"

interface CustomerTableProps {
  searchQuery?: string;
}

export function CustomerTable({ searchQuery = "" }: CustomerTableProps) {
  const [customers, setCustomers] = useState<CustomerTableData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const users = await getAllActiveUsers()
      const mappedCustomers = mapUsersToCustomerData(users)
      setCustomers(mappedCustomers)
    } catch (err) {
      console.error("Error fetching customers:", err)
      setError("Error loading customer data")
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchCustomers()
  }, [])
  
  const handleDelete = (id: string, name: string) => {
    setCustomerToDelete(id)
    setDeleteDialogOpen(true)
  }
  
  const confirmDelete = async () => {
    if (!customerToDelete) return
    
    try {
      setIsDeleting(true)
      await softDeleteUser(customerToDelete)
      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado correctamente",
      })
      await fetchCustomers() // Refrescar la lista
    } catch (error) {
      let errorMessage = "Error al eliminar el cliente"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setCustomerToDelete(null)
    }
  }
  
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
    <>
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
                            className="flex items-center w-full"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href={`/dashboard/clients/${customer.id}/history`}
                            className="flex items-center w-full"
                          >
                            <History className="mr-2 h-4 w-4" />
                            <span>History</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleDelete(customer.id, customer.name)}
                        >
                          <div className="flex items-center w-full">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </div>
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
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el cliente. El cliente ya no será visible en el sistema, pero sus datos se conservarán en la base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
