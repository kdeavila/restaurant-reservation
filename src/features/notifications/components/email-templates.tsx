"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { Button } from "@/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import { Textarea } from "@/ui/textarea"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Save } from "lucide-react"

export function EmailTemplates() {
  const [activeTemplate, setActiveTemplate] = useState("confirmation")

  const templates = {
    confirmation: {
      subject: "Confirmación de Reserva - [ID_RESERVA]",
      body: `Estimado [NOMBRE_CLIENTE],

Nos complace confirmar su reserva en nuestro restaurante.

Detalles de la reserva:
- Fecha: [FECHA_RESERVA]
- Hora: [HORA_RESERVA]
- Número de personas: [NUM_PERSONAS]
- Mesa: [NUMERO_MESA]

Si necesita realizar algún cambio, por favor contáctenos.

Gracias por elegir nuestro restaurante.

Atentamente,
El equipo del Restaurante`,
    },
    modification: {
      subject: "Modificación de Reserva - [ID_RESERVA]",
      body: `Estimado [NOMBRE_CLIENTE],

Su reserva ha sido modificada según lo solicitado.

Nuevos detalles de la reserva:
- Fecha: [FECHA_RESERVA]
- Hora: [HORA_RESERVA]
- Número de personas: [NUM_PERSONAS]
- Mesa: [NUMERO_MESA]

Si necesita realizar algún otro cambio, por favor contáctenos.

Gracias por elegir nuestro restaurante.

Atentamente,
El equipo del Restaurante`,
    },
    cancellation: {
      subject: "Cancelación de Reserva - [ID_RESERVA]",
      body: `Estimado [NOMBRE_CLIENTE],

Su reserva ha sido cancelada según lo solicitado.

Detalles de la reserva cancelada:
- Fecha: [FECHA_RESERVA]
- Hora: [HORA_RESERVA]
- Número de personas: [NUM_PERSONAS]

Esperamos poder atenderle en otra ocasión.

Atentamente,
El equipo del Restaurante`,
    },
    reminder: {
      subject: "Recordatorio de Reserva - [ID_RESERVA]",
      body: `Estimado [NOMBRE_CLIENTE],

Le recordamos su próxima reserva en nuestro restaurante.

Detalles de la reserva:
- Fecha: [FECHA_RESERVA]
- Hora: [HORA_RESERVA]
- Número de personas: [NUM_PERSONAS]
- Mesa: [NUMERO_MESA]

Esperamos verle pronto.

Atentamente,
El equipo del Restaurante`,
    },
  }

  const [currentTemplate, setCurrentTemplate] = useState({
    subject: templates[activeTemplate as keyof typeof templates].subject,
    body: templates[activeTemplate as keyof typeof templates].body,
  })

  const handleTemplateChange = (value: string) => {
    setActiveTemplate(value)
    setCurrentTemplate({
      subject: templates[value as keyof typeof templates].subject,
      body: templates[value as keyof typeof templates].body,
    })
  }

  const handleSave = () => {
    // En una aplicación real, aquí se guardarían los cambios en la base de datos
    console.log("Guardando plantilla:", activeTemplate, currentTemplate)
    alert("Plantilla guardada correctamente")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plantillas de Email</CardTitle>
        <CardDescription>Personalice las plantillas de email para las notificaciones a los clientes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTemplate} onValueChange={handleTemplateChange}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="confirmation">Confirmación</TabsTrigger>
            <TabsTrigger value="modification">Modificación</TabsTrigger>
            <TabsTrigger value="cancellation">Cancelación</TabsTrigger>
            <TabsTrigger value="reminder">Recordatorio</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input
                id="subject"
                value={currentTemplate.subject}
                onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Cuerpo del Email</Label>
              <Textarea
                id="body"
                value={currentTemplate.body}
                onChange={(e) => setCurrentTemplate({ ...currentTemplate, body: e.target.value })}
                className="min-h-[300px] font-mono"
              />
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Variables disponibles:</h3>
              <ul className="text-xs space-y-1">
                <li>
                  <code>[NOMBRE_CLIENTE]</code> - Nombre del cliente
                </li>
                <li>
                  <code>[ID_RESERVA]</code> - Identificador de la reserva
                </li>
                <li>
                  <code>[FECHA_RESERVA]</code> - Fecha de la reserva
                </li>
                <li>
                  <code>[HORA_RESERVA]</code> - Hora de la reserva
                </li>
                <li>
                  <code>[NUM_PERSONAS]</code> - Número de personas
                </li>
                <li>
                  <code>[NUMERO_MESA]</code> - Número de mesa asignada - Número de personas
                </li>
                <li>
                  <code>[NUMERO_MESA]</code> - Número de mesa asignada
                </li>
              </ul>
            </div>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Plantilla
        </Button>
      </CardFooter>
    </Card>
  )
}
