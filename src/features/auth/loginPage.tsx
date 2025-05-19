"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { LayoutDashboard, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function LoginPage() {
	const router = useRouter();
	const { login, isLoading, error } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await login(email, password);
			// La redirección se maneja dentro de la función login
		} catch (error) {
			// Error ya se maneja en el contexto
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-center gap-2">
						<LayoutDashboard className="h-6 w-6" />
						<CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
					</div>
					<CardDescription className="text-center">
						Ingresa tus credenciales para acceder a tu cuenta
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="tu@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Contraseña</Label>
							</div>
							<Input
								id="password"
								placeholder="*************"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<svg
										className="h-4 w-4 animate-spin"
										viewBox="0 0 24 24"
										aria-label="Loading"
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
									Iniciando sesión...
								</span>
							) : (
								<>
									<LogIn className="mr-2 h-4 w-4" />
									Iniciar Sesión
								</>
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
