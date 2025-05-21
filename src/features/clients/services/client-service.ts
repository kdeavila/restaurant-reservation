import { apiGet, apiPost } from "@/lib/api";

export interface HistoryItem {
  date: string;
  action: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  number: string;
  history: HistoryItem[];
  is_active: boolean;
}

export interface CustomerTableData {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservations: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  number?: string;
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
    const users = await getAllUsers();
    const user = users.find(user => user._id === id);
    return user || null;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
}

export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    const data = {
      name: userData.name,
      email: userData.email,
      number: userData.number || ""
    };
    
    const response = await apiPost<typeof data, User | { error: string }>('/user/create', data);
    
    // Si la respuesta tiene un campo de error, lanzar una excepción
    if ('error' in response) {
      throw new Error(response.error);
    }
    
    // Si la respuesta no contiene un _id, también es un error
    if (!('_id' in response)) {
      throw new Error("Formato de respuesta inesperado");
    }
    
    return response as User;
  } catch (error) {
    // Procesar los mensajes de error comunes para mostrar mensajes más amigables
    let errorMessage = "Error al crear el usuario";
    
    if (error instanceof Error) {
      if (error.message.includes("duplicate key error") && error.message.includes("email")) {
        errorMessage = "Ya existe un usuario con este email";
      } else {
        errorMessage = error.message.split("->").pop()?.trim() || error.message;
      }
    }
    
    console.error("Error creating user:", error);
    throw new Error(errorMessage);
  }
}

export function mapUsersToCustomerData(users: User[]): CustomerTableData[] {
  return users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.number || 'N/A',
    reservations: user.history?.length || 0
  }));
} 