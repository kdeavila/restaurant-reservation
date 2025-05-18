"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { CalendarDays, CheckCircle, Clock, Users } from "lucide-react";

export function ReservationStats() {
	// En una aplicación real, estos datos vendrían de la base de datos
	const stats = [
		{
			title: "Reservations Today",
			value: "12",
			icon: CalendarDays,
			description: "3 pending",
		},
		{
			title: "Registered Clients",
			value: "245",
			icon: Users,
			description: "+5 this week",
		},
		{
			title: "Next Reservation",
			value: "15:30",
			icon: Clock,
			description: "Table 4 - 3 people",
		},
		{
			title: "Available Tables",
			value: "8/15",
			icon: CheckCircle,
			description: "53% availability",
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
