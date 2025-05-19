"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import { toast } from "@/hooks/use-toast";

// URL de la API de Heroku
const API_URL = "/api";
const FIXED_PASSWORD = "admin123"; // Contraseña fija para todos los usuarios

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar usuario desde localStorage al inicio
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
        deleteCookie("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Verificar que la contraseña coincida con la contraseña fija
      if (password !== FIXED_PASSWORD) {
        throw new Error("Contraseña incorrecta");
      }

      // Obtener todos los usuarios activos
      const response = await fetch(`${API_URL}/user/getallactive`);
      
      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }
      
      const users = await response.json();
      
      // Buscar el usuario por email
      const foundUser = users.find((u: User) => u.email === email);
      
      if (!foundUser) {
        throw new Error("Usuario no encontrado o inactivo");
      }

      if (!foundUser.is_active) {
        throw new Error("Usuario inactivo");
      }
      
      // Guardar el usuario en el estado y localStorage
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setCookie("user", JSON.stringify(foundUser), { maxAge: 60 * 60 * 24 * 7 }); // 1 semana
      
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido/a ${foundUser.name}`,
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