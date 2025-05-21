import { getCookie } from "cookies-next";

const API_URL = "https://powerful-thicket-20953-b0be64efe5ec.herokuapp.com";

export function getAuthHeaders() {
	const token = getCookie("auth_token");
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return headers;
}

export async function fetchWithAuth(
	endpoint: string,
	options: RequestInit = {},
) {
	const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
	const headers = {
		...getAuthHeaders(),
		...options.headers,
	};

	const response = await fetch(url, {
		...options,
		headers,
	});

	return response;
}

async function handleApiResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const errorText = await response.text();
		let errorMessage = `Error ${response.status}: ${response.statusText}`;

		try {
			const errorData = JSON.parse(errorText);
			if (errorData.error) {
				errorMessage = errorData.error;
			}
		} catch (e) {
			if (errorText) {
				errorMessage += ` - ${errorText.substring(0, 100)}...`;
			}
		}

		throw new Error(errorMessage);
	}

	try {
		return (await response.json()) as T;
	} catch (error) {
		throw new Error("Error al procesar la respuesta del servidor");
	}
}

export async function apiGet<TResponse = unknown>(
	endpoint: string,
): Promise<TResponse> {
	const response = await fetchWithAuth(endpoint);
	return handleApiResponse<TResponse>(response);
}

export async function apiPost<
	TData = Record<string, unknown>,
	TResponse = unknown,
>(endpoint: string, data: TData): Promise<TResponse> {
	const response = await fetchWithAuth(endpoint, {
		method: "POST",
		body: JSON.stringify(data),
	});
	return handleApiResponse<TResponse>(response);
}

export async function apiPut<
	TData = Record<string, unknown>,
	TResponse = unknown,
>(endpoint: string, data: TData): Promise<TResponse> {
	const response = await fetchWithAuth(endpoint, {
		method: "PUT",
		body: JSON.stringify(data),
	});
	return handleApiResponse<TResponse>(response);
}

export async function apiDelete<TResponse = unknown>(
	endpoint: string,
): Promise<TResponse> {
	const response = await fetchWithAuth(endpoint, {
		method: "DELETE",
	});
	return handleApiResponse<TResponse>(response);
}
