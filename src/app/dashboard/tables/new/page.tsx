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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTablePage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		capacity: "4",
		location: "",
	});

	const [errors, setErrors] = useState({
		capacity: "",
		location: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Limpiar errores al editar
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Limpiar errores al editar
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		let valid = true;
		const newErrors = { capacity: "", location: "" };

		if (!formData.capacity) {
			newErrors.capacity = "La capacidad es obligatoria";
			valid = false;
		}

		if (!formData.location) {
			newErrors.location = "La ubicación es obligatoria";
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// En una aplicación real, aquí se enviarían los datos al servidor
			console.log("New table data:", formData);

			// Redirect to tables list
			router.push("/dashboard/tables");
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Link href="/tables">
					<Button variant="outline" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">New Table</h1>
			</div>

			<Card className="max-w-2xl">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<CardTitle>Table Information</CardTitle>
						<CardDescription>
							Enter the details of the new table to register it in the system.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="capacity">Capacity *</Label>
							<Input
								id="capacity"
								name="capacity"
								type="number"
								min="1"
								max="20"
								value={formData.capacity}
								onChange={handleChange}
							/>
							{errors.capacity && (
								<p className="text-sm text-red-500">{errors.capacity}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="location">Location *</Label>
							<Select
								value={formData.location}
								onValueChange={(value) => handleSelectChange("location", value)}
							>
								<SelectTrigger id="location">
									<SelectValue placeholder="Select location" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="window">Window</SelectItem>
									<SelectItem value="terrace">Terrace</SelectItem>
									<SelectItem value="indoor">Indoor</SelectItem>
									<SelectItem value="bar">Bar</SelectItem>
								</SelectContent>
							</Select>
							{errors.location && (
								<p className="text-sm text-red-500">{errors.location}</p>
							)}
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button
							variant="outline"
							type="button"
							onClick={() => router.push("/dashboard/tables")}
						>
							Cancel
						</Button>
						<Button type="submit">
							<Save className="mr-2 h-4 w-4" />
							Create Table
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
