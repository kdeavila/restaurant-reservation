"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/ui/card";
import { ReservationStats } from "./components/reservation-stats";
import { RecentReservations } from "./components/recent-reservations";
import { TableAvailability } from "./components/table-availability";

export default function Dashboard() {
	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
			</div>

			<ReservationStats />

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Reservas Recientes</CardTitle>
						<CardDescription>
							Las últimas reservas realizadas en el sistema
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RecentReservations />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Disponibilidad de Mesas</CardTitle>
						<CardDescription>
							Current status of the restaurant's tables
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TableAvailability />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
