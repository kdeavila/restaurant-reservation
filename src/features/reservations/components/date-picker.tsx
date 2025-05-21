"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import { format, parse } from "date-fns"
import { enUS } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"

export function DatePicker({
  value,
  onChange,
}: {
  value?: Date | null
  onChange?: (val: Date) => void
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dateParam = searchParams.get("date")

  const [date, setDate] = React.useState<Date>(() => {
    if (value) return value
    if (dateParam) {
      try {
        const parsedDate = parse(dateParam, "yyyy-MM-dd", new Date())
        if (Number.isNaN(parsedDate.getTime())) {
          return new Date()
        }
        return parsedDate
      } catch {
        return new Date()
      }
    }
    return new Date()
  })

  const updateUrlWithDate = React.useCallback(
    (newDate: Date) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("date", format(newDate, "yyyy-MM-dd"))
      router.push(`?${params.toString()}`)
    },
    [searchParams, router]
  )

  React.useEffect(() => {
    if (!dateParam) {
      updateUrlWithDate(date)
    }
  }, [date, dateParam, updateUrlWithDate])

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate || Number.isNaN(newDate.getTime())) return
    setDate(newDate)
    updateUrlWithDate(newDate)
    if (onChange) {
      onChange(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: enUS })
          ) : (
            <span>Select date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          locale={enUS}
        />
      </PopoverContent>
    </Popover>
  )
}
