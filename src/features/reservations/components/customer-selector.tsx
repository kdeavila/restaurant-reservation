"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import { Check, ChevronsUpDown, UserPlus } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { useEffect } from "react"
import { getCustomers } from "@/features/clients/services/client-service"

export function CustomerSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [customers, setCustomers] = React.useState<
    { value: string; label: string }[]
  >([])

  useEffect(() => {
    const fetchCustomers = async () => {
      const users = await getCustomers()
      setCustomers(
        users.map((user: import("@/types/app").Customer) => ({
          value: String(user.id_customer),
          label: user.name,
        }))
      )
    }
    fetchCustomers()
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? customers.find((customer) => customer.value === value)?.label
            : "Select client..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search client..." />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center justify-center py-4">
                <p className="text-sm text-muted-foreground">
                  No clients found.
                </p>
                <Link href="/dashboard/clients/new">
                  <Button variant="outline" className="mt-2">
                    <UserPlus className="mr-2 h-4 w-4" />
                    New Client
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
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === customer.value ? "opacity-100" : "opacity-0"
                    )}
                  />
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
