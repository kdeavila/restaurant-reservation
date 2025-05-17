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
						<CardTitle>Recent Reservations</CardTitle>
						<CardDescription>
							Recent reservations made in the system
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RecentReservations />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Tables Availability</CardTitle>
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
