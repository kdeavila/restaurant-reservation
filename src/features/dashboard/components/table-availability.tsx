"use client"

export function TableAvailability() {
  // En una aplicación real, estos datos vendrían de la base de datos
  const tables = [
    { id: 1, capacity: 2, status: "available" },
    { id: 2, capacity: 4, status: "occupied" },
    { id: 3, capacity: 2, status: "available" },
    { id: 4, capacity: 6, status: "reserved" },
    { id: 5, capacity: 4, status: "available" },
    { id: 6, capacity: 8, status: "occupied" },
    { id: 7, capacity: 4, status: "available" },
    { id: 8, capacity: 2, status: "available" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {tables.map((table) => (
        <div key={table.id} className="border rounded-md p-2 flex flex-col items-center justify-center text-center">
          <div className="text-sm font-medium">Table {table.id}</div>
          <div className="text-xs text-muted-foreground">{table.capacity} people</div>
          <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(table.status)}`} />
        </div>
      ))}
    </div>
  )
}
