"use client"

import * as React from "react"
import { Check, ChevronsUpDown, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import Link from "next/link"

export function CustomerSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  // En una aplicación real, estos datos vendrían de la base de datos
  const customers = [
    {
      value: "maria-garcia",
      label: "María García",
    },
    {
      value: "juan-perez",
      label: "Juan Pérez",
    },
    {
      value: "ana-rodriguez",
      label: "Ana Rodríguez",
    },
    {
      value: "carlos-lopez",
      label: "Carlos López",
    },
    {
      value: "laura-martinez",
      label: "Laura Martínez",
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-expanded={open} className="w-full justify-between">
          {value ? customers.find((customer) => customer.value === value)?.label : "Seleccionar cliente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cliente..." />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center justify-center py-4">
                <p className="text-sm text-muted-foreground">No se encontraron clientes.</p>
                <Link href="/dashboard/clients/new">
                  <Button variant="outline" className="mt-2">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Nuevo Cliente
                  </Button>
                </Link>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.value}
                  value={customer.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === customer.value ? "opacity-100" : "opacity-0")} />
                  {customer.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
