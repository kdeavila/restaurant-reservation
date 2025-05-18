"use client";

import type React from "react";

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
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditCustomerPage() {
	const params = useParams();
	const router = useRouter();
	const customerId = params.id;

	// En una aplicación real, estos datos vendrían de la base de datos
	const [formData, setFormData] = useState({
		name: "María García",
		email: "maria.garcia@ejemplo.com",
		phone: "612345678",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Limpiar errores al editar
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		let valid = true;
		const newErrors = { name: "", email: "" };

		if (!formData.name.trim()) {
			newErrors.name = "El nombre es obligatorio";
			valid = false;
		}

		if (!formData.email.trim()) {
			newErrors.email = "El email es obligatorio";
			valid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "El email no es válido";
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// En una aplicación real, aquí se enviarían los datos al servidor
			console.log("Datos actualizados del cliente:", formData);

			// Redirigir a la lista de clientes
			router.push("/clientes");
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
				<h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
			</div>

			<Card className="max-w-2xl">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<CardTitle>Edit Client</CardTitle>
						<CardDescription>Update the client's information.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name *</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Name and surnames"
							/>
							{errors.name && (
								<p className="text-sm text-red-500">{errors.name}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email *</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="example@example.com"
							/>
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Phone (optional)</Label>
							<Input
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="612345678"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<div className="flex gap-2">
							<Button
								variant="outline"
								type="button"
								onClick={() => router.push("/dashboard/clients")}
							>
								Cancel
							</Button>
							<Link href={`/dashboard/clients/${customerId}/history`}>
								<Button variant="outline">History</Button>
							</Link>
						</div>
						<Button type="submit">
							<Save className="mr-2 h-4 w-4" />
							Save Changes
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
