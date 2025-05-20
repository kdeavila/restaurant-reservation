import { getCookie } from "cookies-next";

const API_URL = "https://powerful-thicket-20953-b0be64efe5ec.herokuapp.com";

/**
 * Creates a headers object with the Authorization token if available
 */
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

/**
 * Wrapper function for fetch API that includes auth token when available
 */
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
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

/**
 * GET request helper with auth
 */
export async function apiGet<TResponse = any>(endpoint: string): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint);
  return await response.json();
}

/**
 * POST request helper with auth
 */
export async function apiPost<TData = any, TResponse = any>(
  endpoint: string,
  data: TData
): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * PUT request helper with auth
 */
export async function apiPut<TData = any, TResponse = any>(
  endpoint: string,
  data: TData
): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * DELETE request helper with auth
 */
export async function apiDelete<TResponse = any>(endpoint: string): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
  return await response.json();
} 