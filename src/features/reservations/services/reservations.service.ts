import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { CreateReservationDTO, Reservation, UpdateReservationDTO } from "@/types/app";

export async function getReservations(): Promise<Reservation[]> {
  try {
    const reservations = await apiGet<Reservation[]>("/reservations");
    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
}

export async function getReservation(id: number): Promise<Reservation | null> {
  try {
    const reservations = await getReservations();
    const reservation = reservations.find((r) => r.id_reservation === id);
    return reservation || null;
  } catch (error) {
    console.error(`Error fetching reservation with ID ${id}:`, error);
    return null;
  }
}

export async function createReservation(reservationData: CreateReservationDTO): Promise<Reservation> {
  try {
    const response = await apiPost<CreateReservationDTO, Reservation | { error: string }>(
      "/reservations",
      reservationData
    );
    if ("error" in response) {
      throw new Error(response.error);
    }
    return response as Reservation;
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
): Promise<Reservation> {
  try {
    const endpoint = `/reservations/${id}`;
    const response = await apiPut<UpdateReservationDTO, Reservation | { error: string }>(
      endpoint,
      reservationData
    );
    if ("error" in response) {
      throw new Error(response.error);
    }
    return response as Reservation;
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

export function customersAdapter(users: Reservation[]): CustomerTableData[] {
  return users.map((user) => ({
    id: user.id_customer,
    name: user.name,
    email: user.email,
    phone: user.phone || "N/A"
  }));
}
