"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { Clock } from "lucide-react"

export function TimePicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (val: string) => void
}) {
  // Generate available times (from 12:00 to 22:00 every 30 minutes)
  const timeSlots = []
  for (let hour = 12; hour <= 22; hour++) {
    for (const minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeSlots.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Select time" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {timeSlots.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
