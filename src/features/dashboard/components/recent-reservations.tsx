"use client";

import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Badge } from "@/ui/badge";

export function RecentReservations() {
	// En una aplicación real, estos datos vendrían de la base de datos
	const reservations = [
		{
			id: "RES-001",
			customer: "María García",
			initials: "MG",
			date: "Today",
			time: "19:00",
			people: 4,
			table: 7,
			status: "confirmed",
		},
		{
			id: "RES-002",
			customer: "Juan Pérez",
			initials: "JP",
			date: "Today",
			time: "20:30",
			people: 2,
			table: 3,
			status: "confirmed",
		},
		{
			id: "RES-003",
			customer: "Ana Rodríguez",
			initials: "AR",
			date: "Tomorrow",
			time: "13:00",
			people: 6,
			table: 12,
			status: "pending",
		},
		{
			id: "RES-004",
			customer: "Carlos López",
			initials: "CL",
			date: "Tomorrow",
			time: "14:30",
			people: 3,
			table: 5,
			status: "confirmed",
		},
	];

	return (
		<div className="space-y-4">
			{reservations.map((reservation) => (
				<div key={reservation.id} className="flex items-center gap-4">
					<Avatar>
						<AvatarFallback>{reservation.initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1 space-y-1">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium">{reservation.customer}</p>
							<Badge
								variant={
									reservation.status === "confirmed" ? "default" : "outline"
								}
							>
								{reservation.status}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground">
							{reservation.date} - {reservation.time} - {reservation.people}{" "}
							people - Table {reservation.table}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
