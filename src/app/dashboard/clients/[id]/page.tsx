"use client";

import type React from "react";

import {
	getCustomer,
	updateCustomer,
} from "@/features/clients/services/client-service";
import { toast } from "@/hooks/use-toast";
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
import { useEffect, useState } from "react";

export default function EditCustomerPage() {
	const params = useParams();
	const router = useRouter();
	const customerId = params.id as string;

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errors, setErrors] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		const fetchCustomerData = async () => {
			try {
				setLoading(true);
				const userData = await getCustomer(Number(customerId));

				if (!userData) {
					setError("Cliente no encontrado");
					return;
				}

				setFormData({
					name: userData.name,
					email: userData.email,
					phone: userData.phone || "",
				});
			} catch (err) {
				console.error("Error fetching customer data:", err);
				setError("Error fetching customer data");
			} finally {
				setLoading(false);
			}
		};

		fetchCustomerData();
	}, [customerId]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		let valid = true;
		const newErrors = { name: "", email: "" };

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
			valid = false;
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
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
				const updatedUser = await updateCustomer(customerId, {
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
				});

				if (updatedUser?.id_customer) {
					toast({
						title: "Client updated",
						description:
							"The client's data has been updated successfully",
					});
					router.push("/dashboard/clients");
				}
			} catch (error) {
				let errorMessage = "Error updating the client";
				if (error instanceof Error) {
					errorMessage = error.message;
				}
				toast({
					title: "Error",
					description: errorMessage,
					variant: "destructive",
				});
				console.error("Error updating client:", error);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p>Cargando datos del cliente...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

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
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<CardHeader>
						<CardTitle>Edit Client</CardTitle>
						<CardDescription>Update the client's information.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6 pt-2">
						<div className="space-y-3">
							<Label htmlFor="name">Name *</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Name and surnames"
								disabled={isSubmitting}
							/>
							{errors.name && (
								<p className="text-sm text-red-500">{errors.name}</p>
							)}
						</div>

						<div className="space-y-3">
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

						<div className="space-y-3">
							<Label htmlFor="phone">Phone number (optional)</Label>
							<Input
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="612345678"
								disabled={isSubmitting}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<div className="flex gap-3">
							<Button
								variant="outline"
								type="button"
								onClick={() => router.push("/dashboard/clients")}
								disabled={isSubmitting}
							>
								Cancel
							</Button>
							<Link href={`/dashboard/clients/${customerId}/history`}>
								<Button variant="outline" disabled={isSubmitting}>
									History
								</Button>
							</Link>
						</div>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<svg
										className="mr-2 h-4 w-4 animate-spin"
										viewBox="0 0 24 24"
										aria-label="Cargando..."
									>
										<title>Cargando...</title>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											fill="none"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Actualizando...
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</>
							)}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
