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


export async function apiGet<TResponse = unknown>(endpoint: string): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint);
  return await response.json();
}


export async function apiPost<
  TData = Record<string, unknown>,
  TResponse = unknown
>(endpoint: string, data: TData): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return await response.json();
}


export async function apiPut<
  TData = Record<string, unknown>,
  TResponse = unknown
>(endpoint: string, data: TData): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await response.json();
}


export async function apiDelete<TResponse = unknown>(endpoint: string): Promise<TResponse> {
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
  return await response.json();
} 