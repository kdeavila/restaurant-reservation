import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { CreateCustomerDTO, Customer, CustomerTableData, ReservationDetails, UpdateCustomerDTO } from "@/types/app";

export async function getCustomers(): Promise<Customer[]> {
	try {
		const customers = await apiGet<Customer[]>("/customers");
		return customers;
	} catch (error) {
		console.error("Error fetching active customers:", error);
		return [];
	}
}

export async function getCustomer(id: number): Promise<Customer | null> {
	try {
		const customers = await getCustomers();
		const user = customers.find((user) => user.id_customer === id);
		return user || null;
	} catch (error) {
		console.error(`Error fetching user with ID ${id}:`, error);
		return null;
	}
}

export async function createCustomer(userData: CreateCustomerDTO): Promise<Customer> {
	try {
		const data = {
			name: userData.name,
			email: userData.email,
			phone: userData.phone || "",
		};

		const response = await apiPost<typeof data, Customer | { error: string }>(
			"/customers",
			data,
		);

		if ("error" in response) {
			throw new Error(response.error);
		}

		return response as Customer;
	} catch (error) {
		let errorMessage = "Error creating user";

		if (error instanceof Error) {
			if (
				error.message.includes("duplicate key error") &&
				error.message.includes("email")
			) {
				errorMessage = "A user with this email already exists";
			} else {
				errorMessage = error.message.split("->").pop()?.trim() || error.message;
			}
		}

		console.error("Error creating user:", error);
		throw new Error(errorMessage);
	}
}

export async function updateCustomer(
	id: number,
	userData: UpdateCustomerDTO,
): Promise<Customer> {
	try {
		const endpoint = `/customers/${id}`;
		const response = await apiPut<UpdateCustomerDTO, Customer | { error: string }>(
			endpoint,
			userData,
		);

		if ("error" in response) {
			throw new Error(response.error);
		}

		return response as Customer;
	} catch (error) {
		let errorMessage = "Error updating user";

		if (error instanceof Error) {
			if (
				error.message.includes("duplicate key error") &&
				error.message.includes("email")
			) {
				errorMessage = "A user with this email already exists";
			} else {
				errorMessage = error.message.split("->").pop()?.trim() || error.message;
			}
		}

		console.error("Error updating user:", error);
		throw new Error(errorMessage);
	}
}

export async function deleteCustomer(id: number): Promise<void> {
	try {
		const endpoint = `/customers/${id}`;
		await apiDelete(endpoint);
	} catch (error) {
		let errorMessage = "Error deleting user";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		console.error("Error deleting user:", error);
		throw new Error(errorMessage);
	}
}

export async function getCustomerHistory(id: number): Promise<ReservationDetails[]> {
	try {
		const endpoint = `/customers/${id}/reservations`;
		const history = await apiGet<ReservationDetails[]>(endpoint);
		return history;
	} catch (error) {
		console.error("Error fetching user history:", error);
		return [];
	}
}

export function customersAdapter(users: Customer[]): CustomerTableData[] {
	return users.map((user) => ({
		id: user.id_customer,
		name: user.name,
		email: user.email,
		phone: user.phone || "N/A"
	}));
}
