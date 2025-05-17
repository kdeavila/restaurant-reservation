"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function EditCustomerPage() {
  const params = useParams()
  const router = useRouter()
  const customerId = params.id

  // En una aplicación real, estos datos vendrían de la base de datos
  const [formData, setFormData] = useState({
    name: "María García",
    email: "maria.garcia@ejemplo.com",
    phone: "612345678",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar errores al editar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { name: "", email: "" }

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // En una aplicación real, aquí se enviarían los datos al servidor
      console.log("Datos actualizados del cliente:", formData)

      // Redirigir a la lista de clientes
      router.push("/clientes")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Editar Cliente</h1>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
            <CardDescription>Actualice los datos del cliente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre y apellidos"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="612345678" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard/clients")}>
                Cancelar
              </Button>
              <Link href={`/dashboard/clients/${customerId}/historial`}>
                <Button variant="outline">Ver Historial</Button>
              </Link>
            </div>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
