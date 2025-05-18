"use client";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/ui/table";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CustomerHistoryPage() {
	const params = useParams();
	const customerId = params.id;

	// En una aplicación real, estos datos vendrían de la base de datos
	const [customer] = useState({
		id: customerId,
		name: "María García",
		email: "maria.garcia@example.com",
		phone: "612345678",
	});

	const [reservations] = useState([
		{
			id: "RES-001",
			date: "15/04/2025",
			time: "20:30",
			people: 4,
			table: 7,
			status: "completed",
		},
		{
			id: "RES-002",
			date: "01/05/2025",
			time: "14:00",
			people: 2,
			table: 3,
			status: "completed",
		},
		{
			id: "RES-003",
			date: "17/05/2025",
			time: "19:00",
			people: 4,
			table: 7,
			status: "confirmed",
		},
		{
			id: "RES-004",
			date: "25/05/2025",
			time: "21:30",
			people: 6,
			table: 12,
			status: "pending",
		},
		{
			id: "RES-005",
			date: "10/04/2025",
			time: "13:30",
			people: 3,
			table: 5,
			status: "cancelled",
		},
	]);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "confirmed":
				return (
					<Badge
						variant="outline"
						className="bg-green-50 text-green-700 border-green-200"
					>
						Confirmed
					</Badge>
				);
			case "pending":
				return (
					<Badge
						variant="outline"
						className="bg-yellow-50 text-yellow-700 border-yellow-200"
					>
						Pending
					</Badge>
				);
			case "completed":
				return (
					<Badge
						variant="outline"
						className="bg-blue-50 text-blue-700 border-blue-200"
					>
						Completed
					</Badge>
				);
			case "cancelled":
				return (
					<Badge
						variant="outline"
						className="bg-red-50 text-red-700 border-red-200"
					>
						Cancelled
					</Badge>
				);
			default:
				return <Badge variant="outline">{status}</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Link href="/dashboard/clients">
					<Button variant="outline" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">
					Reservation History
				</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Cliente: {customer.name}</CardTitle>
					<CardDescription>
						Email: {customer.email} | Teléfono: {customer.phone}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Reservation ID</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Time</TableHead>
								<TableHead>People</TableHead>
								<TableHead>Table</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{reservations.map((reservation) => (
								<TableRow key={reservation.id}>
									<TableCell className="font-medium">
										{reservation.id}
									</TableCell>
									<TableCell>{reservation.date}</TableCell>
									<TableCell>{reservation.time}</TableCell>
									<TableCell>{reservation.people}</TableCell>
									<TableCell>{reservation.table}</TableCell>
									<TableCell>{getStatusBadge(reservation.status)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
