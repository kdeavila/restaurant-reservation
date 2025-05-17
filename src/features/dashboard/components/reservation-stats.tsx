"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { CalendarDays, Users, Clock, CheckCircle } from "lucide-react";

export function ReservationStats() {
  // En una aplicación real, estos datos vendrían de la base de datos
  const stats = [
    {
      title: "Reservas Hoy",
      value: "12",
      icon: CalendarDays,
      description: "3 pendientes",
    },
    {
      title: "Clientes Registrados",
      value: "245",
      icon: Users,
      description: "+5 esta semana",
    },
    {
      title: "Próxima Reserva",
      value: "15:30",
      icon: Clock,
      description: "Mesa 4 - 3 personas",
    },
    {
      title: "Mesas Disponibles",
      value: "8/15",
      icon: CheckCircle,
      description: "53% disponibilidad",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
