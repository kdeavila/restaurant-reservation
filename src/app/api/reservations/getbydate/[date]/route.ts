import { NextResponse } from "next/server";

// Usando la misma simulación de base de datos
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

export async function GET(
  request: Request,
  { params }: { params: { date: string } }
) {
  const { date } = params;

  const filteredReservations = reservations.filter(
    (reservation) => reservation.date === date
  );

  if (filteredReservations.length === 0) {
    return NextResponse.json(
      { error: "No reservations found for this date" },
      { status: 404 }
    );
  }

  return NextResponse.json(filteredReservations);
}
