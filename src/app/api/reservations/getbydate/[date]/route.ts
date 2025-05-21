import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

interface RouteParams {
  params: {
    date: string;
  };
}

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  const { date } = context.params;

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
