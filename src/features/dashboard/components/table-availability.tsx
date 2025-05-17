"use client"

export function TableAvailability() {
  // En una aplicación real, estos datos vendrían de la base de datos
  const tables = [
    { id: 1, capacity: 2, status: "disponible" },
    { id: 2, capacity: 4, status: "ocupada" },
    { id: 3, capacity: 2, status: "disponible" },
    { id: 4, capacity: 6, status: "reservada" },
    { id: 5, capacity: 4, status: "disponible" },
    { id: 6, capacity: 8, status: "ocupada" },
    { id: 7, capacity: 4, status: "disponible" },
    { id: 8, capacity: 2, status: "disponible" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponible":
        return "bg-green-500"
      case "ocupada":
        return "bg-red-500"
      case "reservada":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {tables.map((table) => (
        <div key={table.id} className="border rounded-md p-2 flex flex-col items-center justify-center text-center">
          <div className="text-sm font-medium">Mesa {table.id}</div>
          <div className="text-xs text-muted-foreground">{table.capacity} personas</div>
          <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(table.status)}`} />
        </div>
      ))}
    </div>
  )
}
