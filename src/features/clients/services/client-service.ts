import { apiGet } from "@/lib/api";

export interface HistoryItem {
  date: string;
  action: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  history: HistoryItem[];
  is_active: boolean;
  role: string;
  __v: number;
  // Campo opcional para número de teléfono (no está en la API)
  phone?: string;
}

export interface CustomerTableData {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservations: number;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await apiGet<User[]>('/user/getall');
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    // Como la API no tiene un endpoint específico para obtener un usuario por ID,
    // obtenemos todos los usuarios y filtramos por ID
    const users = await getAllUsers();
    const user = users.find(user => user._id === id);
    return user || null;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
}

export function mapUsersToCustomerData(users: User[]): CustomerTableData[] {
  return users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || 'N/A', // Por defecto 'N/A' si no hay teléfono
    reservations: user.history?.length || 0
  }));
} 