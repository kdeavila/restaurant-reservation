import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { CreateTableDTO, Table, TableManagementData, UpdateTableDTO } from "@/types/app";

export async function getTables(): Promise<Table[]> {
  try {
    const tables = await apiGet<Table[]>("/tables");
    return tables;
  } catch (error) {
    console.error("Error fetching active tables:", error);
    return [];
  }
}

export async function getTable(id: number): Promise<Table | null> {
  try {
    const tables = await getTables();
    const table = tables.find((table) => table.id_table === id);
    return table || null;
  } catch (error) {
    console.error(`Error fetching table with ID ${id}:`, error);
    return null;
  }
}

export async function createTable(userData: CreateTableDTO): Promise<Table> {
  try {
    const data = {
      capacity: userData.capacity,
      location: userData.location,
    };

    const response = await apiPost<typeof data, Table | { error: string }>(
      "/tables",
      data,
    );

    if ("error" in response) {
      throw new Error(response.error);
    }

    return response as Table;
  } catch (error) {
    let errorMessage = "Error creating table";

    if (error instanceof Error) {
        errorMessage = error.message.split("->").pop()?.trim() || error.message;
    }

    console.error("Error creating table:", error);
    throw new Error(errorMessage);
  }
}

export async function updateTable(
  id: number,
  tableData: UpdateTableDTO,
): Promise<Table> {
  try {
    const endpoint = `/tables/${id}`;
    const response = await apiPut<UpdateTableDTO, Table | { error: string }>(
      endpoint,
      tableData,
    );

    if ("error" in response) {
      throw new Error(response.error);
    }

    return response as Table;
  } catch (error) {
    let errorMessage = "Error updating table";

    if (error instanceof Error) {
        errorMessage = error.message.split("->").pop()?.trim() || error.message;
    }

    console.error("Error updating table:", error);
    throw new Error(errorMessage);
  }
}

export async function deleteTable(id: number): Promise<void> {
  try {
    const endpoint = `/tables/${id}`;
    await apiDelete(endpoint);
  } catch (error) {
    let errorMessage = "Error deleting tables";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error deleting table:", error);
    throw new Error(errorMessage);
  }
}

export function customersAdapter(tables: Table[]): TableManagementData[] {
  return tables.map((table, index) => ({
    id: table.id_table,
    name: `Table ${index + 1}`,
    location: table.location,
    capacity: table.capacity,
    status:  table.status,
  }));
}
