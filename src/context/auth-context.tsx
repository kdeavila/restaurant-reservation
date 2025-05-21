"use client";

import { toast } from "@/hooks/use-toast";
import { apiPost } from "@/lib/api";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
	number?: number;
	history?: Array<{ date: string; action: string }>;
	is_active: boolean;
};

type AuthContextType = {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
	error: string | null;
};

type LoginResponse = {
	token?: string;
	error?: string;
};

type LoginRequest = {
	email: string;
	password: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const token = getCookie("auth_token");

		if (storedUser && token) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (e) {
				localStorage.removeItem("user");
				deleteCookie("user");
				deleteCookie("auth_token");
			}
		}
	}, []);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await apiPost<LoginRequest, LoginResponse>("/auth/login", {
				email,
				password,
			});

			console.log(data);

			if (data.error) {
				throw new Error(data.error || "Error al iniciar sesión");
			}

			const { token } = data;

			if (!token) {
				throw new Error("No se recibió un token de autenticación");
			}

			const tokenPayload = JSON.parse(atob(token.split(".")[1]));

			const userData: User = {
				_id: tokenPayload.id,
				email: tokenPayload.email,
				name: tokenPayload.name || "Admin",
				role: "admin",
				is_active: true,
			};

			setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 });
			localStorage.setItem("user", JSON.stringify(userData));
			setCookie("user", JSON.stringify(userData), { maxAge: 60 * 60 * 24 * 7 });

			setUser(userData);

			toast({
				title: "Inicio de sesión exitoso",
				description: `Bienvenido/a ${userData.name}`,
			});

			router.push("/dashboard");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
				toast({
					variant: "destructive",
					title: "Error al iniciar sesión",
					description: error.message,
				});
			} else {
				setError("Error al iniciar sesión");
				toast({
					variant: "destructive",
					title: "Error al iniciar sesión",
					description: "Ocurrió un error inesperado",
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		deleteCookie("user");
		deleteCookie("auth_token");
		toast({
			title: "Sesión cerrada",
			description: "Has cerrado sesión correctamente",
		});
		router.push("/auth/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth debe ser usado dentro de un AuthProvider");
	}
	return context;
};
