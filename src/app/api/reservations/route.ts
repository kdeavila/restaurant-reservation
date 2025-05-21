import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Función para verificar si dos intervalos de tiempo se superponen
function isTimeOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
  const [start1Hours, start1Minutes] = start1.split(':').map(Number);
  const [end1Hours, end1Minutes] = end1.split(':').map(Number);
  const [start2Hours, start2Minutes] = start2.split(':').map(Number);
  const [end2Hours, end2Minutes] = end2.split(':').map(Number);

  // Convertir todo a minutos para facilitar la comparación
  const start1Total = start1Hours * 60 + start1Minutes;
  const end1Total = end1Hours * 60 + end1Minutes;
  const start2Total = start2Hours * 60 + start2Minutes;
  const end2Total = end2Hours * 60 + end2Minutes;

  // Verificar si los intervalos se superponen
  return start1Total < end2Total && end1Total > start2Total;
}

// Simulación de base de datos
const reservations = [
  {
    id: "1",
    customer: "John Doe",
    date: "2025-05-20",
    time: "19:00",
    people: 2,
    table: "A1",
    status: "confirmed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    date: "2025-05-20",
    time: "20:00",
    people: 4,
    table: "B2",
    status: "pending",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required" },
      { status: 400 }
    );
  }

  const filteredReservations = reservations.filter(
    (reservation) => reservation.date === date
  );

  return NextResponse.json(filteredReservations);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.customer || !body.date || !body.time || !body.people || !body.table) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Validar formato de hora
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(body.time)) {
      return NextResponse.json(
        { error: "Formato de hora inválido. Use HH:MM" },
        { status: 400 }
      );
    }

    // Calcular hora de fin (1 hora después)
    const [hours, minutes] = body.time.split(':').map(Number);
    const endHour = ((hours + 1) % 24).toString().padStart(2, '0');
    const endTime = `${endHour}:${minutes.toString().padStart(2, '0')}`;

    // Verificar colisiones
    const existingReservations = reservations.filter(
      (reservation) => reservation.date === body.date && reservation.table === body.table
    );

    for (const res of existingReservations) {
      // Calcular hora de fin de la reservación existente
      const [resHours, resMinutes] = res.time.split(':').map(Number);
      const resEndHour = ((resHours + 1) % 24).toString().padStart(2, '0');
      const resEndTime = `${resEndHour}:${resMinutes.toString().padStart(2, '0')}`;

      if (isTimeOverlap(body.time, endTime, res.time, resEndTime)) {
        return NextResponse.json(
          { 
            error: `La mesa ${body.table} ya está reservada para la hora seleccionada.`,
            conflictingReservation: {
              id: res.id,
              customer: res.customer,
              time: res.time,
              endTime: resEndTime
            }
          },
          { status: 409 }
        );
      }
    }

    // Crear nueva reservación
    const newReservation = {
      id: (reservations.length + 1).toString(),
      customer: body.customer,
      date: body.date,
      time: body.time,
      people: body.people,
      table: body.table,
      status: "pending",
    };

    reservations.push(newReservation);

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
