import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { CreateReservationDTO, Reservation, ReservationDetails, ReservationTableData, UpdateReservationDTO } from "@/types/app";

export async function getReservations(): Promise<ReservationDetails[]> {
  try {
    const reservations = await apiGet<ReservationDetails[]>("/reservations");
    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
}

export async function getReservation(id: number): Promise<ReservationDetails | null> {
  try {
    const reservations = await getReservations();
    const reservation = reservations.find((r) => r.id_reservation === id);
    return reservation || null;
  } catch (error) {
    console.error(`Error fetching reservation with ID ${id}:`, error);
    return null;
  }
}

export async function createReservation(reservationData: CreateReservationDTO): Promise<ReservationDetails> {
  try {
    const response = await apiPost<CreateReservationDTO, ReservationDetails | { error: string }>(
      "/reservations",
      reservationData
    );
    if ("error" in response) {
      throw new Error(response.error);
    }
    return response as ReservationDetails;
  } catch (error) {
    let errorMessage = "Error creating reservation";
    if (error instanceof Error) {
      errorMessage = error.message.split("->").pop()?.trim() || error.message;
    }
    console.error("Error creating reservation:", error);
    throw new Error(errorMessage);
  }
}

export async function updateReservation(
  id: number,
  reservationData: UpdateReservationDTO
): Promise<ReservationDetails> {
  try {
    const endpoint = `/reservations/${id}`;
    const response = await apiPut<UpdateReservationDTO, ReservationDetails | { error: string }>(
      endpoint,
      reservationData
    );
    if ("error" in response) {
      throw new Error(response.error);
    }
    return response as ReservationDetails;
  } catch (error) {
    let errorMessage = "Error updating reservation";
    if (error instanceof Error) {
      errorMessage = error.message.split("->").pop()?.trim() || error.message;
    }
    console.error("Error updating reservation:", error);
    throw new Error(errorMessage);
  }
}

export async function deleteReservation(id: number): Promise<void> {
  try {
    const endpoint = `/reservations/${id}`;
    await apiDelete(endpoint);
  } catch (error) {
    let errorMessage = "Error deleting reservation";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error deleting reservation:", error);
    throw new Error(errorMessage);
  }
}

export function reservationsAdapter(reservations: ReservationDetails[]): ReservationTableData[] {
  return reservations.map((reservation) => ({
    id: reservation.id_reservation,
    client: reservation.Customer.name,
    customer_id: reservation.Customer.id_customer,
    table_id: reservation.table_id,
    date: reservation.date,
    time: reservation.time,
    people: reservation.people,
    table: reservation.Table.location,
    status: reservation.status,
  }));
}
