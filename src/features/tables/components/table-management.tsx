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
import { Calendar, Edit, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  customersAdapter,
  getTables,
  deleteTable,
} from "../services/tables.service"
import { toast } from "@/hooks/use-toast"
import type { TableManagementData } from "@/types/app"
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

export function TableManagement({ query }: { query: string }) {
  const [tables, setTables] = useState<TableManagementData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tableToDelete, setTableToDelete] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchTables = async () => {
    try {
      setLoading(true)
      const apiTables = await getTables()
      const mappedTables = customersAdapter(apiTables)
      setTables(mappedTables)
    } catch (err) {
      setError("Error loading tables")
    } finally {
      setLoading(false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTables()
  }, [])

  const filteredTables =
    query.length > 0
      ? tables.filter((table) =>
          table.name.toLowerCase().includes(query.toLowerCase())
        )
      : tables

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Available
          </Badge>
        )
      case "occupied":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Occupied
          </Badge>
        )
      case "reserved":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Reserved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleDelete = (id: number) => {
    setTableToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!tableToDelete) return
    try {
      setIsDeleting(true)
      await deleteTable(tableToDelete)
      toast({
        title: "Table deleted",
        description: "The table has been deleted successfully",
      })
      await fetchTables()
    } catch (error) {
      let errorMessage = "Error deleting table"
      if (error instanceof Error) errorMessage = error.message
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setTableToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="border rounded-md p-8 text-center">Loading tables...</div>
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
            <TableHead>Table</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTables.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No tables found
              </TableCell>
            </TableRow>
          ) : (
            filteredTables.map((table) => (
              <TableRow key={table.id}>
                <TableCell className="font-medium">Table {table.id}</TableCell>
                <TableCell>{table.capacity} people</TableCell>
                <TableCell>
                  {table.location.charAt(0).toUpperCase() +
                    table.location.slice(1)}
                </TableCell>
                <TableCell>{getStatusBadge(table.status)}</TableCell>
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
                          href={`/dashboard/tables/${table.id}`}
                          className="flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                      {table.status === "available" && (
                        <DropdownMenuItem>
                          <Link
                            href={`/dashboard/reservations/new?table=${table.id}`}
                            className="flex items-center"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Reserve</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {table.status === "available" && (
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleDelete(table.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the table. The table will no longer be
              visible in the system, but its data will be kept in the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={(e) => {
                e.preventDefault()
                confirmDelete()
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
