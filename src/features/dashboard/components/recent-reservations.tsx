"use client";

import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { useEffect, useState } from "react";
import { getReservations, reservationsAdapter } from "@/features/reservations/services/reservations.service";
import type { ReservationTableData } from "@/types/app";

export function RecentReservations() {
	const [reservations, setReservations] = useState<ReservationTableData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				setLoading(true);
				const apiReservations = await getReservations();
				const mappedReservations = reservationsAdapter(apiReservations);
				
				// Sort by date and time, most recent first
				const sortedReservations = mappedReservations
					.filter(res => res.status === "confirmed")
					.sort((a, b) => {
						// Compare dates first
						const dateA = new Date(a.date);
						const dateB = new Date(b.date);
						
						if (dateA.getTime() !== dateB.getTime()) {
							return dateA.getTime() - dateB.getTime();
						}
						
						// If same date, compare times
						return a.time.localeCompare(b.time);
					})
					.slice(0, 4); // Only show the 4 most recent reservations
				
				setReservations(sortedReservations);
			} catch (err) {
				setError("Error loading reservations");
			} finally {
				setLoading(false);
			}
		};
		
		fetchReservations();
	}, []);

	if (loading) {
		return <div className="text-center py-4">Loading reservations...</div>;
	}

	if (error) {
		return <div className="text-center py-4 text-red-500">{error}</div>;
	}

	if (reservations.length === 0) {
		return <div className="text-center py-4">No upcoming reservations found</div>;
	}

	return (
		<div className="space-y-4">
			{reservations.map((reservation) => (
				<div key={reservation.id} className="flex items-center gap-4">
					<Avatar>
						<AvatarFallback>{reservation.client.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex-1 space-y-1">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium line-clamp-1">{reservation.client}</p>
							<Badge
								variant={
									reservation.status === "confirmed" ? "default" : "outline"
								}
							>
								{reservation.status}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground">
							{formatDate(reservation.date)} - {reservation.time} - {reservation.people}{" "}
							people - Table {reservation.table_id}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

function formatDate(dateString: string): string {
	const reservationDate = new Date(dateString);
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	
	today.setHours(0, 0, 0, 0);
	tomorrow.setHours(0, 0, 0, 0);
	reservationDate.setHours(0, 0, 0, 0);
	
	if (reservationDate.getTime() === today.getTime()) {
		return "Today";
	}
	
	if (reservationDate.getTime() === tomorrow.getTime()) {
		return "Tomorrow";
	}
	
	return reservationDate.toLocaleDateString();
}
