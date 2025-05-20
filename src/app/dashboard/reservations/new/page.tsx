"use client";

import type React from "react";

import { CustomerSelector } from "@/features/reservations/components/customer-selector";
import { DatePicker } from "@/features/reservations/components/date-picker";
import { TableSelector } from "@/features/reservations/components/table-selector";
import { TimePicker } from "@/features/reservations/components/time-picker";
import { Button } from "@/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { ArrowLeft, Save, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewReservationPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		customer: "",
		date: new Date(),
		time: "",
		people: "2",
		table: "",
	});

	const [errors, setErrors] = useState({
		customer: "",
		date: "",
		time: "",
		people: "",
		table: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		router.push("/dashboard/reservations");
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Link href="/dashboard/reservations">
					<Button variant="outline" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">Nueva Reserva</h1>
			</div>

			<Card className="max-w-2xl">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<CardTitle>Información de la Reserva</CardTitle>
						<CardDescription>
							Complete los datos para crear una nueva reserva.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>Cliente *</Label>
							<CustomerSelector />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Fecha *</Label>
								<DatePicker />
							</div>

							<div className="space-y-2">
								<Label>Hora *</Label>
								<TimePicker />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="people">Número de personas *</Label>
							<div className="flex items-center">
								<Users className="mr-2 h-4 w-4 text-muted-foreground" />
								<Input
									id="people"
									name="people"
									type="number"
									min="1"
									max="20"
									value={formData.people}
									onChange={(e) =>
										setFormData({ ...formData, people: e.target.value })
									}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label>Mesa *</Label>
							<TableSelector />
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button
							variant="outline"
							type="button"
							onClick={() => router.push("/reservas")}
						>
							Cancelar
						</Button>
						<Button type="submit">
							<Save className="mr-2 h-4 w-4" />
							Guardar Reserva
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
