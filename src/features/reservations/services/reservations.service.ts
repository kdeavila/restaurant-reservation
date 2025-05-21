import { apiGet } from "@/lib/api";

interface Reservation {
  id: string;
  customer: string;
  date: string;
  time: string;
  people: number;
  table: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export const getReservationsByDate = async (date: string) => {
  const reservations = await apiGet<Reservation[]>(`/reservations/getbydate/${date}`);
  return reservations;
}