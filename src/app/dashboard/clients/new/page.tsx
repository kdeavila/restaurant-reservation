"use client";

import type React from "react";

import { createUser } from "@/features/clients/services/client-service";
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
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCustomerPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		number: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				setIsSubmitting(true);
				const newUser = await createUser({
					name: formData.name,
					email: formData.email,
					number: formData.number
				});

				// Verificar que el usuario se creó correctamente
				if (newUser?._id) {
					toast({
						title: "Usuario creado",
						description: "El usuario ha sido registrado exitosamente",
						variant: "default"
					});
					router.push("/dashboard/clients");
				}
			} catch (error) {
				let errorMessage = "Error al crear el usuario";
				if (error instanceof Error) {
					errorMessage = error.message;
				}
				toast({
					title: "Error",
					description: errorMessage,
					variant: "destructive"
				});
			} finally {
				setIsSubmitting(false);
			}
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
				<h1 className="text-3xl font-bold tracking-tight">New Client</h1>
			</div>

			<Card className="max-w-2xl">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-6"
				>
					<CardHeader>
						<CardTitle>Client Information</CardTitle>
						<CardDescription>
							Enter the new client's data to register it in the system.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Full name *</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Full name"
								disabled={isSubmitting}
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
								disabled={isSubmitting}
							/>
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="number">Phone number (optional)</Label>
							<Input
								id="number"
								name="number"
								value={formData.number}
								onChange={handleChange}
								placeholder="612345678"
								disabled={isSubmitting}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button
							variant="outline"
							type="button"
							onClick={() => router.push("/dashboard/clients")}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<svg 
										className="mr-2 h-4 w-4 animate-spin" 
										viewBox="0 0 24 24"
										aria-label="Cargando..."
									>
										<title>Cargando...</title>
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Creando...
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Client
								</>
							)}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
