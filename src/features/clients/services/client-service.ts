import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

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

export interface UpdateUserData {
  name?: string;
  email?: string;
  number?: string;
}

export async function getAllActiveUsers(): Promise<User[]> {
  try {
    const users = await apiGet<User[]>('/user/getallactive');
    return users;
  } catch (error) {
    console.error("Error fetching active users:", error);
    return [];
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const users = await getAllActiveUsers();
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
    
    if ('error' in response) {
      throw new Error(response.error);
    }
    
    if (!('_id' in response)) {
      throw new Error("Formato de respuesta inesperado");
    }
    
    return response as User;
  } catch (error) {
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

export async function updateUser(id: string, userData: UpdateUserData): Promise<User> {
  try {
    const endpoint = `/user/update/${id}`;
    const response = await apiPut<UpdateUserData, User | { error: string }>(endpoint, userData);
    
    if ('error' in response) {
      throw new Error(response.error);
    }
    
    if (!('_id' in response)) {
      throw new Error("Formato de respuesta inesperado");
    }
    
    return response as User;
  } catch (error) {
    let errorMessage = "Error al actualizar el usuario";
    
    if (error instanceof Error) {
      if (error.message.includes("duplicate key error") && error.message.includes("email")) {
        errorMessage = "Ya existe un usuario con este email";
      } else {
        errorMessage = error.message.split("->").pop()?.trim() || error.message;
      }
    }
    
    console.error("Error updating user:", error);
    throw new Error(errorMessage);
  }
}

export async function softDeleteUser(id: string): Promise<void> {
  try {
    const endpoint = `/user/softdelete/${id}`;
    await apiDelete(endpoint);
  } catch (error) {
    let errorMessage = "Error al eliminar el usuario";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error deleting user:", error);
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